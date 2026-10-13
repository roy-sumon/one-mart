import { useEffect, useState } from "react";

const Employees = () => {
const [employees,setEmployees]=useState([])

    useEffect(() => {
    fetch('/employees.json')
    .then((response) =>response.json())
    .then((data) => setEmployees(data))
    }, [])
    console.log(employees)
  return (
    <section className="max-w-7xl mx-auto ">
        <h1 className="text-5xl font-bold py-10 text-center">Our employees</h1>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 justify-center items-center ">
 {
            employees.map((employee) => (
              <div key={employee.id} className="card bg-base-100  shadow-xl">
                <figure>
                  <img
                    src={employee.image}
                    className="w-80 h-44"
                    alt="Employee"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    {employee.name}
                  </h2>
                  <p>Phone: {employee.phone}</p>
                  <p>Service: {employee.service}</p>
                  <p>Address: {employee.address}</p>
                </div>
              </div>
            ))
        }
</div>
       
      {/* <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Employee"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            John Doe
          </h2>
          <p>Phone: (123) 456-7890</p>
          <p>Service: Plumber</p>
          <p>Address: 123 Main St, Anytown, USA</p>
    
        </div>
      </div> */}
    </section>
  );
};

export default Employees;
