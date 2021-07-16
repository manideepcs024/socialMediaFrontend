import jwtDecode from 'jwt-decode';
import React, { createContext, useReducer } from 'react';

const initialState = {
	user: null
}

if(localStorage.getItem("jwtToken")){
	console.log("i am called... ");
	let token = localStorage.getItem("jwtToken");
	token = jwtDecode(token);
	console.log(token);
	if(token.exp * 1000 < Date.now()){
		localStorage.removeItem('jwtToken');
	}else{
		initialState.user = token;

	}
}
const AuthContext = createContext({
	user: null,
	login: (userData) => { },
	logout: () => { }
})

function authReducer(state, action) {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state, user: action.payload
			}
		case 'LOGOUT': {
			return {
				...state, user: null
			}
		}
		default:
			return state;
	}
}

function AuthProvider(props) {
	const [state, dispatch] = useReducer(authReducer, initialState);
	function login(userData) {
		console.log("aaa", userData);
		localStorage.setItem("jwtToken",userData.token)
		dispatch({
			type: 'LOGIN',
			payload: userData
		})
	}
	function logout() {
		localStorage.removeItem("jwtToken");
		dispatch({
			type: 'LOGOUT'
		})
	}
	return(
		<AuthContext.Provider value={{user:state.user, login, logout}} {...props} />
			
	
	)


}
export {AuthContext,AuthProvider}