import styled from 'styled-components';
import { useState } from 'react';
import { Comment } from './components';
import { useServerRequest } from '../../../../hooks';
import { Icon } from '../../../../components';
import {
	selectUserId,
	selectUserRole,
} from '../../../../selectors';
import { addCommentAsync } from '../../../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { ROLE } from '../../../../constants';

const CommentsContainer = ({
	className,
	comments,
	postId,
}) => {
	const [newComment, setNewComment] = useState('');
	const userId = useSelector(selectUserId);
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const userRole = useSelector(selectUserRole);
	const isGuest = userRole === ROLE.GUEST;

	const onNewCommentAdd = (userId, postId, content) => {
		dispatch(
			addCommentAsync(
				requestServer,
				userId,
				postId,
				content,
			),
		);
		setNewComment('');
	};

	return (
		<div className={className}>
			{!isGuest && (
				<div className='new-comment'>
					<textarea
						name='comment'
						value={newComment}
						placeholder='Комментарий...'
						onChange={({ target }) =>
							setNewComment(target.value)
						}
					></textarea>
					<Icon
						margin='0 0 0 10px'
						size='21px'
						id='fa-paper-plane-o'
						onClick={() =>
							onNewCommentAdd(userId, postId, newComment)
						}
					/>
				</div>
			)}
			<div className='comments'>
				{comments.map(
					({ id, author, content, publishedAt }) => (
						<Comment
							key={id}
							id={id}
							postId={postId}
							author={author}
							content={content}
							publishedAt={publishedAt}
						/>
					),
				)}
			</div>
		</div>
	);
};

export const Comments = styled(CommentsContainer)`
	margin: 0 auto;
	width: 580px;

	& .new-comment {
		display: flex;
		width: 100%;
		margin: 20px 0 0;
	}

	& .new-comment textarea {
		width: 100%;
		resize: none;
		height: 120px;
		font-size: 18px;
	}
`;
