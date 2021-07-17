import React, { useState } from 'react';
import { Button, Confirm, Icon } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { FETCH_POST_QUERY } from '../utils/graphql';

function DeleteButton(props) {
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
				window.location.reload();

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