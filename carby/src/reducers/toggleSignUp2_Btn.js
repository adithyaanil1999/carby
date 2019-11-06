import { action_SignUpForm2_btn } from '../actions';

export default function showSignUp2_btn(state = action_SignUpForm2_btn().istrue, action) {
    switch (action.type) {
        case 'TOGGLE_SIGNUP2_BTN':
            return (action.istrue)
        default:
            return state;
    }
}