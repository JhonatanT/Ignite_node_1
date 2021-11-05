import express, { request, response } from "express"
import { v4 } from "uuid"

const app = express();


app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
    const { username } = request.headers

    const todos = users.find(todos => todos.username === username)

    if (!todos) {
        return response.status(400).json({ error: "todos não existe" })
    }

    request.todos = todos;

    return next();
}

app.post('/users', (request, response) => {

    const { name, username } = request.body

    const userExist = users.find(userExist => userExist.username === username)

    if (!userExist) {

        const user = {
            id: v4(),
            name,
            username,
            todos: []
        }
        users.push(user)

        return response.status(201).json(users[0])
    }
    return response.status(400).json({ error: "Usuario ja existe" })

});

app.get('/todos', checksExistsUserAccount, (request, response) => {
    const { todos } = request;

    return response.status(201).json([todos])
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
    const { title, deadline } = request.body;
    const { todos } = request;

    const tudso = {
        id: v4(),
        title,
        done: false,
        deadline: new Date(deadline),
        created_at: new Date()
    }
    todos.todos.push(tudso)

    return response.status(201).json(todos)
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {

    const { deadline, title } = request.body
    const { id } = request.params
    const { todos } = request

    const allDall = todos.todos.find(allDall => allDall.id === id)

    if (!allDall) {
        return response.status(404).json({ error: "id n existe" })
    }

    allDall.deadline = deadline
    allDall.title = title

    return response.status(201).json(allDall)
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
    const { id } = request.params
    const { todos } = request

    const allDall = todos.todos.find(allDall => allDall.id === id)

    if (!allDall) {
        return response.status(404).json({ error: "id n existe" })
    }

    allDall.done = true

    return response.status(201).json()
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
    const { id } = request.params
    const { todos } = request

    const delID = todos.todos.find(delID => delID.id === id)

    if (!delID) {
        return response.status(404).json({ error: "id n existe" })
    }

    todos.todos.splice(todos.todos, 1)

    return response.status(204).json()
});

app.listen(3030, () => console.log("RODANDO 3030"))