import * as actionTypes from './actionTypes';
import axios from 'axios';

export const createUserStart = () => {
	return {
		type: actionTypes.CREATE_USER_START
	}
};


export const createUser = ( userData ) => {
	
	return dispatch => {
		dispatch( createUserStart() );
		const newUser = {name: {first: userData.name.first, last: userData.name.last}, picture: userData.picture};
		//console.log(newUser);
		//dispatch(createUserSucceess(newUser));
		axios.post('http://localhost:8181/users', newUser)
			.then(response => {
				console.log(response.data);
				
				dispatch(createUserSucceess( response.data ));
			})
			.catch( error => {
				dispatch(createUserFail(error));
			});
	};
};

export const createUserSucceess = (userData) => {
	console.log(userData);
	return {
		type: actionTypes.CREATE_USER_SUCCESS,
		userData: userData
	}
}

export const createUserFail = (error) => {
	return {
		type: actionTypes.CREATE_USER_FAIL,
		error: error
	}
}

export const createUserReset = () => {
	return {
		type: actionTypes.CREATE_USER_RESET,
	}
}

export const updateUserStart = () => {
	return {
		type: actionTypes.UPDATE_USER_START,
	}
}

export const updateUser = (id, userData) => {
	
	return dispatch => {
		dispatch( updateUserStart() );
		const updatedUser = {
			name: {
				first: userData.name.first, 
				last: userData.name.last
			}, 
			picture: userData.picture
		};
		axios.put('http://localhost:8181/users/' + id, updatedUser)
			.then(response => {
				console.log('update response', response);
				dispatch(updateUserSuccess(response.data));
			})
			.catch(error => {
				dispatch(updateUserFail(error));
			});
	}
}

export const updateUserSuccess = (userData) => {
	console.log(userData);
	return {
		type: actionTypes.UPDATE_USER_SUCCESS,
		userData: userData
	}
}

export const updateUserFail = (error) => {
	return {
		type: actionTypes.UPDATE_USER_FAIL,
		error: error
	}
}

export const updateUserReset = () => {
	return {
		type: actionTypes.UPDATE_USER_RESET
	}
}

export const deleteUserStart = () => {
	return {
		type: actionTypes.DELETE_USER_START
	}
}

export const deleteUser = ( userId ) => {
	return dispatch => {
		dispatch(deleteUserStart());
		axios.delete('http://localhost:8181/users/' + userId)
			.then(response => {
				console.log('delete response', response);
				dispatch(deleteUserSuccess());
			})
			.catch(error => {
				dispatch(deleteUserFail(error));
			});
	}
}

export const deleteUserSuccess = () => {
	return {
		type: actionTypes.DELETE_USER_SUCCESS,
	}
};

export const deleteUserFail = (error) => {
	return {
		type: actionTypes.DELETE_USER_FAIL,
		error: error
	}
}

export const deleteUserReset = () => {
	return {
		type: actionTypes.DELETE_USER_RESET
	}
}

export const fetchUsersStart = () => {
	return {
		type: actionTypes.FETCH_USERS_START
	}
};

export const fetchUsers = () => {
	return dispatch => {
		dispatch(fetchUsersStart());
		axios.get('http://localhost:8181/users')
		    .then(response => {
		    	//console.log(response.data)
		    	const fetchUsers = [];
		    	for (let key in response.data) {
		    		fetchUsers.push({
		    			...response.data[key],
		    			token: key
		    		});

		    	}
				//console.log(fetchUsers); //[id, name, picture]
		    	dispatch(fetchUsersSuccess(fetchUsers));
		    })
		    .catch(function (error) {
		      dispatch(fetchUsersFail(error));
		    });
	}
}

export const fetchUsersSuccess = ( users ) => {
	//console.log(users);
	return {
		type: actionTypes.FETCH_USERS_SUCCESS,
		users: users
	}
};

export const fetchUsersFail = (error ) => {
	return {
		type: actionTypes.FETCH_USERS_FAIL,
		error: error
	}
};

export const fetchUsersReset = () => {
	return {
		type: actionTypes.FETCH_USERS_RESET
	}
};

export const fetchUserStart = () => {
	return {
		type: actionTypes.FETCH_USER_START
	}
};

export const fetchUser = (userId) => {
	return dispatch => {
		dispatch(fetchUserStart());
		axios.get('http://localhost:8181/users/' + userId)
			.then(response => {
				//console.log('fetched one user: '+ JSON.stringify(response.data));
				// {id, name, picture}
				dispatch(fetchUserSuccess(response.data));
			})
			.catch(error => {
				dispatch(fetchUserFail(error));
			});
	}
};

export const fetchUserSuccess = (userData) => {
	console.log('fetchUserSuccess ', userData);
	return {
		type: actionTypes.FETCH_USER_SUCCESS,

		userData: userData
	}
};

export const fetchUserFail = (error) => {
	return {
		type: actionTypes.FETCH_USERS_FAIL,
		error: error
	}
};