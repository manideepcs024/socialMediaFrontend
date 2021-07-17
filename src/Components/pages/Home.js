import React, { useContext } from 'react';
import { Grid, Transition } from 'semantic-ui-react';
import PostCard from '../PostCard';
import { useQuery } from '@apollo/client';
import '../../App.css'
import { AuthContext } from '../../context/auth';
import PostForm from '../PostForm';
import { FETCH_POST_QUERY } from '../../utils/graphql';


export default function Home() {
	const { loading, data } = useQuery(FETCH_POST_QUERY);
	const context = useContext(AuthContext);
	const { user } = context;
	return (

		<Grid columns={3}>
			<Grid.Column className="page-title">
				<h1>Recent Posts</h1>
			</Grid.Column>

			<Grid.Row>
				{
					user && (
						<Grid.Row>
							<PostForm></PostForm>
						</Grid.Row>
					)
				}
				{
					loading ? (
						<p>Posts are loading</p>
					) : (
						<Transition.Group
							duration={200}
						>{
								data && data.getPosts.map(post => {
									return (
										<Grid.Column key={post.id} style={{ marginBottom: 20 }}>
											<PostCard post={post} />
										</Grid.Column>



									)
								})
							}
						</Transition.Group>
					)
				}
			</Grid.Row>
		</Grid>

	)
}
