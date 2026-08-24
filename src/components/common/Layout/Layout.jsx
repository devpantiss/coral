import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

function Layout() {
  return (
    <div className="coral-legacy-layout">
      <Sidebar />
      <div className="coral-legacy-layout__main">
        <Navbar />
        <main className="coral-legacy-layout__content">
          <div className="coral-legacy-layout__glow" />
          <div className="coral-legacy-layout__outlet"><Outlet /></div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
