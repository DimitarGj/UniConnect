import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/student";

export const StudentAuth = (email, password) => {
    return axios.get(REST_API_BASE_URL+"/"+email+"/"+password);
}