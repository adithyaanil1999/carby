import React from 'react';
import { connect } from 'react-redux';
import { store } from '..';
import { Chart } from 'react-chartjs-2';
import { action_food_check,action_toggleMenuItems,action_add_food_daily } from '../actions'


class DashFood extends React.Component{
    constructor(props){
        super(props);
        this.food = {};
    }
   
    checkDaily() {
        var data = {
            username: this.props.getusername,
            date: this.props.getdate
        }
        fetch("http://localhost:4000/users/check_daily_new", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then((data_res) => {
            if(data_res.length === 0){                // console.log(data_res);
                store.dispatch(action_food_check(true));
            }
            else{
                store.dispatch(action_add_food_daily(data_res))
                store.dispatch(action_food_check(false));
            }

        }).catch((err) => {
            console.log(err)
        });
    }
    
    gotoSearch(){
        store.dispatch(action_toggleMenuItems("Search"));
    }
    addfood(){
        store.dispatch(action_food_check(false));
        store.dispatch(action_toggleMenuItems('Search'));
    }
    submititems(){
        var items = this.props.addfood;
        var i =0;
        for( ; i< items.length ; i++){
            var data ={
            food_id : items[i].id,
            label : items[i].label,
            quant: items[i].quant,
            category: items[i].category,
            cals: items[i].cals,
            carbs: items[i].carbs,
            fat: items[i].fat,
            fiber: items[i].fiber,
            protein: items[i].protein,
            user_id: this.props.getusername,
            date: this.props.getdate
            }
            fetch("http://localhost:4000/users/addfood", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify(data)
            }).then((response) => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            }).then((data_res) => {
                
            }).catch((err) => {
                console.log(err)
            });
            
        }
        setTimeout(() => {
            window.location.reload();
        }, 1000);
        
    }
    confirmitems(){
        if (this.props.addfood.length !==0){
            var foodobj = this.props.addfood;
            var food_items = [];
            for (var i = 0; i < foodobj.length; i++){
                food_items.push(<div className="add-food-items-wrap">Label: {foodobj[i]['label']} Quantity: {foodobj[i]['quant']} </div>)
            }
            return (
                <div className="add-food-display">
                    <h1>Selected Items</h1>
                    <div className="add-food-item-wrap">
                        {food_items}
                    </div>
                    <button onClick={()=>this.submititems()}>Save</button>
                </div>
            )
        }
        else{
            return <div className="Nothing-confirm"><h1>You have nothing to confirm</h1><button id="go-to-search" onClick={()=>this.gotoSearch()}>Add items</button></div>
        }
    }
    dailyfoodDisplay() {
        var obj_len = Object.entries(this.props.getfoodobjdaily).length
        if (obj_len !== 0) {
            var foodobj = this.props.getfoodobjdaily;
            var food_items = [];
            for (var i = 0; i < foodobj.length; i++) {
                food_items.push(<div className="daily-wrap">{foodobj[i]['label']} Quantity: {foodobj[i]['quant']} </div>)
            }
            // console.log(food_items)
            return(
                <div className="daily-container">
                    <h1>Todays Meals:</h1>
                    {food_items}
                </div>
                )
        }
        else {
            return <div className="Nothing-confirm"><h1>You have not eaten anything today!</h1><button id="go-to-search" onClick={() => this.gotoSearch()}>Add items</button></div>
        }
    }
    displayFoodStats(){
        var obj_len = Object.entries(this.props.getfoodobjdaily).length
        if (obj_len !== 0) {
            var weight = this.props.getuserinfo.weight;
            var height = this.props.getuserinfo.height;
            var age = this.props.getuserinfo.age;
            var bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
            bmr = Math.ceil(bmr)
            var goal = this.props.getuserinfo.goal;
            var activeness = this.props.getuserinfo.activeness;

            var target_calories = 0;
            var cal_burn = 0;
            if(goal === "lean"){
                target_calories = bmr+200;
            }
            else if( goal === "Fatloss"){
                target_calories = bmr;
            }
            else{
                target_calories = bmr+300;
            }
            if (activeness === "Low"){
                cal_burn = 50;
            }
            else if (activeness === "Medium"){
                cal_burn = 100;
            }
            else{
                cal_burn = 300;
            }

            var foodobj = this.props.getfoodobjdaily;
            var breakdown = {
                cals: 0,
                fats: 0,
                fiber: 0,
                protein: 0,
                carbs: 0
            }
            for (var i = 0; i < foodobj.length; i++) {
                breakdown['cals'] += Math.ceil(((foodobj[i]['cals']/100)*foodobj[i]['quant']));
                breakdown['fats'] += Math.ceil(((foodobj[i]['fat'] / 100) * foodobj[i]['quant']));
                breakdown['fiber'] += Math.ceil(((foodobj[i]['fiber'] / 100) * foodobj[i]['quant']));
                breakdown['protein'] += Math.ceil(((foodobj[i]['protein'] / 100) * foodobj[i]['quant']));
                breakdown['carbs'] += Math.ceil(((foodobj[i]['carbs'] / 100) * foodobj[i]['quant']));
            }

            var remaining = target_calories-breakdown['cals']+cal_burn;
            console.log(target_calories);
            return (
                <div className="stat-container">
                    <h1 className="stat-title">Nuterient Breakdown:</h1>
                    <div className="stat-flex-wrap">
                        <div className="stat-breakdown">
                            <div className="stat-cal-wrap">
                                <h2>{target_calories} - {breakdown['cals']} + {cal_burn} = {remaining} KCAL</h2>
                                <h3>(goal - food + actvity = remaining)</h3>                                
                            </div>
                            <div className="stat-breakdown-wrap">
                                Carbs: {breakdown['carbs']}<br/>
                                Fats : {breakdown['fats']}<br />
                                Protein: {breakdown['protein']}<br />
                                Fiber: {breakdown['fiber']}<br />
                            </div>
                        </div>
                        <div className="stat-chart">
                            {this.showChart()}
                        </div>

                    </div>
                </div>
            )
        }
        else {
            return null;
        }
    }
    showChart(){
        var foodobj = this.props.getfoodobjdaily;
         function chartoptions() {
            var breakdown = {
                cals: 0,
                fats: 0,
                fiber: 0,
                protein: 0,
                carbs: 0
            }
            for (var i = 0; i < foodobj.length; i++) {
                breakdown['cals'] += Math.ceil(((foodobj[i]['cals'] / 100) * foodobj[i]['quant']));
                breakdown['fats'] += Math.ceil(((foodobj[i]['fat'] / 100) * foodobj[i]['quant']));
                breakdown['fiber'] += Math.ceil(((foodobj[i]['fiber'] / 100) * foodobj[i]['quant']));
                breakdown['protein'] += Math.ceil(((foodobj[i]['protein'] / 100) * foodobj[i]['quant']));
                breakdown['carbs'] += Math.ceil(((foodobj[i]['carbs'] / 100) * foodobj[i]['quant']));
            }
            console.log(breakdown)
            var ctx = document.getElementById('myChart').getContext('2d');
            new Chart(ctx, {
                // The type of chart we want to create
                type: 'doughnut',

                // The data for our dataset
                data: {
                    labels: ['Carbs', 'Fiber', 'Protein', 'Fats'],
                    datasets: [{
                        label: '# of Votes',
                        data: [breakdown['carbs'], breakdown['fiber'],breakdown['protein'], breakdown['fats']],
                        backgroundColor: [
                            'rgba(255, 99, 132)',
                            'rgba(54, 162, 235)',
                            'rgba(255, 206, 86)',
                            'rgba(75, 192, 192)',
                            'rgba(153, 102, 255)',
                            'rgba(255, 159, 64)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {}
            });
        }
        setTimeout(() => {
            chartoptions();
        }, 1)
        
        return(
            <div className="chart-wrap">
                <canvas id="myChart" className="chart"></canvas>
            </div>
        )
    }
    componentDidMount(){
        if(this.props.addfood.length === 0)
        {
            this.checkDaily();
        }

    }
    render(){
        return (
            <div className="Aboutme-wrap">
                {
                    this.props.checkdailyfood === true ?
                        <div className="Newfood-tint">
                            <div className="Aboutme-new-user-banner">
                                <h1> You have not added any food yet</h1>
                                <div className="dismiss_btn-wrap">
                                    <button id="dismiss_btn" onClick={() => this.addfood()}>Add</button>
                                </div>
                            </div>
                        </div>
                        : null
                }
                <div className="Aboutme-header">
                    <h1>DashBoard</h1>
                </div>
                <div className="Aboutme-body">
                    {/* <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script> */}
                    <div className="DashFood-wrap">
                        <div className="DashFood-confirm">
                            {this.confirmitems()}
                        </div>
                        <div className="DashFood-today">
                            {this.dailyfoodDisplay()}
                        </div>
                        <div className="DashFood-breakdown">
                            {
                                this.displayFoodStats()
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(DashFood);