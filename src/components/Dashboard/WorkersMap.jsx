import { useEffect, useState } from "react";
import { GeoJSON, MapContainer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import PropTypes from "prop-types";
import "leaflet/dist/leaflet.css";
import { FaBolt, FaFire, FaHardHat, FaTractor, FaTruck, FaWrench } from "react-icons/fa";
import { HiArrowLeft, HiChevronRight } from "react-icons/hi2";
import { getBlockSummaries, getBlockWorkforce, workforceStates, workforceRoles } from "../../data/workforceData";

const roleIcons = {
  dumper: FaTruck,
  excavator: FaTractor,
  loader: FaHardHat,
  mechanic: FaWrench,
  electrician: FaBolt,
  welder: FaFire,
};
const roles = workforceRoles.map((role) => ({ ...role, icon: roleIcons[role.key] }));
const indiaBounds = [[6.4, 67.5], [37.2, 97.5]];
const allDistricts = workforceStates.flatMap((state) => state.districts);

function geometryCenter(geometry) {
  const points = [];
  const collect = (coordinates) => {
    if (!Array.isArray(coordinates)) return;
    if (typeof coordinates[0] === "number" && typeof coordinates[1] === "number") points.push(coordinates);
    else coordinates.forEach(collect);
  };
  collect(geometry?.coordinates);
  if (!points.length) return null;
  const [lng, lat] = points.reduce(([lngSum, latSum], [pointLng, pointLat]) => [lngSum + pointLng, latSum + pointLat], [0, 0]);
  return [lat / points.length, lng / points.length];
}

function MapResizeHandler({ bounds }) {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();
    let resizeTimer;
    const resize = () => {
      map.invalidateSize({ animate: false, pan: false });
      map.fitBounds(bounds, { padding: [24, 24], animate: false });
    };
    const observer = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 80);
    });
    observer.observe(container);
    resize();
    return () => {
      window.clearTimeout(resizeTimer);
      observer.disconnect();
    };
  }, [map, bounds]);

  return null;
}

MapResizeHandler.propTypes = { bounds: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired };

function WorkersMap() {
  const [indiaStates, setIndiaStates] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const overview = !selectedState;
  const districtData = selectedState?.districts || allDistricts;
  const bounds = selectedState?.bounds || indiaBounds;
  const [mapError, setMapError] = useState(false);
  const [mapRequest, setMapRequest] = useState(0);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [selectedRole, setSelectedRole] = useState("total");
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedBlock, setSelectedBlock] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetch("/IndiaStates.geojson").then((response) => response.json()).then((data) => { if (mounted) setIndiaStates(data); }).catch((error) => console.error("Unable to load India map:", error));
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!selectedState) return undefined;
    const controller = new AbortController();
    fetch(selectedState.districtsFile, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("District map request failed");
        return response.json();
      })
      .then((data) => setGeoJsonData({ state: selectedState.name, data }))
      .catch((error) => { if (error.name !== "AbortError") setMapError(true); });
    return () => controller.abort();
  }, [selectedState, mapRequest]);

  const districtMap = geoJsonData?.state === selectedState?.name ? geoJsonData?.data : null;
  const totalWorkforce = districtData.reduce((sum, district) => sum + district.total, 0);
  const activeRole = roles.find((role) => role.key === selectedRole);
  const activeLabel = activeRole?.label || "All mining roles";
  const selectedTotal = selectedRole === "total" ? totalWorkforce : districtData.reduce((sum, district) => sum + district[selectedRole], 0);
  const districtValue = (name) => {
    const district = districtData.find((item) => item.name === name);
    if (!district) return 0;
    return selectedRole === "total" ? district.total : district[selectedRole];
  };
  const hovered = districtData.find((district) => district.name === hoveredDistrict);
  const selectedDistrictData = districtData.find((district) => district.name === selectedDistrict);
  const blockRows = selectedDistrictData ? getBlockSummaries(selectedDistrictData) : [];
  const selectedBlockIndex = selectedDistrict ? blockRows.findIndex((block) => block.name === selectedBlock) : -1;
  const workforceRecords = selectedDistrictData && selectedBlockIndex >= 0 ? getBlockWorkforce(selectedDistrictData, selectedBlock).filter((record) => selectedRole === "total" || record.roleKey === selectedRole) : [];

  const openState = (state) => {
    setSelectedState(state);
    if (mapError) setMapRequest((request) => request + 1);
    setMapError(false);
    setHoveredDistrict(null);
    setSelectedDistrict(null);
    setSelectedBlock(null);
  };
  const openDistrict = (name) => {
    openState(workforceStates.find((state) => state.districts.some((district) => district.name === name)));
    setHoveredDistrict(null);
    setSelectedDistrict(name);
    setSelectedBlock(null);
  };
  const stateStyle = (feature) => ({
    fillColor: workforceStates.some((state) => state.name === feature.properties.ST_NM) ? "var(--coral)" : "var(--workforce-map-inactive)",
    color: workforceStates.some((state) => state.name === feature.properties.ST_NM) ? "var(--workforce-map-low)" : "var(--ink)",
    weight: workforceStates.some((state) => state.name === feature.properties.ST_NM) ? 2.2 : 1,
    fillOpacity: workforceStates.some((state) => state.name === feature.properties.ST_NM) ? 0.98 : 0.58,
  });
  const bindState = (feature, layer) => {
    const name = feature.properties.ST_NM;
    const state = workforceStates.find((item) => item.name === name);
    layer.bindTooltip(state ? `${name} · View workforce by district` : `${name} · No workforce data available`, { className: "coral-operation-tooltip", sticky: true });
    if (state) layer.on({
      click: () => openState(state),
      mouseover: () => layer.setStyle({ fillOpacity: 1, weight: 3 }),
      mouseout: () => layer.setStyle(stateStyle(feature)),
    });
  };

  const mapStyle = (feature) => {
    const value = districtValue(feature.properties[selectedState.districtProperty]);
    const fillColor = value === 0 ? "var(--workforce-map-inactive)" : value < 25 ? "var(--workforce-map-low)" : value < 60 ? "var(--coral)" : "var(--coral-deep)";
    return { fillColor, weight: 1, opacity: 1, color: "var(--workforce-map-border)", fillOpacity: value === 0 ? 0.32 : 0.82 };
  };

  const bindDistrict = (feature, layer) => {
    const name = feature.properties[selectedState.districtProperty];
    layer.bindTooltip(`${name}: ${districtValue(name)}`, { direction: "auto", className: "coral-operation-tooltip" });
    layer.on({
      mouseover: () => setHoveredDistrict(name),
      mouseout: () => setHoveredDistrict(null),
      click: () => {
        if (districtData.some((district) => district.name === name)) {
          openDistrict(name);
        }
      },
    });
  };

  const goBack = () => {
    if (selectedBlock) setSelectedBlock(null);
    else setSelectedDistrict(null);
  };

  return (
    <div className="coral-role-map">
      <div className="coral-role-map__tabs" role="group" aria-label="Filter workforce by job role">
        <button type="button" aria-pressed={selectedRole === "total"} className={selectedRole === "total" ? "is-active" : ""} onClick={() => setSelectedRole("total")}><FaHardHat /><span>All roles</span></button>
        {roles.map((role) => { const Icon = role.icon; return <button type="button" aria-pressed={selectedRole === role.key} className={selectedRole === role.key ? "is-active" : ""} onClick={() => setSelectedRole(role.key)} key={role.key}><Icon /><span>{role.shortLabel}</span></button>; })}
      </div>

      <div className="coral-role-map__tabs" role="group" aria-label="Filter workforce by state">
        <button type="button" aria-pressed={overview} className={overview ? "is-active" : ""} onClick={() => openState(null)}>India overview</button>
        {workforceStates.map((state) => <button type="button" key={state.name} aria-pressed={selectedState === state} className={selectedState === state ? "is-active" : ""} onClick={() => openState(state)}>{state.name}{state.isSample ? " · Sample data" : ""}</button>)}
      </div>
      <div className="coral-role-map__body">
        <div className="coral-role-map__visual coral-operations__map" aria-label={overview ? "India workforce coverage map" : `${selectedState.name} workforce district map`}>
          <div className="coral-operations__map-label"><span>{overview ? "India operations" : "District workforce"}</span><strong>{overview ? "Select a highlighted state" : selectedState.name}</strong></div>
          {!overview && <button className="coral-operations__back" type="button" onClick={() => openState(null)}><HiArrowLeft /> India overview</button>}
          {!overview && !districtMap && <div className="coral-role-map__load-status" role="status">{mapError ? "Map unavailable. Select the state again to retry." : "Loading district map…"}</div>}
          <div className="coral-role-map__summary"><span>{hovered?.name || (overview ? "Three-state workforce" : `${selectedState.name} workforce`)}</span><strong>{hovered ? (selectedRole === "total" ? hovered.total : hovered[selectedRole]) : selectedTotal}</strong><small>{activeLabel}</small></div>
          <MapContainer key={selectedState?.name || "india"} attributionControl={false} bounds={bounds} boundsOptions={{ padding: [8, 8] }} zoomSnap={0.1} scrollWheelZoom={false} dragging={false} zoomControl={false} doubleClickZoom={false} touchZoom={false} keyboard={false} boxZoom={false}>
            <MapResizeHandler bounds={bounds} />
            {overview && indiaStates && <GeoJSON data={indiaStates} style={stateStyle} onEachFeature={bindState} />}
            {!overview && districtMap && <><GeoJSON key={selectedRole} data={districtMap} style={mapStyle} onEachFeature={bindDistrict} />{districtMap.features.map((feature) => { const name = feature.properties[selectedState.districtProperty]; const value = districtValue(name); const center = geometryCenter(feature.geometry); if (!center || value === 0) return null; return <Marker key={`${name}-${selectedRole}`} position={center} interactive={false} keyboard={false} icon={L.divIcon({ className: "coral-role-marker", html: `<span>${value}</span>`, iconSize: [30,22] })} />; })}</>}
          </MapContainer>
          <div className="coral-role-map__legend">{overview ? <><span><i className="is-medium" />Workforce data available</span><span><i className="is-inactive" />No data</span></> : <><span><i className="is-low" />1–24</span><span><i className="is-medium" />25–59</span><span><i className="is-high" />60+</span></>}</div>
        </div>

        <div className="coral-role-map__table">
          <div className="coral-role-map__table-title">
            <div className="coral-role-map__table-heading">
              {(selectedDistrict || selectedBlock) && <button type="button" onClick={goBack} aria-label={selectedBlock ? "Back to blocks" : "Back to districts"}><HiArrowLeft /> Back</button>}
              <div>
                <span>{selectedBlock ? "Workforce records" : selectedDistrict ? "Block register" : "Workforce register"}</span>
                <strong>{selectedBlock ? selectedBlock : selectedDistrict ? `Blocks in ${selectedDistrict}` : "Mining roles by district"}</strong>
                <small>{overview ? "Jharkhand & Chhattisgarh include sample data" : `${selectedState.name}${selectedState.isSample ? " · Sample data" : ""}`}</small>
                {selectedDistrict && <small>{selectedDistrict}{selectedBlock ? ` / ${selectedBlock}` : ""}</small>}
              </div>
            </div>
            <small>{selectedBlock ? workforceRecords.length : selectedDistrictData ? (selectedRole === "total" ? selectedDistrictData.total : selectedDistrictData[selectedRole]) : selectedTotal} people</small>
          </div>

          <div className="coral-role-map__table-scroll">
            {selectedBlock ? (
              <table className="coral-workforce-table"><thead><tr><th>Name</th><th>Job Role</th><th>Age</th><th>Gender</th><th>Employment Status</th></tr></thead><tbody>{workforceRecords.map((record) => <tr key={record.id}><td>{record.name}</td><td>{record.jobRole}</td><td>{record.age}</td><td>{record.gender}</td><td><span className={`coral-employment-status is-${record.employmentStatus.toLowerCase()}`}>{record.employmentStatus}</span></td></tr>)}</tbody></table>
            ) : selectedDistrict ? (
              <table><thead><tr><th>Block</th><th>Total</th>{roles.map((role) => <th key={role.key}>{role.shortLabel}</th>)}<th aria-label="Open block" /></tr></thead><tbody>{blockRows.map((block) => <tr key={block.name}><td><button className="coral-table-drilldown" type="button" onClick={() => setSelectedBlock(block.name)}>{block.name}</button></td><td><strong>{block.total}</strong></td>{roles.map((role) => <td className={selectedRole === role.key ? "is-highlighted" : ""} key={role.key}>{block[role.key]}</td>)}<td><button className="coral-table-next" type="button" onClick={() => setSelectedBlock(block.name)} aria-label={`View workforce in ${block.name}`}><HiChevronRight /></button></td></tr>)}</tbody></table>
            ) : (
              <table><thead><tr><th>District</th><th>Total</th>{roles.map((role) => <th key={role.key}>{role.shortLabel}</th>)}<th aria-label="Open district" /></tr></thead><tbody>{districtData.map((district) => <tr key={district.name}><td><button className="coral-table-drilldown" type="button" onClick={() => openDistrict(district.name)}>{district.name}</button></td><td><strong>{district.total}</strong></td>{roles.map((role) => <td className={selectedRole === role.key ? "is-highlighted" : ""} key={role.key}>{district[role.key]}</td>)}<td><button className="coral-table-next" type="button" onClick={() => openDistrict(district.name)} aria-label={`View blocks in ${district.name}`}><HiChevronRight /></button></td></tr>)}</tbody></table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkersMap;
