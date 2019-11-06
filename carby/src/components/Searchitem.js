import React from 'react';
import { connect } from 'react-redux';
import { store } from '..';
import {action_addFood} from '../actions';
class SearchItem extends React.Component {
    addItem(){
        var error = document.getElementById('search-error');
        var data = {
            id : this.props.foodId,
            label : this.props.label,
            category: this.props.category,
            fat: this.props.fat,
            cals: this.props.cals,
            fiber: this.props.fiber,
            protein: this.props.protein,
            carbs: this.props.carbs,
            quant : document.getElementById('quant'+this.props.counter).value

        }
        if (data['quant'] === undefined || data['quant'] === "" ){
            data['quant'] = 100;
        }
        store.dispatch(action_addFood(data));
        error.innerHTML = "Go to DashBoard to confirm food items";
    }
   
    render(){
        return (
            <div className="Search-item-containter primary-item">
                <div className="label-wrap">
                    <h2 className="food-label">{this.props.label}</h2><p className="category-label">Category: {this.props.category}</p>
                </div>
                <div className="food-nutrients-wrap">
                    <span className="food-header">Nutrients</span>
                    <p>Carbs: {this.props.carbs}</p>
                    <p>Calories: {this.props.cals}</p>
                    <p>Fat: {this.props.fat}</p>
                    <p>Fiber: {this.props.fiber}</p>
                    <p>Protein: {this.props.protein}</p>
                </div>
                <div className="food-add-wrap">
                    <input id={"quant"+this.props.counter} placeholder="Quantity(g) Default 100g"type="number"/>
                    <button className="food-add-btn" onClick={()=>this.addItem()}>Add</button>
                </div>
            </div>
        )
    }
}

// export default SearchItem;

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(SearchItem);