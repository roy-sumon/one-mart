import RepairServiceDetail from "./RepairServiceDetail";

const BookService = () => {
  return (
    <section className="max-w-7xl mx-auto">
      <div className="bg-black rounded-lg">
        <div
          className="h-[calc(100vh-70px)] bg-cover bg-center bg-no-repeat flex flex-row items-center justify-center rounded-lg mt-10"
          style={{
            borderRadius:"35px",
            backgroundImage: "url('https://i.ibb.co/9VpTRv7/service.jpg')",
            opacity: 0.9,
          }}
        >
          <div className="space-y-5 bg-[#00000065] w-full h-full flex flex-col items-center justify-center text-center px-5">
            <h1 className="font-bold text-5xl sm:text-7xl text-white">
              Having Troubles? <br /> We are here to help
            </h1>
            <p className="font-semibold text-white text-xl ">
              One-stop solution for your services. Order any service, anytime.
            </p>
          </div>
        </div>
      </div>
      <div>
        <RepairServiceDetail />
      </div>
    </section>
  );
};
export default BookService;
