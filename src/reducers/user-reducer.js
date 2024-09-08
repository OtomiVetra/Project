import { ROLE } from '../constants';
import { ACTION_TYPE } from '../actions';

const initialUsersState = {
	id: null,
	login: null,
	roleId: ROLE.GUEST,
	session: null,
};

export const userReducer = (
	state = initialUsersState,
	action,
) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPE.LOGOUT:
			return initialUsersState;

		default:
			return state;
	}
};
