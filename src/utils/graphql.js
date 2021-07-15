import gql from "graphql-tag";

export const FETCH_POST_QUERY = gql`
{
	getPosts{
	id
	body
	createdAt
	username
	likeCount
	commentCount
	likes{
		id
		username
	}
	comments{
		id
		body
	}
 }
}

`