import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { DashboardSidebar, DashboardNav } from "../components";
import Services from "../services";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState<boolean>(false);


  useEffect(() => {
    !Services.Auth.IsUserLogedIn() && navigate('/');
  }, []);

  return (
    <>
      <div className="flex ">
        <DashboardSidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
        <div className="w-full">
          <DashboardNav
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
          />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
