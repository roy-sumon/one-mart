import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

// imagebb auth credentials
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddService = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
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
        // Post product information to the database
        const serviceInfo = await axiosPublic.post("/services", newData);

        if (serviceInfo?.data?.insertedId) {
          toast.success("Service successfully added!");
        } else {
          toast.error("Something went wrong");
        }
      }
    } catch (error) {
      console.error("Error uploading image or adding service:", error);
      toast.error("Failed to add service");
    }
  };

  return (
    <section className="bg-white h-screen overflow-y-auto w-full">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-10 text-2xl font-bold text-black">Add a new service</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-black" htmlFor="service">
                Service Name:
              </label>
              <input
                type="text"
                name="service"
                {...register("service", { required: "Service name is required" })}
                id="service"
                className="input input-bordered input-accent w-full bg-transparent"
                placeholder="Service name"
              />
              {errors.service && <p className="text-red-500 text-sm">{errors.service.message}</p>}
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-black" htmlFor="image">
                Select Service Image:
              </label>
              <input
                type="file"
                id="image"
                name="image"
                {...register("image", { required: "Service image is required" })}
                className="input pt-2 input-bordered input-accent w-full bg-transparent"
              />
              {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-black" htmlFor="overview">
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
              {errors.overview && <p className="text-red-500 text-sm">{errors.overview.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-black" htmlFor="paymentMethod">
                Payment Method:
              </label>
              <textarea
                name="paymentMethod"
                id="paymentMethod"
                {...register("paymentMethod", { required: "Payment method is required" })}
                rows="4"
                className="input input-bordered input-accent w-full bg-transparent h-24"
                placeholder="Details of the payment method"
              ></textarea>
              {errors.paymentMethod && <p className="text-red-500 text-sm">{errors.paymentMethod.message}</p>}
            </div>
            <div className="mb-4 sm:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">FAQ:</label>
              {fields.map((item, index) => (
                <div key={item.id} className="mb-4 flex justify-between items-center gap-4 w-full">
                  <input
                    type="text"
                    defaultValue={item.question}
                    {...register(`faq.${index}.question`, { required: "Question is required" })}
                    placeholder="Question"
                    className="input input-bordered mt-1 block input-accent w-[300px]"
                  />
                  {errors.faq && errors.faq[index]?.question && (
                    <p className="text-red-500 text-sm">{errors.faq[index]?.question?.message}</p>
                  )}
                  <input
                    type="text"
                    defaultValue={item.answer}
                    {...register(`faq.${index}.answer`, { required: "Answer is required" })}
                    placeholder="Answer"
                    className="input input-bordered mt-1 block input-accent w-[300px]"
                  />
                  {errors.faq && errors.faq[index]?.answer && (
                    <p className="text-red-500 text-sm">{errors.faq[index]?.answer?.message}</p>
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
              <label className="block mb-2 text-sm font-medium text-black" htmlFor="details">
                Service Details:
              </label>
              <textarea
                name="details"
                id="details"
                {...register("details", { required: "Service details are required" })}
                rows="8"
                className="input input-bordered input-accent w-full bg-transparent h-24"
                placeholder="Detailed description of the service"
              ></textarea>
              {errors.details && <p className="text-red-500 text-sm">{errors.details.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-black" htmlFor="pricingPolicy">
                Pricing Policy:
              </label>
              <textarea
                name="pricing.policy"
                id="pricingPolicy"
                {...register("pricing.policy", { required: "Pricing policy is required" })}
                rows="4"
                className="input input-bordered input-accent w-full bg-transparent h-24"
                placeholder="Pricing policy details"
              ></textarea>
              {errors.pricing?.policy && <p className="text-red-500 text-sm">{errors.pricing.policy.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-black" htmlFor="pricingPayment">
                Pricing Payment:
              </label>
              <textarea
                name="pricing.payment"
                id="pricingPayment"
                {...register("pricing.payment", { required: "Pricing payment is required" })}
                rows="4"
                className="input input-bordered input-accent w-full bg-transparent h-24"
                placeholder="Payment details"
              ></textarea>
              {errors.pricing?.payment && <p className="text-red-500 text-sm">{errors.pricing.payment.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-black" htmlFor="noteToCustomer.preparation">
                Note to Customer - Preparation:
              </label>
              <textarea
                name="noteToCustomer.preparation"
                id="noteToCustomer.preparation"
                {...register("noteToCustomer.preparation", { required: "Preparation note is required" })}
                rows="4"
                className="input input-bordered input-accent w-full bg-transparent h-24"
                placeholder="Ensure the gas line is turned off before the service begins. Clear the area around the stove to provide easy access for our technician."
              ></textarea>
              {errors.noteToCustomer?.preparation && (
                <p className="text-red-500 text-sm">{errors.noteToCustomer.preparation.message}</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-black" htmlFor="noteToCustomer.delayCharge">
                Note to Customer - Delay Charge:
              </label>
              <textarea
                name="noteToCustomer.delayCharge"
                id="noteToCustomer.delayCharge"
                {...register("noteToCustomer.delayCharge", { required: "Delay charge note is required" })}
                rows="4"
                className="input input-bordered input-accent w-full bg-transparent h-24"
                placeholder="If there is a delay caused by the customer, an additional charge will be applied."
              ></textarea>
              {errors.noteToCustomer?.delayCharge && (
                <p className="text-red-500 text-sm">{errors.noteToCustomer.delayCharge.message}</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-black" htmlFor="noteToCustomer.complaintPolicy">
                Note to Customer - Complaint Policy:
              </label>
              <textarea
                name="noteToCustomer.complaintPolicy"
                id="noteToCustomer.complaintPolicy"
                {...register("noteToCustomer.complaintPolicy", { required: "Complaint policy note is required" })}
                rows="4"
                className="input input-bordered input-accent w-full bg-transparent h-24"
                placeholder="Please inspect the work before the technician leaves. No complaints will be accepted after the technician has left."
              ></textarea>
              {errors.noteToCustomer?.complaintPolicy && (
                <p className="text-red-500 text-sm">{errors.noteToCustomer.complaintPolicy.message}</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-black" htmlFor="noteToCustomer.belongings">
                Note to Customer - Belongings:
              </label>
              <textarea
                name="noteToCustomer.belongings"
                id="noteToCustomer.belongings"
                {...register("noteToCustomer.belongings", { required: "Belongings note is required" })}
                rows="4"
                className="input input-bordered input-accent w-full bg-transparent h-24"
                placeholder="Keep expensive belongings in a safe place during the service."
              ></textarea>
              {errors.noteToCustomer?.belongings && (
                <p className="text-red-500 text-sm">{errors.noteToCustomer.belongings.message}</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-black" htmlFor="noteToCustomer.waterElectricity">
                Note to Customer - Water & Electricity:
              </label>
              <textarea
                name="noteToCustomer.waterElectricity"
                id="noteToCustomer.waterElectricity"
                {...register("noteToCustomer.waterElectricity", { required: "Water & electricity note is required" })}
                rows="4"
                className="input input-bordered input-accent w-full bg-transparent h-24"
                placeholder="Ensure access to fresh water and electricity if required for the service."
              ></textarea>
              {errors.noteToCustomer?.waterElectricity && (
                <p className="text-red-500 text-sm">{errors.noteToCustomer.waterElectricity.message}</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-black" htmlFor="noteToCustomer.extraCharge">
                Note to Customer - Extra Charge:
              </label>
              <textarea
                name="noteToCustomer.extraCharge"
                id="noteToCustomer.extraCharge"
                {...register("noteToCustomer.extraCharge", { required: "Extra charge note is required" })}
                rows="4"
                className="input input-bordered input-accent w-full bg-transparent h-24"
                placeholder="If additional services are requested or the work area increases, extra charges may apply."
              ></textarea>
              {errors.noteToCustomer?.extraCharge && (
                <p className="text-red-500 text-sm">{errors.noteToCustomer.extraCharge.message}</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-black" htmlFor="noteToCustomer.noOtherWork">
                Note to Customer - No Other Work:
              </label>
              <textarea
                name="noteToCustomer.noOtherWork"
                id="noteToCustomer.noOtherWork"
                {...register("noteToCustomer.noOtherWork", { required: "No other work note is required" })}
                rows="4"
                className="input input-bordered input-accent w-full bg-transparent h-24"
                placeholder="Ensure no other work is being carried out in the premises during the service."
              ></textarea>
              {errors.noteToCustomer?.noOtherWork && (
                <p className="text-red-500 text-sm">{errors.noteToCustomer.noOtherWork.message}</p>
              )}
            </div>
          </div>
          <button className="bg-[#1CA774] inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
            Add Service
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddService;
