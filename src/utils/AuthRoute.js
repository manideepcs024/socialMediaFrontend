import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';
import { Route,Redirect } from 'react-router-dom';



function AuthRoute({component:Componet,...rest}){
	const context = useContext(AuthContext);
	const {user} = context;
	return (

		<Route {...rest} 
		render = {props=> user ?<Redirect to='/'/> : <Componet {...props} />}
		/>
		
	)

}
export default AuthRoute;