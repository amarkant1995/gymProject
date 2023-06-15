
import axios from "axios";
const API_URL = "http://localhost:49749/api/Scheme";

const addScheme = (data) => {
  return axios
    .post("http://localhost:49749/api/Scheme", {
        SchemeID: data.SchemeID,
        SchemeName: data.SchemeName,
        Status:data.Status
    })
    .then((response) => {
      console.log(response);
      return response.data;
    });
};

const updateScheme = (data) => {
  return axios
    .put(`http://localhost:49749/api/Scheme/${data.SchemeID}`, {
        SchemeID: data.SchemeID,
        SchemeName: data.SchemeName,
        Status:data.Status
    })
    .then((response) => {
      console.log(response);
      return response.data;
    });
};

const deleteRow=(Id)=>{
return axios.delete(`http://localhost:49749/api/Scheme/${Id}`).then((response) => {
  console.log(response);
  
  return response.data;
});
}
const getAll=()=>{
return axios.get("http://localhost:49749/api/Scheme");
}

const getSchemeById=(Id)=>{
  return axios.get(`http://localhost:49749/api/Scheme/${Id}`);
  }
  
const SchemeService = {
    addScheme,
    getAll,
    getSchemeById,deleteRow,updateScheme
};
export default SchemeService;

