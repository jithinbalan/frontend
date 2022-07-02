import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function EditCityModel(props) {

    return (
			<Dialog open={props.open} onClose={props.handleClose}>
				<DialogTitle>{props.Title}</DialogTitle>
				<form onSubmit={props.handleSubmit} encType='multipart/form-data'>
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
								onChange={(e) => props.handleChange(e)}
								defaultValue={props.selectedCity !== undefined ? props.selectedCity.city_name:''}
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
								onChange={(e) => props.handleChange(e)}
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
								onChange={(e) => props.handleChange(e)}

							/>
							<TextField
								autoFocus
								required
								margin="dense"
								name="touristrating"
								label="Tourist Rating"
								fullWidth
								variant="standard"
								onChange={(e) => props.handleChange(e)}

							/>
							<TextField
								autoFocus
								required
								margin="dense"
								name="estimatedpopulation"
								label="Estimated Population "
								fullWidth
								variant="standard"
								onChange={(e) => props.handleChange(e)}

							/>
							<TextField
								autoFocus
								required
								margin="dense"
								name="currency"
								label="Currency "
								fullWidth
								variant="standard"
								onChange={(e) => props.handleChange(e)}
							/>
							<TextField
								autoFocus
								required
								margin="dense"
								name="dateestablished"
								label="Date Established "
								fullWidth
								variant="standard"
								onChange={(e) => props.handleChange(e)}
							/>
					</DialogContent>
					<DialogActions>
						<Button onClick={props.handleClose}>Cancel</Button>
						<Button type='submit'>Submit</Button>
					</DialogActions>
				</form>
			</Dialog>
  );
}
export default EditCityModel;
