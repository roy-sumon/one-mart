import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useContext } from "react";
import { toast } from "react-toastify";
import useAdmin from "../../Hooks/useAdmin";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin]=useAdmin()



  // handle_logOut
  const handle_logOut = () => {
    logOut()
      .then((res) => {
        console.log(res);
        toast.success("Successfully logOut!!!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };
  return (
    <div>
      <hr className=" w-full" />
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <a href="/" className="btn btn-ghost text-2xl font-bold flex gap-0 ">
            <span className="text-green-600">One</span>
            <span className="text-red-600">Mart</span>
          </a>
        </div>
        <div className="navbar-center sm:navbar-end hidden z-[50] lg:flex">
          <ul className="menu menu-horizontal px-1">
            <Link to="/">
              <li className="font-bold">
                <a>Home</a>
              </li>
            </Link>
            <Link to="/book-service">
              <li className="font-bold">
                <a>Book Service</a>
              </li>
            </Link>
            <Link to="/services">
              <li className="font-bold">
                <a>All Services</a>
              </li>
            </Link>
            {
              user && (
                <Link to={`${isAdmin?"/dashboard/admin/all_users":"/dashboard/user/my_appointments"}`}>
                  <li className="font-bold">
                    <a >Dashboard</a>
                  </li>
                </Link>
              )
            }
            {user ? (
              <Link  className="flex items-center justify-between gap-5">
                <li className="font-bold" onClick={handle_logOut}>
                  <a href="/">Log Out</a>
                </li>
                <p className="text-xl font-bold text-green-500 border-green-500 border-2 px-3 rounded-md">{user?.displayName}</p>
              </Link>
            ) : (
              <Link to="/system-access/signIn">
                <li className="font-bold">
                  <a>Login</a>
                </li>
              </Link>
            )}
          </ul>
        </div>
        <div className="lg:hidden navbar-end">
          <div className="flex">
            <div className="dropdown sm:hidden dropdown-end">
              {/* <div role="button" className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <img
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                    className="w-5 h-5"
                    src="https://i.ibb.co/r5jdR4B/search.png"
                    alt=""
                  />
                  <dialog id="my_modal_3" className="modal">
                    <div
                      className=" bg-white flex flex-col justify-center items-center"
                      style={{ width: "100vw", height: "100vh" }}
                    >
                      <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-slate-400">
                          ✕
                        </button>
                      </form>
                      <form
                      // onSubmit={handleSubmit}
                      >
                        <div className="space-y-3">
                          <h3 className=" text-lg">Whats on your mind?</h3>
                          <input
                            type="text"
                            placeholder="Type here"
                            name="search"
                            className="input input-md w-[1100px] input-bordered border-black"
                          />
                          <br />
                          <button className="btn bg-black text-white px-10">
                            Search
                          </button>
                        </div>
                      </form>
                    </div>
                  </dialog>
                </div>
              </div> */}
            </div>

            <div className="dropdown dropdown-end  ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <button className="btn btn-square btn-ghost">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-5 h-5 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </button>
              </div>
              <ul
                tabIndex={0}
                className=" menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <Link to="/">
              <li className="font-bold">
                <a>Home</a>
              </li>
            </Link>
            <Link to="/book-service">
              <li className="font-bold">
                <a>Book Service</a>
              </li>
            </Link>
                <Link to="/services">
                  <li className="font-bold">
                    <a>All Services</a>
                  </li>
                </Link>
                {
              user && (
                <Link to={`${isAdmin?"/dashboard/admin/all_users":"/dashboard/user/my_appointments"}`}>
                  <li className="font-bold">
                    <a >Dashboard</a>
                  </li>
                </Link>
              )
            }
                <Link to="/login">
                  <li className="font-bold">
                    <a>Login</a>
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full" />
    </div>
  );
};

export default Navbar;
