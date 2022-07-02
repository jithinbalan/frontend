import {Routes,Route,Link} from "react-router-dom";
import SearchCity from './screens/SearchCityScreen';
import AdminLandingPage from './screens/AdminScreen';
import AppBar from '@mui/material/AppBar';
import PublicIcon from '@mui/icons-material/Public';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import './App.css';

function App() {
  return (
	<>
		<AppBar position="relative">
			<Toolbar>
				<PublicIcon sx={{ mr: 2 }} />
				<Typography variant="h6" color="inherit" noWrap>
				Capital Cities 
				</Typography>
					<Typography variant="h6"  noWrap align="right">
						<Link to="/admin" variant="h6" underline="none">Admin </Link>
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
