import React, { useState } from 'react'
import "./css/HeaderNavBar.css";
import axios from 'axios';


export const SearchBar = ({setResults}) => {
  const [input, setInput] = useState("");
  const[data, setData] = useState("")
    
  const handleChange = (value) => {
    setInput(value);
    if (value.trim() === "") {
        setResults([]);  // Clears results if input is empty
    } else {
        getData(value);  // Fetches data for non-empty input
    }
}

  const getData = async(value) =>{
    const studentPromise = axios.get('http://localhost:8080/api/student/');
    const organizationPromise = axios.get('http://localhost:8080/api/student_org/');

    Promise.all([studentPromise, organizationPromise])
      .then((responses) => {
        const [studentResponse, organizationResponse] = responses;
        const studentResults = studentResponse.data.filter((user) => {
          return (
            value &&
            user &&
            (user.firstName || user.lastName) &&
            (user.firstName.toLowerCase().includes(value.toLowerCase()) || user.lastName.toLowerCase().includes(value.toLowerCase()))
          );
        });
        const organizationResults = organizationResponse.data.filter((organization) => {
          return (
            value &&
            organization &&
            organization.org_name &&
            organization.org_name.toLowerCase().includes(value.toLowerCase())
          );
        });
        const combinedResults = [...studentResults, ...organizationResults];
        setResults(combinedResults);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

    return (
    <div className='Search'>
      <input className='Search-Bar' placeholder='Search'
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  )
}

