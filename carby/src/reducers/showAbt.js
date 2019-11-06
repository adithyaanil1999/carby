import { action_ShowAbtPage } from '../actions';


export default function showAbt(state = action_ShowAbtPage().istrue, action) {
    switch (action.type) {
        case 'TOGGLE_ABOUT':
            return (action.istrue)
        default:
            return state;
    }
}