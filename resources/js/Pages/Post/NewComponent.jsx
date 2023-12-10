import React, {Component} from "react";

export default class NewComponent extends Component{
    state = {
        name: 'Amberlain',
        age: 25,
        phone: 9191345414,
        skills: ['soccer', 'web developer', 'films']
    }

    handleClick(e){
        console.log('Clic clic');
    }

    handleChangeState = () => {
        this.setState({
            name: 'Limber',
            age : '24',
            phone: 9191234567,
            skills: ['VBA, VB, HTML, CSS, JS']
        })
    }

     render() {
        return( 
            <>
                <h1>This is a class Component</h1>
                <h4>Name: {this.state.name}</h4>
                <p>Age: {this.state.age}</p>
                <p>Phone: {this.state.phone}</p>
                <p>Skills: {this.state.skills.join(',')}</p>
                <button type="button" onClick={this.handleClick}>Presioname</button>
                <button type="button" onClick={this.handleChangeState}>cambiar de estado</button>
            </>
        )
     }
}