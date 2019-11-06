import { combineReducers } from 'redux';
import showSignUp from './showSign';
import showLogin from './showLogin';
import showAbt from './showAbt';
import showSignUp1_btn from './toggleSignUp1_Btn';
import showSignUp2_btn from './toggleSignUp2_Btn';
import loginstate from './loginState';
import toggleMenuItems from './toggleMenuItems';
import getusername from './getUsername';
import isnewuser from './isNewUser';
import getuserinfo from './getUserInfo'
import getfoodobj from './getFoodObj';
import addfood from './addFood';
import getdate from './getDate';
import checkdailyfood from './showBanner';
import getfoodobjdaily from './getFoodDaily';
import { reducer as formReducer } from 'redux-form';


const reducers = combineReducers({ 
    showSignUp, 
    showLogin, 
    showAbt, 
    form: formReducer, 
    showSignUp1_btn, 
    showSignUp2_btn,
    loginstate,
    getusername,
    isnewuser,
    getuserinfo,
    toggleMenuItems,
    getfoodobj,
    addfood,
    getdate,
    checkdailyfood,
    getfoodobjdaily
    });
export default reducers ;