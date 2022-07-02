import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function CitiesTable(props) {
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
		<Paper elevation={1} style={{width: 'auto', overflowX: 'scroll'}}>
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
					</TableRow>
				</TableHead>
				<TableBody>
					{props.cities.map((row) => (
						<StyledTableRow key={row}>
						<StyledTableCell component="th" scope="row">{row.capital}</StyledTableCell>
						<StyledTableCell>{row.subregion ?? "N/A"}</StyledTableCell>
						<StyledTableCell>{row.nativeName ?? "N/A"}</StyledTableCell>
						<StyledTableCell>{row.raiting?? "N/A"}</StyledTableCell>
						<StyledTableCell>{row.dateestablished?? "N/A"}</StyledTableCell>
						<StyledTableCell>{row.population ?? "N/A"}</StyledTableCell>
						<StyledTableCell>{row.currency ?? "N/A"}</StyledTableCell>
						<StyledTableCell>N/A</StyledTableCell>

					</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</Paper>
  );
}

export default CitiesTable;
