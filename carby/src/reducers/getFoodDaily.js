

export default function getfoodobjdaily(state = {}, action) {
    switch (action.type) {
        case 'GET_FOOD_DAILY':
            return (action.food_obj)
        default:
            return state;
    }
}