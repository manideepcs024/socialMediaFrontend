import React, { useContext, useState } from 'react';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import { Grid, Image, Card, Button, Label, Icon, Form } from 'semantic-ui-react';
import moment from 'moment';
import LikeButton from '../LikeButton';
import { AuthContext } from '../../context/auth';
import DeleteButton from '../DeleteButton';

const SinglePost = (props) => {
	const [comment, setComment] = useState('');
	const context = useContext(AuthContext);
	const { user } = context;
	const postId = props.match.params.postId;
	console.log(postId);
	const { data } = useQuery(FETCH_POST_QUERY, {
		variables: {
			postId
		}
	});
	const [dataSubmit] = useMutation(SUBMIT_COMMENT_MUTATION, {
		update() {
			setComment('');
			// history.go(1);

		},
		variables: {
			body: comment,
			postId: postId
		}
	})
	function redirectPage() {
		props.history.push("/");
	}

	let postMarkup;

	if (!data) {
		postMarkup = <p>Loading...</p>
	} else {
		const { getPost } = data;
		const { id, createdAt, body, likeCount, commentCount, likes, comments, username } = getPost;
		postMarkup = (
			<Grid>
				<Grid.Row>
					<Grid.Column width={2}>
						<Image
							src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg'
							size="small"
							floa="right"
						></Image>

					</Grid.Column>
					<Grid.Column width={10}>
						<Card fluid>
							<Card.Content>
								<Card.Header>
									{username}
								</Card.Header>
								<Card.Meta>
									{moment(createdAt).fromNow()}
								</Card.Meta>
								<Card.Description>
									{body}
								</Card.Description>
							</Card.Content>
							<hr />
							<Card.Content extra>
								<LikeButton user={user} post={{ id, user, likeCount, likes }}></LikeButton>
								<Button
									as="div"
									labelPosition="right"
									onClick={() => { console.log('buttonclick') }}
								>
									<Button basic color="blue">
										<Icon name="comments"></Icon>
										<Label basic color="blue" pointing="left">
											{commentCount}
										</Label>
									</Button>
								</Button>

								{
								user && (
									<Card fluid>
										<Card.Content>
											<p>Post a Comment</p>

											<Form>
												<div className="ui fluid action">
													<input
														name="comment"
														placeholder="comment"
														onChange={(event) => setComment(event.target.value)}
														value={comment}
													/>
													<button type="submit"
														onClick={dataSubmit}
														className="ui button teal"
														disabled={comment.trim() === ''}>
														Submit
													</button>
												</div>

											</Form>
										</Card.Content>
									</Card>
								)


							}


								{
									user && user.username === username && (
										<DeleteButton id={id} callback={redirectPage}></DeleteButton>
									)
								}
								{
									comments.map((comment) => {
										return (
											<Card fluid id={comment.id} key={comment.id}>
												<Card.Content>
													{user && user.username === comment.username && (
														<DeleteButton id={postId} commentId={comment.id} />
													)}

													<Card.Header>
														{comment.username}
													</Card.Header>
													<Card.Description>
														{comment.body}
													</Card.Description>
													<Card.Meta>
														{moment(comment.createdAt).fromNow()}
													</Card.Meta>

												</Card.Content>
											</Card>
										)

									})
								}


							</Card.Content>
						
						</Card>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
	// return postMarkup;
	return (
		<>
			{postMarkup}
		</>
	)
}

const SUBMIT_COMMENT_MUTATION = gql`
 mutation($postId:ID!, $body:String!){
	 createComment(postId: $postId, body:$body){
		id
	 body createdAt comments{
		 id username body createdAt
	 }
	 likes{
		 id username
	 }
	 commentCount
	 likeCount
	 username
	 }

 }`

const FETCH_POST_QUERY = gql`
 query($postId: ID!){
	 getPost(postId:$postId){
		 id body username likeCount commentCount
		 createdAt likes{
			 id username
		 }
		 comments{
			 id
			 username
			 body
		 }
	 }
 }
`;
export default SinglePost;