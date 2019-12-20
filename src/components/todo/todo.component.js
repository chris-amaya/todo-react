import React,  { Component } from 'react';

class Todo extends Component {

    constructor() {
        super();
        this.handlerClickAddTodo = this.handlerClickAddTodo.bind(this);
        this.handlerDeleteTodo = this.handlerDeleteTodo.bind(this);
        this.handlerUpdateTodo = this.handlerUpdateTodo.bind(this);
        this.handlerTodoFinished = this.handlerTodoFinished.bind(this);
    }
    state = {
        todos: null,
        todoToAdd: null
    }

    changeAddTodo = (e) => {
        this.setState({todoToAdd: e.target.value});
    }

    handlerClickAddTodo(e) {
        let todos = this.getTodos();
        if(todos) {
            todos.push({
                title: this.state.todoToAdd,
                finished: false,
                id: this.generateID()
            })
        } else {
            todos = [];
            todos.push({
                title: this.state.todoToAdd,
                finished: false,
                id: this.generateID()
            })
        }
        
        this.setState({
            todos,
            todoToAdd: ''
        });
        todos = JSON.stringify(todos)
        localStorage.setItem('todos', todos);
        this.setState()
    }

    async handlerDeleteTodo(e) {
        let idTodo = e.target.parentElement.parentElement.parentElement.dataset.idtask;
        await this.setState({
            todos: this.state.todos.filter((todo) => {
                return todo.id !== idTodo
            })
        })
        localStorage.setItem('todos', JSON.stringify(this.state.todos))

    }

    getTodoByID(id) {
        return this.state.todos.find((todo) => {
            return todo.id == id
        })
    }

    updateTodo(todo, id) {
        this.setState({todos: this.state.todos.filter((todo) => {
            if(todo.id == id) {
                return {
                    title: todo.title,
                    id: id,
                    finished: todo.finished
                }
            } 
            return todo;
        })})
    }

    handlerTodoFinished(e) {
        let idTodo = e.target.parentElement.parentElement.parentElement.parentElement.dataset.idtask;
        let todo = this.getTodoByID(idTodo);
        todo.finished = !todo.finished;
        this.updateTodo(todo, idTodo);
        localStorage.setItem('todos', JSON.stringify(this.state.todos))

    }

    handlerUpdateTodo(e) {
        let idTodo = e.target.parentElement.parentElement.parentElement.dataset.idtask;
        let todo = this.getTodoByID(idTodo);
        let newTitle = prompt("actualizar todo", todo.title)
        todo.title = newTitle;
        this.updateTodo(todo, idTodo);
        
        localStorage.setItem('todos', JSON.stringify(this.state.todos))


    }

    getTodos() {
        return this.state.todos;
    }

    componentDidMount() {
        this.setState({
            todos: JSON.parse(localStorage.getItem('todos'))
        })
    }
    
    generateID() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    render() {
        return (
            <div className="container">
                <div className="todo">
                    <div className="container">
                        <h1>Todo List</h1>
                        <div className="add-item">
                            <input type="text" placeholder="Agregar tarea" id="taskText" 
                            value={this.state.todoToAdd} 
                            onInput={this.changeAddTodo} 
                            ></input>
                            <div className="icon-add" >
                                <i className="fas fa-plus" id="addTask"
                                    onClick={this.handlerClickAddTodo}
                                ></i>
                            </div>
                        </div>

                        <div className="items" id="items">
                            {
                                this.renderTodos()
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderTodos() {
        let todos = this.getTodos();
        if(todos != null && todos.length > 0) {
            return todos.map((todo) => {
                return (
                    <div className='item' data-idtask={todo.id}>
                        <p className={todo.finished == true ? 'finished' : ''}>{todo.title}</p>
                         <div className="controls">
                             <div className="delete-container">
                                <i className="far fa-trash-alt" id="deleteTask" 
                                onClick={this.handlerDeleteTodo}
                                ></i>
                            </div>
                            <div className="edit-container">
                                <i className="fas fa-pen" id="editTask"
                                onClick={this.handlerUpdateTodo}
                                ></i>
                            </div>
                            <div>
                                <label>
                                    <input type="checkbox" 
                                    checked={todo.finished == true ? true : false } 
                                    onClick={this.handlerTodoFinished}
                                    ></input>
                                    <span id="done"></span>
                                </label>
                            </div>
                         </div>
                     </div>
                )
            })
        } else {
            return (
                <p>No hay todos que mostrar</p>
            )
        }

    }
}

export default Todo;