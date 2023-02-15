import { todosService } from "../services/TodosService.js";
import BaseController from "../utils/BaseController.js";


export class TodosController extends BaseController{
  constructor(){
    // NOTE name is being passed as a variable which is how the database knows that its 'your name'
    super('api/:name/todos')
    this.router
      // INPUT METHODS
      .get('', this.getAllTodos)
      .post('', this.createTodo)
      // NOTE /:todoId needs to also be the Id you are passing in down below into your functions 
      .delete('/:todoId', this.deleteTodo)
      .put('/:todoId', this.editTodo)
  }

  async getAllTodos (req, res, next) {
  try {
    const todos = await todosService.getAllTodos(req.params.name)
    return res.send(todos)
  } catch (error) {
    next(error)
    }
  }

  async createTodo (req, res, next) {
  try {
    // NOTE You could run into validation error here if you have req.body... = req.body... because its looking through the JSON object for the property being sent and not finding it
    req.body.user = req.params.name
    const newTodo = await todosService.createTodo(req.body)
    return res.send(newTodo)
  } catch (error) {
    next(error)
    }
  }

  async deleteTodo (req, res, next) {
  try {
    // const todoId = req.params.todoId
    // const message = "Hey this todo has been deleted!"
    // NOTE todoId needs to match what you put above under your this.router, the todoId is the param! 
    await todosService.deleteTodo(req.params.todoId)
    // NOTE Sending in your confirm message when you delete something. You can also pass in 'message' if you defined it above 
    return res.send('This todo has been deleted!')
    // return res.send(message)
  } catch (error) {
    next(error)
    }
  }

  async editTodo (req, res, next) {
  try {
    // NOTE you are editing a todo, so a todo that has a todoId needs to equal the todoId that is passed in as a parameter 
    req.body.todoId = req.params.todoId
    const updateTodo = await todosService.editTodo(req.body)
    return res.send(updateTodo)
  } catch (error) {
    next(error)
    }
  }
}