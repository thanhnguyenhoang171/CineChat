import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ClientAppHeader from "@/components/client/header.client";
import ClientAppFooter from "@/components/client/footer.client";
const LayoutClient = () => {
  // search function do later
  const currentLocation = useLocation();
  const rootRef = useRef<HTMLDivElement>(null); // trỏ đến div root của 1 page

  // Theo dỏi sự chuyển router để cuộn chuột lên đầu page
  useEffect(() => {
    if (rootRef && rootRef.current) {
      rootRef.current.scrollIntoView({ behavior: "smooth" }); // trỏ đến đầu trang
    }
  }, [currentLocation]);

  return (
    <div className="layout-app h-screen bg-gray-50 dark:bg-black" ref={rootRef}>
      <ClientAppHeader />
      <div className="content-app">
        <Outlet />
      </div>
      <ClientAppFooter />
    </div>
  );
};

export default LayoutClient;
