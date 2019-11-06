import React from 'react';
import { connect } from 'react-redux';
import { store } from '..';
import { 
    action_loginstate,
    action_getUsername,
    action_isnewuser,
    action_getUserInfo,
    action_toggleMenuItems,
    action_getdate
    } from '../actions';
import Aboutme from './Aboutme'
import Search from './Search';
import DashFood from './DashboardFood';
        
function getCook(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.isclosed = false;
    }
    
    logout(){
        store.dispatch(action_loginstate(false));
        document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        document.cookie="";
        store.dispatch({
            type: 'TOGGLE_ABOUT',
            istrue: true
        });
        store.dispatch({
            type: 'TOGGLE_LOGIN',
            istrue: false
        });
        store.dispatch(action_getUsername(null));
        store.dispatch(action_getUserInfo({}));

    }
    sidebarHandle(){
        var closebtn = document.getElementById('btn');
        var desc_wrap = document.querySelector('.sidebar_logos-desc');
        var logo = document.querySelector('.sidebar_logo');
        var sidebar = document.querySelector('.dash_sidebar-wrap');

        this.isclosed = !this.isclosed;

        if (closebtn.className === 'on'){
            closebtn.classList.remove('on');
        }
        else{
            closebtn.classList.add('on');
        }
        if(this.isclosed === false){
            logo.style.width = "0%";
            desc_wrap.style.width = "0%";
            sidebar.style.width = '6%';
            closebtn.style.left = "50%";
            sidebar.style.boxShadow = 'none';
        }
        else{
            sidebar.style.width = '25%';
            sidebar.style.boxShadow = '0 0 10px 10px rgb(83, 83, 83)';
            logo.style.width = "calc(100% - 112px)";
            desc_wrap.style.width = "calc(100% - 112px)";
            logo.style.left = "112px";
            desc_wrap.style.left = "112px";

        }

    }
    checkNewUser(userid){
        var data={
            username: userid
        }
        // console.log(data.username);
        fetch("http://localhost:4000/users/about_user", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then((data_res) => {
            store.dispatch(action_getUserInfo(data_res[0]));
            if(data_res[0].pref_status === 'F'){
                store.dispatch(action_isnewuser(true));
                store.dispatch(action_toggleMenuItems("AboutMe"));
            }
            
        }).catch((err) => {
            console.log(err)
        });
    }
    toggleAboutMe() {
        store.dispatch(action_toggleMenuItems("AboutMe"))
        this.sidebarHandle();
    }
    toogleDashboard(){
        store.dispatch(action_toggleMenuItems("DashBoard"));
        this.sidebarHandle();
    }
    toggleSearch(){
        store.dispatch(action_toggleMenuItems("Search"));
        this.sidebarHandle();
    }
    getdate() {
        var d = new Date();
        var full_date = '';
        full_date = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
        return full_date;

    }
    componentDidMount(){

        var date = this.getdate();
        document.title="DashBoard";
        var loginval = getCook('username');
        if (this.props.loginstate === true) {
            document.cookie = `login=true`;
            store.dispatch(action_getUsername(loginval));
            this.checkNewUser(loginval);
        }
        store.dispatch(action_toggleMenuItems("DashBoard"));
        store.dispatch(action_getdate(date));

    }
    render(){
        return(
            <div className="dash_main-container animated fadeIn">
                <div className="dash_sidebar-wrap">
                    <div className="sidebar_close-wrap">
                        <div className="sidebar_logo">
                            <h1 className="sidebar_description">Carby</h1></div>
                        <div className="closebtnwrap">
                            <button id="btn" onClick={() => this.sidebarHandle()}><span></span><span></span><span></span></button>
                        </div>
                    </div>
                    <div className="sidebar_items">
                        <div className="sidebar_logos">
                            <div className="sidebar_logo-item item_bottom"><i className="fas fa-sign-out-alt"></i></div>
                            <div className="sidebar_logo-item"><i className="fas fa-columns"></i></div>
                            <div className="sidebar_logo-item"><i className="fas fa-search"></i></div>
                            <div className="sidebar_logo-item"><i className="far fa-user"></i></div>                            
                        </div>
                        <div className="sidebar_logos-desc">
                            <h1 className="sidebar_logo-item-desc item_bottom" onClick={()=>this.logout()}>Logout</h1>
                            <h1 className="sidebar_logo-item-desc" onClick={() => this.toogleDashboard()}>DashBoard</h1>
                            <h1 className="sidebar_logo-item-desc" onClick={() => this.toggleSearch()}>Search</h1>
                            <h1 className="sidebar_logo-item-desc" onClick={() => this.toggleAboutMe()}>About me</h1>
                        </div>
                    </div>
                </div>
                <div className="dash_item-wrap">
                    <div className="dash_item-container">
                        {this.props.isnewuser === true ? <Aboutme />: this.props.toggleMenuItems === "AboutMe"? <Aboutme />:null}
                        {this.props.toggleMenuItems === "Search" ? <Search /> :null}
                        {this.props.toggleMenuItems === "DashBoard" ? <DashFood /> : null}

                    </div>
                </div>
            </div>
        )
    }
} 

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Dashboard);