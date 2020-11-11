import React, { Component } from "react";
import generateUID from "../js/functions"
 export default class TodoList extends Component{
    constructor(props) {
        super(props);

        this.state = {
            tasks:[],
            value: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    handleSubmit(event) {
        event.preventDefault();

        let value = this.state.value;

        if(value.length === 0){
            return;
        }

        this.setState(state => ({
            tasks: state.tasks.concat({
                id: generateUID(5),
                text: value
            }),
            value: ''
        }), ()=>{
            //localstorage
        });
    }
    
    render() {
        return (
            <div style={ {margin: 20} } className="w-25">
                <div style={{ textAlign: 'center' }}>
                    <h3>{this.props.title}</h3>
                </div>
                <div>
                    <ul>
                        {
                            this.state.tasks.map(task => (
                                <li key={task.id} >{task.text}</li>
                            ))
                        }
                    </ul>
                </div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input className="form-control" placeholder="Add A New Task" type="text"  value={this.state.value} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary btn-submit btn-block">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}