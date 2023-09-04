import { useEffect, useState, useRef } from "react";
import { AuthPages } from "../pages";
import { Button, ThemeProvider } from "@mui/material";
import Utils from "../utils";
import { Box } from "@mui/material";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Services from "../services";
import { Images, Icons } from "../assets";

type Boolean = boolean;

function NavComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const notifyRef = useRef<HTMLDivElement>(null);
  const notifyMessageRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(
    Services.Auth.IsUserLogedIn()
  );
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const toggleMenuElement = document.getElementById("toggleMenu");
    const toggleMenuIconElement = document.getElementById("toggleMenuIcon");

    document.addEventListener("click", (e) => {
      if (
        e.target !== toggleMenuElement &&
        e.target !== toggleMenuIconElement
      ) {
        setToggleMenu(false);
      }
    });
  }, [toggleMenu]);

  const showDailyEmailModal = () => {
    setIsModalOpen((open) => !open);
  };

  const handleSubmit = () => {
    navigate(`/search/${search}`);
  };

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

  return (
    <>
      <header
        id="navbar"
        className="flex items-center  fixed w-screen text-gray-600 body-font bg-white z-50 border-b sm:px-2"
      >
        <div className="container mx-auto flex flex-row px-5 py-0 md:py-1 sm:px-0 flex-wrap items-center justify-between">
          <div className="flex ">
            <Link
              to="/"
              className="flex title-font font-medium items-center text-gray-900  md:mb-0 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-10 h-10 text-white p-2 bgColor rounded-full shadow-sm"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="ml-1 sm:ml-3 text-x capitalize">cars&bids</span>
            </Link>
            <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	 flex-wrap items-center text-base justify-center hidden xl:flex">
              <Link to="/" className="group relative mr-5 hover:text-gray-900">
                Auctions
                {/* <!-- Tooltip here --> */}
                {/* <div className="absolute rounded text-white opacity-0 transition-all duration-100 group-hover:opacity-100">
              <div className="flex max-w-xs flex-col items-center">
                <div className="rounded bg-gray-900 p-2 text-xs text-center shadow-lg">
                  Tooltip Title
                </div>
                <div className=" h-2 w-4"></div>
              </div>
            </div> */}
              </Link>

              <Link
                to="/sell-car"
                className="mr-5  px-3 py-2 rounded-3xl text-white bgColor shadow-sm"
              >
                Sell a Car
              </Link>
              <Link to="/what-is" className="mr-5 hover:text-gray-900">
                What's Cards & Bids
              </Link>
              <a
                style={{ cursor: "pointer" }}
                onClick={showDailyEmailModal}
                className="mr-5 hover:text-gray-900"
              >
                Daily Email
              </a>
              {/* {isModalOpen && (
                <AuthPages.DailyEmail setIsModalOpen={setIsModalOpen} />
              )} */}
            </nav>
          </div>

          <form
            onSubmit={handleSubmit}
            className=" grow px-8 xl:px-3 hidden sm:flex justify-center items-center"
          >
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>

              <input
                type="text"
                id="search"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Search for cars (ex. BMW, Audi, Ford)"
                onChange={(e) => setSearch(e.target.value)}
                required
              />
            </div>
          </form>

          <div className="flex flex-wrap items-center gap-0.5 sm:gap-2">
            {!userLoggedIn && (
              <Box className=" items-center text-base   flex">
                <ThemeProvider theme={Utils.Theme.ButtonTheme}>
                  <div className="hidden sm:inline-block">
                    <Button onClick={() => setOpen(true)} variant="contained">
                      Sign In
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 ml-1"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </Button>
                  </div>
                  <div className="sm:hidden">
                    <Button
                      onClick={() => setOpen(true)}
                      variant="contained"
                      size="small"
                    >
                      Sign In
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 ml-1"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </Button>
                  </div>
                </ThemeProvider>
              </Box>
            )}
            {userLoggedIn && (
              <div className="flex space-x-4 lg:space-x-8 ">
                <Link to="/watch-list">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className={`w-6 h-6 border-b-4  ${
                      location.pathname === "/watch-list"
                        ? "border-amber-400"
                        : "border-transparent"
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                </Link>
                <div
                  className="items-center text-center cursor-pointer"
                  // onClick={() => setShowNotifications(!showNotifications)}
                  ref={notifyRef}
                >
                  <span className="relative inline-block">
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
                    <span className="absolute -top-3 -right-2 px-1 py-1 text-xs font-bold text-red-100 transform bgColor rounded-full">
                      14
                    </span>
                  </span>
                </div>
              </div>
            )}
            <div
              className={`notificaton-modal ${
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
                <div
                  className="notify-setting "
                  onClick={() => navigate("/settings")}
                >
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
            <Box
              className={` items-center border-0 px-0 sm:px-4 py-3 text-base text-indigo-500 rounded   ${
                userLoggedIn ? "inline-flex" : "inline-flex xl:hidden "
              }`}
            >
              <ThemeProvider theme={Utils.Theme.ButtonTheme}>
                <Button
                  onClick={(e) => setToggleMenu(!toggleMenu)}
                  variant="text"
                  id="toggleMenu"
                  sx={{ paddingX: 0 }}
                >
                  <img
                    src={Icons.MenuIcon}
                    alt="menu icon"
                    className="w-6 p-0 m-0"
                    id="toggleMenuIcon"
                  />
                </Button>
              </ThemeProvider>
            </Box>
            <nav
              className={`absolute top-[60px] sm:top-[75px] right-[25px] sm:right-[100px] bg-white drop-shadow-xl p-5  border rounded min-w-[160px] ${
                toggleMenu ? "" : "hidden"
              }`}
              id="navMenus"
            >
              <ul className="">
                {userLoggedIn && (
                  <li className="p-0.5 hover:font-bold list-none">
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
                )}
                <li className="p-0.5  hover:font-bold menu-active xl:hidden list-none">
                  <Link to="/auctions">Auctions</Link>
                </li>
                <li className="p-0.5 hover:font-bold xl:hidden list-none">
                  <Link to="/sell-car">Sell a Car</Link>
                </li>
                <li className="p-0.5 hover:font-bold xl:hidden list-none">
                  <Link to="/what-is">Waht's Car & Bids?</Link>
                </li>
                <li className="p-0.5 hover:font-bold xl:hidden list-none">
                  <p className="cursor-pointer" onClick={showDailyEmailModal}>
                    Daily Email
                  </p>
                  {/* {isModalOpen && (
                    <AuthPages.DailyEmail setIsModalOpen={setIsModalOpen} />
                  )} */}
                </li>
                {userLoggedIn && (
                  <>
                    <li className="p-0.5 hover:font-bold list-none">
                      <Link to="/listings" className="cursor-pointer">
                        My Listings
                      </Link>
                    </li>
                    <li className="p-0.5 hover:font-bold list-none">
                      <Link to="/settings" className="cursor-pointer">
                        Settings
                      </Link>
                    </li>
                    <li className="p-0.5 hover:font-bold list-none">
                      <p
                        className="cursor-pointer"
                        onClick={() => {
                          Services.Auth.Logout();
                          window.location.reload();
                        }}
                      >
                        Sign Out
                      </p>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>
      {/* <AuthPages.Login openLogin={open} setOpenLogin={setOpen} /> */}
    </>
  );
}

export default NavComponent;
