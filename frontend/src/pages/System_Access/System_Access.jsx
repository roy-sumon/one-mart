import { NavLink, Outlet, useLocation } from "react-router-dom";
import Social_login from "../../components/Social_login/Social_login";

const System_Access = () => {
  const location = useLocation();
  const isLoginPage = location.pathname.includes('/signIn');
 

  return (
    <div className="h-screen flex flex-col justify-center space-y-4">
      <div className="w-1/4 mx-auto">
        <Social_login/>
      </div>
      <div className="menu menu-horizontal flex gap-10 justify-center">
        <NavLink
          to="/system-access/signIn"
          className={`text-gray-500 font-semibold text-xl uppercase ${isLoginPage ? 'text-red-500' : ''}`}
        >
          SignIn
        </NavLink>
        <NavLink
          to="/system-access/signUp"
          className={`text-gray-500 font-semibold text-xl uppercase ${!isLoginPage ? 'text-red-500' : ''}`}
        >
          Register
        </NavLink>
      </div>
      <div className="h-[70vh]">
        <Outlet />
      </div>
    </div>
  );
};

export default System_Access;