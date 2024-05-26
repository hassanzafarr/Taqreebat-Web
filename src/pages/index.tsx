import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import HomePage from "./home";
import VendorPackages from "./vendorPackages";
import VendorProfile from "./vendorProfile";
import LandingPage from "./landingPage";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div style={{ backgroundColor: "#0000" }}>
      <LandingPage />
    </div>
  );
}
