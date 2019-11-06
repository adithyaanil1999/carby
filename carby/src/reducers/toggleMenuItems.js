import { action_toggleMenuItems } from '../actions';

export default function toggleMenuItems(state = action_toggleMenuItems().item, action) {
    switch (action.type) {
        case 'TOGGLE_SIDE_ITEMS':
            return (action.item)
        default:
            return state;
    }
}