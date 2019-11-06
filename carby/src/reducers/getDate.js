

export default function getdate(state = null, action) {
    switch (action.type) {
        case 'GET_DATE':
            return (action.date)
        default:
            return state;
    }
}