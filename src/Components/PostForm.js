import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useForm } from '../utils/hooks';
import { FETCH_POST_QUERY } from '../utils/graphql';

function PostForm() {
	const { onSubmit, onChange, values } = useForm(createPostCallback,{
		body:''
	});
	const [createPost, {error}] = useMutation(CREATE_POST,{
		variables: values,
		update(proxy,result){
			const data = proxy.readQuery({
				query: FETCH_POST_QUERY

			});
			
			const getPosts = [...data.getPosts, result.data.createPost];

			console.log('result',data.getPosts, getPosts,data);
			proxy.writeQuery({query:FETCH_POST_QUERY,data:{getPosts:getPosts}
			});
			values.body='';
		}
	})
	function createPostCallback(){
		createPost();
	}
	return (
		<>
		<Form onSubmit={onSubmit} noValidate>
			<h3>Form Component</h3>
			<Form.Field>
				<Form.Input
					placeholder="Hello there!"
					name="body"
					onChange={onChange}
					value={values.body}
				/>
				<Button type="submit">Submit</Button>
			</Form.Field>
		</Form>
		
				{
					error && (
						<div className="ui error message" style={{marginBottom: 30}}>
						<ul className="list"><li>{error.graphQLErrors[0].message}</li></ul>
						</div>
					)
				}

			
		</>
	)
}

export default PostForm;

const CREATE_POST = gql`
mutation createPost($body: String!){
	createPost(body:$body){
		id
		body
		createdAt
		likes{
			id
			username
			createdAt
		}
		comments{
			id
			body
			username
		}
		likeCount
		commentCount
	}
}

`