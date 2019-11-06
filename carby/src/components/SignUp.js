import React from 'react';
import { connect } from 'react-redux';
import SignUpForm1 from './SignUpForm1';
import SignUpForm2 from './SignUpForm2';


class SignUp extends React.Component{
    static signUp_animation() {
        const box1 = document.querySelector('.SignUpBox-1');
        const box2 = document.querySelector('.SignUpBox-2');
        const about_signup_2 = document.querySelector('.About-SignUp-2');

        box1.classList.add('animated', 'moveBox1');
        box2.classList.add('animated', 'moveBox2');
        box2.addEventListener('animationend', () => {
            about_signup_2.style.display = "flex"
        }
        );

        if (/Mobi/.test(navigator.userAgent)) {
            const form2 = document.querySelector('.SignUpForm-2-warp');
            box1.style.display = 'none';
            box2.style.display = 'flex';
            form2.style.display = 'flex';
        }

    }

    static handleFormAnimations()
    {
        const btn = document.querySelector('.SignUpSubBtn');
        const form1 = document.querySelector('.SignUpForm-1-wrap');
        const form2 = document.querySelector('.SignUpForm-2-wrap');
        const about_signup = document.querySelector('.About-SignUp');

        btn.addEventListener('click', this.signUp_animation());
        about_signup.classList.add('animated', 'fadeOut', 'faster');
        about_signup.style.display = 'none';

        form1.classList.add('animated', 'fadeOut', 'faster');
        form1.addEventListener('animationend', () => {
            form1.style.display = "none";
            form2.style.display = "flex";
        });

    }

    static handleFormSignIn(val) {
        val.preventDefault();
        this.handleFormAnimations();
    
    }
    componentDidMount() {
        document.title = "SignUp";
        const sign_up_wrap = document.querySelector('.SignUpBox');
        setTimeout(() => {
            sign_up_wrap.classList.add('animated', 'fadeIn');

            sign_up_wrap.style.display = 'flex';
        }, 200);
        
    }

    componentWillUnmount(){
        const signup_box = document.querySelector('.SignUpBox');
        signup_box.classList.add('animated', 'fadeOut', 'faster');
        signup_box.addEventListener('animationend', () => {
            signup_box.classList.remove('animated', 'fadeOut', 'faster');
        });
        
    }

    render(){
        return(
            <div className="about-box SignUpBox">
                <div className="SignUpBox-1">
                    <div className="SignUpForm-1-wrap">
                        <SignUpForm1 />
                    </div>
                    <div className="About-SignUp-2 animated fadeIn faster">
                        <h1>Tell Us A little Bit More About Yourself!</h1>
                    </div>
                </div>
                <div className="SignUpBox-2">
                    <div className="About-SignUp">
                        <h1>SignUp for Carby for free today!</h1>
                    </div>
                    <div className="SignUpForm-2-wrap">
                        <SignUpForm2 />
                    </div>
                </div>
            </div>
        );

    };
}


function mapStateToProps(state) {
    return state;
}



export default connect(mapStateToProps)(SignUp);