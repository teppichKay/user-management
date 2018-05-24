import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as actions from '../../store/actions/index';
 import classes from './UserList.css';
import axios from 'axios';
import Card, { CardActions, CardMedia, CardContent} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Dialog, { DialogActions, DialogTitle} from 'material-ui/Dialog';
import { CircularProgress } from 'material-ui/Progress';

export class UserList extends Component {

	state = {
		open: false,
		selectedUser: ''
	};



	handleOpen = (userId) => {
		this.setState({open: true, selectedUser: userId});
	};

	handleClose = () => {
		this.setState({open: false});
	};

	deleteUserHandler = (selectedUser) => {
		this.props.onDeleteUser(selectedUser);
		this.setState({open: false});
	};

	componentWillMount () {
		this.props.onFetchUsers();
		this.setState({open: false});
	};
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.fetchUsersError) {
			alert (nextProps.fetchUsersError);
		};
		if (nextProps.deleteUserError) {
			alert (nextProps.deleteUserError);
		};
		if (nextProps.deleted) {
			nextProps.onFetchUsers();
			nextProps.onDeleteUserReset();
		 	nextProps.history.push("/");
		}
	};

	componentWillUnmount () {
		this.props.onDeleteUserReset();
		this.props.onFetchUsersReset();
	}


	render () {
	
		let output = (
			<div>
				<CircularProgress 
					size={100}
					style={{marginTop: '50px'}}/>
			</div>
		);
		

		if (!this.props.fetchUsersLoading) {
			let users = this.props.storedUsers.map( user => (
				<Grid item key= {user.id} >
					<Card style={{height: 270, width: 170}}>
						<CardMedia style={{height: 150}}
							image={user.picture}
							title={user.id} />
						<CardContent>
							{user.name.first} {user.name.last}
						</CardContent>
						<CardActions>
							<Button 
								component={Link}
								to={"/update/"+user.id}
								className={classes.Button} 
								size="small" 
								color="primary">
								Update</Button>
							<Button 
								className={classes.Button} 
								size="small" 
								color="secondary"
								onClick={() => this.handleOpen(user.id)}>Delete</Button>
						</CardActions>
					</Card>
					
				</Grid>
			));
			output = (
				<Grid container style={{flexGrow: 1, marginTop: '30px'}}>
					<Grid item xs={12}>
						<Grid container justify="center" spacing={24}>
							{users}
						</Grid>
						<Dialog
						 	aria-labelledby="alert-dialog-title"
	          				aria-describedby="alert-dialog-description"
				          	open={this.state.open}
				          	onClose={this.handleClose}
				          	style={{
				          		position: 'fixed', backgroundColor: 'white'
				          	}}
						>
							<DialogTitle id="alert-dialog-title">{"Do you want to remove this user?"}</DialogTitle>
				            <DialogActions>
					            <Button onClick={()=> this.deleteUserHandler(this.state.selectedUser)} color="primary">
					            	Delete
					            </Button>
					            <Button onClick={this.handleClose} color="primary" autoFocus>
					            	Cancel
					            </Button>
					          </DialogActions>
						</Dialog>
					</Grid>
				</Grid>
			);
		};
	
		return output;
	}
};



const mapStateToProps = state => {
	return {
		fetchUsersLoading: state.fetchUsers.loading,
		storedUsers: state.fetchUsers.users,
		fetchUsersError: state.fetchUsers.error,
		
		deleteUserLoading: state.fetchUsers.loading,
		deleted: state.deleteUser.deleted,
		deleteUserError: state.deleteUser.error
	}
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchUsers: () => dispatch( actions.fetchUsers()),
		onDeleteUser: (id) => dispatch( actions.deleteUser(id)),
		onDeleteUserReset: () => dispatch(actions.deleteUserReset()),
		onFetchUsersReset: () => dispatch(actions.fetchUsersReset())
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList, axios);