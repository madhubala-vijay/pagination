

import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setdata] = useState([]);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    async function fetchData() {
      let response = await fetch("https://dummyjson.com/products",{
        method:"GET"
        });
      response = await response.json();
      console.log(response.products);
      setdata(response.products);
    }
    fetchData();
  }, [data]);
  let lastIndex = productsPerPage * currentPage;
  let firstIndex = lastIndex - productsPerPage;
  const currentProducts = data.slice(firstIndex, lastIndex);
  const totalProducts = data.length;
  const btnArray = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    btnArray.push(i);
  }

  return (
    <>
      <label htmlFor="">
        ProductsPerPage:{" "}
        <select name="" id="" onChange={(e)=>{setProductsPerPage(e.target.value)}}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </label>
      <table>
        <tr>
          <th>S.NO</th>
          <th>TITLE</th>
          <th>DESCRIPTION</th>
          <th>PRICE</th>
        </tr>
        {currentProducts.map((product, index) => (
          <tr key={index}>
            <td>{product.id}</td>
            <td>{product.title}</td>
            <td>{product.description}</td>
            <td>{product.price}</td>
          </tr>
        ))}
      </table>
      {btnArray.map((num, index) => (
        <button
          key={index}
          onClick={() => {
            setCurrentPage(num);
          }}
        >
          {num}
        </button>
      ))}
    </>
  );
}

export default App;
