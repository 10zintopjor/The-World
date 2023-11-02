import axios from "axios"

const COUNTRY_API_ENDPOINT = "https://restcountries.com/v2"

export default function getAllCountries(){
    //Call Api and get the result
    return axios.get(`${COUNTRY_API_ENDPOINT}/all`)

}