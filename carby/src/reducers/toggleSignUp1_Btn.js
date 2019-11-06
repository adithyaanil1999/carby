import { action_SignUpForm1_btn } from '../actions';

export default function showSignUp1_btn(state = action_SignUpForm1_btn().istrue, action) {
    switch (action.type) {
        case 'TOGGLE_SIGNUP1_BTN':
            return (action.istrue)
        default:
            return state;
    }
}