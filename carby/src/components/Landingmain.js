import React from 'react';
import { connect } from 'react-redux';


class LandingMain extends React.Component{
    componentDidMount() {
        document.title = "Carby";
        const about_box = document.querySelector('.about-box-main');
        about_box.classList.add('animated', 'fadeIn');
        about_box.addEventListener('animationend', () => {
            about_box.classList.remove('animated', 'fadeIn');
        });
        
    }


    render(){
        return(
            <div className="about-box about-box-main">
                <div className="about-box-img-wrap"><img className="about-box-runner" src="img/runner.png" alt="none" /></div>
                <div className="about-box-text-wrap"><p className="about-text">Carby is the state-of-the-art online personal trainer. Now you no longer need to visit a dietican or a nuterionist Carby provided accurate and trustworthy diet plans all at your fingertips<br /><br />Save Money,Time And Get Peace of Mind right now for free!</p></div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(LandingMain);