import { action_isnewuser } from '../actions';


export default function isnewuser(state = action_isnewuser().istrue, action) {
    switch (action.type) {
        case 'NEW_USER_CHECK':
            return action.istrue;
        default:
            return state;
    }
}