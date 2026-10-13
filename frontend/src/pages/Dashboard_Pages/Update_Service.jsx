import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

// imagebb auth credentials
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Update_Service = () => {
  const { id } = useParams(); // Assuming you're using React Router to get the service ID from URL
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      faq: [],
      noteToCustomer: {
        preparation: "",
        delayCharge: "",
        complaintPolicy: "",
        belongings: "",
        waterElectricity: "",
        extraCharge: "",
        noOtherWork: "",
      },
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "faq",
  });
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axiosPublic.get(`/services/${id}`); // Adjust endpoint as per your API
        const serviceData = response.data; // Assuming your API response is the entire service object

        // Set service details to form fields
        setValue("service", serviceData.service);
        // Assuming you have an `image` property in serviceData that contains the image URL
        // setValue("image", serviceData.image); // Uncomment if you have this field

        setValue("overview", serviceData.overview);
        setValue("paymentMethod", serviceData.paymentMethod);
        setValue("details", serviceData.details);
        setValue("pricing.policy", serviceData.pricing.policy);
        setValue("pricing.payment", serviceData.pricing.payment);

        // Set FAQ array
        serviceData.faq.forEach((faqItem, index) => {
          append({ question: faqItem.question, answer: faqItem.answer });
        });

        // Set noteToCustomer fields
        setValue(
          "noteToCustomer.preparation",
          serviceData.noteToCustomer.preparation
        );
        setValue(
          "noteToCustomer.delayCharge",
          serviceData.noteToCustomer.delayCharge
        );
        setValue(
          "noteToCustomer.complaintPolicy",
          serviceData.noteToCustomer.complaintPolicy
        );
        setValue(
          "noteToCustomer.belongings",
          serviceData.noteToCustomer.belongings
        );
        setValue(
          "noteToCustomer.waterElectricity",
          serviceData.noteToCustomer.waterElectricity
        );
        setValue(
          "noteToCustomer.extraCharge",
          serviceData.noteToCustomer.extraCharge
        );
        setValue(
          "noteToCustomer.noOtherWork",
          serviceData.noteToCustomer.noOtherWork
        );
      } catch (error) {
        console.error("Error fetching service:", error);
        toast.error("Failed to fetch service");
      }
    };

    fetchService();
  }, [axiosPublic, id, setValue, append]);

  const onSubmit = async (data) => {
    try {
      // Hosting the product image on imagebb and getting the direct link of the image
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const res = await axiosPublic.post(image_hosting_api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        const newData = { ...data, image: res.data.data.url };
        // Update product information in the database
        await axiosPublic.put(`/admin/services/${id}`, newData);

        toast.success("Service updated successfully!");
      }
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("Failed to update service");
    }
  };

  return (
    <section className="bg-white h-screen overflow-y-auto w-full">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-10 text-2xl font-bold text-black">Update service</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="w-full">
              <label
                className="block mb-2 text-sm font-medium text-black"
                htmlFor="service"
              >
                Service Name:
              </label>
              <input
                type="text"
                name="service"
                {...register("service", {
                  required: "Service name is required",
                })}
                id="service"
                className="input input-bordered input-accent w-full bg-transparent"
                placeholder="Service name"
              />
              {errors.service && (
                <p className="text-red-500 text-sm">{errors.service.message}</p>
              )}
            </div>
            {/* Uncomment and modify for image field if needed */}
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-black" htmlFor="image">
                Select Service Image:
              </label>
              <input
                type="file"
                id="image"
                name="image"
                {...register("image")}
                className="input pt-2 input-bordered input-accent w-full bg-transparent"
              />
              {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <label
                className="block mb-2 text-sm font-medium text-black"
                htmlFor="overview"
              >
                Overview:
              </label>
              <textarea
                name="overview"
                id="overview"
                {...register("overview", { required: "Overview is required" })}
                rows="8"
                className="input input-bordered input-accent w-full bg-transparent h-24"
                placeholder="Service overview"
              ></textarea>
              {errors.overview && (
                <p className="text-red-500 text-sm">
                  {errors.overview.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                className="block mb-2 text-sm font-medium text-black"
                htmlFor="paymentMethod"
              >
                Payment Method:
              </label>
              <textarea
                name="paymentMethod"
                id="paymentMethod"
                {...register("paymentMethod", {
                  required: "Payment method is required",
                })}
                rows="4"
                className="input input-bordered input-accent w-full bg-transparent h-24"
                placeholder="Details of the payment method"
              ></textarea>
              {errors.paymentMethod && (
                <p className="text-red-500 text-sm">
                  {errors.paymentMethod.message}
                </p>
              )}
            </div>
            <div className="mb-4 sm:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                FAQ:
              </label>
              {fields.map((item, index) => (
                <div
                  key={item.id}
                  className="mb-4 flex justify-between items-center gap-4 w-full"
                >
                  <input
                    type="text"
                    defaultValue={item.question}
                    {...register(`faq.${index}.question`, {
                      required: "Question is required",
                    })}
                    placeholder="Question"
                    className="input input-bordered mt-1 block input-accent w-[300px]"
                  />
                  {errors.faq && errors.faq[index]?.question && (
                    <p className="text-red-500 text-sm">
                      {errors.faq[index]?.question?.message}
                    </p>
                  )}
                  <input
                    type="text"
                    defaultValue={item.answer}
                    {...register(`faq.${index}.answer`, {
                      required: "Answer is required",
                    })}
                    placeholder="Answer"
                    className="input input-bordered mt-1 block input-accent w-[300px]"
                  />
                  {errors.faq && errors.faq[index]?.answer && (
                    <p className="text-red-500 text-sm">
                      {errors.faq[index]?.answer?.message}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => append({ question: "", answer: "" })}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add FAQ
              </button>
            </div>
            <div className="sm:col-span-2">
              <label
                className="block mb-2 text-sm font-medium text-black"
                htmlFor="details"
              >
                Service Details:
              </label>
              <textarea
                name="details"
                id="details"
                {...register("details", {
                  required: "Service details are required",
                })}
                rows="8"
                className="input input-bordered input-accent w-full bg-transparent h-24"
                placeholder="Detailed description of the service"
              ></textarea>
              {errors.details && (
                <p className="text-red-500 text-sm">{errors.details.message}</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                className="block mb-2 text-sm font-medium text-black"
                htmlFor="pricingPolicy"
              >
                Pricing Policy:
              </label>
              <textarea
                name="pricing.policy"
                id="pricingPolicy"
                {...register("pricing.policy", {
                  required: "Pricing policy is required",
                })}
                rows="4"
                className="input input-bordered input-accent w-full bg-transparent h-24"
                placeholder="Pricing policy details"
              ></textarea>
              {errors.pricing?.policy && (
                <p className="text-red-500 text-sm">
                  {errors.pricing.policy.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                className="block mb-2 text-sm font-medium text-black"
                htmlFor="pricingPayment"
              >
                Pricing Payment:
              </label>
              <textarea
                name="pricing.payment"
                id="pricingPayment"
                {...register("pricing.payment", {
                  required: "Pricing payment is required",
                })}
                rows="4"
                className="input input-bordered input-accent w-full bg-transparent h-24"
                placeholder="Payment details"
              ></textarea>
              {errors.pricing?.payment && (
                <p className="text-red-500 text-sm">
                  {errors.pricing.payment.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                className="block mb-2 text-sm font-medium text-black"
                htmlFor="noteToCustomerPreparation"
              ></label>
              <textarea
                name="noteToCustomer.preparation"
                id="noteToCustomerPreparation"
                {...register("noteToCustomer.preparation", {
                  required: "Preparation note is required",
                })}
                rows="4"
                className="input input-bordered input-accent w-full bg-transparent h-24"
                placeholder="Preparation note for the customer"
              ></textarea>
              {errors.noteToCustomer?.preparation && (
                <p className="text-red-500 text-sm">
                  {errors.noteToCustomer.preparation.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                className="block mb-2 text-sm font-medium text-black"
                htmlFor="noteToCustomerDelayCharge"
              >
                Delay Charge:
              </label>
              <textarea
                name="noteToCustomer.delayCharge"
                id="noteToCustomerDelayCharge"
                {...register("noteToCustomer.delayCharge", {
                  required: "Delay charge note is required",
                })}
                rows="4"
                className="input input-bordered input-accent w-full bg-transparent h-24"
                placeholder="Delay charge note for the customer"
              ></textarea>
              {errors.noteToCustomer?.delayCharge && (
                <p className="text-red-500 text-sm">
                  {errors.noteToCustomer.delayCharge.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                className="block mb-2 text-sm font-medium text-black"
                htmlFor="noteToCustomerComplaintPolicy"
              >
                Complaint Policy:
              </label>
              <textarea
                name="noteToCustomer.complaintPolicy"
                id="noteToCustomerComplaintPolicy"
                {...register("noteToCustomer.complaintPolicy", {
                  required: "Complaint policy note is required",
                })}
                rows="4"
                className="input input-bordered input-accent w-full bg-transparent h-24"
                placeholder="Complaint policy note for the customer"
              ></textarea>
              {errors.noteToCustomer?.complaintPolicy && (
                <p className="text-red-500 text-sm">
                  {errors.noteToCustomer.complaintPolicy.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                className="block mb-2 text-sm font-medium text-black"
                htmlFor="noteToCustomerBelongings"
              >
                Belongings:
              </label>
              <textarea
                name="noteToCustomer.belongings"
                id="noteToCustomerBelongings"
                {...register("noteToCustomer.belongings", {
                  required: "Belongings note is required",
                })}
                rows="4"
                className="input input-bordered input-accent w-full bg-transparent h-24"
                placeholder="Belongings note for the customer"
              ></textarea>
              {errors.noteToCustomer?.belongings && (
                <p className="text-red-500 text-sm">
                  {errors.noteToCustomer.belongings.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                className="block mb-2 text-sm font-medium text-black"
                htmlFor="noteToCustomerWaterElectricity"
              >
                Water and Electricity:
              </label>
              <textarea
                name="noteToCustomer.waterElectricity"
                id="noteToCustomerWaterElectricity"
                {...register("noteToCustomer.waterElectricity", {
                  required: "Water and electricity note is required",
                })}
                rows="4"
                className="input input-bordered input-accent w-full bg-transparent h-24"
                placeholder="Water and electricity note for the customer"
              ></textarea>
              {errors.noteToCustomer?.waterElectricity && (
                <p className="text-red-500 text-sm">
                  {errors.noteToCustomer.waterElectricity.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                className="block mb-2 text-sm font-medium text-black"
                htmlFor="noteToCustomerExtraCharge"
              >
                Extra Charge:
              </label>
              <textarea
                name="noteToCustomer.extraCharge"
                id="noteToCustomerExtraCharge"
                {...register("noteToCustomer.extraCharge", {
                  required: "Extra charge note is required",
                })}
                rows="4"
                className="input input-bordered input-accent w-full bg-transparent h-24"
                placeholder="Extra charge note for the customer"
              ></textarea>
              {errors.noteToCustomer?.extraCharge && (
                <p className="text-red-500 text-sm">
                  {errors.noteToCustomer.extraCharge.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                className="block mb-2 text-sm font-medium text-black"
                htmlFor="noteToCustomerNoOtherWork"
              >
                No Other Work:
              </label>
              <textarea
                name="noteToCustomer.noOtherWork"
                id="noteToCustomerNoOtherWork"
                {...register("noteToCustomer.noOtherWork", {
                  required: "No other work note is required",
                })}
                rows="4"
                className="input input-bordered input-accent w-full bg-transparent h-24"
                placeholder="No other work note for the customer"
              ></textarea>
              {errors.noteToCustomer?.noOtherWork && (
                <p className="text-red-500 text-sm">
                  {errors.noteToCustomer.noOtherWork.message}
                </p>
              )}
            </div>
            <button className="bg-[#1CA774] inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
              Update Service
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Update_Service;
