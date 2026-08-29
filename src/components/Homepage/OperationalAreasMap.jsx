import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { GeoJSON, MapContainer, useMap } from "react-leaflet";
import { HiArrowLeft, HiArrowRight, HiOutlineGlobeAsiaAustralia, HiOutlineMapPin } from "react-icons/hi2";
import "leaflet/dist/leaflet.css";

const operationalStates = [
  {
    name: "Odisha",
    region: "Eastern India",
    districtsFile: "/OdishaDistricts.geojson",
    bounds: [[17.7, 81.3], [22.65, 87.6]],
    districts: ["Angul", "Jajpur", "Kendujhar", "Sundargarh", "Kalahandi", "Jharsuguda", "Kandhamal", "Nuapada"],
    description: "A core part of Coral’s operational footprint and connected mineral logistics network in eastern India.",
  },
  {
    name: "Jharkhand",
    region: "Eastern India",
    districtsFile: "/JharkhandDistricts.geojson",
    bounds: [[21.9, 83.2], [25.4, 87.95]],
    districts: ["Dhanbad", "Bokaro", "Ramgarh", "West Singhbhum"],
    description: "An active operating region within Coral’s eastern India network and resource corridor.",
  },
  {
    name: "Chhattisgarh",
    region: "Central India",
    districtsFile: "/ChhattisgarhDistricts.geojson",
    bounds: [[17.7, 80.2], [24.2, 84.45]],
    districts: ["Korba", "Raigarh", "Dakshin Bastar Dantewada", "Uttar Bastar Kanker"],
    description: "A strategic operating region connecting Coral’s central India footprint with its wider delivery network.",
  },
];

function MapResizeHandler({ overview = false }) {
  const map = useMap();

  useEffect(() => {
    const resizeMap = () => {
      map.invalidateSize({ animate: false });
      if (overview) {
        map.fitBounds([[6.4, 67.5], [37.2, 97.5]], { padding: [12, 12], animate: false });
        if (map.getContainer().clientWidth > 600) map.setZoom(map.getZoom() + 0.25, { animate: false });
      }
    };
    const observer = new ResizeObserver(resizeMap);
    observer.observe(map.getContainer());
    resizeMap();
    return () => observer.disconnect();
  }, [map, overview]);

  return null;
}

MapResizeHandler.propTypes = { overview: PropTypes.bool };

function OperationalAreasMap() {
  const [indiaStates, setIndiaStates] = useState(null);
  const [districtMap, setDistrictMap] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  useEffect(() => {
    let active = true;
    fetch("/IndiaStates.geojson")
      .then((response) => {
        if (!response.ok) throw new Error(`Map request failed with ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (active) setIndiaStates(data);
      })
      .catch((error) => console.error("Unable to load India state map:", error));
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!selectedState) {
      setDistrictMap(null);
      return undefined;
    }

    const controller = new AbortController();
    setDistrictMap(null);
    fetch(selectedState.districtsFile, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`District map request failed with ${response.status}`);
        return response.json();
      })
      .then(setDistrictMap)
      .catch((error) => {
        if (error.name !== "AbortError") console.error(`Unable to load ${selectedState.name} district map:`, error);
      });
    return () => controller.abort();
  }, [selectedState]);

  const openState = (state) => {
    setSelectedState(state);
    setSelectedDistrict(null);
  };

  const returnToIndia = () => {
    setSelectedState(null);
    setSelectedDistrict(null);
  };

  const getOperationalState = (name) => operationalStates.find((state) => state.name === name);

  const stateStyle = (feature) => {
    const isOperational = Boolean(getOperationalState(feature.properties.ST_NM));
    return {
      color: isOperational ? "#f3a091" : "#151714",
      fillColor: isOperational ? "#ef6a52" : "#343731",
      fillOpacity: isOperational ? 0.98 : 0.58,
      opacity: 1,
      weight: isOperational ? 2.2 : 1,
    };
  };

  const bindState = (feature, layer) => {
    const name = feature.properties.ST_NM;
    const operationalState = getOperationalState(name);
    layer.bindTooltip(operationalState ? `${name} · View operational districts` : name, {
      direction: "auto",
      className: "coral-operation-tooltip",
      sticky: true,
    });
    if (!operationalState) return;
    layer.on({
      click: () => openState(operationalState),
      mouseover: () => layer.setStyle({ fillColor: "#ff8a72", fillOpacity: 1, weight: 3, color: "#ffe0da" }),
      mouseout: () => layer.setStyle(stateStyle(feature)),
    });
  };

  const districtStyle = (feature) => {
    const name = feature.properties.district;
    const isOperational = selectedState?.districts.includes(name);
    const isSelected = selectedDistrict === name;
    return {
      color: isSelected ? "#ffffff" : isOperational ? "#ffd2c9" : "#171916",
      fillColor: isSelected ? "#ff9b87" : isOperational ? "#d94f37" : "#3a3d37",
      fillOpacity: isSelected ? 1 : isOperational ? 0.94 : 0.62,
      opacity: 1,
      weight: isSelected ? 3 : isOperational ? 1.8 : 1,
    };
  };

  const bindDistrict = (feature, layer) => {
    const name = feature.properties.district;
    const isOperational = selectedState.districts.includes(name);
    layer.bindTooltip(isOperational ? `${name} · Operational district` : name, {
      direction: "auto",
      className: "coral-operation-tooltip",
      sticky: true,
    });
    if (!isOperational) return;
    layer.on({
      click: () => setSelectedDistrict(name),
      mouseover: () => layer.setStyle({ fillColor: "#ff8a72", fillOpacity: 1, weight: 2.6, color: "#ffffff" }),
      mouseout: () => layer.setStyle(districtStyle(feature)),
    });
  };

  const isDistrictView = Boolean(selectedState);

  return (
    <section className="coral-operations" id="operational-areas" aria-labelledby="operational-areas-title">
      <div className="coral-shell">
        <div className="coral-operations__heading">
          <div>
            <p className="coral-eyebrow"><span /> Our footprint</p>
            <h2 id="operational-areas-title">Operational areas.</h2>
          </div>
          <p>Select an operational state to explore district-level coverage across Coral’s eastern and central India network.</p>
        </div>

        <div className="coral-operations__layout">
          <div className={`coral-operations__map ${isDistrictView ? "is-district-view" : "is-india-view"}`} aria-label={isDistrictView ? `District map of ${selectedState.name}` : "Interactive India map showing Coral operational states"}>
            <div className="coral-operations__map-label">
              <span>{isDistrictView ? "District operations" : "India operations"}</span>
              <strong>{isDistrictView ? selectedState.name : "Select a highlighted state"}</strong>
            </div>

            {isDistrictView && (
              <button className="coral-operations__back" type="button" onClick={returnToIndia}>
                <HiArrowLeft aria-hidden="true" /> India overview
              </button>
            )}

            {isDistrictView ? (
              <MapContainer
                key={selectedState.name}
                bounds={selectedState.bounds}
                boundsOptions={{ padding: [22, 22] }}
                scrollWheelZoom={false}
                zoomControl={false}
                attributionControl={false}
                minZoom={5}
                maxZoom={9}
              >
                <MapResizeHandler />
                {districtMap && (
                  <GeoJSON
                    key={`${selectedState.name}-${selectedDistrict || "all"}`}
                    data={districtMap}
                    style={districtStyle}
                    onEachFeature={bindDistrict}
                  />
                )}
              </MapContainer>
            ) : (
              <MapContainer
                center={[22, 82.5]}
                zoom={4}
                zoomSnap={0.25}
                zoomDelta={0.5}
                scrollWheelZoom={false}
                zoomControl={false}
                attributionControl={false}
                minZoom={3}
                maxZoom={7}
              >
                <MapResizeHandler overview />
                {indiaStates && <GeoJSON data={indiaStates} style={stateStyle} onEachFeature={bindState} />}
              </MapContainer>
            )}

            <div className="coral-operations__legend" aria-hidden="true">
              <span><i /> {isDistrictView ? "Operational district" : "Operational state"}</span>
              <span><i /> {isDistrictView ? "Other district" : "Other state"}</span>
            </div>
          </div>

          <aside className="coral-operations__panel" aria-live="polite">
            <div className="coral-operations__panel-top">
              <span>{isDistrictView ? "Selected state" : "Operational footprint"}</span>
              <HiOutlineMapPin aria-hidden="true" />
            </div>
            <h3>{isDistrictView ? selectedState.name : "Three-state network"}</h3>
            <p>{isDistrictView ? selectedState.description : "Choose a highlighted state on the map to reveal its district-level operational footprint."}</p>

            <div className="coral-operations__metric">
              <HiOutlineGlobeAsiaAustralia aria-hidden="true" />
              <div>
                <strong>{isDistrictView ? selectedState.districts.length : operationalStates.length}</strong>
                <span>{isDistrictView ? "Operational districts" : "Operational states"}</span>
              </div>
            </div>

            {isDistrictView && (
              <div className="coral-operations__districts">
                <span>Operational districts</span>
                <div>
                  {selectedState.districts.map((district) => (
                    <button
                      className={selectedDistrict === district ? "is-active" : ""}
                      type="button"
                      onClick={() => setSelectedDistrict(district)}
                      aria-pressed={selectedDistrict === district}
                      key={district}
                    >
                      <i aria-hidden="true" />
                      {district}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="coral-operations__locations" aria-label="Choose an operational state">
              {operationalStates.map((state) => (
                <button
                  className={selectedState?.name === state.name ? "is-active" : ""}
                  type="button"
                  onClick={() => openState(state)}
                  aria-pressed={selectedState?.name === state.name}
                  key={state.name}
                >
                  <span><b>{state.name}</b><small>{state.region}</small></span>
                  <HiArrowRight aria-hidden="true" />
                </button>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default OperationalAreasMap;
