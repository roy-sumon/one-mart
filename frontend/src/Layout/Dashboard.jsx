import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import Dashboard_Sidebar from "./Dashboard_Sidebar";


const Dashboard = () => {
    return (
        <div className="">
        <div className="bg-base-200 w-screen text-white flex justify-between items-center px-5 lg:hidden">
          <div className="">
            <h1 className="font-bold text-2xl ">OneMart</h1>
          </div>
          <div className="drawer-content flex flex-col items-center justify-center ">
            <label
              htmlFor="my-drawer-2"
              className="text-2xl p-3   rounded-md drawer-button lg:hidden"
            >
              <FaBars />
            </label>
          </div>
        </div>
        <div className="flex items-start gap-5">
          <div className="">
            
              <Dashboard_Sidebar />
           
          </div>
          <div className="w-full  min-h-screen flex justify-center items-center">
            <Outlet />
          </div>
        </div>
      </div>
    );
};

export default Dashboard;