import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { store } from '..';
import { action_loginstate,action_getUsername } from '../actions';

class SignUpForm2 extends React.Component{
    handleFormSignIn(e){
        e.preventDefault();
        var data = {
            username: this.props.form.SignUpForm1.values.username,
            password: this.props.form.SignUpForm1.values.password,
            age: this.props.form.SignUpForm2.values.age,
            sex: this.props.form.SignUpForm2.values.sex,
            weight: this.props.form.SignUpForm2.values.weight,
            height: this.props.form.SignUpForm2.values.height
        }
        fetch("http://localhost:4000/users/regnew", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify(data)
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data_res) {
            store.dispatch(action_loginstate(true));
            document.cookie = `username=${data.username}`
            store.dispatch(action_getUsername(data.username));

        }).catch(function (err) {
            console.log(err)
        });
    }
    handleChange() {
        var error_text = document.querySelector('#ErrorText-2');
        const btn = document.querySelector('.WhiteBtn');
        if (this.props.form.SignUpForm2.values.age === "" || this.props.form.SignUpForm2.values.age === undefined || this.props.form.SignUpForm2.values.sex === "" || this.props.form.SignUpForm2.values.sex === undefined || this.props.form.SignUpForm2.values.weight === "" || this.props.form.SignUpForm2.values.weight === undefined || this.props.form.SignUpForm2.values.height === "" || this.props.form.SignUpForm2.values.height === undefined) {
            error_text.innerHTML = "Fields Cannot be left empty";
            btn.disabled = true;

        }
        else if (this.props.form.SignUpForm2.values.age<=10){
            error_text.innerHTML = "Age must be above 10";
            btn.disabled = true;
        }
        else if (this.props.form.SignUpForm2.values.height <= 100) {
            error_text.innerHTML = "Age must be above 100cm";
            btn.disabled = true;
        }
        else if (this.props.form.SignUpForm2.values.weight <= 30) {
            error_text.innerHTML = "Age must be above 30kg";
            btn.disabled = true;
        }
        else {
            error_text.innerHTML = '';
            btn.disabled = false;
        }
    }
    componentDidMount() {
        const btn = document.querySelector('.WhiteBtn');
        if (this.props.showSignUp2_btn === false) {
            btn.disabled = true;
        }
    }
    componentWillUnmount(){
        window.location.reload();
    }
    render()
    {
        return(
            <form className="SignUpForm-2" model="user" onSubmit={(event) => this.handleFormSignIn(event)}>
                <div className="SignUpInputWrap GreyBg animated fadeIn MultipleInp">
                    <div className="MultiLineInpWrap">
                        <p className="SignUplabel">Age</p>
                        <Field className="SignUpInput numberInp" component="input" name="age" type="number" onKeyUp={() => this.handleChange()} placeholder="Age" />
                    </div>
                    <div className="MultiLineInpWrap InputWrapRight">
                        <p className="SignUplabel" name="Sex_user">Sex</p>
                        <Field name="sex" component="select" className="SelectBtn" onChange={() => this.handleChange()}>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </Field>
                    </div>
                </div>
                <div className="SignUpInputWrap GreyBg animated fadeIn">
                    <p className="SignUplabel">Weight</p>
                    <Field className="SignUpInput" name="weight" component="input" onKeyUp={() => this.handleChange()} type="number" placeholder="Weight(Kg)" />
                </div>
                <div className="SignUpInputWrap GreyBg animated fadeIn">
                    <p className="SignUplabel">Height</p>
                    <Field className="SignUpInput" name="height" component="input" onKeyUp={() => this.handleChange()} type="text" placeholder="Height(cm)" />
                </div>
                <button className="SignUpSubBtn animated fadeIn WhiteBtn">Register</button>
                <div className="SignUpError">
                    <p id="ErrorText-2"></p>
                </div>
            </form>
        )
    }
}
function mapStateToProps(state) {
    return state;
}
SignUpForm2 = connect(mapStateToProps)(SignUpForm2);

const initialValues = {
    age: '',
    sex: 'M',
    weight: '',
    height: ''
}
export default reduxForm({
    form: 'SignUpForm2',
    initialValues  
})(SignUpForm2)