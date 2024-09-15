import { setUserRole } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const updateUserRole = async (
	userSession,
	userId,
	newUserRoleId,
) => {
	const accessRoles = [ROLE.ADMIN];

	if (!sessions.access(userSession, accessRoles)) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	const actualUserId = userId.id || userId;

	await setUserRole(actualUserId, newUserRoleId);

	return {
		error: null,
		res: true,
	};
};
