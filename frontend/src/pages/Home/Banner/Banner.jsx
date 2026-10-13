import { useContext } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";

const Banner = () => {
const {setSearchValue}=useContext(AuthContext)
const navigate = useNavigate()
const handleSearch=()=>{
    navigate("/services")
}
    return (
        <div className="h-[calc(100vh-70px)] bg-cover bg-center bg-no-repeat flex flex-row items-center justify-center rounded-lg" style={{ backgroundImage: "url('https://images.summitmedia-digital.com/cosmo/images/articles/article/Beauty_Picks/000idonailsmain.jpg')" }}>
            <div className="space-y-5 bg-[#00000065] w-full h-full flex flex-col items-center justify-center text-center px-5">
                <h1 className="font-bold text-5xl sm:text-7xl text-white">Your Personal Assistant</h1>
                <p className="font-semibold text-white text-xl ">One-stop solution for your services. Order any service, anytime.</p>
                <div className="flex gap-5">
                    <button className="btn bg-white text-xl font-bold"><CiLocationOn className="text-red-600"/>Ashulia</button>
                    <label className="input input-bordered flex items-center  justify-between gap-2">
                        <input type="text" onChange={(e)=>setSearchValue(e.target.value)} name="search" className="grow lg:w-[400px]" placeholder="Find your service here e.g. AC, Car, Facial..." />
                        
                        <div className="bg-red-600 text-white  p-3 rounded-md -mr-2 py-2">
                            <FaSearch onClick={handleSearch}/>
                           
                            </div>
                    </label>
                    <div className="">

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;