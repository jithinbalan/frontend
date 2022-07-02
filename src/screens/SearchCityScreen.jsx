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
				// console.log("response.data",response.data);
				setCities(response.data)
			})
			.then(async (response) => {
				await fetchWeather(response)
			});
	};
	var APIkey = "4b3a77084eb9053bb44da35ed138c850" 
	var lat ="54"
	var lon ="-2"

	const fetchWeather = (response) => {
			// axios
			// .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}`)
			// .then((res) => {
			//  console.log(res.data);
			//  // setCities(res.data)
			// })
			// .catch((err) => {
			//  console.log(err);
			// });
			let params = {
				q: 'London,uk',
				lat: '52',
				lon: '-02',
				lang: 'null',
				units: 'imperial',
			  }
			  let headers = {
				'X-RapidAPI-Key': 'd742cbe59cmsh467ffee9a090dddp157f3ajsn0828b63f97f3',
				'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
			  }
			axios.get('https://community-open-weather-map.p.rapidapi.com/weather',{params,headers}).then(function (res) {
				
			
				// setCities(prevCities => {
				//   return { ...prevCities, "weather" : [response.data.main] }
				// })
				
		        // setIsloading(false)
				// // console.log("response",res);
				// // setCities({
				// //  ...cities,
				// //  "weather":"sss",
				// // });
				console.log("cities",cities);


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
				{/* {cities.length !==0 ?<CitiesTable cities={cities}/>:false} */}
			</Container>
		</>

    );
}

export default SearchCity;
