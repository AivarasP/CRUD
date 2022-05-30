import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const List = () => {
    const [income, setIncome] = useState([]);
    const loadIncome = () => {
      axios.get("http://localhost:3001/incomes").then((res) => {
        setIncome(res.data.reverse());
      });
    };

    useEffect(() => {
        loadIncome();
      }, [income]);
 
    function Delete(id) {
      Swal.fire({
        title: 'Ar tikrai norite ištrinti?',
        text: "Sugražinti nebus galima.",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: "Ne, atšaukti!",
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Taip, ištrinti!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Įrašas ištrintas!',
            '',
            'success'
          )
          axios.delete(`http://localhost:3001/incomes/${id}`).then(()=>loadIncome())
        }
      })
    }
    return ( 
        <div className="w-full h-full flex flex-col px-10 py-8">
        <div className="w-full flex flex-col min-h-[50vh] justify-center items-center">
          
          <h1 className="text-black  text-3xl">
            Pajamos
          </h1>
          <table className="w-[60%] text-center overflow-hidden overflow-y-scroll mt-8 border border-black">
            <thead className="border-b bg-gray-600">
              <tr>
                
                <th
                  scope="col"
                  className="text-lg font-medium text-white px-6 py-4"
                >
                  Suma
                </th>
                <th
                  scope="col"
                  className="text-lg font-medium text-white px-6 py-4"
                >
                  Pajamų Šaltinis
                </th>
                <th
                  scope="col"
                  className="text-lg font-medium text-white px-6 py-4"
                >
                  Data
                </th>
                <th
                  scope="col"
                  className="text-lg font-medium text-white px-6 py-4"
                >
                  Veiksmai
                </th>
              </tr>
            </thead>
            <tbody>
              {income.map((incomes, index) => (
                <tr key={index}>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-light text-gray-900">
                    {incomes.sum}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-light text-gray-900">
                    {incomes.comment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-light text-gray-900">
                    {incomes.date}
                  </td>
                  <td className="flex justify-center items-center space-x-4 mt-1">
                  <Link to={`/edit/${incomes.id}`} className="px-4 py-2 text-white font-normal bg-blue-600 rounded-lg">
                    Redaguoti
                  </Link>
                    <button
                      onClick={() => Delete(incomes.id)}
                      className="px-4 py-2 text-white font-normal bg-red-600 rounded-lg"
                    >
                      Ištrinti
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
     );
}
 
export default List;