import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
export default function A(props) {
  const userdata = [
    { userid: 1, Name: "amar" },
    { userid: 2, Name: "ranju" },
  ];
  const [data, setuserdata] = useState([]);
  const [loginform, setloginform] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
        setuserdata(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  let handleClick = () => {
    props.history.push("/dashboard");
  };

  let handleChange = (e) => {
    const { name, checked } = e.target;
    if (name == "All") {
      let tempuser = data.map((item) => {
        return { ...item, isChecked: checked };
      });
      setuserdata(tempuser);
    } else {
      let tempusers = data.map((user) =>
        user.name === name ? { ...user, isChecked: checked } : user
      );
      setuserdata(tempusers);
    }
  };
  let chnageHandler = (e) => {
    let value = e.target.value;
    setloginform({
      ...loginform,
      [e.target.name]: value,
    });
  };
  return (
    <div>
      {console.log(loginform)}
      Name: {loginform.username}
      Password:{loginform.password}
      <button onClick={(e) => handleClick(e)} type="button">
        Click
      </button>
      <form>
        <input
          type="text"
          name="username"
          value={loginform.username}
          onChange={(e) => chnageHandler(e)}
        ></input>
        <input
          type="text"
          name="password"
          value={loginform.password}
          onChange={(e) => chnageHandler(e)}
        ></input>
      </form>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">
              Select All &nbsp;
              <input
                type="checkbox"
                name="All"
                checked={
                  data.filter((user) => user?.isChecked !== true).length < 1
                }
                onChange={(e) => handleChange(e)}
              ></input>
            </th>
            <th scope="col">fname</th>
            <th scope="col">username</th>
            <th scope="col">email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr>
              <th scope="row">
                <input
                  type="checkbox"
                  name={item.name}
                  onChange={(e) => handleChange(e)}
                  checked={item?.isChecked || false}
                ></input>
              </th>
              <td>{item.name}</td>
              <td>{item.username}</td>
              <td>@{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
