import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCountryDetail } from "../Services"
import "./CountryDetail.css" 

export default function CountryDetail(props){
    const {countryCode} = useParams()
    const [detail,setDetail] = useState({})

    useEffect(()=>{
        getCountryDetail(countryCode).then(result=>{
            setDetail(result.data)
            console.log(result.data)
        })
    },[countryCode])

    return (
        <div className="country-detail-wrapper">
            <h2>Details of the Country</h2> 
            <div>
                <img src={detail.flags?.png} alt={detail.name} />
            </div>
            <div>
                <div>
                Name: {detail?.name}
                </div>
                <div>
                Capital: {detail?.capital}
                </div>
                <div>
                Population: {detail?.population}
                </div>
                <div>
                Currencies: {detail.currencies?.map(currency=> currency.name).join(",")}
                </div>
            </div>
        </div>
    )

}