import { action_ShowSignUpPage } from '../actions';


export default function showSignUp(state = action_ShowSignUpPage().istrue, action) {
    switch (action.type) {
        case 'TOGGLE_SIGNUP':
            return (action.istrue === false) ? false : true;
        default:
            return state;
    }
}