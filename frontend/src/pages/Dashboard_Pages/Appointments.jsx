import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const Appointments = () => {
  const axiosPublic = useAxiosPublic();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [services, setServices] = useState([]);
  const [service, setService] = useState("");

  const { data: appointments = [], refetch } = useQuery({
    queryKey: ["appointments", service, startDate, endDate],
    queryFn: async () => {
      let url = `/appointments?startDate=${startDate}&endDate=${endDate}`;
      if (service && service !== "All") {
        url += `&filter=${service}`;
      }
      const res = await axiosPublic.get(url);
      return res.data;
    },
  });

  useEffect(() => {
    axiosPublic.get("/services").then((response) => setServices(response.data));
  }, [axiosPublic]);

  const servicesData = [
    { service: "All" }, // Added "All" option
    { service: "AC Service" },
    { service: "Fridge Service" },
    { service: "House Cleaning" },
    { service: "Painting Service" },
    { service: "House Shifting Service" },
    { service: "Gas Stove Service" },
    { service: "Plumbing & Sanitary Service" },
    { service: "Electronic Repair Service" },
    { service: "Regular Pest Control" },
  ];

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.put(`/appointments/${id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Cancelled!",
              text: "Your appointment has been cancelled.",
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

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/appointments/${id}`).then((res) => {
          if (res.status === 200) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your appointment has been deleted.",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong.",
              icon: "error",
            });
          }
        }).catch((error) => {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong.",
            icon: "error",
          });
        });
      }
    });
  };

  const handleFilter = (e) => {
    e.preventDefault();
    setStartDate(e.target.startingDate.value);
    setEndDate(e.target.endingDate.value);
    // Reset service to "All" when filtering dates
    setService("All");
    refetch();
  };

  return (
    <div className="text-center h-screen overflow-y-auto w-[1150px]">
      <div className="flex justify-between items-center pt-10 pr-5">
        <h1 className="text-4xl font-bold">
          Appointments ({appointments?.length || 0})
        </h1>
        <form onSubmit={handleFilter}>
          <div className="flex justify-end gap-5 my-5">
            <div className="">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-medium">Starting date</span>
                </div>
                <input
                  type="date"
                  name="startingDate"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <div className="">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-medium">Ending date</span>
                </div>
                <input
                  type="date"
                  name="endingDate"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <div className="flex items-end">
              <button type="submit" className="btn btn-info text-white">
                Filter
              </button>
            </div>
          </div>
        </form>
        {/* Filter by service */}
        <form>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text-alt">Filter by</span>
            </div>
            <select
              className="select select-bordered"
              onChange={(e) => setService(e.target.value)}
              value={service}
            >
              {servicesData.map((service, index) => (
                <option key={index} value={service.service}>
                  {service.service}
                </option>
              ))}
            </select>
          </label>
        </form>
      </div>
      <div className="overflow-x-auto mt-5">
        <table className="table table-md text-center border">
          <thead className="border">
            <tr className="text-base">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Service Type</th>
              <th>Service SubCategory</th>
              <th>Service Price</th>
              <th>Booking Date</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Address</th>
              <th>Problem Description</th>
              <th className="text-center">Action</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {appointments?.map((appointment, i) => (
              <tr className="hover" key={appointment?._id}>
                <th>{i + 1}</th>
                <td>{appointment?.user_name}</td>
                <td>{appointment?.email}</td>
                <td>{appointment?.phone}</td>
                <td>{appointment?.service_type}</td>
                <td>{appointment?.sub_category}</td>
                <td>{appointment?.price}</td>
                <td>{appointment?.booking_date}</td>
                <td>{appointment?.payment}</td>
                <td>{appointment?.status}</td>
                <td>{appointment?.address}</td>
                <td>{appointment?.description}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleCancel(appointment?._id)}
                    disabled={appointment?.status === "Cancelled"}
                  >
                    Cancel
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(appointment?._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!appointments.length && (
          <p className="w-full text-xl font-semibold text-gray-400 col-span-3 my-10">
            No appointments found!
          </p>
        )}
      </div>
    </div>
  );
};

export default Appointments;
