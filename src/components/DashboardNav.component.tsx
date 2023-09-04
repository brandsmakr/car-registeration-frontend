import React, { useEffect, useRef, useState } from "react";
import { MouseEvent } from "react";
import { Avatar, Badge, ThemeProvider } from "@mui/material";
import Utils from "../utils";
import { yellow } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { Images } from "../assets";
import { IconButton } from "@mui/material";
import Services from "../services";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

type Boolean = boolean;

const DashboardNav = ({ showSidebar, setShowSidebar }: any) => {
  const notifyRef = useRef<HTMLDivElement>(null);
  const notifyMessageRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLUListElement>(null);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);

  useEffect(() => {
    document.addEventListener("click", (e: any) => {
      const cur = notifyRef.current;
      const node = e && e.target;
      const curMessage = notifyMessageRef.current;
      if (node && cur && cur.contains(node)) {
        setShowNotifications(!showNotifications);
      } else if (node && curMessage && curMessage.contains(node)) {
        setShowNotifications(true);
      } else {
        setShowNotifications(false);
      }
    });
  }, [showNotifications]);

  useEffect(() => {
    document.addEventListener("click", (e: any) => {
      const curProf = profileRef.current;
      const eNode = e && e.target;
      const curMenu = profileMenuRef.current;
      if (eNode && curProf && curProf.contains(eNode)) {
        setShowProfile(!showNotifications);
      } else if (eNode && curMenu && curMenu.contains(eNode)) {
        setShowProfile(true);
      } else {
        setShowProfile(false);
      }
    });
  }, [showProfile]);

  return (
    <>
      <div className="flex gap-1 sm:gap-3 h-14 px-2 sm:px-6 md:px-12 py-3 justify-between items-center border w-full text-[var(--dashboard-gray-color)]">
        {/* left side */}
        <div className="flex gap-1 sm:gap-3 justify-between items-center align-middle ">
          <div className="lg:hidden ">
            <IconButton
              onClick={() => setShowSidebar(!showSidebar)}
              className=""
              id="openSideNavToggler"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 cursor-pointer"
              >
                <path
                  opacity="0.65"
                  d="M15.2798 4.5H4.7202C3.77169 4.5 3 5.06057 3 5.75042C3 6.43943 3.77169 7 4.7202 7H15.2798C16.2283 7 17 6.43943 17 5.75042C17 5.06054 16.2283 4.5 15.2798 4.5Z"
                />
                <path d="M19.2798 10.75H8.7202C7.77169 10.75 7 11.3106 7 12.0004C7 12.6894 7.77169 13.25 8.7202 13.25H19.2798C20.2283 13.25 21 12.6894 21 12.0004C21 11.3105 20.2283 10.75 19.2798 10.75Z" />
                <path d="M15.2798 17H4.7202C3.77169 17 3 17.5606 3 18.2504C3 18.9394 3.77169 19.5 4.7202 19.5H15.2798C16.2283 19.5 17 18.9394 17 18.2504C17 17.5606 16.2283 17 15.2798 17Z" />
              </svg>
            </IconButton>
          </div>
          <IconButton>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
          </IconButton>
          <span className="bg-[var(--light-gray-color)] py-0.5 px-1.5 text-sm	border shadow-sm rounded font-medium 	">
            ⌘K
          </span>
        </div>
        {/* right side */}
        <div className="flex justify-center items-center gap-1 sm:gap-3">
          <div className="sm:p-0.5 ">
            <IconButton>
              <Badge
                className="cursor-pointer"
                overlap="circular"
                classes={{ badge: "notificationBadge" }}
                badgeContent={8}
                max={9}
                ref={notifyRef}
              >
                <div className="p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    className="w-[24px] h-[24px]"
                    viewBox="0 0 24 24"
                  >
                    <g fill="currentColor">
                      <path
                        d="M18.75 9v.704c0 .845.24 1.671.692 2.374l1.108 1.723c1.011 1.574.239 3.713-1.52 4.21a25.794 25.794 0 0 1-14.06 0c-1.759-.497-2.531-2.636-1.52-4.21l1.108-1.723a4.393 4.393 0 0 0 .693-2.374V9c0-3.866 3.022-7 6.749-7s6.75 3.134 6.75 7Z"
                        opacity=".5"
                      />
                      <path d="M12.75 6a.75.75 0 0 0-1.5 0v4a.75.75 0 0 0 1.5 0V6ZM7.243 18.545a5.002 5.002 0 0 0 9.513 0c-3.145.59-6.367.59-9.513 0Z" />
                    </g>
                  </svg>
                </div>
              </Badge>
            </IconButton>
            <div
              className={`notificaton-modal-2 top-[50px] z-[999] ${
                showNotifications ? "block" : "hidden"
              }`}
              ref={notifyMessageRef}
            >
              {/* modal header */}
              <div className="notify-header">
                <div className="notify-title">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                  <p>Notifications</p> <span>(0)</span>
                </div>
                <div className="notify-setting ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
                  </svg>
                </div>
              </div>
              {/* modal body */}
              <div className="notify-body">
                <div className="main-content">
                  <div className="content-item active">
                    <span className="badge">19</span>
                    <div className="item-desc">
                      <h6 className="item-title">
                        New comments on the{" "}
                        <span className="font-semibold">
                          {" "}
                          BMW M3 Coupe ckkj dkfjdk fkdj fd
                        </span>
                      </h6>
                      <p className="item-ago">14 hours ago</p>
                    </div>
                  </div>
                  <div className="content-item">
                    <span className="badge">19</span>
                    <div className="item-desc">
                      <h6 className="item-title">
                        New bid on the{" "}
                        <span className="font-semibold">
                          {" "}
                          BMW M3 Coupe ckkj dkfjdk fkdj fd
                        </span>
                      </h6>
                      <p className="item-ago">14 hours ago</p>
                    </div>
                  </div>
                  <div className="content-item">
                    <span className="badge">19</span>
                    <div className="item-desc">
                      <h6 className="item-title">
                        New comment on the{" "}
                        <span className="font-semibold">
                          {" "}
                          BMW M3 Coupe ckkj dkfjdk fkdj fd
                        </span>
                      </h6>
                      <p className="item-ago">14 hours ago</p>
                    </div>
                  </div>
                  <div className="content-item">
                    <span className="badge">19</span>
                    <div className="item-desc">
                      <h6 className="item-title">
                        Reserve not met on{" "}
                        <span className="font-semibold">
                          {" "}
                          BMW M3 Coupe ckkj dkfjdk fkdj fd
                        </span>
                      </h6>
                      <p className="item-ago">14 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <IconButton>
              <Badge
                overlap="circular"
                badgeContent=" "
                variant="dot"
                classes={{ badge: "settingBadge" }}
              >
                <div className="p-1 cusor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    className="h-[24px] w-[24px]  ease-in-out animatation-spiner"
                    viewBox="0 0 24 24"
                  >
                    <g fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M14.279 2.152C13.909 2 13.439 2 12.5 2s-1.409 0-1.779.152a2.008 2.008 0 0 0-1.09 1.083c-.094.223-.13.484-.145.863a1.615 1.615 0 0 1-.796 1.353a1.64 1.64 0 0 1-1.579.008c-.338-.178-.583-.276-.825-.308a2.026 2.026 0 0 0-1.49.396c-.318.242-.553.646-1.022 1.453c-.47.807-.704 1.21-.757 1.605c-.07.526.074 1.058.4 1.479c.148.192.357.353.68.555c.477.297.783.803.783 1.361c0 .558-.306 1.064-.782 1.36c-.324.203-.533.364-.682.556a1.99 1.99 0 0 0-.399 1.479c.053.394.287.798.757 1.605c.47.807.704 1.21 1.022 1.453c.424.323.96.465 1.49.396c.242-.032.487-.13.825-.308a1.64 1.64 0 0 1 1.58.008c.486.28.774.795.795 1.353c.015.38.051.64.145.863c.204.49.596.88 1.09 1.083c.37.152.84.152 1.779.152s1.409 0 1.779-.152a2.008 2.008 0 0 0 1.09-1.083c.094-.223.13-.483.145-.863c.02-.558.309-1.074.796-1.353a1.64 1.64 0 0 1 1.579-.008c.338.178.583.276.825.308c.53.07 1.066-.073 1.49-.396c.318-.242.553-.646 1.022-1.453c.47-.807.704-1.21.757-1.605a1.99 1.99 0 0 0-.4-1.479c-.148-.192-.357-.353-.68-.555c-.477-.297-.783-.803-.783-1.361c0-.558.306-1.064.782-1.36c.324-.203.533-.364.682-.556a1.99 1.99 0 0 0 .399-1.479c-.053-.394-.287-.798-.757-1.605c-.47-.807-.704-1.21-1.022-1.453a2.026 2.026 0 0 0-1.49-.396c-.242.032-.487.13-.825.308a1.64 1.64 0 0 1-1.58-.008a1.615 1.615 0 0 1-.795-1.353c-.015-.38-.051-.64-.145-.863a2.007 2.007 0 0 0-1.09-1.083Z"
                        clipRule="evenodd"
                        opacity=".5"
                      />
                      <path d="M15.523 12c0 1.657-1.354 3-3.023 3c-1.67 0-3.023-1.343-3.023-3S10.83 9 12.5 9c1.67 0 3.023 1.343 3.023 3Z" />
                    </g>
                  </svg>
                </div>
              </Badge>
            </IconButton>
          </div>
          <div className="">
            <IconButton>
              <div className="p-0.5 border shadow-sm rounded-full">
                <Avatar
                  {...stringAvatar("Kent Dodds")}
                  sx={{ width: 30, height: 30 }}
                  className="cursor-pointer"
                  ref={profileRef}
                />
              </div>
            </IconButton>
            <nav
              className={`absolute top-[60px] sm:top-[50px] right-[25px] sm:right-[50px] bg-white drop-shadow-xl p-5  border rounded min-w-[160px] z-[999] ${
                showProfile ? "" : "hidden"
              }`}
              id="navMenus"
              ref={profileMenuRef}
            >
              <ul className="">
                <li className="p-0.5 hover:font-bold">
                  <Link
                    to="/profile"
                    className="cursor-pointer flex justify-between items-center gap-5"
                  >
                    <p>Profile</p>
                    <img
                      src={Images.ProfileIcon2}
                      alt="profile picture"
                      className="w-6"
                    />
                  </Link>
                </li>
                <li className="p-0.5 hover:font-bold xl:hidden">
                  <Link to="/what-is">Waht's Car & Bids?</Link>
                </li>
                <li className="p-0.5 hover:font-bold">
                  <Link to="/settings" className="cursor-pointer">
                    Settings
                  </Link>
                </li>
                <li
                  className="p-0.5 hover:font-bold"
                  onClick={() => {
                    Services.Auth.Logout();
                    window.location.reload();
                  }}
                >
                  <p className="cursor-pointer">Sign Out</p>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardNav;
