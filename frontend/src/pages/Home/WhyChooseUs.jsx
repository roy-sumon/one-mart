import { MdMasks } from "react-icons/md";
import { MdOutlinePermPhoneMsg } from "react-icons/md";
import { MdOutlineGppGood } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import service1 from '../../assets/why_choose_us/service-1.jpg'
import service2 from '../../assets/why_choose_us/service-2.jpg'
import service3 from '../../assets/why_choose_us/service-3.jpg'
import service4 from '../../assets/why_choose_us/service-4.jpg'

const WhyChooseUs = () => {
  return (
    <section className="max-w-7xl mx-auto mb-10 my-20 lg:h-screen flex items-center  px-5 lg:px-0">
      
      <div className="lg:flex flew-row justify-between items-center gap-5">
        <div className="flex-1">
        <h3 className="text-xl font-bold text-green-700">Why Choose Us</h3>
      <h1 className="text-4xl font-bold mb-10">Because We care About Your Safety...</h1>
           <div className="grid grid-cols-2 bg-[#F7F5FA] p-5  gap-5">
          <div className="flex flex-col p-5 justify-center items-center gap-2 bg-white rounded-lg">
            <MdMasks className="text-5xl text-red-600" />
            <h1 className="text-xl font-bold">Safety first</h1>
          </div>
          <div className="flex flex-col p-5 justify-center items-center gap-2 bg-white rounded-lg">
            <MdOutlinePermPhoneMsg className="text-5xl text-red-600" />
            <h1 className="text-xl font-bold">24/7 support</h1>
          </div>
          <div className="flex flex-col p-5 justify-center items-center gap-2 bg-white rounded-lg">
            <MdOutlineGppGood className="text-5xl text-red-600" />
            <h1 className="text-xl font-bold">Quality Service</h1>
          </div>
          <div className="flex flex-col p-5 justify-center items-center gap-2 bg-white rounded-lg">
            <IoMdTime className="text-5xl text-red-600" />
            <h1 className="text-xl font-bold">Time Flexibility</h1>
          </div>
        </div>
        </div>
       
        <div className="flex-1 grid grid-cols-2 gap-5 p-10">
          <img className="w-full h-50 object-cover  hover:scale-105" src={service1} alt="" />
          <img className="w-full h-50 object-cover  hover:scale-105" src={service2} alt="" />
          <img className="w-full h-50 object-cover  hover:scale-105" src={service3} alt="" />
          <img className="w-full h-50 object-cover  hover:scale-105" src={service4} alt="" />
        </div>
      </div>
    </section>
  );
};
export default WhyChooseUs;
