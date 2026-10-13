import Review from "./Review";
import RatingStar from "./RatingStar";
import ReviewForm from "./ReviewForm";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Reviews = ({ id }) => {
  const axiosPublic = useAxiosPublic()


 

  const {  data:reviews,refetch } = useQuery({
    queryKey: ['service',id],
    queryFn: async() =>
     { const res =await axiosPublic.get(`/reviews/${id}`)
      return res.data}
  })
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Product Reviews</h1>

      {/* <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Average Rating:{" "}
          <span>
            {" "}
            <RatingStar Rating_value={3.5} />
          </span>{" "}
        </h2>
      </div> */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">User Reviews </h2>
        {reviews?.map((review) => (
          <Review key={review._id} review={review} />
        ))}
      </div>
      <ReviewForm id={id} refetch={refetch}/>
    </div>
  );
};

export default Reviews;