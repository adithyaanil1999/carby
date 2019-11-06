export function action_ShowSignUpPage() {
    return {
        type: 'TOGGLE_SIGNUP',
        istrue: false
    }
}

export function action_LoginPage() {
    return {
        type: 'TOGGLE_LOGIN',
        istrue: false
    }
}

export function action_ShowAbtPage() {
    return {
        type: 'TOGGLE_ABOUT',
        istrue: true
    }
}


export function action_SignUpForm1_btn() {
    return {
        type: 'TOGGLE_SIGNUP1_BTN',
        istrue: false
    }
}

export function action_SignUpForm2_btn() {
    return {
        type: 'TOGGLE_SIGNUP2_BTN',
        istrue: false
    }
}

export function action_loginstate(istrue=false) {
    return {
        type: 'LOGIN_STATE',
        istrue: istrue,
    }
}

export function action_toggleMenuItems(item = false) {
    return {
        type: 'TOGGLE_SIDE_ITEMS',
        item: item
    }
}

export function action_getUsername(username) {
    return {
        type: 'GET_USERNAME',
        username: username
    }
}
export function action_getUserInfo(info) {
    return {
        type: 'GET_USER_INFO',
        user_info: info
    }
}

export function action_isnewuser(istrue=false) {
    return {
        type: 'NEW_USER_CHECK',
        istrue: istrue
    }
}

export function action_get_food_obj(food_obj) {
    return {
        type: 'GET_FOOD_OBJ',
        food_obj: food_obj
    }
}

export function action_addFood(food) {
    return {
        type: 'ADD_FOOD',
        food: food
    }
}
export function action_getdate(date) {
    return {
        type: 'GET_DATE',
        date: date
    }
}

    
export function action_food_check(istrue = false) {
    return {
        type: 'DAILY_FOOD_CHECK',
        istrue: istrue
    }
}

export function action_add_food_daily(food_obj) {
    return {
        type: 'GET_FOOD_DAILY',
        food_obj: food_obj
    }
}