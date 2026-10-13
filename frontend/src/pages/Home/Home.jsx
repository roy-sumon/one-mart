import Our_reviews from "../../components/Our_reviews/Our_reviews";
import Stat from "../../components/Stat/Stat";
import Most_Populer_services from "../Most_Populer_services/Most_Populer_services";
import Banner from "./Banner/Banner";
// import Banner_slider from "./Banner_slider/Banner_slider";
import Categories from "./Categories/Categories";
import Employees from "./Employees/Employees";
import WhyChooseUs from "./WhyChooseUs";
import Contact from "./contact/Contact";


const Home = () => {
    return (
        <div >
           <Banner/>
           {/* <Banner_slider/> */}
           <Categories/>
           <Most_Populer_services/>
           <WhyChooseUs />
           <Employees/>
           <Stat/>
           <Our_reviews/>
           <Contact />
        </div>
    );
};

export default Home;