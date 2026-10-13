
import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const All_Services = () => {
  const axiosPublic=useAxiosPublic()
  const { data: services = [], refetch } = useQuery({
      queryKey: ["services"],
      queryFn: async () => {
        const res = await axiosPublic.get("/services");
        return res.data;
      },
    });

  const imgStyle = {
    height: '204px', 
    width: '100%', 
    objectFit: 'cover', 
    borderRadius: '8px'
};

  // A function that delete user
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/admin/services/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong.",
              icon: "error",
            });
          }
        });
      }
    });
  };
  return (
    <section className="min-h-screen  flex items-center" id="products">
      <div className="">
        <h1 className="text-center text-4xl font-bold mb-5">All Products({services?.length})</h1>
        
        <hr />
        <div className="overflow-y-auto h-[80vh]">
          <div className="grid grid-cols-1 my-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5">
            {services?.map((service,idx) => (
              <div className="rounded-md h-[232px] w-full relative" key={idx}>
                <div className="absolute top-2 right-2 z-50">
                <Link to={`/service-details/${service?._id}`} >
                <FaEye className="text-5xl  rounded-lg bg-white bg-opacity-50 p-3 text-purple-500"/>
                </Link>
                  <Link to={`/dashboard/admin/update_service/${service?._id}`}> 
                  
                  <FaEdit   className="text-5xl  mt-2 rounded-lg bg-white bg-opacity-50 p-3 text-blue-500"/>
                  </Link>
                  <FaTrash onClick={()=>handleDelete(service?._id)} className="text-5xl mt-2 rounded-lg bg-white bg-opacity-50 p-3 text-red-500"/>
                </div>
                  <img
                      src={service?.image}
                      alt={service?.service}
                      style={imgStyle}
                  />
                  <h3 className="text-xl text-center font-semibold">{service?.service}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


export default All_Services;