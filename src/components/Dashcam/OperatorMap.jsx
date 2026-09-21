import { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, Marker, Tooltip, useMap, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import EquipmentIcon from './EquipmentIcon';
import 'leaflet/dist/leaflet.css';

// ─── Animated position hook ───────────────────────────────────────────────────
const TICK_MS = 2200;
const WANDER  = 0.00018;

function useAnimatedPositions(operators) {
  const [positions, setPositions] = useState(() => {
    const m = {};
    operators.forEach(op => { m[op.id] = { lat: op.position[0], lng: op.position[1] }; });
    return m;
  });
  const dirs = useRef({});

  useEffect(() => {
    setPositions(prev => {
      const next = { ...prev };
      operators.forEach(op => {
        if (!next[op.id]) next[op.id] = { lat: op.position[0], lng: op.position[1] };
      });
      return next;
    });
  }, [operators]);

  useEffect(() => {
    const id = setInterval(() => {
      setPositions(prev => {
        const next = { ...prev };
        operators.forEach(op => {
          if (op.status !== 'active') return;
          if (!dirs.current[op.id]) dirs.current[op.id] = Math.random() * Math.PI * 2;
          dirs.current[op.id] += (Math.random() - 0.5) * 0.6;
          const angle  = dirs.current[op.id];
          const speed  = op.speed / 80;
          const drift  = WANDER * (0.5 + speed);
          const origin = op.position;
          const cur    = next[op.id] || { lat: origin[0], lng: origin[1] };
          const newLat = cur.lat + drift * Math.cos(angle);
          const newLng = cur.lng + drift * Math.sin(angle);
          const dLat   = newLat - origin[0];
          const dLng   = newLng - origin[1];
          if (Math.sqrt(dLat * dLat + dLng * dLng) > 0.0028) {
            dirs.current[op.id] += Math.PI + (Math.random() - 0.5) * 0.8;
          }
          next[op.id] = { lat: newLat, lng: newLng };
        });
        return next;
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, [operators]);

  return positions;
}

// ─── Map viewport controller ──────────────────────────────────────────────────
function MapViewport({ operators, selected, revision }) {
  const map = useMap();

  useEffect(() => {
    map.invalidateSize();
    if (selected) {
      map.setView(selected.position, 13, { animate: true, duration: 0.9 });
    } else if (operators.length) {
      map.fitBounds(
        operators.map(op => op.position),
        { padding: [60, 60], maxZoom: 8, animate: true }
      );
    } else {
      // Default: show all 3 states
      map.setView([21.5, 84.5], 6, { animate: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, revision]);

  useEffect(() => {
    const ro = new ResizeObserver(() => map.invalidateSize());
    ro.observe(map.getContainer());
    return () => ro.disconnect();
  }, [map]);

  return null;
}

// ─── GeoJSON state layer ──────────────────────────────────────────────────────
const HIGHLIGHT_STATES = ['Odisha', 'Jharkhand', 'Chhattisgarh'];

function StateLayer({ theme }) {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    fetch('/IndiaStates.geojson')
      .then(r => r.json())
      .then(data => {
        // Filter to only our 3 operational states
        const filtered = {
          ...data,
          features: data.features.filter(f =>
            HIGHLIGHT_STATES.some(s =>
              (f.properties.NAME_1 || f.properties.name || f.properties.ST_NM || '').includes(s)
            )
          ),
        };
        setGeoData(filtered);
      })
      .catch(() => {}); // silently ignore if file not found
  }, []);

  if (!geoData) return null;

  const isDark = theme === 'dark';

  return (
    <GeoJSON
      key={theme}
      data={geoData}
      style={feature => {
        const name = feature.properties.NAME_1 || feature.properties.name || feature.properties.ST_NM || '';
        const isHighlighted = HIGHLIGHT_STATES.some(s => name.includes(s));
        return {
          fillColor:   isHighlighted ? '#ef6a52' : 'transparent',
          fillOpacity: isHighlighted ? (isDark ? 0.08 : 0.06) : 0,
          color:       isHighlighted ? '#ef6a52' : 'transparent',
          weight:      isHighlighted ? 1.5 : 0,
          opacity:     isHighlighted ? 0.5 : 0,
          dashArray:   '6 4',
        };
      }}
      onEachFeature={(feature, layer) => {
        const name = feature.properties.NAME_1 || feature.properties.name || feature.properties.ST_NM || '';
        if (HIGHLIGHT_STATES.some(s => name.includes(s))) {
          layer.bindTooltip(name, {
            permanent: false,
            sticky: true,
            className: 'dc-state-tooltip',
            direction: 'center',
          });
        }
      }}
    />
  );
}

// ─── Animated marker ──────────────────────────────────────────────────────────
function AnimatedMarker({ operator, pos, selected, onSelect }) {
  const markerRef = useRef(null);

  useEffect(() => {
    markerRef.current?.setLatLng([pos.lat, pos.lng]);
  }, [pos]);

  const icon = L.divIcon({
    className: [
      'dashcam-equipment-pin',
      `is-${operator.equipment}`,
      selected ? 'is-selected' : '',
      `is-status-${operator.status}`,
    ].filter(Boolean).join(' '),
    html: renderToStaticMarkup(<EquipmentIcon type={operator.equipment} />),
    iconSize: [36, 36], iconAnchor: [18, 18], tooltipAnchor: [0, -22],
  });

  return (
    <Marker
      ref={markerRef}
      position={[pos.lat, pos.lng]}
      icon={icon}
      title={`${operator.name} · ${operator.role} · ${operator.mine}`}
      alt={`${operator.role} at ${operator.mine}`}
      eventHandlers={{ click: () => onSelect(operator) }}
    >
      <Tooltip direction="top" className="dashcam-equipment-tooltip">
        <div className="dashcam-equipment-tooltip__title">
          <EquipmentIcon type={operator.equipment} />
          <strong>{operator.role}</strong>
        </div>
        <strong>{operator.name} · DEVICE-{operator.id}</strong>
        <span>{operator.mine}</span>
        <span>{operator.site}</span>
        <span style={{ color: operator.status === 'active' ? '#4ade80' : operator.status === 'alert' ? '#f87171' : '#8a9387' }}>
          ● {operator.status.charAt(0).toUpperCase() + operator.status.slice(1)}
          {operator.speed > 0 ? ` · ${operator.speed} km/h` : ''}
        </span>
      </Tooltip>
    </Marker>
  );
}

// ─── Main map component ───────────────────────────────────────────────────────
export default function OperatorMap({ operators, selected, onSelect, theme }) {
  const [revision, setRevision] = useState(0);
  const [tileError, setTileError] = useState(false);
  const positions = useAnimatedPositions(operators);

  const handleReset = useCallback(() => setRevision(v => v + 1), []);

  return (
    <section className="dashcam-map" data-map-theme={theme} aria-label="Operator locations">
      {/* Overlay: mine/region label */}
      <div className="dashcam-map__label">
        <span className="dashcam-dot" />
        <div>
          <strong>{selected ? selected.mine : 'Mine Operations Network'}</strong>
          <small>
            {selected
              ? `${selected.site} · ${selected.state}`
              : `${operators.length} operators · Odisha · Jharkhand · Chhattisgarh`}
          </small>
        </div>
      </div>

      <button className="dashcam-map__reset" onClick={handleReset}>
        {selected ? 'Locate device' : 'Fit all'}
      </button>

      {/* The map — initial zoom 6 to show all 3 states */}
      <MapContainer center={[21.5, 84.5]} zoom={6} scrollWheelZoom minZoom={5} maxZoom={18}>
        <MapViewport operators={operators} selected={selected} revision={revision} />
        <TileLayer
          key={revision}
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          eventHandlers={{ tileerror: () => setTileError(true), tileload: () => setTileError(false) }}
        />
        <StateLayer theme={theme} />
        {operators.map(op => {
          const pos = positions[op.id] ?? { lat: op.position[0], lng: op.position[1] };
          return (
            <AnimatedMarker
              key={op.id}
              operator={op}
              pos={pos}
              selected={selected?.id === op.id}
              onSelect={onSelect}
            />
          );
        })}
      </MapContainer>

      {/* Legend */}
      <div className="dashcam-map__legend" aria-label="Legend">
        {['dumper','excavator','loader'].map(type => (
          <span key={type}><EquipmentIcon type={type} />{type}</span>
        ))}
        <span className="dc-map-legend-sep" />
        <span style={{ color: '#4ade80' }}>● Active</span>
        <span style={{ color: '#facc15' }}>● Idle</span>
        <span style={{ color: '#f87171' }}>● Alert</span>
        <span style={{ color: '#6b7280' }}>● Offline</span>
      </div>

      {/* Status hint */}
      <div className="dashcam-map__hint" role="status">
        {tileError
          ? 'Map tiles unavailable — operator selection still works.'
          : selected
          ? `${selected.position[0].toFixed(4)}° N · ${selected.position[1].toFixed(4)}° E · ${selected.mine}`
          : 'Hover markers for details · Click to open cameras · Highlighted regions = active states'}
      </div>
    </section>
  );
}

OperatorMap.propTypes = {
  operators: PropTypes.array.isRequired,
  selected:  PropTypes.object,
  onSelect:  PropTypes.func.isRequired,
  theme:     PropTypes.string.isRequired,
};
