import "./App.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/common/Layout/Layout";
import Dashboard from "./Pages/Dashboard";
import DistrictDashboard from "./Pages/DistrictDashboard";
import MoWashOnboardingCenters from "./Pages/MowashOnboardingCenters";
import MoWashServiceProvidersList from "./Pages/MoWashServiceProvidersList";
import MoWashServicesListing from "./Pages/MoWashServicesListing";
import MoWashDetails from "./Pages/MoWashDetails";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import CapabilitiesPage from "./Pages/CapabilitiesPage";
import ProjectsPage from "./Pages/ProjectsPage";
import SustainabilityPage from "./Pages/SustainabilityPage";
import CareersPage from "./Pages/CareersPage";
import ContactPage from "./Pages/ContactPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/capabilities" element={<CapabilitiesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/sustainability" element={<SustainabilityPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/dashboard/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="page1" element={<DistrictDashboard />} />
            <Route
              path="onboarding-centers"
              element={<MoWashOnboardingCenters />}
            />
            <Route
              path="total-service-providers"
              element={<MoWashServiceProvidersList />}
            />
            <Route path="total-services" element={<MoWashServicesListing />} />
            <Route path="about" element={<MoWashDetails />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
