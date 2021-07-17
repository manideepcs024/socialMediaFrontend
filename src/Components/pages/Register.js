
import React, { useContext, useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useForm } from '../../utils/hooks';
import { AuthContext } from '../../context/auth';

export default function Register(props) {
	const context = useContext(AuthContext)
	const [errors, setErrors] = useState({});
	const {onChange, onSubmit, values } = useForm(registerUser,{
		username: '',
		password: '',
		confirmPassword: '',
		email: ''
	})
	const [addUser, { loading }] = useMutation(REGISTER_USER, {
		update(proxy, result) {
			console.log(result);
			context.login(result.data.register)
			props.history.push('/');
		},
		onError(err) {
			console.log(err);
			err && err.graphQLErrors[0] && setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: values
	});
	function registerUser(){
		addUser();
	}

	return (
		<div style={{ margin: "auto", width: 400 }}>
			<Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
				<h2>Register</h2>
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
				<Form.Input
					label="Confirm Password"
					placeholder="Confirm Password....."
					value={values.confirmPassword}
					onChange={onChange}
					type="password"
					error={errors.confirmPassword ? true : false}
					name="confirmPassword"
				></Form.Input>
				<Form.Input
					label="email"
					placeholder="email...."
					value={values.email}
					onChange={onChange}
					error={errors.email ? true : false}
					type="email"
					name="email"
				>
				</Form.Input>
				<Button onSubmit={onSubmit} type="submit" primary>Register</Button>
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

const REGISTER_USER = gql`
mutation register(
	$username: String!,
	$email: String!,
	$password: String!,
	$confirmPassword: String!
){
	register(
		registerInput:{
			username:$username,
			email:$email,
			password:$password,
			confirmPassword:$confirmPassword
		}
	){
		id 
		email
		token
		createdAt
		username
	}

	
}
`