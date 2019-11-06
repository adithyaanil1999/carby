
export default function addfood(state = [], action) {
    switch (action.type) {
        case 'ADD_FOOD':
            state.push(action.food)
            return state
        default:
            return state;
    }
}