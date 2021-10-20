import { LightningElement, track } from 'lwc';
import addTodo from '@salesforce/apex/toDoController.addTodo';
import getCurrentTodos from '@salesforce/apex/toDoController.getCurrentTodos';

export default class ToDoManger extends LightningElement {
    time = '17:00';
    greeting = 'Good Evening';

    @track todos = [];

    connectedCallback() {
        this.getTime();

        setInterval(() => {
            this.getTime();
        }, 60 * 1000);
        //this.populateToDos();
        this.fetchToDos();
    }

    getTime() {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        this.time = `${this.getDoubleDigit(hours)}:${this.getDoubleDigit(
            minutes
        )}`;
        this.setGreeting(hours);
    }

    getDoubleDigit(digit) {
        return digit < 10 ? `0${digit}` : digit;
    }

    setGreeting(hours) {
        if (hours < 12) {
            this.greeting = 'Good Morning';
        } else if (hours >= 12 && hours < 17) {
            this.greeting = 'Good Afternoon';
        } else {
            this.greeting = 'Good Evening!';
        }
    }

    addToDoHandler() {
        const inputBox = this.template.querySelector('lightning-input');

        const todo = {
            //todoId: this.todos.length,
            todoName: inputBox.value,
            done: false,
            //todoDate: new Date()
        };

        addTodo({payload: JSON.stringify(todo)})
            .then(response => {
                console.log('Item inserted successfully ' + response);
                this.fetchToDos();
            })
            .catch(error => {
                console.log('Error in inserting todo item ' + error.body.message);
            });
        //this.todos.push(todo);
        inputBox.value = '';
    }

    get upcomingTasks() {
        return this.todos && this.todos.length > 0
            ? this.todos.filter((item) => !item.done)
            : null;
    }

    get completedTasks() {
        return this.todos && this.todos.length > 0
            ? this.todos.filter((item) => item.done)
            : null;
    }

    fetchToDos() {
        getCurrentTodos()
            .then(result => {
                if (result) {
                    this.todos = result;
                }
            })
            .catch(error => {
                console.log('Error in fetching todo items ' + error.body.message);
            });
    }

    populateToDos() {
        const todos = [
            {
                todoId: 0,
                todoName: 'Feed the dog',
                done: false,
                todoDate: new Date()
            },
            {
                todoId: 1,
                todoName: 'Wash the car',
                done: false,
                todoDate: new Date()
            },
            {
                todoId: 2,
                todoName: 'Make an LWC project',
                done: true,
                todoDate: new Date()
            },
        ];
        this.todos = todos;
    }

    updateHandler() {
        this.fetchToDos();
    }

    deleteHandler() {
        this.fetchToDos();
    }
}
