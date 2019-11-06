import React from 'react';
import { connect } from 'react-redux';
import { store } from '..';
import { Field, reduxForm } from 'redux-form';
import {
    action_getUserInfo
} from '../actions';

class Aboutme extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false //Set render state to false
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log('submit');
        console.log(this.props.form.AboutMe.values);
        if (this.props.form.AboutMe.values === undefined){
            document.querySelector('.Aboutme-error').innerHTML = "You have made No changes";
        }
        else{
            var data = {
                username: this.props.getusername,
                age: this.props.form.AboutMe.initialValues.age,
                sex: this.props.form.AboutMe.initialValues.sex,
                weight: this.props.form.AboutMe.initialValues.weight,
                height: this.props.form.AboutMe.initialValues.height,
                goal: this.props.form.AboutMe.initialValues.goal,
                activeness: this.props.form.initialValues.activeness
            }
            if (this.props.form.AboutMe.values.age !== undefined)
            {
                data['age'] = this.props.form.AboutMe.values.age;
            }
            if (this.props.form.AboutMe.values.sex !== undefined) {
                data['sex'] = this.props.form.AboutMe.values.sex;
            }
            if (this.props.form.AboutMe.values.weight !== undefined) {
                data['weight'] = this.props.form.AboutMe.values.weight;
            }
            if (this.props.form.AboutMe.values.height !== undefined) {
                data['weight'] = this.props.form.AboutMe.values.height;
            }
            if (this.props.form.AboutMe.values.goal !== undefined) {
                data['goal'] = this.props.form.AboutMe.values.goal;
            }
            if (this.props.form.AboutMe.values.activeness !== undefined) {
                data['activeness'] = this.props.form.AboutMe.values.activeness;
            }
    
            fetch("http://localhost:4000/users/update_user", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify(data)
            }).then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            }).then(function (data_res) {
                store.dispatch(action_getUserInfo(data));
                window.location.reload();
            }).catch(function (err) {
                console.log(err)
            });
            console.log(data);
        }
    }
    handleNewUser() {
        var abtmewrap = document.querySelector('.Newuser-tint');
        abtmewrap.style.background = "rgba(0, 0, 0, 0.6)";
    }

    dismissnew() {
        var abtmewrap = document.querySelector('.Newuser-tint');
        abtmewrap.classList.add("animated", "fadeOut");
        setTimeout(() => {
            abtmewrap.style.display = "none";
        }, 500);
    }
    handleChange() {
        console.log('change')
    }
    loadBodyValues() {
        var weight = this.props.getuserinfo.weight;
        var height = this.props.getuserinfo.height;

        height = height / 100;
        var bmi = weight / (height * height);
        bmi = bmi.toFixed(2)
        var bmi_status = "";
        if(bmi<18.5){
            bmi_status = "Under weight";
        }
        else if(bmi>=18.5 && bmi <=24.9){
            bmi_status = "Normal weight";
        }
        else if(bmi<=25 && bmi <=29.9){
            bmi_status = "Overweight";
        }
        else{
            bmi_status = "Obese";
        }
        document.getElementById("BMI").innerHTML = bmi + " ("+bmi_status +") " ;

        
        height = this.props.getuserinfo.height;
        var age = this.props.getuserinfo.age;
        var bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        bmr = Math.ceil(bmr)
        document.getElementById("BMR").innerHTML = bmr+ " KCAL";

        if (this.props.getuserinfo.sex === "M") {
            var ideal = 52;
            var temp = height - 152.4;
            var n = temp / 2.54;
            ideal = ideal + Math.ceil(n);
            document.getElementById("target_weight").innerHTML = ideal;

        }
        else {
            ideal = 49;
            temp = height - 152.4;
            n = temp / 2.54;
            ideal = ideal + Math.ceil(n);
            document.getElementById("target_weight").innerHTML = ideal;
        }


    }
    componentDidMount() {
        if (this.props.isnewuser === true)
            this.handleNewUser();
        this.loadBodyValues();
    }
    render() {
        return (
            <div className="Aboutme-wrap">
                {
                    this.props.isnewuser === true ?
                        <div className="Newuser-tint">
                            <div className="Aboutme-new-user-banner">
                                <h1> So, You're New?Just fill out some more details about you</h1>
                                <div className="dismiss_btn-wrap">
                                    <button id="dismiss_btn" onClick={() => this.dismissnew()}>Dismiss</button>
                                </div>
                            </div>
                        </div>
                        : null
                }
                <div className="Aboutme-header">
                    <h1>About {this.props.getusername}</h1>
                </div>
                <div className="Aboutme-body">
                    <form className="Aboutme-form" onSubmit={(event) => this.handleSubmit(event)}>
                        <div className="Aboutme-form-flex-wrap">
                            <div className="Aboutme-form-left">
                                <h2>Age</h2>
                                <Field className="" component="input" id="age" name="age" type="number" onKeyUp={() => this.handleChange()} placeholder={this.props.getuserinfo.age} />
                                <h2>Sex</h2>
                                <Field name="sex" id="sex" component="select" className="aboutme_select" onChange={() => this.handleChange()}>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                </Field>
                                <h2>Weight</h2>
                                <Field className="" id="weight" name="weight" component="input" onKeyUp={() => this.handleChange()} type="number" placeholder={this.props.getuserinfo.weight} />
                                <h2>Height</h2>
                                <Field className="" id="height" name="height" component="input" onKeyUp={() => this.handleChange()} type="text" placeholder={this.props.getuserinfo.height} />
                                <h2>Goal {this.props.isnewuser ? <span className="red-text">*</span> : null}</h2>
                                <Field name="goal" id="goal" component="select" className="aboutme_select" onChange={() => this.handleChange()}>
                                    <option value="Lean">Get Lean</option>
                                    <option value="Fatloss">Fat Loss</option>
                                    <option value="Muscles">Muscle Gain</option>
                                </Field>
                                <h2>Daily Activeness {this.props.isnewuser ? <span className="red-text">*</span> : null}</h2>
                                <Field name="activeness" id="activeness" component="select" className="aboutme_select" onChange={() => this.handleChange()}>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </Field>
                            </div>
                            <div className="Aboutme-form-right">
                                <h1>BMI:</h1>
                                <h2 id="BMI">23.5</h2>
                                <h1>BMR:</h1>
                                <h2 id="BMR">23.5</h2>
                                <h1>Target Weight:</h1>
                                <h2 id="target_weight">23.5</h2>
                            </div>
                        </div>
                        <button>Submit</button>
                        <div className="Aboutme-error">
                            {
                                this.props.isnewuser ?
                                    <p>Fill in the required fields *</p> :
                                    null
                            }
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    var inital = {
        age: state.getuserinfo.age,
        sex: state.getuserinfo.sex,
        weight: state.getuserinfo.weight,
        height: state.getuserinfo.height,
        pref_status: "A",
        goal: "lean",
        activeness: "Low"
    }
    state.form.initialValues= inital; // retrieve name from redux store 
    return state
}


export default reduxForm({
    form: 'AboutMe'
})(connect(mapStateToProps)(Aboutme));