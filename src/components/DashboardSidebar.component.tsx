import React, { useState, useRef, useEffect } from "react";
import logo from "../logo.svg";
import {
  Link,
  NavLink,
  useFetcher,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Button, ThemeProvider, IconButton } from "@mui/material";
import Utils from "../utils";
import Logo from "../logo.svg";

const DashboardSidebar = ({ showSidebar, setShowSidebar }: any) => {
  const sideRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenuBar, setOpenMenuBar] = useState({
    user: false,
    product: false,
  });
  const [toggleNavWidth, setToggleNavWidth] = useState<boolean>(false);

  return (
    <>
      <aside
        className={`${
          toggleNavWidth ? "" : "w-56 sm:w-72 md:w-72 lg:w-96"
        }   min-h-screen absolute	lg:relative bg-white z-50 ${
          showSidebar ? "block" : "hidden lg:block"
        } `}
        ref={sideRef}
      >
        {/* 
            sidebar toggle btn
        */}
        <div className="rounded-full border-2 border-dotted	 p-0 m-0 shadow-sm   absolute top-[30px] z-50 right-[-16px] bg-white hidden lg:block">
          {/* <ThemeProvider theme={Utils.Theme.ButtonTheme}> */}
          <Button
            variant="text"
            color="inherit"
            sx={{
              minWidth: "fit-content",
              paddingX: "9px",
              borderRadius: "100%",
              transform: `rotate(${toggleNavWidth ? 0 : 180}deg)`,
            }}
            onClick={() => {
              setToggleNavWidth(!toggleNavWidth);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 320 512"
              stroke="currentColor"
            >
              <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
            </svg>
          </Button>
          {/* </ThemeProvider> */}
        </div>
        <div className="  absolute top-[10px] z-50 right-[10px] lg:hidden">
          <Button
            variant="text"
            color="inherit"
            sx={{
              minWidth: "fit-content",
            }}
            onClick={() => {
              setShowSidebar(!showSidebar);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
          </Button>
        </div>
        {/* 
            sidebar menus
        */}
        <div
          className={`border-r-2 border-dotted z-40 scroll-smooth overflowScrollY hover:overflow-y-auto h-full `}
        >
          <div
            className={`px-3 py-8 flex flex-col ${
              toggleNavWidth ? "gap-1 px-1" : "gap-3  sm:px-5"
            }`}
          >
            <div
              className={`flex items-center ${
                toggleNavWidth ? "justify-center " : "justify-start "
              }`}
            >
              <Link
                to="/dashboard"
                className={`flex title-font font-medium items-center  md:mb-0 gap-1 ${
                  toggleNavWidth ? "flex-col" : "flex-row"
                }`}
              >
                <div className="bg-[var(--main-color)] text-white rounded-full border shadow-sm hover:shadow-md  fill-white w-full h-full p-1">
                  <img src={Logo} className="w-10 h-10" />
                </div>
                <h1 className="font-bold text-lg sm:text-3xl mytextShadow">
                  CRS
                </h1>
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className={` text-white p-2 bgColor rounded-full shadow-sm ${
                    toggleNavWidth ? "w-8 h-8" : "w-10 h-10"
                  }`}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                <span
                  className={`ml-1 sm:ml-3  capitalize ${
                    toggleNavWidth ? "text-sm" : "text-xl"
                  }`}
                >
                  cars&bids
                </span> */}
              </Link>
            </div>
            <div className="text-[var(--dashboard-gray-color)]">
              <p
                className={`font-semibold uppercase ${
                  toggleNavWidth ? "text-xs text-center hidden" : "text-sm"
                }`}
              >
                overview
              </p>
              <div
                className={`flex flex-col gap-2 ${
                  toggleNavWidth ? "py-1" : "py-2"
                }`}
              >
                <ThemeProvider
                  theme={
                    location.pathname === "/dashboard"
                      ? Utils.Theme.MenuActiveButtonTheme
                      : Utils.Theme.MenuButtonTheme
                  }
                >
                  <Button
                    variant={
                      location.pathname === "/dashboard" ? "contained" : "text"
                    }
                    fullWidth
                    sx={{
                      boxShadow: "none",
                      paddingY: toggleNavWidth ? "8px" : "10px",
                      paddingX: toggleNavWidth ? "4px" : "12px",
                    }}
                    onClick={() => navigate("/dashboard")}
                  >
                    <div
                      className={`flex  justify-start items-center w-full ${
                        location.pathname === "/dashboard"
                          ? ""
                          : "text-[var(--dashboard-gray-color)]"
                      }  transition-colors duration-75	delay-0 ease-in-out ${
                        toggleNavWidth ? "flex-col" : "flex-row gap-5"
                      }`}
                    >
                      <div className="w-6 h-6">
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            opacity="0.32"
                            d="M21.1808 16.9703C20.8971 17.6255 20.2225 18 19.5086 18H14.8154C14.8462 17.9145 14.8735 17.8269 14.8971 17.7373C15.1709 16.6974 14.8825 15.639 14.2214 14.8963C14.4654 12.9091 14.6177 10.8733 14.7108 9.26516C14.7569 8.46731 13.7795 8.20081 13.4274 8.91526C12.7178 10.3553 11.8493 12.1958 11.0842 14.041C10.1467 14.3479 9.3768 15.1177 9.10295 16.1576C8.93642 16.7899 8.97782 17.4291 9.18451 18H4.49141C3.77747 18 3.10288 17.6255 2.81918 16.9703C2.29212 15.7533 2 14.4108 2 13C2 7.47715 6.47715 3 12 3C17.5229 3 22 7.47715 22 13C22 14.4108 21.7079 15.7533 21.1808 16.9703Z"
                          />
                          <path d="M14.7108 9.26516C14.7569 8.46731 13.7795 8.20081 13.4274 8.91526C12.7178 10.3553 11.8493 12.1958 11.0842 14.041C10.1467 14.3479 9.3768 15.1177 9.10295 16.1576C8.6742 17.7856 9.62375 19.459 11.2238 19.8953C12.8238 20.3315 14.4684 19.3654 14.8971 17.7373C15.1709 16.6974 14.8825 15.639 14.2214 14.8963C14.4654 12.9091 14.6177 10.8733 14.7108 9.26516Z" />
                        </svg>
                      </div>
                      <p className={toggleNavWidth ? "text-xs" : "text-sm"}>
                        Dashboard
                      </p>
                    </div>
                  </Button>
                </ThemeProvider>
                <ThemeProvider
                  theme={
                    location.pathname === "/categories"
                      ? Utils.Theme.MenuActiveButtonTheme
                      : Utils.Theme.MenuButtonTheme
                  }
                >
                  <Button
                    variant={
                      location.pathname === "/categories" ? "contained" : "text"
                    }
                    fullWidth
                    sx={{
                      boxShadow: "none",
                      paddingY: toggleNavWidth ? "8px" : "10px",
                      paddingX: toggleNavWidth ? "4px" : "12px",
                    }}
                    onClick={() => navigate("/categories")}
                  >
                    <div
                      className={`flex  justify-start items-center w-full transition-colors duration-75	delay-0 ease-in-out ${
                        location.pathname === "/categories"
                          ? ""
                          : "text-[var(--dashboard-gray-color)]"
                      }  ${toggleNavWidth ? "flex-col" : "flex-row gap-5"}`}
                    >
                      <div className="w-6 h-6">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          viewBox="0 0 512 512"
                          fill="currentColor"
                          className=" m-auto"
                        >
                          <path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z" />
                        </svg>
                      </div>
                      <p className={toggleNavWidth ? "text-xs" : "text-sm"}>
                        Categories
                      </p>
                    </div>
                  </Button>
                </ThemeProvider>
                <ThemeProvider
                  theme={
                    location.pathname === "/cars"
                      ? Utils.Theme.MenuActiveButtonTheme
                      : Utils.Theme.MenuButtonTheme
                  }
                >
                  <Button
                    variant={
                      location.pathname === "/cars" ? "contained" : "text"
                    }
                    fullWidth
                    sx={{
                      boxShadow: "none",
                      paddingY: toggleNavWidth ? "8px" : "10px",
                      paddingX: toggleNavWidth ? "4px" : "12px",
                    }}
                    onClick={() => navigate("/cars")}
                  >
                    <div
                      className={`flex  justify-start items-center w-full transition-colors duration-75	delay-0 ease-in-out ${
                        location.pathname === "/cars"
                          ? ""
                          : "text-[var(--dashboard-gray-color)]"
                      }  ${toggleNavWidth ? "flex-col" : "flex-row gap-5"}`}
                    >
                      <div className="w-6 h-6">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          fill="currentColor"
                          className=" m-auto"
                          viewBox="0 0 512 512"
                        >
                          <path d="M135.2 117.4L109.1 192H402.9l-26.1-74.6C372.3 104.6 360.2 96 346.6 96H165.4c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32H346.6c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2V400v48c0 17.7-14.3 32-32 32H448c-17.7 0-32-14.3-32-32V400H96v48c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V400 256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
                        </svg>
                      </div>
                      <p className={toggleNavWidth ? "text-xs" : "text-sm"}>
                        Cars
                      </p>
                    </div>
                  </Button>
                </ThemeProvider>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
