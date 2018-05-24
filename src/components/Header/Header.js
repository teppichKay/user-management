import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const header = (props) => {
	return (
		<div>
			<AppBar position="static">
				<Toolbar>
					<Link to='/' style={{ textDecoration: 'none' }}>
						<Typography 
							style={{color: '#fff'}}
							variant="title">User Management
						</Typography>
					</Link>
					<Button 
						variant="raised"
						style={{position: 'absolute', right: '2%',backgroundColor: "#002984"}}
						component={Link}
						to={"/add"}>
						<Typography 
							style={{color: "#fff"}}>Add New
						</Typography> 
					</Button>
					
					
				</Toolbar>
			</AppBar>
		</div>
		
	)
}

export default header;