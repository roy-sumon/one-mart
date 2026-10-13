import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import App from "./App.jsx";
const DisscusionForumDetails=()=>{
    const {id}=useParams()
    const axiosPublic = useAxiosPublic();
    const [thread,setTread]=useState()
    useEffect(() => {
        axiosPublic.get(`/discussion/${id}`).then((res) => {
            setTread(res.data);
        });
      }, [axiosPublic,id]);
    return(
        <section className="mx-5">
            <h1 className="text-2xl font-bold mt-2 hover:text-green-600">
                {thread?.discussion}
              </h1>
              <p className="mb-2">
                Thread created by{" "}
                <span className="font-semibold">{thread?.author}</span>
              </p>
              <div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, fuga deleniti maiores soluta dolores veritatis sed recusandae quis, officiis aliquam necessitatibus nihil accusantium alias similique neque minus. Labore, ipsa dignissimos.</p>
                <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia, vero..Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, fuga deleniti maiores soluta dolores veritatis sed recusandae quis, officiis aliquam necessitatibus nihil accusantium alias similique neque minus. Labore, ipsa dignissimos.</p>
              </div>
              <App />
        </section>
    );
};
export default DisscusionForumDetails