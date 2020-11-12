import React, { Component } from "react";
import generateUID from "../js/functions";
 export default class TodoList extends Component{
    constructor(props) {
        super(props);


        this.state = {
            tasks: this.getFromLocalStorage(),
            value: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    deleteTask(task){
        let index = this.state.tasks.indexOf(task);
        let oldTasks = this.state.tasks.slice();
        oldTasks.splice(index, 1);
        this.setState({
            tasks: oldTasks
        }, ()=>{
            this.updateInLocalStorage()
        })
    }

    updateInLocalStorage(){
        localStorage.setItem(this.props.id, JSON.stringify(this.state.tasks));
    }

    getFromLocalStorage(){
        return JSON.parse(localStorage.getItem(this.props.id));
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

        this.setState(({
            tasks: this.state.tasks.concat({
                id: generateUID(5),
                text: value
            }),
            value: ''
        }), ()=>{
            this.updateInLocalStorage()
        });
    }
    
    render() {
        return (
            <div className="bg-white shadow rounded border" style={{margin: 20, width: 333}}>
                <div style={ {margin: 'auto', width: 300, 'max-height': 456, 'min-height':456, 'overflow-y': 'auto'} }>
                    <div style={{ textAlign: 'center', margin: 10 }}>
                        <h3 className="h3">
                            {this.props.title}
                            <i  className="fas fa-times text-red-200 hover:text-red-600 cursor-pointer"
                                style={{float: 'right'}}
                                onClick={this.props.onDelete}></i>
                        </h3>
                    </div>
                    <div>
                        <ul className="list-group">
                            {
                                this.state.tasks.map(task => (
                                    <li className="list-group-item" key={task.id}>
                                        {task.text}
                                        <i style={{float: 'right'}} className="fas fa-times text-red-200 hover:text-red-600 cursor-pointer"
                                           onClick={()=>{ this.deleteTask(task) }}></i>
                                    </li>
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
            </div>
        );
    }
}