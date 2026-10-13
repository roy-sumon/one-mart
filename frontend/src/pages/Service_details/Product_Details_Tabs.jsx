import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import App from '../../components/Discussion_forum/App'
import Reviews from './Reviews';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const Product_Details_Tabs = ({ id }) => {
    const [info, setInfo] = useState({});
    const axiosPublic = useAxiosPublic()


    useEffect(() => {

        axiosPublic.get(`/services/${id}`)
            .then((res) => setInfo(res.data));
    }, [id, axiosPublic]);

    return (
        <div>
            <Tabs>
                <TabList>
                    <Tab>Description</Tab>
                    <Tab>Reviews</Tab>
                    <Tab>live Chat</Tab>
                </TabList>

                <TabPanel className="">

                    <div className="space-y-5">

                        <h2 className='text-4xl font-bold'>Overview of {info?.service}</h2>
                        <hr />
                        <div className="">

                            <p> <span className='text-xl font-bold'> Note To Customer: </span><br /> {info?.overview}</p> {/* Displaying description from fetched data */}
                            <p> <span className='text-xl font-bold'>Payment Method:</span> <br /> {info?.paymentMethod}</p> {/* Displaying payment method */}
                        </div>

                        <div className="space-y-5">
                            <h1 className="text-4xl font-bold">FAQ
                            </h1>
                            <hr />
                            <div className="join join-vertical w-full">

                                {
                                    info?.faq?.map((i, idx) => <div key={idx} className="collapse collapse-arrow bg-base-200 mb-5">
                                        <input type="radio" name="my-accordion-2" defaultChecked />
                                        <div className="collapse-title text-xl font-medium">
                                            {i?.question}
                                        </div>
                                        <div className="collapse-content">
                                            <p>{i?.answer}</p>
                                        </div>
                                    </div>)
                                }


                            </div>
                        </div>
                        <div className="space-y-5">
                            <h3 className='text-xl font-bold'>Details : </h3> {info?.details}

                            <h3 className='text-xl font-bold'>Terms & Pricing : </h3>
                            <ul className='list-disc ml-10'>

                                <li>  {info?.pricing?.policy}</li>
                                <li>  {info?.pricing?.payment}</li>
                            </ul>

                        </div>
                        <div className="space-y-5">
                            <h3 className="text-3xl font-semibold underline">Note To Customer:</h3>
                            <ul className='list-disc ml-10'>
                                <li>{info?.noteToCustomer?.preparation}</li>
                                <li>{info?.noteToCustomer?.delayCharge}</li>
                                <li>{info?.noteToCustomer?.complaintPolicy}</li>
                                <li>{info?.noteToCustomer?.belongings}</li>
                                <li>{info?.noteToCustomer?.waterElectricity}</li>
                                <li>{info?.noteToCustomer?.extraCharge}</li>
                                <li>{info?.noteToCustomer?.noOtherWork}</li>
                            </ul>
                        </div>
                    </div>

                </TabPanel>
                <TabPanel>

                    <Reviews id={id} />

                </TabPanel>
                <TabPanel className='h-[60vh]'>
                    <h2 className='text-2xl font bold'>Wellcome to Live-chat</h2>
                    <p>Share a suggetion or ask any qustions</p>
                    <App />
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Product_Details_Tabs;
