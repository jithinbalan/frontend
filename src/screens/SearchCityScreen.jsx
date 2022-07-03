import React, { useState } from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import CitiesTable from '../components/CitiesTable'
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

function SearchCity() {
	const [cityName, setCityname] = useState('')
	const [cities, setCities] = useState([])
	const [isLoading, setIsloading] = useState(false)


	const fetchCity =async () => {
		setIsloading(true)
		// axios.get(`https://restcountries.com/v2/capital/${cityName}`)
		//  .then((res) => {
		//    console.log(res.data);
		//    setCities(res.data)
		//    let latLng = res.data.latlng
		//    fetchWeather(latLng)
		//    setIsloading(false)
		//  })
		//  .catch((err) => {
		//    console.log(err);
		//    setIsloading(false)
		//  });

			await axios.get(`https://restcountries.com/v2/capital/${cityName}`)
			.then((response) => {
				return response.data
			})
			.then(async (Cities) => {
				await fetchWeather(Cities)
			});
	};

	const fetchWeather = (Cities) => {
			let params = {
				lat: Cities[0].latlng[0],
				lon: Cities[0].latlng[1],
				lang: 'null',
				units: 'imperial',
			  }
			  let headers = {
				'X-RapidAPI-Key': 'd742cbe59cmsh467ffee9a090dddp157f3ajsn0828b63f97f3',
				'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
			  }
			axios.get('https://community-open-weather-map.p.rapidapi.com/weather',{params,headers}).then(function (weatherResponse) {
				
			  let weatherData = weatherResponse.data
			  
			    let CityData ={
					Capital:Cities[0].capital?? "N/A",
					StateName:Cities[0].subregion?? "N/A",
					TouristRating:Cities[0].TouristRating?? "N/A",
					CountryName:Cities[0].nativeName?? "N/A",
					DateEstablished:Cities[0].dateestablished?? "N/A",
					Population:Cities[0].population?? "N/A",
					Currency:Cities[0].currencies[0].name+"("+Cities[0].currencies[0].symbol+")"?? "N/A",
					Weather: weatherData.main.temp+"°C",
					WeatherIcon: `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`,
				}
				console.log("CityData",Cities[0].latlng[0]);

				setCities(CityData);
		        setIsloading(false)
			}).catch(function (error) {
				console.error(error);
			});
	};

	
  return (
		<>
				
			<Container sx={{ py: 8 }} maxWidth="md">    
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							type="search"
							className='search-button'
							required
							fullWidth
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
					</Grid>
					<Grid item xs={12} justifyContent="center" container>
						<Button
							type="submit"
							color="inherit" 
							variant="outlined" 
							sx={{ mt: 3, mb: 2 }}
							onClick={() => cityName != "" ? fetchCity() : false}
							>
							Search  {isLoading ? <CircularProgress color="inherit" size="15px"/>:false}
						</Button>
					</Grid>
				</Grid>
				{cities.length !==0 ?<CitiesTable cities={cities}/>:false}
			</Container>
		</>

    );
}

export default SearchCity;
