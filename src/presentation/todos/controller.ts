import { Request, Response } from "express"
import { prisma } from "../../data/postgres"
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";


/* const todos = [
    {
        id: 1,
        text: 'Buy milk',
        completedAt: new Date()
    },
    {
        id: 2,
        text: 'Buy bread',
        completedAt: null
    },
    {
        id: 3,
        text: 'Buy bread',
        completedAt: new Date()
    }
]
 */
export class TodoController {

    constructor() { }

    public getTodos = async (req: Request, res: Response) => {
        /*  return res.json(todos) */
        const todos = await prisma.todo.findMany();
        return res.json(todos)
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })

        /*  const todo = todos.find(todo => todo.id === id); */
        const todo = await prisma.todo.findFirst({
            where: { id }
        });

        (todo) ? res.json(todo) : res.status(404).json({ error: `TODO with id ${id} not found` })
    }

    public createTodo = async (req: Request, res: Response) => {
        /* const { text } = req.body;
        if (!text) return res.status(400).json({ error: 'Text property is required' })

        const newTodo = {
            id: todos.length + 1,
            text: text,
            completedAt: null
        }

        todos.push(newTodo);

        res.json(newTodo); */

        /* const { text } = req.body */
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({error}); 

       /*  if (!text) return res.status(400).json({ error: 'Text property is required' }) */

        /* const todo = await prisma.todo.create({
            data: { text }
        }) */
        const todo = await prisma.todo.create({
            data: createTodoDto!
        })

        res.json(todo)
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        /* if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' }) */
        const [error, updateTodoDto] = UpdateTodoDto.create({
            ...req.body,
            id
        })

        if (error) return res.status(400).json({error})

        /*  const todo = todos.find(todo => todo.id === id); */
        const todo = await prisma.todo.findFirst({
            where: { id }
        })
        if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` });

       /*  const { text, completedAt } = req.body */

       /*  const updatedTodo = await prisma.todo.update({
            where: { id },
            data: {
                 text,
                 completedAt: (completedAt) ? new Date(completedAt) : null
                }
        }) */
        const updatedTodo = await prisma.todo.update({
            where: {id},
            data: updateTodoDto!.values
        })

        /* todo.text = text || todo.text;

        (completedAt === 'null')
            ? todo.completedAt = null
            : todo.completedAt = new Date(completedAt || todo.completedAt); */

        //! OJO, referencia
        /* todos.forEach((todo, i) => {
            if (todo.id === id) {
                todos[i] = todo;
            }
        }) */

        /*  res.json(todo) */
        res.json(updatedTodo)

    }

    public deleteTodo = async (req: Request, res: Response) => {

        const id = +req.params.id;

        const todo = await prisma.todo.findFirst({
            where: { id }
        })

        /*  const todo = todos.find(todo => todo.id === id); */
        if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` })
        const deleted = await prisma.todo.delete({
            where: {id}
        });

        (deleted) ? res.json(deleted): res.status(400).json({
            error: `Todo with id ${id} not found`
        })

        /*  todos.splice(todos.indexOf(todo), 1); */
       /*  res.json(todo) */
    }

}



