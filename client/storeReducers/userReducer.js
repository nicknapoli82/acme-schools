// Const Defines
const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';

export const loginUser = (data)=> (
    {
	type: LOGIN_USER,
	as: data
    }
);

export const logoutUser = ()=> (
    {
	type: LOGOUT_USER,
    }
);

export default function userReducer (user = {role: 'guest'}, action) {
    switch(action.type) {
    case LOGIN_USER:
	user = {...action.as};
	break;
    case LOGOUT_USER:
	user = {role: 'guest'};
    }
    return user;
};
