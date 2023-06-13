import axios from "axios";
const API_URL = "http://localhost:49749/";
const loginCheck = (data) => {
  return axios
    .post("http://localhost:49749/api/Authenticate", {
      Username: data.Username,
      Password: data.Password
    })
    .then((response) => {
      console.log(response);
      return response.data;
    });
};

const AuthService = {
  loginCheck,
};
export default AuthService;
