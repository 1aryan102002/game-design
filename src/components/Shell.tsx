import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);
  return null;
}

export default function Shell() {
  return (
    <div className="min-h-dvh">
      <ScrollToTop />
      <NavBar />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

