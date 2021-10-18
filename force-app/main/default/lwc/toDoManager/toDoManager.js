import { LightningElement, track } from 'lwc';

export default class ToDoManger extends LightningElement {
    time = '17:00';
    greeting = 'Good Evening';

    @track todos = [];

    connectedCallback() {
        this.getTime();

        setInterval(() => {
            this.getTime();
        }, 60 * 1000);
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
            todoId: this.todos.length,
            todoName: inputBox.value,
            done: false,
            todoDate: new Date()
        };

        this.todos.push(todo);
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
}
