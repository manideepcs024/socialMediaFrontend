
import React, { useContext, useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useForm } from '../../utils/hooks';
import { AuthContext } from '../../context/auth';

export default function Login(props) {
	const context = useContext(AuthContext);
	const [errors, setErrors] = useState({});
	const {onChange, onSubmit, values } = useForm(loginUserCallback,{
		username: '',
		password: '',
	})
	const [loginUser, { loading }] = useMutation(LOGIN_USER, {
		update(proxy, result) {
			context.login(result.data.login)
			props.history.push('/');
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: values
	});
	function loginUserCallback(){
		loginUser();
	}

	return (
		<div style={{ margin: "auto", width: 400 }}>
			<Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
				<h2>Login</h2>
				<Form.Input
					label="Username"
					placeholder="Username....."
					value={values.username}
					onChange={onChange}
					type="text"
					error={errors.username ? true : false}
					name="username"
				>

				</Form.Input>
				<Form.Input
					label="Password"
					placeholder="Password....."
					value={values.password}
					type="password"
					onChange={onChange}
					error={errors.password ? true : false}
					name="password"
				></Form.Input>
				<Button onSubmit={onSubmit} type="submit" primary>Login</Button>
			</Form>
			{
				Object.keys(errors).length > 0 && (
					<div className="ui error message">
						<ul className="list">
							{
								Object.values(errors).map(value => (
									<li key={value}>{value}</li>
								))
							}
						</ul>

					</div>
				)
			}

		</div>


	)
}

const LOGIN_USER = gql`
mutation register(
	$username: String!,
	$password: String!,
){
	login(
			username:$username,
			password:$password,
	){
		id 
		email
		token
		createdAt
		username
	}

	
}
`