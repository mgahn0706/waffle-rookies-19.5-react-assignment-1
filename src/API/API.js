import axios from "axios";

const request = axios.create({baseURL:"https://p04fpgjlo3.execute-api.ap-northeast-2.amazonaws.com/v1"});

export default request;