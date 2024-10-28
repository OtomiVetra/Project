import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from '../../../../../../components';
import {
	openModal,
	CLOSE_MODAL,
	removeCommentAsync,
} from '../../../../../../actions';
import {
	PROP_TYPE,
	ROLE,
} from '../../../../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { useServerRequest } from '../../../../../../hooks';
import { selectUserRole } from '../../../../../../selectors';

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
	const userRole = useSelector(selectUserRole);

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

	const isAdminOrModerator = [
		ROLE.ADMIN,
		ROLE.MODERATOR,
	].includes(userRole);

	return (
		<div className={className}>
			<div className='comment'>
				<div className='information-panel'>
					<div className='author'>
						<Icon
							inactive={true}
							margin='0 10px 0 0'
							size='18px'
							id='fa-user-circle-o'
							onClick={() => {}}
						/>
						{author}
					</div>
					<div className='published-at'>
						<Icon
							inactive={true}
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
			{isAdminOrModerator && (
				<Icon
					margin='0 0 0 10px'
					size='21px'
					id='fa-trash-o'
					onClick={() => onCommentRemove(id)}
				/>
			)}
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

Comment.propTypes = {
	id: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	author: PropTypes.string.isRequired,
	postId: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
};
