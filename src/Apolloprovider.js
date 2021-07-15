import React from 'react';
import App from './App';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from 'apollo-link-context';

const httpClient = createHttpLink({
	uri: 'http://localhost:4000'
})

const authLink = setContext((req,pre)=>{
	const token = localStorage.getItem('jwtToken');
	return {
		headers:{
			Authorization: token ? `Bearer ${token}` : ''
		}
	}
});

const client = new ApolloClient({
	link: authLink.concat(httpClient),
	cache: new InMemoryCache()
})



export default (
	<ApolloProvider client={client}><App /></ApolloProvider>
);