import React, { useContext } from 'react';
import { newsContext } from '../../context/newsContext.js';
import { UserContext } from '../../context/UserProvider';

//when a vote button is pressed, make sure the user hasn't voted before.
//if they have and press the same vote again, do nothing.
//if they have and press the other button, change their vote.
//If not, increase total votes by 1 and up or downvotes by 1.

//I should move the vote buttons to public so the user can't vote on their own stuff from their profile.

export const Votes = (props) => {
	const { upVote, downVote } = useContext(newsContext);
	const {
		user: { _id },
	} = useContext(UserContext);
	//userState.user._id
	console.log('props', props.votes);
	return (
		<div>
			<div>Total Votes: {props.votes.votes}</div>
			<div>
				<button onClick={() => upVote(props.id, _id)}>Upvote</button>
			</div>
			<div>
				<button onClick={() => downVote(props.id, _id)}>Downvote</button>
			</div>
		</div>
	);
};
