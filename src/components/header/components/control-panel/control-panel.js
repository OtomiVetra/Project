import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Button } from '../../../../components';
import { styled } from 'styled-components';
import { ROLE } from '../../../../constants';
import { logout } from '../../../../actions';
import {
	selectUserRole,
	selectUserLogin,
	selectUserSession,
} from '../../../../selectors';

const RightAlined = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;

const StyledIcon = styled.div`
	&:hover {
		cursor: pointer;
	}
`;

const UserName = styled.div`
	font-size: 18px;
	font-weight: bold;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const session = useSelector(selectUserSession);
	console.log('roleId:', roleId); // Проверка значения роли
	console.log('ROLE.GUEST:', ROLE.GUEST);

	return (
		<div className={className}>
			<RightAlined>
				{roleId === ROLE.GUEST ? (
					<Button>
						<Link to='/login'>Войти</Link>
					</Button>
				) : (
					<>
						<UserName>{login}</UserName>
						<StyledIcon>
							<Icon
								id='fa-sign-out'
								margin='0 0 0 10px'
								onClick={() => dispatch(logout(session))}
							/>
						</StyledIcon>
					</>
				)}
			</RightAlined>
			<RightAlined>
				<StyledIcon onClick={() => navigate(-1)}>
					<Icon id='fa-backward' margin='10px 0 0 0' />
				</StyledIcon>
				<Link to='/post'>
					<Icon
						id='fa-file-text-o'
						margin='10px 0 0 16px'
					/>
				</Link>
				<Link to='/users'>
					<Icon id='fa-users' margin='10px 0 0 16px' />
				</Link>
			</RightAlined>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)``;