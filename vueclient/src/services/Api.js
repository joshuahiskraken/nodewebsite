const axios = require("axios");
//import axios from 'axios'
const API_URL = process.env.API_URL || "http://localhost:8081/user/login";
//have this file return a connector
//create axios object that points to the back end api
//can be used for hitting diffent end points
export default axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/JSON",
    Authorization: "Bearer " + localStorage.token
  }
});
