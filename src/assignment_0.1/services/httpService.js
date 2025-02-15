import axios from "axios";
import auth from "./authService";
const baseURL="https://ui-assignment-5.onrender.com";
function get(url)
{   let token=auth.getToken()
    return axios.get(baseURL+url, {
    headers: {
      'Authorization':token
    }
  })

}
function post(url,obj)
{   console.log(obj)
    return axios.post(baseURL+url,obj);

}
function put(url,obj)
{   let token=auth.getToken()
    return axios.put(baseURL+url,obj,{
      headers: {
        'Authorization':token
      }
    });

}
function deleteApi(url)
{   return axios.delete(baseURL+url);

}
export default{
    get,
    post,
    put,
    deleteApi,
};