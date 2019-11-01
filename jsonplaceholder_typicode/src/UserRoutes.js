import React, {Component} from 'react'
import EachUser from "./EachUser";

class UserRoutes extends Component{
    constructor(props) {
        super(props);
        this.state = {
            allGarageSellsArray: <h2>No results found</h2>,
            isEditting: false,
            edittingElement: -1,
        }
    }

    componentDidMount() {
        this.reloadGarageSell();
    }

    reloadGarageSell=()=>{
        fetch("/users/")
            .then(data=>data.json())
            .then(response=>{
                if (response.length>0)
                {
                    let tempMappedElements = response.map(
                        (eachElement)=>{
                            return(<div key={eachElement.id}>
                                <EachUser user={eachElement} editElement={this.editElement} reloadGarageSell={this.reloadGarageSell}/>
                            </div>);
                        }
                    );
                    this.setState({allGarageSellsArray:tempMappedElements})
                }
                else{
                    this.setState({allGarageSellsArray:<h2>No results found</h2>})
                }
            });
    };

    submitNewPurchase=(e)=>{
        e.preventDefault();

        let tempBody = {
            name: document.getElementById("name").value,
            username: document.getElementById("username").value,
        };

        if(!this.state.isEditting) {
            fetch("/users/", {
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
        }
        else{
            tempBody.id = this.state.edittingElement;
            this.setState(
                {
                    isEditting: false,
                    edittingElement:-1,
                }
            );
            fetch("/users/"+tempBody.id+"/", {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tempBody),
            })
                .then(data=>data.json())
                .then(response=>console.log(response))
                .then(()=>this.reloadGarageSell());
        }

    };

    editElement=(elementToEdit)=>{
        document.getElementById("name").value = elementToEdit.name;
        document.getElementById("username").value = elementToEdit.username;

        this.setState(
            {
                isEditting: true,
                edittingElement:elementToEdit.id,
            }
        );
        // let tempBody = {
        //     id: elementToEdit.id,
        //     buyerName: document.getElementById("buyerName").value,
        //     price: document.getElementById("price").value,
        //     datePurchased: document.getElementById("datePurchased").value,
        // };
        //
        // fetch("/garage_sell/",{
        //     method: 'put',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(tempBody),
        // })
        //     .then(data=>data.json())
        //     .then(response=>console.log(response))
        //     .then(()=>this.reloadGarageSell());
    };

    render(){
        return(
            <div>
                <form onSubmit={this.submitNewPurchase}>
                    <label htmlFor="name">Enter Name:</label>
                    <input type="text" id="name" /><br/>

                    <label htmlFor="username">Enter Username:</label>
                    <input type="text" id="username" /><br/>

                    <button>Submit</button>
                </form>
                <h1>Welcome to the garage sell!</h1>
                {this.state.allGarageSellsArray}
            </div>
        )
    }
}

export default UserRoutes;