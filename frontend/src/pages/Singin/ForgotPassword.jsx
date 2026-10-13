import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useContext } from "react";
import { toast } from "react-toastify";

const ForgotPassword=()=>{
    const { update_password } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const emalVal = e.target.email.value;
        console.log(emalVal);
        const result=update_password(emalVal)
        if(result?.message===true){
            console.log(result);
            toast.success('password updated!!!');
            navigate('/')
        }else{
            console.log(result);
            toast.error('Something went wrong');
        }
    }
    return(
        <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-10">Forgot Password</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input  className="input input-bordered w-full " name="email" type="text" placeholder="your email..." /><br/><br/>
                <button className="btn w-full">Reset</button>
            </form>
        </div>
    )
}
export default ForgotPassword;