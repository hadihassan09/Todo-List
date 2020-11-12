import React, { Component } from "react";
import TodoList from "./TodoList";
import generateUID from "../js/functions";
export default class TodoApp extends Component {
    constructor(props) {
        super(props);


        if(localStorage.getItem('app') == null)
            localStorage.setItem('app', JSON.stringify([]));
        if(localStorage.getItem('lastListKey') == null)
            localStorage.setItem('lastListKey', JSON.stringify(0))

        this.state = {
            lists: this.getFromLocalStorage(),
            value: '',
            lastListIndex: JSON.parse(localStorage.getItem('lastListKey'))
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteList = this.deleteList.bind(this);
    }

    deleteList(list){
        let index = this.state.lists.indexOf(list);
        let oldList = this.state.lists.slice();
        oldList.splice(index, 1);
        this.setState({
            lists: oldList
        }, ()=>{
            this.updateInLocalStorage()
            localStorage.removeItem(list.id)
        })
    }

    updateInLocalStorage(){
        localStorage.setItem("app", JSON.stringify(this.state.lists));
    }

    getFromLocalStorage(){
        return JSON.parse(localStorage.getItem("app"));
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

        localStorage.setItem("list".concat(this.state.lastListIndex), JSON.stringify([]))

        this.setState(({
            lists: this.state.lists.concat({
                id: "list".concat(this.state.lastListIndex),
                title: this.state.value
                }),
            value: '',
            lastListIndex: this.state.lastListIndex+1
        }), ()=>{
            this.updateInLocalStorage()

            localStorage.setItem("lastListKey", JSON.stringify(this.state.lastListIndex))
        });
    }

    render() {
        return (
            <div>
                <div style={{padding: 20, width: "98%"}}>
                    <form  onSubmit={this.handleSubmit}>
                        <div className="form-group row mb-2">
                            <label className="h3 sm-2 col-form">Add a New List:</label>
                            <div className="col-sm-8">
                                <input className="form-control" placeholder="List Title" type="text"  value={this.state.value} onChange={this.handleChange} />
                            </div>
                            <div className="mb-2" style={{flex: '0 0 22%', 'max-width': '22%'}}>
                                <button className="btn btn-primary btn-submit btn-block">Add List</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div>
                        {
                            this.state.lists.map(list => (
                                <div key={generateUID(5)} style={{float: 'left'}}>
                                    <TodoList key={list.id} title={list.title} id={list.id} onDelete={()=>{this.deleteList(list)}} />
                                </div>
                            ))
                        }
                </div>
            </div>
        );
    }
}