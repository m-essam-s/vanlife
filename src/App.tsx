import "./server";
import './App.css';

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";

import Vans from "./pages/Vans/Vans";
import VanDetail from "./pages/Vans/VanDetail";

import HostLayout from "./components/HostLayout";
import Dashboard from "./pages/Host/Dashboard";
import Income from "./pages/Host/Income";
import Reviews from "./pages/Host/Reviews";
import HostVans, { loader as hostVansLoader } from "./pages/Host/HostVans";
import HostVanDetail, { loader as hostVanDetailLoader } from "./pages/Host/HostVanDetail";
import HostVanInfo from "./pages/Host/HostVanInfo";
import HostVanPricing from "./pages/Host/HostVanPricing";
import HostVanPhotos from "./pages/Host/HostVanPhotos";

import NotFound from "./pages/NotFound";
import Login from "./Login";
import AuthRequired from "./components/AuthRequired";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="login" element={<Login />} />
    <Route path="vans" element={<Vans />} />
    <Route path="vans/:id" element={<VanDetail />} />

    <Route element={<AuthRequired />}>
      <Route path="host" element={<HostLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="income" element={<Income />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="vans" element={<HostVans />} loader={hostVansLoader} />
        <Route path="vans/:id" element={<HostVanDetail />} loader={hostVanDetailLoader} >
          <Route index element={<HostVanInfo />} />
          <Route path="pricing" element={<HostVanPricing />} />
          <Route path="photos" element={<HostVanPhotos />} />
        </Route>
      </Route>
    </Route>

    <Route path="*" element={<NotFound />} />
  </Route>
));

const App: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;