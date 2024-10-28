import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from '../../../../components';
import {
	CLOSE_MODAL,
	openModal,
	removePostAsync,
} from '../../../../actions';
import { useServerRequest } from '../../../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from '../../../../selectors';
import { useNavigate } from 'react-router-dom';
import { checkAccess } from '../../../../utils';
import { ROLE } from '../../../../constants';

const SpecialPanelContainer = ({
	className,
	id,
	publishedAt,
	editButton,
}) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const userRole = useSelector(selectUserRole);
	const navigate = useNavigate();

	const onPostRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить статью?',
				onConfirm: () => {
					dispatch(removePostAsync(requestServer, id)).then(
						() => {
							navigate('/');
						},
					);
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdmin = checkAccess([ROLE.ADMIN], userRole);

	return (
		<div className={className}>
			<div className='published-at'>
				{publishedAt && (
					<Icon
						inactive={true}
						margin='0 10px 0 0'
						id='fa-calendar-o'
						size='18px'
					/>
				)}
				{publishedAt}
			</div>
			{isAdmin && (
				<div className='buttons'>
					{editButton}
					{publishedAt && (
						<Icon
							id='fa-trash-o'
							size='21px'
							margin='0 0 0 10px'
							onClick={() => onPostRemove(id)}
						/>
					)}
				</div>
			)}
		</div>
	);
};

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	justify-content: space-between;
	margin: ${({ margin }) => margin};

	& .buttons {
		display: flex;
	}

	& i {
		position: relative;
		top: -1px;
	}
	& .published-at {
		display: flex;
		font-size: 18px;
	}
`;

SpecialPanel.propTypes = {
	id: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	editButton: PropTypes.node.isRequired,
};
