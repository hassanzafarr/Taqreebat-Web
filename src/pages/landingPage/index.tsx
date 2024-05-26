import React from "react";
import HOWWORKS from "@/components/howworks/howworks";
import HomePage from "../home";
import ServiceCategories from "../serviceCategories";
import VendorCard from "@/components/vendorCard";
import ClientSay from "@/components/clientsay/clientsay";
import FeaturedSection from "@/components/featuredSection";

function LandingPage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <HomePage />
      <ServiceCategories />
      <HOWWORKS htag="How it works" />
      <FeaturedSection />
      <ClientSay htag="What our client says" />
    </div>
  );
}

export default LandingPage;
