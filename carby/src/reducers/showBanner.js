import { action_food_check } from '../actions';


export default function checkdailyfood(state = action_food_check().istrue, action) {
    switch (action.type) {
        case 'DAILY_FOOD_CHECK':
            return action.istrue;
        default:
            return state;
    }
}