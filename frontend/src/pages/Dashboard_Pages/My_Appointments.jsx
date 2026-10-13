// import { useContext } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "../../Hooks/useAxiosPublic";
// import { AuthContext } from "../../AuthProvider/AuthProvider";
// import Swal from "sweetalert2";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// const My_Appointments = () => {
//   const { user } = useContext(AuthContext);
//   const axiosPublic = useAxiosPublic();
//   const navigate = useNavigate();
//   const { register, handleSubmit } = useForm();

//   const { data: appointments = [], refetch } = useQuery({
//     queryKey: ["appointments"],
//     queryFn: async () => {
//       const res = await axiosPublic.get(`/appointments/${user?.email}`);

//       return res.data;
//     },
//   });

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Cancel it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosPublic.put(`/appointments/${id}`).then((res) => {
//           console.log(res.data);
//           if (res.data.modifiedCount > 0) {
//             refetch();
//             Swal.fire({
//               title: "Cancelled!",
//               text: "Your appointment has been Cancelled.",
//               icon: "success",
//             });
//           } else {
//             Swal.fire({
//               title: "Error!",
//               text: "Something went wrong.",
//               icon: "error",
//             });
//           }
//         });
//       }
//     });
//   };

//   const onSubmit = async (data) => {
//     if (user) {
//       const res = await axiosPublic.post("/payment", data);
//       window.location.replace(res.data.url);
//     } else {
//       navigate("/system-access/signIn");
//     }
//   };
//   return (
//     <div className="text-center overflow-y-auto overflow-x-auto  h-screen w-[1150px] py-10">
//       <h1 className="text-4xl font-bold">
//         My Appointments({appointments?.length || 0})
//       </h1>

//       <div className=" overflow-x-auto mt-5  ">
//         <table className="table table-md text-center border max-w-[1200px]">
//           <thead className="border">
//             <tr className="text-base">
//               <th>#</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Service Type</th>
//               <th>Booking Date</th>
//               <th>Payment</th>
//               <th>Status</th>

//               <th>Reschedule Date</th>
//               <th>Problem Description</th>
//               <th className="text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody className="">
//             {appointments?.map((appointment, i) => (
//               <tr className="hover" key={appointment?._id}>
//                 <th>{i + 1}</th>
//                 <td>{appointment?.user_name}</td>
//                 <td>{appointment?.email}</td>
//                 <td>{appointment?.phone}</td>
//                 <td>{appointment?.service_type}</td>
//                 <td>{appointment?.booking_date}</td>
//                 <td>{appointment?.payment}</td>
//                 <td>{appointment?.status}</td>

//                 <td>{appointment?.reschedule_date}</td>
//                 <td>{appointment?.description}</td>
//                 <td className="flex gap-5">
//                   {/* You can open the modal using document.getElementById('ID').showModal() method */}
//                   <button
//                     className="btn btn-sm btn-secondary"
//                     onClick={() =>
//                       document.getElementById("my_modal_3").showModal()
//                     }
//                     disabled={
//                       appointment?.payment == "complete" ||
//                       appointment?.status == "Cancelled"
//                     }
//                   >
//                     Pay
//                   </button>
//                   <button
//                     className="btn btn-sm btn-primary"
//                     onClick={() => handleDelete(appointment?._id)}
//                     disabled={appointment?.status == "Cancelled"||appointment?.status == "done" || appointment?.payment=='complete'}
//                   >
//                     Cancel
//                   </button>

//                   <dialog id="my_modal_3" className="modal">
//                     <div className="modal-box">
//                       <form method="dialog">
//                         {/* if there is a button in form, it will close the modal */}
//                         <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
//                           ✕
//                         </button>
//                       </form>
//                       <form
//                         className="space-y-3"
//                         onSubmit={handleSubmit(onSubmit)}
//                       >
//                         <h3 className="font-bold text-lg">
//                           Payment Information
//                         </h3>

//                         <label className="  hidden">
//                           <span>ID:</span>
//                           <input
//                             required
//                             defaultValue={appointment?._id}
//                             {...register("id")}
//                             type="text"
//                             className="grow input input-bordered"
//                           />
//                         </label>
//                         <label className=" flex items-center gap-2">
//                           <span>Name:</span>
//                           <input
//                             defaultValue={user?.displayName}
//                             readOnly
//                             {...register("name", {
//                               required: "Name is required",
//                             })}
//                             type="text"
//                             className="grow input "
//                             placeholder="Name"
//                           />
//                         </label>
//                         <label className=" flex items-center gap-2">
//                           <span>Email:</span>
//                           <input
//                             defaultValue={user?.email}
//                             readOnly
//                             {...register("email", {
//                               required: "Email is required",
//                             })}
//                             type="email"
//                             className="grow input"
//                             placeholder="Email"
//                           />
//                         </label>

//                         <label className="flex items-center  gap-2">
//                           <span>Service Name:</span>
//                           <input
//                             readOnly
//                             defaultValue={appointment?.service_type}
//                             {...register("ServiceName", {
//                               required: "Service name is required",
//                             })}
//                             type="text"
//                             className="grow input "
//                             placeholder="Service name"
//                           />
//                         </label>
//                         <label className=" flex items-center gap-2">
//                           <span>Amount(TK):</span>
//                           <input
//                             required
//                             {...register("amount", {
//                               required: "Amount is required",
//                             })}
//                             type="number"
//                             className="grow input input-bordered"
//                             placeholder="Amount"
//                           />
//                         </label>
//                         <label className="flex items-center gap-2">
//                           <span>Feedback:</span>
//                           <textarea
//                             {...register("feedback", {
//                               required: "Feedback is required",
//                             })}
//                             className="textarea textarea-bordered textarea-lg w-full "
//                             placeholder="Feedback"
//                           ></textarea>
//                         </label>
//                         <div className="">
//                           <p className="py-4">Click Proceed to go further</p>

//                           <button
//                             type="submit"
//                             className="btn btn-sm btn-success text-white"
//                           >
//                             Proceed
//                           </button>
//                         </div>
//                       </form>
//                     </div>
//                   </dialog>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {!appointments.length ? (
//           <p className="w-full text-xl font-semibold text-gray-400 col-span-3 my-10">
//             You do not book any appointment yet!
//           </p>
//         ) : (
//           ""
//         )}
//       </div>
//     </div>
//   );
// };

// export default My_Appointments;
import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const My_Appointments = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [paymentData, setPaymentData] = useState({
    id: "",
    name: user?.displayName || "",
    email: user?.email || "",
    ServiceName: "",
    amount: "",
    feedback: "",
  });

  const { data: appointments = [], refetch } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/appointments/${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
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
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Cancelled!",
              text: "Your appointment has been Cancelled.",
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

  const onSubmit = async (event) => {
    event.preventDefault();
    if (user) {
      const res = await axiosPublic.post("/payment", paymentData);
      window.location.replace(res.data.url);
    } else {
      navigate("/system-access/signIn");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPaymentData({
      ...paymentData,
      [name]: value,
    });
  };

  return (
    <div className="text-center overflow-y-auto overflow-x-auto h-screen w-[1150px] py-10">
      <h1 className="text-4xl font-bold">
        My Appointments ({appointments?.length || 0})
      </h1>

      <div className="overflow-x-auto mt-5">
        <table className="table table-md text-center border max-w-[1200px]">
          <thead className="border">
            <tr className="text-base">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Service Type</th>
              <th>Service Subcatagory</th>
              <th>Service price</th>
              <th>Booking Date</th>
              <th>Payment</th>
              <th>Status</th>
              {/* <th>Reschedule Date</th> */}
              <th>Address</th>
              <th>Problem Description</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments?.map((appointment, i) => (
              <tr key={appointment?._id}>
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
                {/* <td>{appointment?.reschedule_date}</td> */}
                <td>{appointment?.address}</td>
                <td>{appointment?.description}</td>
                <td className="flex gap-5">
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => {
                      setPaymentData({
                        ...paymentData,
                        id: appointment?._id,
                        ServiceName: appointment?.service_type,
                      });
                      document.getElementById("my_modal_3").showModal();
                    }}
                    disabled={
                      appointment?.payment === "complete" ||
                      appointment?.status === "Cancelled"
                    }
                  >
                    Pay
                  </button>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleDelete(appointment?._id)}
                    disabled={
                      appointment?.status === "Cancelled" ||
                      appointment?.status === "done" ||
                      appointment?.payment === "complete"
                    }
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!appointments.length ? (
          <p className="w-full text-xl font-semibold text-gray-400 col-span-3 my-10">
            You have not booked any appointments yet!
          </p>
        ) : null}
      </div>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form className="space-y-3" onSubmit={onSubmit}>
            <h3 className="font-bold text-lg">Payment Information</h3>

            <label className="hidden">
              <span>ID:</span>
              <input
                required
                defaultValue={paymentData.id}
                name="id"
                type="text"
                className="grow input input-bordered"
                readOnly
              />
            </label>
            <label className="flex items-center gap-2">
              <span>Name:</span>
              <input
                defaultValue={paymentData.name}
                name="name"
                type="text"
                className="grow input"
                placeholder="Name"
                readOnly
              />
            </label>
            <label className="flex items-center gap-2">
              <span>Email:</span>
              <input
                defaultValue={paymentData.email}
                name="email"
                type="email"
                className="grow input"
                placeholder="Email"
                readOnly
              />
            </label>
            <label className="flex items-center gap-2">
              <span>Service Name:</span>
              <input
                defaultValue={paymentData.ServiceName}
                name="ServiceName"
                type="text"
                className="grow input"
                placeholder="Service name"
                readOnly
              />
            </label>
          
            <label className="flex items-center gap-2">
              <span>Amount(TK):</span>
              <input
                required
                value={paymentData.amount}
                onChange={handleChange}
                name="amount"
                type="number"
                className="grow input input-bordered"
                placeholder="Amount"
              />
            </label>
            <label className="flex items-center gap-2">
              <span>Feedback:</span>
              <textarea
                value={paymentData.feedback}
                onChange={handleChange}
                name="feedback"
                className="textarea textarea-bordered textarea-lg w-full"
                placeholder="Feedback"
              ></textarea>
            </label>
            <div>
              <p className="py-4">Click Proceed to go further</p>

              <button
                type="submit"
                className="btn btn-sm btn-success text-white"
              >
                Proceed
              </button>
            </div>
          </form>
          <button
            onClick={() =>
              document.getElementById("my_modal_3").close()
            }
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default My_Appointments