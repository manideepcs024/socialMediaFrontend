import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Label } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

function LikeButton({ post, user }) {
	const [liked, setLike] = useState(false);
	useEffect(() => {
		if (user && post.likes.find(like => like.username === user.username)) {
			setLike(true);
		} else setLike(false);

	}, [user, post.likes]);
	const [likePost] = useMutation(LIKE_POST_MUT,{
		variables: {postId: post.id}
	});
	const likeButton = user ? (
		liked ? (
			<Button color='teal' >
				<Icon name='heart' />
			</Button>
		) : (
			<Button color='teal' basic>
				<Icon name='heart' />
			</Button>

		)
	) : (
		<Button as={Link} to="/login" color='teal' basic>
			<Icon name='heart' />
		</Button>
	)
	
	return (
		<Button as='div' labelPosition='right' onClick={likePost}>
			{likeButton}
			<Label as='a' basic color='teal' pointing='left'>
				{post.likeCount}
			</Label>
		</Button>

	)
}

export default LikeButton;

const LIKE_POST_MUT = gql`
mutation likePost($postId: ID!){
	likePost(postId: $postId){
		id
		likes{id username}
		likeCount

	}
}`
