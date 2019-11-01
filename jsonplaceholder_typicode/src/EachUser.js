import React, {Component} from 'react'

class EachUser extends Component{

    deleteElement=()=> {
        fetch("/users/" + this.props.user.id + "/", {
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
                <h3>{this.props.user.name} with username {this.props.user.username}</h3>
                <button onClick={(e)=>this.props.editElement(this.props.user, e)}>Edit</button> or <button onClick={this.deleteElement}>Delete</button>
                <hr/>
            </div>
        );
    }
}

export default EachUser;