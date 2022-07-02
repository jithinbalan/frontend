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
import useForm from 'react-hooks-form-validator';
import axios from 'axios';
import AddCityModel from '../components/AddModel';
import EditCityModel from '../components/EditModel';

const URL = process.env.REACT_APP_API_URL;

function CitiesTable() {
	const [addModelOpen, setAddModelOpen] = useState(false);
	const [editModelOpen, setEditModelOpen] = useState(false);
	const [cities, setCities] = useState([])
	const [selectedCity, setSelectedCity] = useState([])
	const [formData, setformData] = useState([]);
	const [isAddBtnLoading, setIsAddBtnLoading] = useState(false)

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

	const fetchAllCities= async ()=>{
		await axios.get(`${URL}/admin/allCities`)
			  .then(function (response) {
				  setCities(response.data)
			  })
			  .catch(function (error) {
				console.log(error);
			});
	}
	const addCity= (formData)=>{
		setIsAddBtnLoading(true);

		axios.post(`${URL}/admin/addCity`, formData)
			.then(function (response) {
				setIsAddBtnLoading(false);
				setAddModelOpen(false);
				fetchAllCities()
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
		deleteCity(id)
	}

	// Handle Edit 
	const handleEdit = (id)=>{
		getCityByID(id)
	}
	// Form Submission  
		const handleSubmit = (e) => {
			e.preventDefault()
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
			<AddCityModel open={addModelOpen} handleClose={handleClose} handleChange={handleChange} handleSubmit={handleSubmit} isAddBtnLoading={isAddBtnLoading}/>
			<EditCityModel open={editModelOpen} handleClose={handleClose} handleChange={handleChange} selectedCity={selectedCity} URL={URL} fetchAllCities={fetchAllCities}/>
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
