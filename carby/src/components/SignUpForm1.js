import React from 'react';
import { Field, reduxForm } from 'redux-form';
import SignUp from './SignUp';
import { connect } from 'react-redux';



class SignUpForm1 extends React.Component{
    handleChange(no){
        var error_text = document.querySelector('#ErrorText-1');
        const btn = document.querySelector('.SignUpSubBtn');
        if (this.props.form.SignUpForm1.values.username === "" || this.props.form.SignUpForm1.values.username === undefined || this.props.form.SignUpForm1.values.password === "" || this.props.form.SignUpForm1.values.password === undefined || this.props.form.SignUpForm1.values.confirmpassword === "" || this.props.form.SignUpForm1.values.confirmpassword === undefined){
            error_text.innerHTML = "Fields Cannot be left empty";
            btn.disabled = true;
        }
        
        else if (!(this.props.form.SignUpForm1.values.username).match(/^[a-z0-9]+$/i)) {
            error_text.innerHTML = "Username must be either alphabets or numbers";
            btn.disabled = true;
        }
        else if (this.props.form.SignUpForm1.values.username.length <= 6) {
            error_text.innerHTML = "Username needs to be atleast 6 characters long";
            btn.disabled = true;
        }
        else if (this.props.form.SignUpForm1.values.password.length <= 8) {
            error_text.innerHTML = "Password needs to be atleast 8 characters long";
            btn.disabled = true;
        }
        else if (this.props.form.SignUpForm1.values.password !== this.props.form.SignUpForm1.values.confirmpassword){
            error_text.innerHTML = "Passwords do not Match";
            btn.disabled = true;
        }
        else{
            if (typeof (this.props.form.SignUpForm1.values.username) !== 'undefined') {
                var data = {
                    username: this.props.form.SignUpForm1.values.username
                }
            }
            // console.log(data);
            fetch("http://localhost:4000/users/checkid", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify(data)
            }).then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            }).then(function (data) {
                var error_text = document.querySelector('#ErrorText-1');
                const btn = document.querySelector('.SignUpSubBtn');
                if (data.length === 0) {
                    error_text.innerHTML = '';
                    btn.disabled = false;

                }
                else {
                    error_text.innerHTML = "Username taken";
                    btn.disabled = true;
                }
            }).catch(function (err) {
                console.log(err)
            });
        
            
        }
    }
    componentDidMount(){
        const btn = document.querySelector('.SignUpSubBtn');
        if(this.props.showSignUp1_btn === false){
            btn.disabled = true;
        }
    }
    render()
    {
        return(
            <form className="SignUpForm-1" model="user" onSubmit={(event) => SignUp.handleFormSignIn(event,1)}>
                <div className="SignUpInputWrap">
                    <p className="SignUplabel">Username</p>
                    <Field className="SignUpInput" name="username" component="input" id="username" onKeyUp={() => this.handleChange()} type="text" placeholder="Username" />
                </div>
                <div className="SignUpInputWrap">
                    <p className="SignUplabel">Password</p>
                    <Field className="SignUpInput" id="password" name="password" component="input" type="password" onKeyUp={() => this.handleChange()} placeholder="Password" />
                </div>
                <div className="SignUpInputWrap">
                    <p className="SignUplabel">Confirm Password</p>
                    <Field className="SignUpInput" id="confirmpassword" name="confirmpassword" component="input" type="password" onKeyUp={() => this.handleChange()} placeholder="Confirm Password" />
                </div>
                <button className="SignUpSubBtn">Continue</button>
                <div className="SignUpError">
                    <p id="ErrorText-1"></p>
                </div>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

SignUpForm1=connect(mapStateToProps)(SignUpForm1);

const initialValues = {
    username: '',
    password: '',
    confirmpassword: ''
}
export default reduxForm({
    form: 'SignUpForm1',
    initialValues  
})(SignUpForm1)