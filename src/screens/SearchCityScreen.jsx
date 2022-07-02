import React, { useState } from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import CitiesTable from '../components/CitiesTable'
import CircularProgress from '@mui/material/CircularProgress';

function SearchCity() {
	const [cityName, setCityname] = useState('')
	const [cities, setCities] = useState([])
	const [isLoading, setIsloading] = useState(false)


	const fetchCity = () => {
		setIsloading(true)
		axios.get(`https://restcountries.com/v2/capital/${cityName}`)
			.then((res) => {
				console.log(res.data);
				setCities(res.data)
				setIsloading(false)
				fetchWeather()
			})
			.catch((err) => {
				console.log(err);
				setIsloading(false)
			});
	};
	var APIkey = "4b3a77084eb9053bb44da35ed138c850" 
	var lat ="54"
	var lon ="-2"

	const fetchWeather = () => {
		axios
			.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}`)
			.then((res) => {
				console.log(res.data);
				// setCities(res.data)
			})
			.catch((err) => {
				console.log(err);
			});
	};

	
  return (
		<>
			<div className='search-section'>
			{/* <Input type="search" variant="outlined" /> */}
			<TextField
				type="search"
				className='search-button'
				required
				InputProps={{
				startAdornment: (
					<InputAdornment position="start">
					<SearchOutlinedIcon />
					</InputAdornment>
				)
				}}
				placeholder="Search city"
					onChange={(e) => setCityname(e.target.value)}
				/>
			<Button
				type="submit"
				variant="contained"
				sx={{ mt: 3, mb: 2 }}
				onClick={() => cityName != "" ?fetchCity() : false}
				>
				Search  {isLoading ? <CircularProgress color="inherit" size="15px"/>:false}
				</Button>
			</div>
			{cities.length !==0 ?<CitiesTable cities={cities}/>:false}
		</>
    );
}

export default SearchCity;
