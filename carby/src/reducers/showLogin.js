import { action_LoginPage } from '../actions';


export default function showLogins(state = action_LoginPage().istrue, action) {
    switch (action.type) {
        case 'TOGGLE_LOGIN':
            return (action.istrue)
        default:
            return state;
    }
}