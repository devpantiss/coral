import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import {
  HiArrowLeft, HiChevronRight, HiMagnifyingGlass, HiMapPin,
  HiOutlineVideoCamera, HiSun, HiMoon, HiSignal, HiExclamationTriangle,
  HiBolt, HiTruck, HiClock, HiShieldCheck, HiBeaker, HiChevronDown,
  HiChevronUp, HiXMark, HiRss, HiWifi,
} from 'react-icons/hi2';
import { dashcamOperators, STATE_LIST } from '../data/dashcamData';
import CameraFeed from '../components/Dashcam/CameraFeed';
import OperatorMap from '../components/Dashcam/OperatorMap';
import './Dashcam.css';

const STATUS_META = {
  active:  { label: 'Active',  color: '#4ade80' },
  idle:    { label: 'Idle',    color: '#facc15' },
  alert:   { label: 'Alert',   color: '#f87171' },
  offline: { label: 'Offline', color: '#6b7280' },
};

function LiveClock() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="dc-clock">
      <span className="dc-clock__time">
        {time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </span>
      <span className="dc-clock__date">
        {time.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
      </span>
    </div>
  );
}

function TopBar({ operators, theme, setTheme }) {
  const counts = useMemo(() => ({
    active:  operators.filter(o => o.status === 'active').length,
    idle:    operators.filter(o => o.status === 'idle').length,
    alert:   operators.filter(o => o.status === 'alert').length,
    offline: operators.filter(o => o.status === 'offline').length,
    alerts:  operators.reduce((s, o) => s + o.alerts.length, 0),
  }), [operators]);

  return (
    <header className="dc-topbar">
      <div className="dc-topbar__brand">
        <span className="dc-topbar__icon"><HiRss /></span>
        <div>
          <span className="dc-topbar__title">Fleet Tracking</span>
          <span className="dc-topbar__sub">Mining Operations · {STATE_LIST.join(' · ')}</span>
        </div>
      </div>
      <div className="dc-topbar__stats">
        {[
          { key: 'active',  color: '#4ade80', label: 'Active'  },
          { key: 'idle',    color: '#facc15', label: 'Idle'    },
          { key: 'alert',   color: '#f87171', label: 'Alert'   },
          { key: 'offline', color: '#6b7280', label: 'Offline' },
        ].map(s => (
          <div key={s.key} className="dc-stat">
            <span className="dc-stat__dot" style={{ background: s.color }} />
            <strong>{counts[s.key]}</strong>
            <span>{s.label}</span>
          </div>
        ))}
        <div className="dc-stat dc-stat--sep">
          <HiTruck />
          <strong>{operators.length}</strong>
          <span>Operators</span>
        </div>
        <div className="dc-stat">
          <HiMapPin />
          <strong>{STATE_LIST.length}</strong>
          <span>States</span>
        </div>
        {counts.alerts > 0 && (
          <div className="dc-stat dc-stat--alert">
            <HiExclamationTriangle />
            <strong>{counts.alerts}</strong>
            <span>Alerts</span>
          </div>
        )}
      </div>
      <div className="dc-topbar__right">
        <span className="dc-live-badge"><span className="dc-live-dot" />LIVE</span>
        <LiveClock />
        <button className="dc-theme-btn" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">
          {theme === 'dark' ? <HiSun /> : <HiMoon />}
        </button>
      </div>
    </header>
  );
}

function OperatorCard({ operator, selected, onClick }) {
  const meta = STATUS_META[operator.status];
  const initials = operator.name.split(' ').map(p => p[0]).join('');
  const isSelected = selected?.id === operator.id;
  return (
    <li className={`dc-opcard dc-opcard--${operator.status}${isSelected ? ' dc-opcard--active' : ''}`}>
      <button onClick={onClick} aria-pressed={isSelected}>
        <span className="dc-opcard__avatar" style={{ borderColor: meta.color + '66' }}>{initials}</span>
        <span className="dc-opcard__body">
          <span className="dc-opcard__name">{operator.name}</span>
          <span className="dc-opcard__role">{operator.role} · DEVICE-{operator.id}</span>
          <span className="dc-opcard__loc"><HiMapPin />{operator.site}</span>
        </span>
        <span className="dc-opcard__right">
          <span className="dc-status-dot" style={{ background: meta.color }} />
          {operator.speed > 0 && <span className="dc-opcard__speed">{operator.speed}<small>km/h</small></span>}
          <HiChevronRight className="dc-opcard__caret" />
        </span>
      </button>
    </li>
  );
}

function MineGroup({ mine, operators, selected, onSelect }) {
  const [open, setOpen] = useState(true);
  const alertCount = operators.filter(o => o.alerts.length > 0).length;
  return (
    <div className="dc-mine-group">
      <button className="dc-mine-group__header" onClick={() => setOpen(v => !v)}>
        <span className="dc-mine-group__dot" />
        <span className="dc-mine-group__name">{mine}</span>
        <span className="dc-mine-group__count">{operators.length}</span>
        {alertCount > 0 && <span className="dc-mine-group__alert"><HiExclamationTriangle />{alertCount}</span>}
        {open ? <HiChevronUp className="dc-mine-group__caret" /> : <HiChevronDown className="dc-mine-group__caret" />}
      </button>
      {open && (
        <ul className="dc-oplist">
          {operators.map(op => (
            <OperatorCard key={op.id} operator={op} selected={selected} onClick={() => onSelect(op)} />
          ))}
        </ul>
      )}
    </div>
  );
}

function Sidebar({ filtered, all, selected, onSelect, search, setSearch, stateFilter, setStateFilter, statusFilter, setStatusFilter }) {
  const byMine = useMemo(() => {
    const groups = {};
    filtered.forEach(op => {
      if (!groups[op.mine]) groups[op.mine] = { state: op.state, operators: [] };
      groups[op.mine].operators.push(op);
    });
    return groups;
  }, [filtered]);
  const hasFilter = search || stateFilter !== 'all' || statusFilter !== 'all';

  return (
    <aside className="dc-sidebar" aria-label="Operator directory">
      <div className="dc-sidebar__head">
        <div className="dc-sidebar__title">
          <span>Operators</span>
          <span className="dc-sidebar__badge">{all.length}</span>
        </div>
        <label className="dc-search">
          <HiMagnifyingGlass />
          <input type="search" placeholder="Name, device, mine…" value={search} onChange={e => setSearch(e.target.value)} aria-label="Search operators" />
          {search && <button className="dc-search__clear" onClick={() => setSearch('')} aria-label="Clear"><HiXMark /></button>}
        </label>
        <div className="dc-filter-row">
          <select value={stateFilter} onChange={e => setStateFilter(e.target.value)}>
            <option value="all">All states</option>
            {STATE_LIST.map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="all">All statuses</option>
            {['active','idle','alert','offline'].map(s => (
              <option key={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>
        <p className="dc-filter-count" aria-live="polite">
          <span>{filtered.length} of {all.length} operators</span>
          {hasFilter && <button className="dc-clear-btn" onClick={() => { setSearch(''); setStateFilter('all'); setStatusFilter('all'); }}>Clear</button>}
        </p>
      </div>
      <div className="dc-sidebar__list">
        {Object.entries(byMine).length > 0 ? (
          STATE_LIST
            .filter(state => Object.values(byMine).some(g => g.state === state))
            .map(state => (
              <div key={state} className="dc-state-group">
                <div className="dc-state-label"><HiMapPin />{state}</div>
                {Object.entries(byMine)
                  .filter(([, g]) => g.state === state)
                  .map(([mine, g]) => (
                    <MineGroup key={mine} mine={mine} operators={g.operators} selected={selected} onSelect={onSelect} />
                  ))}
              </div>
            ))
        ) : (
          <div className="dc-empty-state">
            <HiMagnifyingGlass />
            <strong>No operators found</strong>
            <p>Try clearing filters.</p>
          </div>
        )}
      </div>
      <div className="dc-sidebar__foot"><HiShieldCheck /><span>Sample data · Not live GPS</span></div>
    </aside>
  );
}

function DetailPanel({ operator, onClose }) {
  const meta = STATUS_META[operator.status];
  const initials = operator.name.split(' ').map(p => p[0]).join('');
  return (
    <aside className="dc-detail" aria-label={`${operator.name} detail`}>
      <div className="dc-detail__head">
        <button className="dc-back-btn" onClick={onClose}>
          <HiArrowLeft /><span>All Operators</span>
        </button>
        <div className="dc-detail__operator">
          <span className="dc-detail__avatar" style={{ borderColor: meta.color + '66' }}>{initials}</span>
          <div className="dc-detail__info">
            <strong>{operator.name}</strong>
            <span>{operator.role}</span>
            <span className="dc-detail__device">DEVICE-{operator.id}</span>
          </div>
          <span className="dc-status-pill" style={{ color: meta.color, borderColor: meta.color + '44', background: meta.color + '14' }}>
            <span className="dc-status-dot" style={{ background: meta.color }} />{meta.label}
          </span>
        </div>
      </div>
      <div className="dc-detail__kpis">
        <div className="dc-kpi-card"><HiBolt /><strong>{operator.speed}</strong><span>km/h</span></div>
        <div className="dc-kpi-card"><HiBeaker /><strong>{operator.fuel}%</strong><span>Fuel</span></div>
        <div className="dc-kpi-card"><HiClock /><strong>{operator.totalHours}</strong><span>Shift hrs</span></div>
        <div className="dc-kpi-card"><HiMapPin /><strong>{operator.heading}</strong><span>Heading</span></div>
      </div>
      <div className="dc-detail__tele">
        <span><HiTruck />{operator.vehicleModel}</span>
        <span><HiSignal />Shift {operator.shift}</span>
        <span><HiWifi />{operator.lastSeen}</span>
      </div>
      {operator.alerts.length > 0 && (
        <div className="dc-detail__alerts">
          {operator.alerts.map(a => (
            <span key={a} className="dc-alert-pill"><HiExclamationTriangle />{a}</span>
          ))}
        </div>
      )}
      <div className="dc-detail__feeds">
        {operator.cameras.map(cam => (
          <CameraFeed key={`${operator.id}-${cam.id}`} camera={cam} operator={operator} />
        ))}
      </div>
      <div className="dc-detail__loc">
        <HiMapPin />
        <div>
          <strong>{operator.mine}</strong>
          <span>{operator.site} · {operator.state}</span>
          <span className="dc-detail__coords">{operator.position[0].toFixed(4)}° N · {operator.position[1].toFixed(4)}° E</span>
        </div>
      </div>
    </aside>
  );
}

export default function Dashcam() {
  const [selected,     setSelected]     = useState(null);
  const [search,       setSearch]       = useState('');
  const [stateFilter,  setStateFilter]  = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [theme,        setTheme]        = useState('dark');

  const filtered = useMemo(() => dashcamOperators.filter(op =>
    (stateFilter === 'all' || op.state === stateFilter) &&
    (statusFilter === 'all' || op.status === statusFilter) &&
    `${op.name} ${op.mine} ${op.site} ${op.vehicle} ${op.id} ${op.role}`
      .toLowerCase().includes(search.toLowerCase())
  ), [search, stateFilter, statusFilter]);

  const selectOperator = useCallback(op => setSelected(op), []);
  const closeOperator  = useCallback(() => setSelected(null), []);

  return (
    <div className="dashcam-page" data-theme={theme}>
      <TopBar operators={dashcamOperators} theme={theme} setTheme={setTheme} />
      <div className="dc-workspace">
        <Sidebar
          filtered={filtered} all={dashcamOperators} selected={selected} onSelect={selectOperator}
          search={search} setSearch={setSearch}
          stateFilter={stateFilter} setStateFilter={setStateFilter}
          statusFilter={statusFilter} setStatusFilter={setStatusFilter}
        />
        <OperatorMap operators={filtered} selected={selected} onSelect={selectOperator} theme={theme} />
        {selected && <DetailPanel operator={selected} onClose={closeOperator} />}
      </div>
    </div>
  );
}
