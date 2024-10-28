import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from '../../../../components';
import { TableRow } from '../table-row/table-row';
import { useState } from 'react';
import { useServerRequest } from '../../../../hooks';
import { PROP_TYPE } from '../../../../constants';

const UserRowContainer = ({
	className,
	id,
	login,
	registeredAt,
	roleId: userRoleId,
	roles,
	onUserRemove,
}) => {
	const [initialRoleId, setInitialRoleId] =
		useState(userRoleId);
	const [selectedRoleId, setSelectedRoleId] =
		useState(userRoleId);

	const requestServer = useServerRequest();

	const onRoleChange = ({ target }) => {
		setSelectedRoleId(Number(target.value));
	};

	const onRoleSave = (userId, newUserRoleId) => {
		requestServer(
			'updateUserRole',
			userId,
			newUserRoleId,
		).then(() => {
			setInitialRoleId(newUserRoleId);
		});
	};

	const isSaveButtonDisabled =
		selectedRoleId === initialRoleId;

	return (
		<div className={className}>
			<TableRow border={true}>
				<div className='login-column'>{login}</div>
				<div className='registered-at-column'>
					{registeredAt}
				</div>
				<div className='role-column'>
					<select
						value={selectedRoleId}
						onChange={onRoleChange}
					>
						{roles.map(({ id: roleId, name: roleName }) => (
							<option key={roleId} value={roleId}>
								{roleName}
							</option>
						))}
					</select>
					<Icon
						margin='0 0 0 10px'
						disabled={isSaveButtonDisabled}
						id='fa-floppy-o'
						onClick={() => onRoleSave(id, selectedRoleId)}
					/>
				</div>
			</TableRow>
			<Icon
				id='fa-trash-o'
				margin='0 0 0 10px'
				onClick={onUserRemove}
			/>
		</div>
	);
};

export const UserRow = styled(UserRowContainer)`
	display: flex;
	margin-top: 10px;

	& select {
		font-size: 16px;
		border-top: none;
		border-bottom: none;
		padding: 0 5px;
	}
`;

UserRow.propTypes = {
	id: PropTypes.string.isRequired,
	login: PropTypes.string.isRequired,
	registeredAt: PropTypes.string.isRequired,
	roleId: PropTypes.number.isRequired,
	roles: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([
				PropTypes.number,
				PropTypes.string,
			]).isRequired,
			name: PropTypes.string.isRequired,
		}),
	).isRequired,
	onUserRemove: PropTypes.func.isRequired,
};
