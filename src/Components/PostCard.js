import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import moment from "moment";
import { AuthContext } from "../context/auth";
import { Link } from "react-router-dom";
import { useContext } from "react";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

function PostCard({ post: { body, id, username, createdAt, likes, likeCount, commentCount } }) {
	const context = useContext(AuthContext);
	const { user } = context;
	return (
		<Card fluid>
			<Card.Content>
				<Image
					floated='right'
					size='mini'
					src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg'
				/>
				<Card.Header>{username}</Card.Header>
				<Card.Meta
					as={Link}
					to={`/post/${id}`}
				>{moment(createdAt).fromNow()}</Card.Meta>
				<Card.Description>
					{body}
				</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<LikeButton user={user} post={{ id, likes, likeCount }} />
				<Button as={Link} labelPosition='right' to={`/post/${id}`}>
					<Button color='blue' basic>
						<Icon name='comments' />
					</Button>
					<Label as='a' basic color='blue' pointing='left'>
						{commentCount}
					</Label>
				</Button>
				{
					user && user.username === username && (

						<DeleteButton id={id}></DeleteButton>
					)
				}
			</Card.Content>
		</Card>
	)

}

export default PostCard;