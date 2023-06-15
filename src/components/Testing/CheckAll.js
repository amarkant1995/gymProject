import React, { useState } from "react";
import A from "./A";

export default function CheckAll() {
  const [checked, setChecked] = useState([]);
  const [IsChecked, setIsChecked] = useState(false);
  const [chkValue, setChkValue] = useState(false);

  const [userdata, setUserdata] = useState({
    Name: "",
    country: [],
  });
  const [country, setCountry] = useState([
    {
      id: "1",
      countryName: "AMERICA",
    },
    {
      id: "2",
      countryName: "AUSTRALIA",
    },
    {
      id: "3",
      countryName: "INDIA",
    },
    {
      id: "4",
      countryName: "ENGLAND",
    },
  ]);

  let ChangeHandler = (e) => {
    const { name, value, checked } = e.target;
    var formObj = {};
    if (name == "country") {
      if (e.target.checked) {
        formObj = { ...userdata };
        console.log("object key Array is", formObj["country"]);
        formObj[name].push(value);
      } else {
        formObj = {
          ...userdata,
          [name]: userdata[name].filter((x) => x !== value),
        };
      }
      setUserdata(formObj);
    } else {
      formObj = {
        ...userdata,
        [name]: value,
      };
      setUserdata(formObj);
    }
  };

  let setCheckedOut = (e) => {
    
    
    

  };
  
  const handleCheckAllChange = (e) => {
    if (e.target.checked) {
      const allCountries = country.map((c) => c.countryName);
      console.log('allCountries',allCountries);
      setChecked(allCountries);

    } else {
      setChecked([]);
    }
  };
  const handleCountryChange = (e, c) => {
    if (e.target.checked) {
      setChecked([...checked, c.countryName]);
    } else {
      setChecked(checked.filter((item) => item !== c.countryName));
    }
  };

  return (
    <React.Fragment>
       <input className="form-control" type="checkbox"   onChange={(e) => setCheckedOut(e)}/>
      
     <input type="checkbox"  checked={IsChecked}></input>
      <button onClick={(e) => setIsChecked(!IsChecked)}>Checked</button>

     <label>Checked</label>
      <input
        type="text"
        onChange={(e) => ChangeHandler(e)}
        name="Name"
        value={userdata.Name}
      ></input>
      <input type="checkbox"></input>
      <label>Select All</label>
      {country.map((item, i) => (
        <div key={i} className="p-4">
          &nbsp;{" "}
          <input
            type="checkbox"
            name="country"
            onChange={(e) => ChangeHandler(e)}
            value={item.id}
          ></input>
          <label>{item.countryName}</label>
        </div>
      ))}


<div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="selectAll"
                checked={checked.length === country.length}
                onChange={handleCheckAllChange}
              />
              <label className="form-check-label" htmlFor="selectAll">
                Select all
              </label>
            </div>
            {country.map((c) => (
              <div className="form-check form-check-inline" key={c.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={c.id}
                  checked={checked.includes(c.countryName)}
                  onChange={(e) => handleCountryChange(e, c)}
                />
                <label className="form-check-label" htmlFor={c.id}>
                  {c.countryName}
                </label>
              </div>
            ))}
    </React.Fragment>
  );
}
