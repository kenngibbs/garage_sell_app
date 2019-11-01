import React, {Component} from 'react'
import Purchases from "./Purchases";

class GarageSell extends Component{
    constructor(props) {
        super(props);
        this.state = {
            allGarageSellsArray: <h2>No results found</h2>,
        }
    }

    componentDidMount() {
        this.reloadGarageSell();
    }

    reloadGarageSell=()=>{
        console.log(this.state.allGarageSellsArray);
        console.log("reload");
        fetch("/garage_sell/")
            .then(data=>data.json())
            .then(response=>{
                if (response.length>0)
                {
                    let tempMappedElements = response.map(
                        (eachElement)=>{
                            return(<div key={eachElement.id}>
                                <Purchases purchase={eachElement} editElement={this.editElement} reloadGarageSell={this.reloadGarageSell}/>
                            </div>);
                        }
                    );
                    this.setState({allGarageSellsArray:tempMappedElements},()=>console.log(this.state.allGarageSellsArray))
                }
                else{
                    this.setState({allGarageSellsArray:<h2>No results found</h2>})
                }
            });
    };

    submitNewPurchase=(e)=>{
        e.preventDefault();

        let tempBody = {
            buyerName: document.getElementById("buyerName").value,
            price: document.getElementById("price").value,
            datePurchased: document.getElementById("datePurchased").value,
        };

        fetch("/garage_sell/", {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tempBody),
        })
            .then(data=>data.json())
            .then(response=>console.log(response))
            .then(()=>this.reloadGarageSell());

    };

    render(){
        return(
            <div>
                <form onSubmit={this.submitNewPurchase}>
                    <label htmlFor="buyerName">Enter buyers Name:</label>
                    <input type="text" id="buyerName" /><br/>

                    <label htmlFor="price">Enter Price:</label>
                    <input type="number" id="price" /><br/>

                    <label htmlFor="datePurchased">Enter Date Purchased:</label>
                    <input type="datetime-local" id="datePurchased" /><br/>
                    <button>Submit</button>
                </form>
                <h1>Welcome to the garage sell!</h1>
                {this.state.allGarageSellsArray}
            </div>
        )
    }
}

export default GarageSell;