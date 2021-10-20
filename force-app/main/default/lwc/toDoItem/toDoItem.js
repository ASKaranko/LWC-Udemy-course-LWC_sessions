import { LightningElement, api } from 'lwc';
import updateTodo from '@salesforce/apex/toDoController.updateTodo';
import deleteTodo from '@salesforce/apex/toDoController.deleteTodo';

export default class ToDoItem extends LightningElement {

    @api todoId;
    @api todoName;
    @api done = false;

    get containerClass() {
        return this.done ? 'todo completed' : 'todo upcoming';
    }

    get iconName() {
        return this.done ? 'utility:check' : 'utility:add';
    }

    updateHandler() {
        const todo = {
            todoId: this.todoId,
            todoName: this.todoName,
            done: !this.done,
        };

        updateTodo({payload: JSON.stringify(todo)})
            .then(response => {
                console.log('todo item updated successfully');
                const updateEvent = new CustomEvent('update');
                this.dispatchEvent(updateEvent);
            })
            .catch(error => {
                console.log('Error in updating todo item ', error.body.message);
            });
    }

    deleteHandler() {
        deleteTodo({todoId: this.todoId})
            .then(response => {
                console.log('todo item deleted successfully');
                const deleteEvent = new CustomEvent('delete');
                this.dispatchEvent(deleteEvent);
            })
            .catch(error => {
                console.log('Error in deleting todo item ', error.body.message);
            });
    }

}