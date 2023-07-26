import axios from "axios";
import { Util } from "../common/util";

let url = `${Util.getInstance().getAPIURL()}`;

export function getCountries() {
  return axios({
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    url: `${url}/all`
  });
}

export function getCountryByName(name) {
  return axios({
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    url: `${url}/name/${name}`
  });
}