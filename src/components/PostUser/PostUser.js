import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import classes from './PostUser.css';
import axios from 'axios';
import * as actions from '../../store/actions/index';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';

export class PostUser extends Component {
	state = {
		name: {
			first: '',
			last: '',
		},
		picture: ''
	};

    postCancelHandler = () => {
    	console.log(this.props);
    	this.props.history.push("/");
    }

    postSubmitHandler = (userData) => {
		this.props.onPostUser(userData);
	}

    handleChange = name => event => {
		switch (name) {
			case 'picture':
				this.setState({picture: event.target.value});
				break;
			case 'first':
				this.setState({name: {...this.state.name, first: event.target.value} });
				break;
			case 'last':
				this.setState({name: {...this.state.name, last: event.target.value} });
				break;
			default: 
				this.setState(this.state);
		}
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.addUserError) {
			alert (nextProps.addUserError);
			nextProps.onPostUserReset();
		}
		if (nextProps.added) {
			nextProps.history.push("/");
		}
	}

	componentWillUnmount() {
		this.props.onPostUserReset();
	}
	
	render () {

		let output = (
			<div>
				<CircularProgress 
					size={100}
					style={{marginTop: '50px'}}/>
			</div>
		);
		
		if (!this.props.loading) {
			output = (
				<div>
					<Paper style={{width: '60%', margin: '20px auto'}}>
						<div style={{margin: '20px auto', padding: '20px'}}>
							<form 
								noValidate 
								autoComplete="off" 
								style={{textAlign: 'center'}}>
								<Typography variant="display1">Create User Profile</Typography>
								<div>
								<TextField
									style={{width: '70%'}}
									id="firstName"
									label="First Name"
									value={this.state.first}
									onChange={this.handleChange('first')}
									margin="normal"
								/>
								<TextField
									style={{width: '70%'}}
									id="lastName"
									label="Last Name"
									value={this.state.last}
									onChange={this.handleChange('last')}
									margin="normal"
								/>
								<TextField
									style={{width: '70%'}}
									id="picture"
									label="Picture " 
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
									onClick={()=> this.postSubmitHandler(this.state)}
									>Submit</Button>
								<Button 
									style={{marginLeft:"20px"}}
									component={Link}
									to={"/"}
									className={classes.Button} 
									size="small" 
									color="secondary"
									onClick={this.postCancelHandler}
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
		users: state.users,
		loading: state.addUser.loading,
		added: state.addUser.added,
		addUserError: state.addUser.error
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onPostUser: (userData) => dispatch(actions.createUser(userData)),
		onPostUserReset: () => dispatch(actions.createUserReset())
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(PostUser, axios);