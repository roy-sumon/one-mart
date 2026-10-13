import { toast } from "react-toastify";

import { LuBookMarked } from "react-icons/lu";
import useAxiosPublic from "../../Hooks/useAxiosPublic.jsx";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth.jsx";
import { Link } from "react-router-dom";
const DisscusionForum = () => {
  const { user } = useAuth();
  const [all_discussion, setDiscussion] = useState();
  const axiosPublic = useAxiosPublic();
  const handelClick = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const discussion = form.get("input");
    const productInfo = await axiosPublic.post("/discussion", {
      discussion: discussion,
      author: user?.displayName,
    });
    if (productInfo?.data?.insertedId) {
      toast.success("Course Successfully added!!!");
    } else {
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    axiosPublic.get("/discussion").then((res) => {
      setDiscussion(res.data);
    });
  }, [axiosPublic]);

  return (
    <section>
      <h1 className="text-4xl font-bold mt-10 text-center">
        Welcome to Discussion Forum
      </h1>
      <form onSubmit={handelClick}>
        <div className="flex flex-col md:flex-row justify-center items-center gap-5 mt-5">
          <input
            type="text"
            name="input"
            className="input input-bordered mt-1 block w-10/12"
          />
          <button className="md:w-2/12  flex justify-center items-center bg-green-600 text-white font-bold rounded-lg px-2 py-2 gap-5">
            New Topic{" "}
            <LuBookMarked className="flex justify-center items-center" />
          </button>
        </div>
      </form>
      <div className="mt-10 w-full mx-5">
        {all_discussion?.map((i) => (
          <Link to={`/forum/${i._id}`} key={i._id}>
            <div className="my-3">
              <hr />
              <h1 className="text-2xl font-bold mt-2 hover:text-green-600">
                {i.discussion}
              </h1>
              <p className="mb-2">
                Thread created by{" "}
                <span className="font-semibold">{i.author}</span>
              </p>
              <hr />
            </div>
          </Link>
        ))}
      </div>
      
    </section>
  );
};
export default DisscusionForum;
