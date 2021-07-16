import React, { useState } from 'react';
import { Button, Confirm, Icon } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { FETCH_POST_QUERY } from '../utils/graphql';
import { useHistory } from 'react-router-dom';



function DeleteButton(props) {
	const history = useHistory();
	const [confirmOpen, setConfirmOpen] = useState(false);
	const mutation = props.commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
	const [deletePost] = useMutation(mutation, {
		update(proxy) {
			if (!props.commentId) {
				const data = proxy.readQuery({
					query: FETCH_POST_QUERY
				});
				let newPosts = data && data.getPosts;

				newPosts = newPosts.filter(p => p.id !== props.id);
				proxy.writeQuery({ query: FETCH_POST_QUERY, data: { getPosts: newPosts } });
			} else {
				history.go(1);

			}
			setConfirmOpen(false);
			if (props.callback) props.callback();
		},
		variables: {
			postId: props.id,
			commentId: props.commentId
		}
	})
	return (
		<>
			<Button as='div' color="red" floated="right" onClick={() => { setConfirmOpen(true) }}>
				<Icon name="trash" />
			</Button>
			<Confirm
				open={confirmOpen}
				onCancel={() => setConfirmOpen(false)}
				onConfirm={deletePost}
			></Confirm>
		</>
	)

}

const DELETE_POST_MUTATION = gql`
mutation deletePost($postId: ID!){
	deletePost(postId: $postId)
}`

const DELETE_COMMENT_MUTATION = gql`
mutation deleteComment($postId: ID!, $commentId: ID!){
	deleteComment(postId:$postId,commentId:$commentId){
		body
		comments{
			id
			createdAt
		}
		commentCount
	}
}`
export default DeleteButton;