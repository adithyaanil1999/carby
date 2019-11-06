import { action_toggleAbtMe } from '../actions';

export default function toggleAbtMe(state = action_toggleAbtMe().istrue, action) {
    switch (action.type) {
        case 'TOGGLE_ABOUT_ME':
            return (action.istrue)
        default:
            return state;
    }
}