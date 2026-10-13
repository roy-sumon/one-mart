import "swiper/css";
import "swiper/css/pagination";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import star from "../../assets/book_service/star-shape.png";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const RepairServiceDetail = () => {
  const [booking, setBooking] = useState(new Date());
  const { user } = useContext(AuthContext);
  const [service, setService] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState(null);

  const axiosPublic = useAxiosPublic();

  // Define services and subcategories manually
  const servicesData = [
    {
      service: "AC Service",
      subCategories: ["AC Cleaning", "AC Cooling Solutions", "AC Instalation","AC Shifting","AC Master Service"],
      prices: [2000, 1500,1000,1200,3000],
    },
    {
      service: "Fridge Service",
      subCategories: ["Fridge Repairing", "Fridge Cleaning", "Compressor Repairing"],
      prices: [2000, 800, 3000],
    },
    {
      service: "House Cleaning",
      subCategories: ["Indoor Cleaning", "Outdoor Cleaning", "Carpet Cleaning","Appliance Cleaning"],
      prices: [1500, 2200, 500,1000],
    },
    {
      service: "Painting Service",
      subCategories: ["Interior paint per day ", "Outdoor  paint per day", "Wood & Furniture paint per day"],
      prices: [2000, 3200,1500],
    },
    {
      service: "House Shifting Service",
      subCategories: ["1 Room","2 Room","3 Room","Family Shifting Regular","Family Shifting Premium","Bachelor Shifting"],
      prices: [1500,2500,3200,3500,4000,1000],
    },
    {
      service: "Gas Stove Service",
      subCategories: ["Gas Stove Repair"],
      prices: [1000],
    },
    {
      service: "Plumbing & Sanitary Service",
      subCategories: ["Pluming check up","water Tab Service","Sink Issues","Tank and Pipe cleaning"],
      prices: [1000,500,1000,2000],
    },
    {
      service: "Electorinc Repair Service",
      subCategories: ["Celing Fan Services","Light Services","Electrical Check Up","Main Circuit Breaker Servicing"],
      prices: [400,500,1000,2000],
    },
    {
      service: "Regular Pest Control",
      subCategories: ["Regular Control","Master Control"],
      prices: [1000,1500],
    },
  ];

  const handleServiceChange = (e) => {
    const selectedService = e.target.value;
    setService(selectedService);

    // Find the selected service from the servicesData array
    const selectedServiceData = servicesData.find(
      (service) => service.service === selectedService
    );

    // Update the subcategories state
    setSubCategories(selectedServiceData ? selectedServiceData.subCategories : []);
    setPrice(null); // Reset price when service changes
    setSubCategory(""); // Reset subcategory when service changes
  };

  const handleSubCategoryChange = (e) => {
    const selectedSubCategory = e.target.value;
    setSubCategory(selectedSubCategory);

    // Find the selected service from the servicesData array
    const selectedServiceData = servicesData.find(
      (serviceItem) => serviceItem.service === service
    );

    // Find the index of the selected subcategory
    const subCategoryIndex = selectedServiceData?.subCategories.indexOf(selectedSubCategory);

    // Update the price state based on the selected subcategory
    if (subCategoryIndex !== -1) {
      setPrice(selectedServiceData?.prices[subCategoryIndex]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const user_name = form.get("name");
    const email = form.get("email");
    const phone = form.get("phone");
    const service_type = service;
    const sub_category = subCategory;
    const booking_date = form.get("bookingDate");
    const description = form.get("description");
    const address = form.get("address");

    const appointment = {
      user_name,
      email,
      phone,
      service_type,
      sub_category,
      price, // Use the state variable 'price' which is updated based on selected subcategory
      booking_date,
      description,
      address,
      payment: "pending",
      status: "in-Progress",
      transactionId: "",
    };

    const productInfo = await axiosPublic.post("/appointments", appointment);
    if (productInfo?.data?.insertedId) {
      toast.success("Appointment successfully added!!!");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="mt-10">
      <div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold my-5">Description:</h1>
          <p className="px-10 text-justify">
            Note To Customer: Make Sure All The Expensive Belongings Are Removed
            From The Service Area Before Starting The Work If Any Delay Happens
            By Customer (30 Mints +) Then There Will Be An Extra Charge Add With
            The Service Price After Delivering The Service, The Customer Must
            Cross Check The Service Before The Service Person Leaves The Place
            After That No Complaint Will Be Accepted Customer Need To Provide
            Fresh Water And Electricity To Support The Service Person The
            Service price might be change, if the working area is in very poor
            Condition. If The Work Area Increases Then Extra Price Will Be Added
            Make Sure No Other Work Is Going On When The Painting Service Is
            Being Delivered.
          </p>
        </div>
        <div className="flex gap-5 justify-center items-center mt-20">
          <img className="w-16 animate-spin" src={star} alt="" />
          <h2 className="text-3xl">Book a Service</h2>
          <img className="w-16 animate-spin" src={star} alt="" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-5">
          <div className="flex justify-center items-center mx-5 md:mx-0">
            <img
              className="border-2 border-red-400"
              src="https://i.ibb.co/58bZ9cg/all.jpg"
              alt=""
            />
          </div>
          <div className="flex justify-center items-center px-5">
            <section className="bg-white ">
              <div className="">
                <form className="" onSubmit={handleSubmit}>
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2 sm:gap-6">
                    <div className="w-full">
                      <label
                        name="name"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        Name
                      </label>
                      <input
                        required
                        type="text"
                        name="name"
                        id="name"
                        className="input input-bordered border-red-400 w-full bg-transparent"
                        placeholder="your name"
                      />
                    </div>
                    <div className="w-full">
                      <label
                        name="email"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        Email
                      </label>
                      <input
                        readOnly
                        value={user?.email}
                        type="text"
                        name="email"
                        id="email"
                        className="input input-bordered border-red-400 w-full bg-transparent"
                        placeholder="email..."
                      />
                    </div>
                    <div className="w-full">
                      <label
                        name="phone"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        Phone
                      </label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        id="phone"
                        className="input input-bordered border-red-400 w-full bg-transparent"
                        placeholder="phone"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="service"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        Services
                      </label>
                      <select
                        id="service"
                        name="service"
                        required
                        onChange={handleServiceChange}
                        className="input input-bordered border-red-400 w-full bg-transparent"
                      >
                        <option value="" disabled selected>
                          Select a Service
                        </option>
                        {servicesData?.map((service) => (
                          <option key={service.service} value={service.service}>
                            {service.service}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Subcategories Dropdown */}
                    {subCategories.length > 0 && (
                      <div>
                        <label
                          htmlFor="subCategory"
                          className="block mb-2 text-sm font-medium text-black"
                        >
                          Service Subcategories
                        </label>
                        <select
                          id="subCategory"
                          name="subCategory"
                          required
                          onChange={handleSubCategoryChange}
                          className="input input-bordered border-red-400 w-full bg-transparent"
                        >
                          <option value="" disabled selected>
                            Select a Subcategory
                          </option>
                          {subCategories?.map((subCat, index) => (
                            <option key={index} value={subCat}>
                              {subCat}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Price Display */}
                    {price !== null && (
                      <div>
                        <label
                          htmlFor="price"
                          className="block mb-2 text-sm font-medium text-black"
                        >
                          Price
                        </label>
                        <input
                          type="text"
                          id="price"
                          value={`${price}  ৳ `}
                          readOnly
                          className="input input-bordered border-red-400 w-full bg-transparent"
                        />
                      </div>
                    )}
                  
                    <div className="w-96">
                      <label
                        name="bookingDate"
                        className="block mb-2 text-sm font-medium text-black "
                      >
                        Booking date
                      </label>
                      <DatePicker
                        className="input input-bordered border-red-400 w-full bg-transparent"
                        name="bookingDate"
                        selected={booking}
                        required
                        onChange={(date) => setBooking(date)}
                      />
                    </div>

                    {/* address start */}
                   
                 
                    <div className="sm:col-span-2">
                      <label
                        name="address"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        Address
                      </label>
                      <textarea
                        name="address"
                        id="description"
                        required
                        rows="8"
                        className="input border border-red-400 w-full bg-transparent h-14"
                        placeholder="we are avalible asuliya area"
                      ></textarea>
                    </div>
                   {/* address start */}

                    <div className="sm:col-span-2">
                      <label
                        name="description"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        Description
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        required
                        rows="8"
                        className="input border border-red-400 w-full bg-transparent h-24"
                        placeholder="Your description here"
                      ></textarea>
                    </div>
 
                    

                  </div>
                  <button
                    type="submit"
                    className="bg-red-600 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  >
                    Book a Service
                  </button>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RepairServiceDetail;
