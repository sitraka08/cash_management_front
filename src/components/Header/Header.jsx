import { IoChevronDownCircle } from "react-icons/io5";
import { userConnectedStore } from "../../store/userConnectedStore/userConnectedStore";
import { useNavigate } from "react-router-dom";
import { filterImage } from "../../utils/Functions";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef } from "react";
import { PiPowerFill } from "react-icons/pi";
import { RiSettings3Fill } from "react-icons/ri";
import AuthApi from "../../utils/AuthApi";
import logo from "../../assets/images/logo.png";

const Header = (props) => {
  const op = useRef(null);
  const navigate = useNavigate();
  const userConnected = userConnectedStore((s) => s.userConnected);
  if (userConnected === null) {
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        {/* <img className="h-15" src={logo} alt="" /> */}
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-50 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "delay-400 !w-full"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-500"
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!h-0 !delay-[0]"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!h-0 !delay-200"
                  }`}
                ></span>
              </span>
            </span>
          </button>
        </div>
        <div className=" flex items-center  gap-x-2 cursor-pointer w-full justify-end">
          <div
            className={`flex items-center justify-between  flex-nowrap`}
            onClick={(e) => op.current.toggle(e)}
          >
            <div className="relative">
              <img
                className="w-10 h-10 rounded-full object-cover"
                alt=""
                src={filterImage(userConnected?.image)}
              />
            </div>
            <IoChevronDownCircle
              color="green"
              className={`lg:hidden mx-2 text-xl`}
            />
            <OverlayPanel ref={op} className="">
              <div className="flex flex-col gap-4 p-3">
                <button
                  className="flex items-center gap-2"
                  onClick={() => navigate("/1/profil")}
                >
                  <div>
                    <RiSettings3Fill size={25} />
                  </div>
                  <h3>Paramètres</h3>
                </button>
                <button
                  className="flex items-center gap-2"
                  onClick={() => {
                    AuthApi.logout();
                    navigate("/");
                  }}
                >
                  <div>
                    <PiPowerFill size={25} />
                  </div>
                  <h3>Déconnexion</h3>
                </button>
              </div>
            </OverlayPanel>
          </div>
          <div>
            <h1 className="text-base">{userConnected?.first_name}</h1>
            <p className="text-xs text-gray-600">{userConnected?.poste}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
