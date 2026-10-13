import { useState } from 'react';
import people from './data';
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';

const Our_reviews = () => {
    const [index, setIndex] = useState(0);
    const { name, job, image, text } = people[index];

    const checkNumber = (number) => {
        if (number > people.length - 1) {
            return 0;
        } else if (number < 0) {
            return people.length - 1;
        }
        return number;
    };

    const nextPerson = () => {
        setIndex((index) => {
            let newIndex = index + 1;
            return checkNumber(newIndex);
        });
    };

    const prevPerson = () => {
        setIndex((index) => {
            let newIndex = index - 1;
            return checkNumber(newIndex);
        });
    };


    const sty1 = {
      
        height: '0.25rem',
        width: '5rem',
        background: 'blue',
        marginLeft: 'auto',
        marginRight: 'auto'
        
    };

    return (
        <div className="bg-base-200 py-10 lg:h-screen flex items-center px-5 lg:px-0">

        <div className="max-w-7xl  mx-auto sm:flex justify-between items-center gap-5 ">
            <div className="flex-1 max-w-3xl mx-auto">
                <div >
                    <h2 className='text-4xl font-bold mb-5 text-center'>Our Reviews</h2>
                    <div className="heading_underline" style={sty1}></div>
                </div>

                <article className="review bg-white p-6 rounded-lg shadow transition duration-300 hover:shadow-lg text-center">
                    <div className="img-container relative w-36 h-36 rounded-full mx-auto mb-6">
                        <img src={image} alt={name} className="person-img w-full h-full object-cover rounded-full" />
                        <span className="quote-icon absolute top-0 left-0 w-10 h-10 flex items-center justify-center rounded-full transform translate-y-3 bg-blue-500 text-white">
                            <FaQuoteRight />
                        </span>
                    </div>
                    <h4 className="author mb-1">{name}</h4>
                    <p className="job mb-2 text-xs text-blue-500 uppercase">{job}</p>
                    <p className="info mb-3 text-gray-600">{text}</p>
                    <div className="button-container flex justify-between">
                        <button className="prev-btn text-blue-700 text-xl" onClick={prevPerson}>
                            <FaChevronLeft />
                        </button>
                        <button className="next-btn text-blue-700 text-xl" onClick={nextPerson}>
                            <FaChevronRight />
                        </button>
                    </div>

                </article>
            </div>
            {/* <div className="flex-1 flex items-end justify-end pt-14">
                

                <img src="https://www.trustindex.io/wp-content/uploads/2021/02/review2.png" alt="" className="" />
                
            </div> */}
        </div>
        </div>
    );
};



export default Our_reviews;