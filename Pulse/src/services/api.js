//UmiJS, these API calls are based on fetch requests.

import { stringify } from "qs";



import request from "@/utils/request";


var config = {
  method: 'get',
  headers: { "content-type": "application/x-www-form-urlencoded" }
};


var corsProxy = "https://pulse-reroute.herokuapp.com/";



//Current API's








//First Semester Project API's 
export async function queryBusiness(business) {
  return request(`http://localhost:8000/api/business/${business}`);
}

export async function queryBusinessList(zip) {
  return request(
    `http://localhost:8000/api/businesslist/?zipcode=${zip}&startindex=0&endindex=10`
  );
}

export async function queryBusinessListMarkers(zip) {
  return request(
    `http://localhost:8000/api/businesslist/?zipcode=${zip}&startindex=0&endindex=1200`
  );
}

export async function querySocialMediaScore(bus) {
  return request(`http://localhost:8000/api/socialmediascore/${bus}`);
}



// export async function zipcoderatio() {
//   return request("https://pulse-proxy.herokuapp.com/https://cityvitality.com/api/zipcoderatio/", config);
// }

export async function zipcoderatio() {
  return request(corsProxy + "https://cityvitality.com/api/zipcoderatio/", config);
}



export async function socialmediascore() {
  return request("/api/socialmediascore/");
}
