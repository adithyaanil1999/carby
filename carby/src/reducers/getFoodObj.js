

export default function getfoodobj(state = {}, action) {
    switch (action.type) {
        case 'GET_FOOD_OBJ':
            return (action.food_obj)
        default:
            return state;
    }
}