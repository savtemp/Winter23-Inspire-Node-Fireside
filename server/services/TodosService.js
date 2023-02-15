
import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"


class TodosService{
  async editTodo(body) {
    // NOTE you sent in the body through the function, below you need to attach the body you will be editing to the todoId of the todo you are editing 
    const updateTodo = await dbContext.Todos.findById(body.todoId)
    // NOTE checking to see if there is a todo that exist with that Id
    if(!updateTodo){
      throw new BadRequest("this todo doesn't exist!")
    }
    // NOTE to edit an updateTodo: IF body.completed is not null is TRUE (meaning if the 'completed' is still checked as false and the user hasn't changed it) THEN execute that the body.completed is still false, ELSE (if the user has checked that the todo is complete) execute updateTodo.completed
    updateTodo.completed = body.completed !== null ? body.completed : updateTodo.completed
    updateTodo.description = body.description || updateTodo.description
    // NOTE remember to await your save to prevent potential issues!
    await updateTodo.save()
    return updateTodo
  }

  async deleteTodo(todoId) {
    const todo = await dbContext.Todos.findById(todoId)
    // NOTE null check to see if a todo with that Id exists 
    if(!todo){
      throw new BadRequest("There is no todo!")
    }
    await todo.remove()
  }

  async createTodo(body) {
    const newTodo = await dbContext.Todos.create(body)
    return newTodo
  }

  async getAllTodos(name) {
    // NOTE we are passing in your 'name' parameter here 
    const todos = await dbContext.Todos.find({user: name})
    return todos
  }

}

export const todosService = new TodosService()