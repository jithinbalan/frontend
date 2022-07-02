import {Routes,Route,Link} from "react-router-dom";
import SearchCity from './screens/SearchCityScreen';
import AdminLandingPage from './screens/AdminScreen';
import AppBar from '@mui/material/AppBar';
import PublicIcon from '@mui/icons-material/Public';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import './App.css';

function App() {
  return (
	<>
		<AppBar position="relative">
			<Toolbar>
				<PublicIcon sx={{ mr: 2 }} />
				<Typography variant="h6" color="inherit"  component={Link} to={'/'}>
					Capital Cities 
				</Typography>
					<Typography variant="h6"  component={Link} to={'/admin'} align="left">Text
					{/* <Button variant="text"></Button> */}

					{/* <Button component={Link} to={'/admin'}>My button</Button> */}
						{/* <Link to="/admin" variant="h6" underline="none">Admin </Link> */}
					</Typography>

			</Toolbar>
		</AppBar>
    <div className="main">
		<Routes>
			<Route path="/" element={<SearchCity />} />
			<Route path="/admin" element={<AdminLandingPage />} />
		</Routes>
	</div>
	</>
  );
}

export default App;
