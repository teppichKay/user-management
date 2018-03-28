import { updateObject } from '../utility';
import * as actionTypes from '../actions/actionTypes';


const initialState = {
	activeUser: {},
	addUser: {
		loading: false,
		added: false,
		error: null
	},
	updateUser: {
		loading: false,
		updated: false,
		error: null
	},
	fetchUsers: {
		users: [],
		loading: false,
		fetched: false,
		error: null
	},
	deleteUser: {
		loading: false,
		deleted: false,
		error: null
	},
	fetchUser: {
		loading: false,
		fetched: false,
		error: null
	}
};

const fetchUsersStart = ( state , action ) => {
    return updateObject( state, { 
    	fetchUsers: {
    		users: [],
			loading: true,
			fetched: false,
			error: null
		}
    } );
};

const fetchUsersSuccess = ( state, action ) => {
    return updateObject( state, {
        users: action.users,
        fetchUsers: {
        	users: action.users,
			loading: false,
			fetched: true,
			error: null
		}
    } );
};

const fetchUsersFail = ( state, action ) => {
	//console.log('')
	return updateObject( state, { 
       	fetchUsers: {
			loading: false,
			fetched: true,
			error: 'Cannot fetch user data'
		}
	});
};

const fetchUsersReset = ( state, action) => {
	return {
		...state, 
		fetchUsers: {
			users: [],
			loading: false,
			fetched: false,
			error: null
		} 
	} 
}

const createUserStart = ( state, action ) => {
	return updateObject( state, { 
		addUser: {
			loading: true,
			added: false,
			error: null
		}
	});
};

const createUserSuccess = ( state, action ) => {

	return updateObject( state, {
		addUser: {
			loading: false,
			added: true,
			error: null
		}
	})
};

const createUserFail = ( state, action ) => {
	
	return updateObject( state, { 
		addUser: {
			loading: false,
			added: false,
			error: action.error.response.statusText
		}
	});
};

const createUserReset = ( state, action) => {
	return {
		...state, 
		addUser: {
			loading: false,
			added: false,
			error: null
		} 
	} 
}

const deleteUserStart = ( state, action ) => {
	return updateObject( state, { 
		deleteUser: {
			loading: true,
			deleted: false,
			error: null
		}
	});
}

const deleteUserSuccess = ( state, action ) => {
	return updateObject( state, { 
		deleteUser: {
			loading: false,
			deleted: true,
			error: null
		}
	})
};

const deleteUserFail = ( state, action ) => {
	return updateObject( state, { 
		deleteUser: {
			loading: false,
			deleted: false,
			error: action.error.response.statusText
		}
	});
};

const deleteUserReset = ( state, action ) => {
	return {
		...state, 
		deleteUser: {
			loading: false,
			deleted: false,
			error: null
		} 
	} 
};

const updateUserStart = ( state, action ) => {
	return updateObject( state, { 
		updateUser: {
			loading: true,
			updated: false,
			error: null
		}
	});
};

const updateUserSuccess = ( state, action ) => {
	return updateObject( state, {
		updateUser: {
			loading: false,
			updated: true,
			error: null
		}
	})
};

const updateUserFail = ( state, action ) => {
	return updateObject( state, {
		updateUser: {
			loading: false,
			updated: false,
			error: action.error.response.statusText
		}
	})
};

const updateUserReset = ( state, action) => {
	return {
		...state, 
		updateUser: {
			loading: false,
			updated: false,
			error: null
		} 
	} 
}

const fetchUserStart = ( state, action ) => {
	return updateObject( state, { 
		fetchUser: {
			loading: true,
			fetched: false,
			error: null
		}
	});
};

const fetchUserSuccess = ( state, action ) => {
    return updateObject( state, {
        activeUser: action.userData,
        fetchUser: {
			loading: false,
			fetched: true,
			error: null
		}
    } );
};

const fetchUserFail = ( state, action ) => {
	return updateObject( state, { 
        fetchUser: {
			loading: false,
			fetched: true,
			error: action.error.response.statusText
		}
	});
};


const reducer = (state = initialState , action) => {
	switch (action.type) {
		case actionTypes.FETCH_USERS_START: 
			return fetchUsersStart( state, action );
		case actionTypes.FETCH_USERS_SUCCESS: 
			return fetchUsersSuccess( state, action );
		case actionTypes.FETCH_USERS_FAIL:
			return fetchUsersFail( state, action ); 
		case actionTypes.FETCH_USERS_RESET:
			return fetchUsersReset( state, action ); 

		case actionTypes.CREATE_USER_START:
			return createUserStart( state, action );
		case actionTypes.CREATE_USER_SUCCESS:
			return createUserSuccess( state, action );
		case actionTypes.CREATE_USER_FAIL:
			return createUserFail( state, action );
		case actionTypes.CREATE_USER_RESET:
			return createUserReset( state, action );

		case actionTypes.DELETE_USER_START:
			return deleteUserStart( state, action );
		case actionTypes.DELETE_USER_SUCCESS:
			return deleteUserSuccess( state, action );
		case actionTypes.DELETE_USER_FAIL:
			return deleteUserFail( state, action );
		case actionTypes.DELETE_USER_RESET:
			return deleteUserReset( state, action );

		case actionTypes.UPDATE_USER_START:
			return updateUserStart( state, action );
		case actionTypes.UPDATE_USER_SUCCESS:
			return updateUserSuccess( state, action );
		case actionTypes.UPDATE_USER_FAIL:
			return updateUserFail( state, action );
		case actionTypes.UPDATE_USER_RESET:
			return updateUserReset( state, action );

		case actionTypes.FETCH_USER_START: 
			return fetchUserStart( state, action );
		case actionTypes.FETCH_USER_SUCCESS: 
			return fetchUserSuccess( state, action );
		case actionTypes.FETCH_USER_FAIL:
			return fetchUserFail( state, action ); 
		default: return state;
	}
};


export default reducer;