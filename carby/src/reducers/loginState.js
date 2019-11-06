import { action_loginstate } from '../actions';


export default function loginstate(state = action_loginstate().istrue, action) {
    switch (action.type) {
        case 'LOGIN_STATE':
            return action.istrue;
        default:
            return state;
    }
}