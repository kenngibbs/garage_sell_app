import React, {Component} from 'react'

class Purchases extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    deleteElement=()=> {
        fetch("/garage_sell/" + this.props.purchase.id + "/", {
            method: 'delete'
            // headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/json'
            // },
        })
        //As a note, you can't use .json here because it doesn't send json back
            .then(data => data.text())
            .then(response => console.log(response))
            .then(()=>this.props.reloadGarageSell())
    };

    render(){
        return(
            <div>
                <h3>{this.props.purchase.buyerName} made a purchase of {this.props.purchase.price} on {this.props.purchase.datePurchased}</h3>
                <button onClick={(e)=>this.props.editElement(this.props.purchase, e)}>Edit</button> or <button onClick={this.deleteElement}>Delete</button>
                <hr/>
            </div>
        );
    }
}

export default Purchases;