

export default function getusername(state = null, action) {
    switch (action.type) {
        case 'GET_USERNAME':
            return (action.username)
        default:
            return state;
    }
}