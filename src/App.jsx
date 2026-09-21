import "./App.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/common/Layout/Layout";
import Dashcam from "./Pages/Dashcam";
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
import TendersPage from "./Pages/TendersPage";
import ContactPage from "./Pages/ContactPage";
import ServiceDetailPage from "./Pages/ServiceDetailPage";
import FleetPage from "./Pages/FleetPage";
import ResourcePage from "./Pages/ResourcePage";
import NewsPage from "./Pages/NewsPage";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
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
          {["reports", "apps"].map(type => <Route key={type} path={`/${type}`} element={<ResourcePage type={type} />} />)}
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/sustainability" element={<SustainabilityPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/tenders" element={<TendersPage key="current" />} />
          <Route path="/tenders/all" element={<TendersPage key="archive" />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services/:serviceSlug" element={<ServiceDetailPage />} />
          <Route path="/fleet" element={<FleetPage />} />
          <Route path="/dashboard/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashcam" element={<Dashcam />} />
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
