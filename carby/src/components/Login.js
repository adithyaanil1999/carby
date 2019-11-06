import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { store } from '..';
import { action_loginstate,action_getUsername} from '../actions';



class Login extends React.Component{
    handleSubmit(e) {
        var error_text = document.querySelector('#ErrorText-1');
        e.preventDefault();
        var data={
            username: this.props.form.loginform.values.username,
            password: this.props.form.loginform.values.password,
        }
        console.log(data);
        fetch("http://localhost:4000/users/loginuser", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify(data)
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data_res) {
            if (data_res.length === 0) {
                error_text.innerHTML = "Username or Password Incorrect"
            }
            else {
                var username = data_res[0].user_id;
                // console.log(
                document.cookie = `username=${username}`;
                store.dispatch(action_getUsername(username));
                store.dispatch(action_loginstate(true));
                window.location.reload();
            }
        }).catch(function (err) {
            console.log(err)
        });

    }
    componentDidMount() {

        document.title = "Login";
        const sign_up_wrap = document.querySelector('.loginbox');
        sign_up_wrap.classList.add('animated', 'fadeIn');
        setTimeout(() => {
            if(this.props.showLogin === true){
                sign_up_wrap.style.display = 'flex';
            }
        }, 30);

    }
    render()
    {
        return (
            <div className="about-box SignUpBox loginbox">
                <div className="SignUpBox-1 flip1">
                    <form className="SignUpForm-1" model="user" onSubmit={(event) => this.handleSubmit(event)}>
                        <div className="SignUpInputWrap">
                            <p className="SignUplabel">Username</p>
                            <Field component="input"  className="SignUpInput" id="username" name="username" type="text" placeholder="Username" />
                        </div>
                        <div className="SignUpInputWrap">
                            <p className="SignUplabel">Password</p>
                            <Field component="input"  className="SignUpInput" id="password" name="password" type="password" placeholder="Password" />
                        </div>
                        <button className="SignUpSubBtn flip2">Login</button>
                        <div className="SignUpError">
                            <p id="ErrorText-1"></p>
                        </div>
                    </form>
                </div>
                <div className="SignUpBox-2 flip2">
                    <div className="About-SignUp flip2">
                        <h1>Login For A Better life!</h1>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}
Login = connect(mapStateToProps)(Login);

const initialValues = {
    username: '',
    password: '',
}
export default reduxForm({
    form: 'loginform',
    initialValues
    
})(Login)

