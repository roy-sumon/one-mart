import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Services = () => {
  const axiosPublic = useAxiosPublic();
  const {searchValue} = useContext(AuthContext);
  const { data: services, refetch } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/services?searchTerm=${searchValue}`);
      return res.data;
    },
  });

  //
  const imgStyle = {
    height: "204px",
    width: "100%",
    objectFit: "cover",
    borderRadius: "8px",
  };
  return (
    <div className="max-w-7xl mx-auto my-10 px-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-center items-center">
      {services?.map((service, idx) => {
        return (
          <Link to={`/service-details/${service?._id}`} key={idx}>
            <div className="rounded-md h-[232px] w-full">
              <img
                src={service?.image}
                alt={service?.service}
                style={imgStyle}
              />
              <h3 className="text-xl text-center font-semibold">
                {service?.service}
              </h3>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Services;
