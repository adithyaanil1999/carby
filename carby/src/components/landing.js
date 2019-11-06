import React from 'react';
import SignUp from './SignUp';
import { store } from '..';
import { connect } from 'react-redux';
import LandingMain from './Landingmain';
import Login from './Login';


class Landing extends React.Component {


    handlenav(state) {
        const landing_nav = document.querySelector('.landing-nav-btns-wrap');
        const close_btn = document.querySelector('.close-btn-warp');
        if (state === false) {

            store.dispatch({
                type: 'TOGGLE_ABOUT',
                istrue: false
            });
            close_btn.classList.add('animated', 'fadeIn', 'faster');
            landing_nav.classList.add('animated', 'fadeOut', 'faster');
            setTimeout(() => {
                landing_nav.style.display = 'none';
                close_btn.style.display = 'flex';
                close_btn.classList.remove('fadeIn', 'faster');
                landing_nav.classList.remove('fadeOut', 'faster');

            }, 300);



        }

        if (state === true) {
            store.dispatch({
                type: 'TOGGLE_ABOUT',
                istrue: true
            });
            close_btn.classList.add('fadeOut', 'faster');
            setTimeout(() => {
                close_btn.style.display = 'none';
                landing_nav.classList.add('fadeIn', 'faster');
                landing_nav.style.display = 'flex';
                setTimeout(() => {
                    landing_nav.classList.remove('fadeIn', 'faster');
                    close_btn.classList.remove('fadeOut', 'faster');
                }, 30);
            }, 300);
        }

    }



    showSignUpPage() {
        this.handlenav(this.props.showSignUp);
        //Redux Store Updation
        store.dispatch({
            type: 'TOGGLE_SIGNUP',
            istrue: true
        });



    }
    showSign() {

        //animation handling
        const about_box = document.querySelector('.about-box');
        if (this.props.showSignUp !== true) {
            about_box.classList.add('animated', 'fadeOut', 'faster');
        }
        setTimeout(() => {
            if(this.props.showSignUp !== true){
                about_box.style.display = 'none';
            }
            about_box.classList.remove('animated', 'fadeOut', 'faster');
        }, 100);
        return <SignUp />

    }

    showLoginPage() {
        this.handlenav(this.props.showLogin);
        //Redux Store Updation
        store.dispatch({
            type: 'TOGGLE_LOGIN',
            istrue: true
        });
    }

    showLogin(){
        const about_box = document.querySelector('.about-box');
        about_box.addEventListener('animationend', () => {
            about_box.style.display = 'flex';
            about_box.classList.remove('animated', 'fadeOut', 'faster');
            about_box.classList.remove('animated', 'fadeIn', 'faster');
        });

        return <Login/>

    }
    componentDidMount() {
        // console.log(this.props);
        document.title = "Carby";
    }

    showabt(token) {

        return <LandingMain />;

    }
    showbackbtn() {
        if(this.props.showSignUp === true){
            store.dispatch({
                type: 'TOGGLE_SIGNUP',
                istrue: false
            })
            this.handlenav(this.props.showSignUp);
        }
         if(this.props.showLogin === true){
             store.dispatch({
                type: 'TOGGLE_LOGIN',
                istrue: false
            })
            this.handlenav(this.props.showLogin);
         }
        
    }


    render() {
        return (
            <div className="landing-main-container animated fadeIn">
                <div className="landing-navbar">
                    <div className="landing-nav-item">
                        <div className="landing-nav-logo" />
                        <div className="landing-nav-title">CARBY</div>
                    </div>
                    <div className="landing-nav-item landing-nav-btns-wrap">
                        <button className="landing-nav-btns" onClick={() => this.showSignUpPage()}>Sign Up</button>
                        <button className="landing-nav-btns" onClick={() => this.showLoginPage()} >Login</button>
                    </div>
                    <div className="landing-nav-item close-btn-warp">
                        <button className="landing-close-btn"><i className="fas fa-arrow-left" onClick={() => this.showbackbtn()}></i></button>
                    </div>
                </div>
                {
                    this.props.showAbt === true ? this.showabt() : this.props.showSignUp === true ? this.showSign() : this.props.showLogin === true ? this.showLogin() : null
                }
                <div className="landing-wave" />
                <div className="landing-wave-2" />
            </div>
        );
    }
};

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Landing);