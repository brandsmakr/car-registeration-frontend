import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Services from "../services";

const DashboardAuth = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (Services.Auth.IsUserLogedIn()) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default DashboardAuth;
