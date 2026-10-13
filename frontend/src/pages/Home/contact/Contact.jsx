import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
// import './index.scss'
const Contact = () => {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_8vi52w4",
        "template_ue5lzrh",
        form.current,
        "Nw2eLjHi1C2PE8ltS"
      )
      .then(
        () => {
          alert("Message successfully sent!");
          window.location.reload(false);
        },
        () => {
          alert("Failed to send the message, please try again");
        }
      );
  };
const myStyle={
    "z-index":"1000",
    "background-color":"#00000056"
}
  return (
    <>
      <div className="container contact-page my-20 max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 px-5 lg:px-0">
        <div className="text-zone border p-5 rounded-md shadow">
          <h1 className="text-4xl font-bold my-5">Contact Us</h1>
          <div className="contact-form">
            <form ref={form} onSubmit={sendEmail}>
              <ul className="space-y-5">
                <li className="">
                  <input
                    className="input input-bordered border-[1px] block w-full"
                    placeholder="Name"
                    type="text"
                    name="name"
                    required
                  />
                </li>
                <li className="half">
                  <input
                    className="input input-bordered border-[1px] block w-full"
                    placeholder="Email"
                    type="email"
                    name="email"
                    required
                  />
                </li>
                <li>
                  <input
                    className="input input-bordered border-[1px] block w-full"
                    placeholder="Subject"
                    type="text"
                    name="subject"
                    required
                  />
                </li>
                <li>
                  <textarea
                    className="input input-bordered border-[1px] block w-full h-40"
                    placeholder="Message"
                    name="message"
                    required
                  ></textarea>
                </li>
                <li>
                  <input
                    type="submit"
                    className="flat-button btn bg-red-600 text-white "
                    value="SEND"
                  />
                </li>
              </ul>
            </form>
          </div>
        </div>
        <div className="hidden lg:block relative">
          <div style={myStyle} className="info-map bg-black text-white w-[267px] h-fit p-5 absolute top-10 left-12">
            Bangladesh,
            <br />
            Dhaka,
            <br />
            OneMart Company Ltd. <br />
            Ashulia <br />
            <br />
            <span>finaldefence2024@gmail.com</span>
          </div>
          <div className="lg:h-[600px] -z-50">
            <MapContainer
              className="map-wrap h-full w-full"
              center={[23.8806, 90.3219]}
              zoom={13}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[23.8806, 90.3219]}>
                <Popup>
                  <p>
                    {/* Our Changaou <br /> Branch */}
                    চানগাও দখিন পাড়া
                  </p>
                </Popup>
              </Marker>
              <Marker position={[23.877896940759047, 90.31270145235797]}>
                <Popup>
                  <p>
                    {/* Our DSC <br /> Branch
                     */}
                     বউ বাজার
                  </p>
                </Popup>
              </Marker>
              <Marker position={[23.886711935887565, 90.31073497875849]}>
                <Popup>
                  <p>
                    {/* Our Charabag <br /> Branch */}
                    চারাবাগ মডেল পাড়া
                  </p>
                </Popup>
              </Marker>
              <Marker position={[23.896904376755543, 90.3328419530307]}>
                <Popup>
                  <p>
                    {/* Our Ashulia <br /> Branch */}
                    খাগান পূবপাড়া
                  </p>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
