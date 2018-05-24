import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as actions from '../../store/actions/index';
import classes from './UpdateUser.css';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';

export class UpdateUser extends Component {
	state = {
		name: {
			first: '',
			last: '',
		},
		picture: '',
	};

	componentWillMount () {
		const userId = this.props.location.pathname.substring(8);
		this.props.onFetchUserProfile(userId);
	};
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.updateUserError) {
			alert (nextProps.updateUserError);
		}
		if (nextProps.updated) {
			nextProps.history.push("/");
		}
	};

	componentWillUnmount() {
		this.props.onUpdateUserReset();
	}

	updateCancelHandler = () => {
    	this.props.history.replace( '/' );
	}

	updateSubmitHandler = (id, user) => {
		this.props.onUpdateUser(id, user);
	}

	handleChange = name => event => {
		//console.log('props', this.props.user);
		switch (name) {
			case 'picture':
				this.setState({picture: event.target.value});
				break;
			case 'first':
				//console.log('')
				this.setState({name: {...this.state.name, first: event.target.value} });
				break;
			case 'last':
				this.setState({name: {...this.state.name, last: event.target.value} });
				break;
			default: 
				this.setState(this.state);
			
		}
	};

	
	render () {
		let output = null;

		if (!this.props.fetched || this.props.loading) {
			output = (
				<div style={{margin: 'auto'}}>
					<CircularProgress 
						size={100}
						style={{marginTop: '50px'}}/>
				</div>
			);
		} else {
			console.log('props id ', this.props);
			output = (
				<div>
					<Paper style={{width: '60%', margin: '20px auto'}}>
						<div style={{margin: '20px auto', padding: '20px'}}>
							<form noValidate autoComplete="off" style={{textAlign: 'center'}}>
								<Typography variant="display1">Update User Profile</Typography>
								<div>
									<TextField
										style={{width: '70%'}}
										id="firstName"
										label="First Name"
										helperText={this.props.user.name.first}
										value={this.state.first}
										onChange={this.handleChange('first')}
										margin="normal"
									/>
									<TextField
										style={{width: '70%'}}
										id="lastName"
										label="Last Name"
										helperText={this.props.user.name.last}
										value={this.state.last}
										onChange={this.handleChange('last')}
										margin="normal"
									/>
									<TextField
										style={{width: '70%'}}
										id="picture"
										label="Picture " 
										helperText={this.props.user.picture}
										fullWidth
										value={this.state.picture}
										onChange={this.handleChange('picture')}
										margin="normal"
									/>
								</div>
								<Button 
									style={{marginRight:"20px"}}
									className={classes.Button} 
									size="small" 
									color="primary"
									onClick={()=> this.updateSubmitHandler(this.props.user.id, this.state)}>Submit</Button>
								<Button 
									style={{marginLeft:"20px"}}
									component={Link}
									to={"/"}
									className={classes.Button} 
									size="small" 
									color="secondary"
									onClick={this.updateCancelHandler}
									>Cancel</Button>
							</form>
						</div>
					</Paper>
				</div>
			);

		}

		return output;
	}
}


const mapStateToProps = state => {
	return {
		user: state.activeUser,
		loading: state.fetchUser.loading,
		fetched: state.fetchUser.fetched,
		updated: state.updateUser.updated,
		updateUserError: state.updateUser.error
	}
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchUserProfile: (id) => dispatch( actions.fetchUser(id)),
		onUpdateUser: (id, user) => dispatch( actions.updateUser(id, user)),
		onUpdateUserReset: () => dispatch( actions.updateUserReset() )
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser, axios);