import PropTypes from 'prop-types';

// Distinct equipment silhouettes shared by markers, tooltips and the map key.
export default function EquipmentIcon({ type }) {
  return <svg viewBox="0 0 40 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {type === 'dumper' ? <>
      <path d="M3 7h22l-4 12H7L3 7Z" fill="currentColor" fillOpacity=".2" />
      <path d="M24 14h7l5 7v5h-4M24 14v12H15M4 26h3M27 17h3l3 5h-6Z" />
      <circle cx="11" cy="26" r="4" /><circle cx="28" cy="26" r="4" />
    </> : type === 'excavator' ? <>
      <rect x="3" y="24" width="22" height="6" rx="3" />
      <path d="M7 24V13h9l4 6v5M10 13V9h7v10H7M19 17l7-13 8 6 2 11M23 17l5-9 3 4 2 10M30 22h8l-3 5h-6Z" fill="currentColor" fillOpacity=".15" />
      <path d="M8 27h12" />
    </> : <>
      <path d="M4 23V15h7V7h9l4 15M13 15h8M4 18h6M23 19l9 5M24 15l9 7M31 20l2 8h5V17Z" fill="currentColor" fillOpacity=".2" />
      <path d="M14 26h8" /><circle cx="9" cy="25" r="5" /><circle cx="26" cy="25" r="4" />
    </>}
  </svg>;
}
EquipmentIcon.propTypes = { type: PropTypes.oneOf(['dumper', 'excavator', 'loader']).isRequired };
