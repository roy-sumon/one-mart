import { AiFillGoogleCircle } from "react-icons/ai";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Social_login = () => {
  const { signIn_Google } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();

  // google login function
  const handle_google_login = () => {
    signIn_Google()
      .then((result) => {
        const userInfo = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
          role: "user",
          phone: "+8801xxxxxxxxx",
          total_spend: 0,
          address: "",
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            toast.success("Your account is registered successfully");
          }
          navigate(location?.state || "/", { replace: true });
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };
  return (
    <>
      <div
        onClick={handle_google_login}
        className=" flex  justify-center items-center gap-5 "
      >
        <div className=" btn shadow-xl ">
          <AiFillGoogleCircle className="cursor-pointer text-4xl" />
          <p className="">Login with Google</p>
        </div>
      </div>
      <div className="divider ">signIn with</div>
    </>
  );
};

export default Social_login;
