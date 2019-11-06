import React from 'react';
import { connect } from 'react-redux';
import { store } from '..';
import SearchItem from './Searchitem';
import { action_get_food_obj } from '../actions'

 
class Search extends React.Component {
    displayItems(){
        var len_foodObj = Object.entries((this.props.getfoodobj)).length;
        if(len_foodObj !== 0){
            var foodobj = this.props.getfoodobj;
            console.log(foodobj);
            var food_items = [];
            for(var i=0; i < foodobj['hints'].length;i++)
            {
                food_items.push(<SearchItem counter={i} foodId={foodobj['hints'][i]['food']['foodId']} cals={foodobj['hints'][i]['food']['nutrients']['ENERC_KCAL'] } label={foodobj['hints'][i]['food']['label']} category={foodobj['hints'][i]['food']['categoryLabel']} carbs={foodobj['hints'][i]['food']['nutrients']['CHOCDF']} fat={foodobj['hints'][i]['food']['nutrients']['FAT']} fiber={foodobj['hints'][i]['food']['nutrients']['FIBTG']} protein={foodobj['hints'][i]['food']['nutrients']['PROCNT']} />);
            }
            return food_items;
        }
    }
    handleJson(food_obj){
        var error = document.getElementById('search-error');
        if(food_obj['hints'].length === 0){
            error.innerHTML = "No Results found";
        }
        else{
            error.innerHTML = "";
            store.dispatch(action_get_food_obj(food_obj))
        }
    }
    async getfood(food){
        var app_id = 'f2648ca3';
        var api_key = '9580809cb43b49ccf40f1dc7a65b9fa7';
        var parsed_food = food.replace(/ /g, "%20"); 
        
        var loading_wrap = document.querySelector('.Search-LoadingWrap');
        var item_wrap = document.querySelector('.Search-items');

        item_wrap.classList.add('fadeIn');

        loading_wrap.classList.add('fadeIn');
        loading_wrap.style.display = 'flex';

        const res = await fetch(`https://api.edamam.com/api/food-database/parser?nutrition-type=logging&ingr=${parsed_food}&app_id=${app_id}&app_key=${api_key}`);
        if(res.ok){
            loading_wrap.classList.remove('fadeIn');
            loading_wrap.classList.add('fadeOut');
            setTimeout(() => {
                loading_wrap.style.display = 'none'; 
                loading_wrap.classList.remove('fadeOut');
                item_wrap.style.display = 'block';
            }, 500);
            const json_main = await res.json();
            this.handleJson(json_main);
        }
    }
    callSubmit(e){
        if(e.keyCode === 13){
            this.handleSubmit();
        }
    }
    handleSubmit(){
        var food = document.getElementById('search-food').value;
        var error = document.getElementById('search-error');
        if(food === "" || food === undefined){
            error.innerHTML = "Please Enter a food then search";
        }
        else{

            error.innerHTML = "";
            this.getfood(food);
        }

    }
    componentDidMount(){
        // store.dispatch(action_toggleMenuItems("Search"));
    }
    render(){
        return(
            <div className="Aboutme-wrap">
                <div className="Aboutme-header">
                    <h1>Search for food</h1>
                </div>
                <div className="Aboutme-body">
                    <div className="Search-body">
                        <div className="Search-wrap">
                            <input type="text" id="search-food" placeholder="Enter your food here" onKeyUp={(event) => this.callSubmit(event)}></input><button onClick={() => this.handleSubmit()}>Search</button>
                        </div>
                        <div className="Search-items-wrap">
                            <div className="Search-LoadingWrap animated">
                                <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                            </div>
                            <div className="Search-items animated">
                                {this.displayItems()}
                            </div>
                        </div>
                        <div className="Search-error animated fadeIn">
                            <span id="search-error"></span>
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

export default connect(mapStateToProps)(Search);