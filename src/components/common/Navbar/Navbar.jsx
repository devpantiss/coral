import { useState } from "react";
import {
  MdClose,
  MdDashboard,
  MdKeyboardArrowDown,
  MdLocationOn,
  MdNotificationsNone,
  MdSearch,
} from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

const locations = ["Bhubaneswar", "Cuttack", "Khordha", "Puri", "Bhadrak", "Berhampur", "Balasore"];

function Navbar() {
  const [locationOpen, setLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="coral-legacy-navbar">
      <div className="coral-legacy-navbar__title">
        <MdDashboard />
        <div><strong>MoWash Admin</strong><small>Odisha · Sanitation Authority</small></div>
      </div>

      <label className="coral-legacy-navbar__search">
        <MdSearch />
        <input type="search" placeholder="Search districts, services..." />
      </label>

      <div className="coral-legacy-navbar__actions">
        <div className="coral-legacy-popover">
          <button type="button" onClick={() => { setLocationOpen(!locationOpen); setNotificationsOpen(false); setProfileOpen(false); }}><MdLocationOn /><span>{selectedLocation || "Find Nearest"}</span><MdKeyboardArrowDown className={locationOpen ? "is-open" : ""} /></button>
          {locationOpen && <div className="coral-legacy-menu"><small>MoWash Onboarding Centers</small>{locations.map((location) => <button className={selectedLocation === location ? "is-selected" : ""} type="button" key={location} onClick={() => { setSelectedLocation(location); setLocationOpen(false); }}><MdLocationOn />{location}</button>)}</div>}
        </div>

        <div className="coral-legacy-popover">
          <button className="coral-legacy-icon-button" type="button" aria-label="Notifications" onClick={() => { setNotificationsOpen(!notificationsOpen); setLocationOpen(false); setProfileOpen(false); }}><MdNotificationsNone /><i /></button>
          {notificationsOpen && <div className="coral-legacy-menu coral-legacy-menu--notifications"><div><strong>Notifications</strong><MdClose onClick={() => setNotificationsOpen(false)} /></div><p>New project hub added in Puri<small>2m ago</small></p><p>Mining workforce report submitted<small>1h ago</small></p><p>Equipment readiness data updated<small>3h ago</small></p></div>}
        </div>

        <div className="coral-legacy-popover coral-legacy-profile">
          <button className="coral-legacy-profile__button" type="button" onClick={() => { setProfileOpen(!profileOpen); setLocationOpen(false); setNotificationsOpen(false); }}><FaUserCircle /><span><strong>Admin</strong><small>Administrator</small></span><MdKeyboardArrowDown /></button>
          {profileOpen && <div className="coral-legacy-menu coral-legacy-menu--profile"><button type="button">Profile settings</button><button type="button">Sign out</button></div>}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
