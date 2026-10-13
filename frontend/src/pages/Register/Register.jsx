import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../AuthProvider/AuthProvider";

// a static image for who did not set his/her image
const photo = "https://www.libarts.colostate.edu/wp-content/uploads/2018/02/userphoto.png";

const Register = () => {
  const {
    create_user_with_email,
    update_profile,
    sendEmailVerification,
  } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(data?.password)) {
      try {
        const res = await create_user_with_email(data?.email, data?.password);
        console.log("after mail verification", res);

        await update_profile(data?.name, photo);

        // remove password property from data object
        // eslint-disable-next-line no-unused-vars
        const { password, ...rest } = data;

        // post user info to database
        const response = await axiosPublic.post("/users", {
          ...rest,
          image: photo,
          phone: "+8801xxxxxxxxx",
          total_spend: 0,
          role: "user",
          address: "",
        });

        console.log(response.data);

        if (response.data.insertedId) {
          toast.success("Registration Complete!!!");
          navigate("/");
        } else {
          toast.error(`${response.data.message}`);
        }

        // sending verification link
        await sendEmailVerification(res.user);
        toast.success("Email verification link sent");
        navigate("/");
      } catch (err) {
        console.log(err);
        toast.error(`Error: ${err.code}`);
      }
    } else {
      // showing toast error if the password is not strong enough
      toast.error("Password: minimum eight characters, at least one letter and one number");
    }
  };


  return (
    <div>
      <div className="max-w-md mx-5 md:mx-auto">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Username *</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              {...register("name", { required: "Username is required" })}
            />
            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Email address *</span>
            </div>
            <input
              type="email"
              placeholder="Type here"
              className="input input-bordered w-full"
              {...register("email", { 
                required: "Email is required", 
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email address"
                }
              })}
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Password *</span>
            </div>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters"
                },
                pattern: {
                  value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
                  message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
                }
              })}
            />
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
          </label>
          <p>
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our{" "}
            <span className="text-red-400">privacy policy</span>.
          </p>
          <div>
            <button className="w-full btn">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
