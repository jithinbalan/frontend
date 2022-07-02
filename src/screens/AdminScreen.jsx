import React, { useState,useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useForm from 'react-hooks-form-validator';
import axios from 'axios';
import AddCityModel from './AddModel';
import EditCityModel from './AddModel';

const URL = process.env.REACT_APP_API_URL;

function CitiesTable() {
	const [addModelOpen, setAddModelOpen] = useState(false);
	const [editModelOpen, setEditModelOpen] = useState(false);
	const [cities, setCities] = useState([])
	const [selectedCity, setSelectedCity] = useState([])
	const [formData, setformData] = useState([]);

	const handleChange = (e) => {
		setformData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};
	// For model pop up
	const handleClickAddModelOpen = () => {
		setAddModelOpen(true);
	};

	// Set Close Flag
	const handleClose = () => {
		setAddModelOpen(false);
		setEditModelOpen(false);
	};

	const fetchAllCities= ()=>{
		axios.get(`${URL}/admin/allCities`)
			  .then(function (response) {
				  setCities(response.data)
			  })
			  .catch(function (error) {
				console.log(error);
			});
	}
	const addCity= (formData)=>{
		axios.post(`${URL}/admin/addCity`, formData)
			.then(function (response) {
				fetchAllCities()
				setAddModelOpen(false);
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
				setAddModelOpen(false);
			});
	}
	const deleteCity= (Id)=>{
		axios.delete(`${URL}/admin/${Id}`)
			.then(function (response) {
				fetchAllCities()
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	
	const updateCity= (e)=>{
		e.preventDefault()

		console.log("selectedCity",selectedCity)
		// axios.put(`${URL}/admin/${Id}`)
		//  .then(function (response) {

		//      console.log(response);
		//  })
		//  .catch(function (error) {
		//      console.log(error);
		//  });
	}
	const getCityByID = (Id)=>{

		axios.get(`${URL}/admin/${Id}`)
			.then(function (response) {
				setSelectedCity(response.data);
				setEditModelOpen(true);
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	// Initial api call to get all cities
	useEffect(() => {
		// Update the document title using the browser API
		fetchAllCities()
	},[]);

	// Handle Delete 
	const handleDelete = (id)=>{
		console.log(id)
		deleteCity(id)
	}
	// Handle Edit 
	const handleEdit = (id)=>{
		// console.log(id)
		getCityByID(id)
	}
	// Form Submission  
		const handleSubmit = (e) => {
			e.preventDefault()
			// const formData = {
			//  "cityname": cityname,
			//  "country": country,
			//  "state": state,
			//  "touristrating": touristrating,
			//  "dateestablished": dateestablished,
			//  "estimatedpopulation":estimatedpopulation,
			//  "currency":currency
			// }
			addCity(formData)
	    };
		const StyledTableCell = styled(TableCell)(({ theme }) => ({
			[`&.${tableCellClasses.head}`]: {
			backgroundColor: theme.palette.common.black,
			color: theme.palette.common.white,
			},
			[`&.${tableCellClasses.body}`]: {
			fontSize: 14,
			},
		}));
		const StyledTableRow = styled(TableRow)(({ theme }) => ({
			'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
			},
			// hide last border
			'&:last-child td, &:last-child th': {
			border: 0,
			},
		}));
    return (
		<div className='city-table'>
			<Typography component="h1" variant="h2" align="center" color="white" gutterBottom>
              Administrator
            </Typography>
			<Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleClickAddModelOpen} >Add <AddIcon/></Button>
			<AddCityModel open={addModelOpen} handleClose={handleClose} handleChange={handleChange} handleSubmit={handleSubmit} Title="Create City"/>
			<EditCityModel open={editModelOpen} handleClose={handleClose} handleChange={handleChange} handleSubmit={updateCity} Title="Edit City" selectedCity={selectedCity} />
			
			{/* <Dialog open={open} onClose={handleClose}>
				<DialogTitle>Create City</DialogTitle>
				<form onSubmit={handleSubmit} method="POST" encType='multipart/form-data'>
					<DialogContent>
							<DialogContentText/>
							<TextField
								autoFocus
								required
								margin="dense"
								name="cityname"
								label="City Name"
								type="text"
								fullWidth
								variant="standard"
								onChange={(e) => handleChange(e)}

							/>
							<TextField
								autoFocus
								required
								margin="dense"
								name="state"
								label="State"
								type="text"
								fullWidth
								variant="standard"
								onChange={(e) => handleChange(e)}

							/>
							<TextField
								autoFocus
								required
								margin="dense"
								name="country"
								label="Country Name"
								type="text"
								fullWidth
								variant="standard"
								onChange={(e) => handleChange(e)}

							/>
							<TextField
								autoFocus
								required
								margin="dense"
								name="touristrating"
								label="Tourist Rating"
								fullWidth
								variant="standard"
								onChange={(e) => handleChange(e)}

							/>
							<TextField
								autoFocus
								required
								margin="dense"
								name="estimatedpopulation"
								label="Estimated Population "
								fullWidth
								variant="standard"
								onChange={(e) => handleChange(e)}

							/>
							<TextField
								autoFocus
								required
								margin="dense"
								name="currency"
								label="Currency "
								fullWidth
								variant="standard"
								onChange={(e) => handleChange(e)}
							/>
							<TextField
								autoFocus
								required
								margin="dense"
								name="dateestablished"
								label="Date Established "
								fullWidth
								variant="standard"
								onChange={(e) => handleChange(e)}
							/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button type='submit'>Submit</Button>
					</DialogActions>
				</form>
			</Dialog> */}
			<Table sx={{ minWidth: 700 }} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell>City Name</StyledTableCell>
						<StyledTableCell>State</StyledTableCell>
						<StyledTableCell>Country</StyledTableCell>
						<StyledTableCell>Tourist Rating</StyledTableCell>
						<StyledTableCell>Date Established</StyledTableCell>
						<StyledTableCell>Estimated Population</StyledTableCell>
						<StyledTableCell>Currency</StyledTableCell>
						<StyledTableCell>Weather</StyledTableCell>
						<StyledTableCell>Modifiy</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
                    
					{cities.length !== 0 ?  cities.map((row) => (
						<StyledTableRow key={row.id}>
							<StyledTableCell component="th" scope="row">{row.city_name}</StyledTableCell>
							<StyledTableCell>{row.state ?? "N/A"}</StyledTableCell>
							<StyledTableCell>{row.country ?? "N/A"}</StyledTableCell>
							<StyledTableCell>{row.tourist_rating?? "N/A"}</StyledTableCell>
							<StyledTableCell>{row.date_established?? "N/A"}</StyledTableCell>
							<StyledTableCell>{row.estimated_population?? "N/A"}</StyledTableCell>
							<StyledTableCell>{row.currency ?? "N/A"}</StyledTableCell>
							<StyledTableCell>N/A</StyledTableCell>
							<StyledTableCell>
								<DeleteIcon className="" onClick={() => handleDelete(row.id)}/>
								<EditIcon className="" onClick={() => handleEdit(row.id)}/>
							</StyledTableCell>
						</StyledTableRow>
					)):false}
					</TableBody>
			</Table>
		</div>
  );
}
export default CitiesTable;
