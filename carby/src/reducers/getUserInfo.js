

export default function getuserinfo(state = {}, action) {
    switch (action.type) {
        case 'GET_USER_INFO':
            return (action.user_info)
        default:
            return state;
    }
}