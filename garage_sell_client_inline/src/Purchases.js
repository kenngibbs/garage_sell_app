import React, {Component} from 'react'

class Purchases extends Component{
    constructor(props) {
        super(props);
        this.state = {
            editButtonOrForm: <h2>Loading</h2>,
        }
    }

    componentDidMount() {
        this.stopEdittingForm();
    }

    stopEdittingForm=()=>{
        let tempJSXInfo =
            <div>
                <h3>{this.props.purchase.buyerName} made a purchase of {this.props.purchase.price} on {new Date(this.props.purchase.datePurchased).toLocaleString()}</h3>
                <button onClick={this.editElement}>Edit</button> or <button onClick={this.deleteElement}>Delete</button>
                <hr/>
            </div>;
        this.setState({editButtonOrForm: tempJSXInfo});
    };

    editElement=()=>{
        let tempJSXInfo =
            <div>
                <h3>{this.props.purchase.buyerName} made a purchase of {this.props.purchase.price} on {this.props.purchase.datePurchased}</h3>
                <button onClick={this.stopEdittingForm}>Cancel</button> or <button onClick={this.deleteElement}>Delete</button>
                <form onSubmit={this.submitNewPurchase}>
                    <label htmlFor="buyerNameEdit">Enter buyers Name:</label>
                    <input type="text" id="buyerNameEdit" /><br/>

                    <label htmlFor="priceEdit">Enter Price:</label>
                    <input type="number" id="priceEdit" /><br/>

                    <label htmlFor="datePurchasedEdit">Enter Date Purchased:</label>
                    <input type="datetime-local" id="datePurchasedEdit" /><br/>
                    <button>Submit</button>
                </form>
                <hr/>
            </div>;

        this.setState({editButtonOrForm: tempJSXInfo},()=>{
            document.getElementById("buyerNameEdit").value = this.props.purchase.buyerName;
            document.getElementById("priceEdit").value = this.props.purchase.price;
            // Datetime-local adds a Z at the end. The substring gets rid of it.
            document.getElementById("datePurchasedEdit").value =  this.props.purchase.datePurchased.substring(0,16);
        });
    };

    submitNewPurchase=(e)=>{
        e.preventDefault();

        let tempBody = {
            buyerName: document.getElementById("buyerNameEdit").value,
            price: document.getElementById("priceEdit").value,
            datePurchased: document.getElementById("datePurchasedEdit").value,
            id: this.props.purchase.id,
        };

        fetch("/garage_sell/"+this.props.purchase.id+"/", {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tempBody),
        })
            .then(data=>data.json())
            .then(response=>console.log(response))
            .then(()=>this.stopEdittingForm())
            .then(()=>window.location.reload());
            // .then(()=>this.props.reloadGarageSell());
    };

    deleteElement=()=> {
        fetch("/garage_sell/" + this.props.purchase.id + "/", {
            method: 'delete'})
        //As a note, you can't use .json here because it doesn't send json back
            .then(data => data.text())
            .then(response => console.log(response))
            .then(()=>this.props.reloadGarageSell());
    };

    render(){
        return(
            <div>
                {this.state.editButtonOrForm}
            </div>
        );
    }
}

export default Purchases;