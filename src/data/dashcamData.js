// ─── Dashcam operator data ───────────────────────────────────────────────────
// Approximate mine-area positions — not surveyed GPS coordinates.
// Replace with your authenticated fleet API data in production.
// Camera URLs must be browser-playable streams.

const MINES = {
  // ── Odisha ──────────────────────────────────────────────────────────────────
  joda:     { mine: 'Joda East Iron Mine',   site: 'Keonjhar, Odisha',           state: 'Odisha',       center: [22.0075, 85.4363] },
  barsua:   { mine: 'Barsua Iron Mine',      site: 'Sundargarh, Odisha',          state: 'Odisha',       center: [21.8713, 85.1470] },
  lingaraj: { mine: 'Lingaraj Coal Mine',    site: 'Angul, Odisha',               state: 'Odisha',       center: [20.9619, 85.1804] },
  // ── Jharkhand ───────────────────────────────────────────────────────────────
  noamundi: { mine: 'Noamundi Iron Mine',    site: 'West Singhbhum, Jharkhand',   state: 'Jharkhand',    center: [22.1450, 85.4900] },
  chiria:   { mine: 'Chiria Iron Mine',      site: 'West Singhbhum, Jharkhand',   state: 'Jharkhand',    center: [22.0820, 85.3400] },
  // ── Chhattisgarh ────────────────────────────────────────────────────────────
  gevra:    { mine: 'Gevra Coal Mine',       site: 'Korba, Chhattisgarh',         state: 'Chhattisgarh', center: [22.3399, 82.5775] },
  dipka:    { mine: 'Dipka Coal Mine',       site: 'Korba, Chhattisgarh',         state: 'Chhattisgarh', center: [22.3800, 82.6200] },
};

const NAMES = [
  'Rajesh Kumar','Suresh Naik','Amit Pradhan','Rakesh Singh','Manoj Sahu',
  'Vikram Jena','Deepak Oraon','Santosh Gond','Ravi Kindo','Prakash Munda',
  'Sanjay Hembram','Dinesh Lakra','Ashok Baiga','Naresh Minj','Gopal Tirkey',
  'Birendra Soren','Mukesh Mahto','Pawan Ekka','Tapas Patra','Hemant Mahali',
  'Sunil Jumar','Arun Bhoi','Govind Nag','Prashant Majhi','Dilip Sunani',
  'Ramesh Lohar','Bimal Tudu','Jagdish Kerketta','Lalit Bodra','Nikhil Besra',
];
const ROLES = ['Dumper operator','Excavator operator','Loader operator','Drilling operator','Blasting supervisor'];
const EQUIP = { 'Dumper operator':'dumper','Excavator operator':'excavator','Loader operator':'loader','Drilling operator':'excavator','Blasting supervisor':'loader' };
const MODELS = {
  dumper:    ['BEML BD155','Tata Prima 4430.S','Ashok Leyland 4825','Komatsu HD785'],
  excavator: ['Komatsu PC750','Hitachi EX1200','JCB JS220','Volvo EC480'],
  loader:    ['Cat 992K','L&T Komatsu WA500','Volvo L180H','Case 921G'],
};
const STATUSES = ['active','active','active','idle','alert','offline'];
const ALERTS_POOL = ['Low fuel','Overspeed detected','Harsh braking','Proximity alert','Engine overheat','Seatbelt off','Camera offline'];

function rnd(min, max) { return min + Math.random() * (max - min); }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// Deterministic seeded position jitter around mine center
function scatter(center, i) {
  const angle = (i * 137.5 * Math.PI) / 180;   // golden-angle spiral
  const radius = 0.008 + (i % 7) * 0.003;
  return [
    +(center[0] + radius * Math.cos(angle)).toFixed(6),
    +(center[1] + radius * Math.sin(angle)).toFixed(6),
  ];
}

let uid = 100;
function makeOperators(mineKey, count) {
  const m = MINES[mineKey];
  return Array.from({ length: count }, (_, i) => {
    const role    = ROLES[i % ROLES.length];
    const equip   = EQUIP[role];
    const model   = pick(MODELS[equip]);
    const status  = STATUSES[i % STATUSES.length];
    const speed   = status === 'active' ? Math.floor(rnd(8, 38)) : 0;
    const fuel    = Math.floor(rnd(28, 99));
    const alerts  = status === 'alert'
      ? [pick(ALERTS_POOL), ...(Math.random() > .6 ? [pick(ALERTS_POOL)] : [])]
      : status === 'offline' ? ['Device offline']
      : fuel < 35 ? ['Low fuel']
      : [];
    const id = String(uid++).padStart(3, '0');
    const name = NAMES[(i + mineKey.length) % NAMES.length];
    const plate = equip === 'dumper'
      ? `${pick(['OD','JH','CG'])} ${String(Math.floor(rnd(1,99))).padStart(2,'0')} ${pick(['AB','CD','EF'])} ${String(Math.floor(rnd(1000,9999)))}`
      : `${equip.toUpperCase().slice(0,2)}-${id}`;

    return {
      id,
      name,
      role,
      equipment: equip,
      vehicleModel: model,
      vehicle: `${equip.charAt(0).toUpperCase() + equip.slice(1)} · ${plate}`,
      ...m,
      position: scatter(m.center, i),
      status,
      speed,
      heading: pick(['N','NE','E','SE','S','SW','W','NW']),
      fuel,
      shift: i % 2 === 0 ? 'Morning' : 'Afternoon',
      shiftStart: i % 2 === 0 ? '06:00' : '14:00',
      alerts: [...new Set(alerts)],
      lastSeen: status === 'offline' ? `${Math.floor(rnd(8,35))} min ago` : status === 'active' ? `${Math.floor(rnd(0,3))} min ago` : 'Just now',
      totalHours: `${Math.floor(rnd(1,9))}h ${Math.floor(rnd(0,59))}m`,
      sample: true,
      cameras: [
        { id: 'front', label: 'Road-facing camera', channel: 'CH 01', url: '/front.mp4' },
        { id: 'cabin', label: 'Cabin camera',        channel: 'CH 02', url: '/cabin.mp4' },
      ],
    };
  });
}

export const dashcamOperators = [
  ...makeOperators('joda',     22),
  ...makeOperators('barsua',   20),
  ...makeOperators('lingaraj', 21),
  ...makeOperators('noamundi', 23),
  ...makeOperators('chiria',   20),
  ...makeOperators('gevra',    24),
  ...makeOperators('dipka',    20),
];

// Group helpers used by the UI
export const MINE_LIST = Object.values(MINES);
export const STATE_LIST = [...new Set(MINE_LIST.map(m => m.state))];
