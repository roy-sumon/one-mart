import { useParams } from "react-router-dom";
import Product_Details_Tabs from "./Product_Details_Tabs";
import { SiTicktick } from "react-icons/si";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Service_details = () => {
    const { id } = useParams()
    const [info, setInfo] = useState({});
    const axiosPublic = useAxiosPublic()


    useEffect(() => {

        axiosPublic.get(`/services/${id}`)
            .then((res) => setInfo(res.data));
    }, [id, axiosPublic]);

   
    return (
        <div>
            <div className="max-w-7xl mx-auto px-10">
                <div className=" mt-5 bg-cover bg-center bg-no-repeat flex flex-row items-center h-[60vh] justify-center rounded-lg" style={{ backgroundImage: `url('${info?.image}')` }}
                >
                    <div className="space-y-5 bg-[#00000065] rounded-lg w-full h-full  sm:pl-24 flex flex-col items-start text-white justify-center  px-5">
                        <div className="bg-white text-red-600 p-2 rounded-md">
                            <h4 className="text-sm sm:text-base">

                            Home &gt; Cleaning Solution &gt; {info?.service}
                            </h4>
                        </div>
                        <h1 className="font-bold text-2xl sm:text-6xl text-white">{info?.service}</h1>
                        <ul className=" ml-10 sm:text-lg space-y-4">
                            <li className="flex items-center gap-2 "><SiTicktick className="bg-white p-2 text-red-600 text-4xl rounded-2xl" />On time Work Completion</li>
                            <li className="flex items-center gap-2"><SiTicktick className="bg-white p-2 text-red-600 text-4xl rounded-2xl" />Trust and Experienced Cleaner</li>
                            <li className="flex items-center gap-2"><SiTicktick className="bg-white p-2 text-red-600 text-4xl rounded-2xl" />Best Quality Cleaning Accessories</li>
                        </ul>

                    </div>
                </div>
                <div className="divider"></div>

                <div className="">
                    <Product_Details_Tabs id={id} />
                </div>

            </div>
        </div>
    );
};

export default Service_details;