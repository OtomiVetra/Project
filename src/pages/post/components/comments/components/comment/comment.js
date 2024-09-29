import styled from 'styled-components';
import { Icon } from '../../../../../../components';
import {
	openModal,
	CLOSE_MODAL,
	removeCommentAsync,
} from '../../../../../../actions';
import { useDispatch } from 'react-redux';
import { useServerRequest } from '../../../../../../hooks';

const CommentContainer = ({
	className,
	id,
	author,
	postId,
	publishedAt,
	content,
}) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const onCommentRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить комментарий?',
				onConfirm: () => {
					dispatch(
						removeCommentAsync(requestServer, postId, id),
					);
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	return (
		<div className={className}>
			<div className='comment'>
				<div className='information-panel'>
					<div className='author'>
						<Icon
							margin='0 10px 0 0'
							size='18px'
							id='fa-user-circle-o'
							onClick={() => {}}
						/>
						{author}
					</div>
					<div className='published-at'>
						<Icon
							margin='0 10px 0 0'
							size='18px'
							id='fa-calendar-o'
							onClick={() => {}}
						/>
						{publishedAt}
					</div>
				</div>
				<div className='comment-text'>{content}</div>
			</div>
			<Icon
				margin='0 0 0 10px'
				size='21px'
				id='fa-trash-o'
				onClick={() => onCommentRemove(id)}
			/>
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	display: flex;
	margin-top: 10px;
	width: 100%;

	& .comment {
		border: 1px solid #000000;
		padding: 5px 10px;
		width: 550px;
	}

	& .information-panel {
		display: flex;
		justify-content: space-between;
	}

	& .author {
		display: flex;
	}

	& .published-at {
		display: flex;
	}
`;
