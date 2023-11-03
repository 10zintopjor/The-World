import CountryCard from "../Components/CountryCard";
import "./Home.css"
import { useEffect, useState } from "react";
import getAllCountries from "../Services/index";
import {Link} from "react-router-dom"
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';


function Home() {
  const [countriesList,setCountriesList] = useState([])
  const [filteredCountriesList,setFilteredCountriesList] = useState([])

  const [region, setRegion] = useState('');
  const [countryName,setCountryName] = useState("")

  useEffect(()=>{
    getAllCountries().then(result=>{
      const countries = result.data
      setCountriesList(countries)
      setFilteredCountriesList(countries)
    })
  },[])

  useEffect(()=>{
    if (region===""){
      setFilteredCountriesList(countriesList)
    }
    else{
    const filteredCountries = countriesList.filter((country)=>{
      if(country.region === region) return true;
      return false
    })
    setFilteredCountriesList(filteredCountries)
    }
  },[region,countriesList,countryName])

  
  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };

  const handleCountryChange = (event) =>{
    setCountryName(event.target.value)
    console.log(countryName)
  }

  return (
    <div className="App">
      <div className="filters-wrapper">
      <TextField id="outlined-basic" label="Search" variant="outlined" onChange={handleCountryChange} value={countryName}/>
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Filter By Region</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={region}
          label="Filter By Region"
          onChange={handleRegionChange}
        >
          <MenuItem value={'Africa'}>Africa</MenuItem>
          <MenuItem value={'Americas'}>America</MenuItem>
          <MenuItem value={'Asia'}>Aisa</MenuItem>
          <MenuItem value={'Europe'}>Europe</MenuItem>
          <MenuItem value={'Oceania'}>Oceania</MenuItem>

        </Select>
      </FormControl>
    </Box>

      </div>
      <div className="country-card-wrapper">
      {
        filteredCountriesList.map(country=>(
          <Link to={`countries/${country.alpha3Code}`}>
          <CountryCard name={country.name} capital={country.capital} population={country.population} flagUrl={country.flags.png} key={country.alpha3Code}/>
          </Link>
        ))
      }
      </div>    
    </div>
  );
}

export default Home;
