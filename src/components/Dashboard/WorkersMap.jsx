import { useEffect, useMemo, useState } from "react";
import { GeoJSON, MapContainer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaBolt, FaFire, FaHardHat, FaTractor, FaTruck, FaWrench } from "react-icons/fa";
import { HiArrowLeft, HiChevronRight } from "react-icons/hi2";
import { districtBlocks, getBlockSummaries, getBlockWorkforce, workforceDistricts, workforceRoles } from "../../data/workforceData";

const roleIcons = {
  dumper: FaTruck,
  excavator: FaTractor,
  loader: FaHardHat,
  mechanic: FaWrench,
  electrician: FaBolt,
  welder: FaFire,
};
const roles = workforceRoles.map((role) => ({ ...role, icon: roleIcons[role.key] }));
const districtData = workforceDistricts;

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

function MapResizeHandler() {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();
    let resizeTimer;
    const observer = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => map.invalidateSize({ animate: false, pan: false }), 80);
    });
    observer.observe(container);
    return () => {
      window.clearTimeout(resizeTimer);
      observer.disconnect();
    };
  }, [map]);

  return null;
}

function WorkersMap() {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [selectedRole, setSelectedRole] = useState("total");
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedBlock, setSelectedBlock] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetch("/Orissa.geojson").then((response) => response.json()).then((data) => { if (mounted) setGeoJsonData(data); }).catch((error) => console.error("Unable to load district map:", error));
    return () => { mounted = false; };
  }, []);

  const totalWorkforce = useMemo(() => districtData.reduce((sum, district) => sum + district.total, 0), []);
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
  const selectedBlockIndex = selectedDistrict ? districtBlocks[selectedDistrict].indexOf(selectedBlock) : -1;
  const workforceRecords = selectedDistrictData && selectedBlockIndex >= 0 ? getBlockWorkforce(selectedDistrictData, selectedBlock).filter((record) => selectedRole === "total" || record.roleKey === selectedRole) : [];

  const mapStyle = (feature) => {
    const value = districtValue(feature.properties.Dist_Name);
    const fillColor = value === 0 ? "#4b4d47" : value < 25 ? "#f5b19f" : value < 60 ? "#ed7259" : "#b94330";
    return { fillColor, weight: 1, opacity: 1, color: "#f5f1e8", fillOpacity: value === 0 ? 0.32 : 0.82 };
  };

  const bindDistrict = (feature, layer) => {
    const name = feature.properties.Dist_Name;
    layer.bindTooltip(`${name}: ${districtValue(name)}`, { direction: "auto", className: "district-tooltip" });
    layer.on({
      mouseover: () => setHoveredDistrict(name),
      mouseout: () => setHoveredDistrict(null),
      click: () => {
        if (districtData.some((district) => district.name === name)) {
          setSelectedDistrict(name);
          setSelectedBlock(null);
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
      <div className="coral-role-map__tabs" role="tablist" aria-label="Filter workforce by job role">
        <button type="button" className={selectedRole === "total" ? "is-active" : ""} onClick={() => setSelectedRole("total")}><FaHardHat /><span>All roles</span></button>
        {roles.map((role) => { const Icon = role.icon; return <button type="button" className={selectedRole === role.key ? "is-active" : ""} onClick={() => setSelectedRole(role.key)} key={role.key}><Icon /><span>{role.shortLabel}</span></button>; })}
      </div>

      <div className="coral-role-map__body">
        <div className="coral-role-map__visual">
          <div className="coral-role-map__summary"><span>{hovered?.name || "Odisha workforce"}</span><strong>{hovered ? (selectedRole === "total" ? hovered.total : hovered[selectedRole]) : selectedTotal}</strong><small>{activeLabel}</small></div>
          <MapContainer bounds={[[17.78,81.337],[22.57,87.53]]} boundsOptions={{ padding: [8, 8] }} zoomSnap={0.1} scrollWheelZoom={false} dragging={false} zoomControl={false} doubleClickZoom={false} touchZoom={false} keyboard={false} boxZoom={false}>
            <MapResizeHandler />
            {geoJsonData && <><GeoJSON key={selectedRole} data={geoJsonData} style={mapStyle} onEachFeature={bindDistrict} />{geoJsonData.features.map((feature) => { const name = feature.properties.Dist_Name; const value = districtValue(name); const center = geometryCenter(feature.geometry); if (!center || value === 0) return null; return <Marker key={`${name}-${selectedRole}`} position={center} icon={L.divIcon({ className: "coral-role-marker", html: `<span>${value}</span>`, iconSize: [30,22] })} />; })}</>}
          </MapContainer>
          <div className="coral-role-map__legend"><span><i className="is-low" />1–24</span><span><i className="is-medium" />25–59</span><span><i className="is-high" />60+</span></div>
        </div>

        <div className="coral-role-map__table">
          <div className="coral-role-map__table-title">
            <div className="coral-role-map__table-heading">
              {(selectedDistrict || selectedBlock) && <button type="button" onClick={goBack} aria-label={selectedBlock ? "Back to blocks" : "Back to districts"}><HiArrowLeft /> Back</button>}
              <div>
                <span>{selectedBlock ? "Workforce records" : selectedDistrict ? "Block register" : "Workforce register"}</span>
                <strong>{selectedBlock ? selectedBlock : selectedDistrict ? `Blocks in ${selectedDistrict}` : "Mining roles by district"}</strong>
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
              <table><thead><tr><th>District</th><th>Total</th>{roles.map((role) => <th key={role.key}>{role.shortLabel}</th>)}<th aria-label="Open district" /></tr></thead><tbody>{districtData.map((district) => <tr key={district.name}><td><button className="coral-table-drilldown" type="button" onClick={() => { setSelectedDistrict(district.name); setSelectedBlock(null); }}>{district.name}</button></td><td><strong>{district.total}</strong></td>{roles.map((role) => <td className={selectedRole === role.key ? "is-highlighted" : ""} key={role.key}>{district[role.key]}</td>)}<td><button className="coral-table-next" type="button" onClick={() => { setSelectedDistrict(district.name); setSelectedBlock(null); }} aria-label={`View blocks in ${district.name}`}><HiChevronRight /></button></td></tr>)}</tbody></table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkersMap;
