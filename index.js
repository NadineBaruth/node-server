import express, {response} from 'express';
import {NotFoundError, TodoService} from './todoService.js'

const todoService = new TodoService() //<= Parameter reingeben den du deb constructor gibst
const app = express()
app.use(express.json()) // for parsing application/json

const port = 3000

/*
const todoExample = {
    'id': 1,
    'title': "Titel",
    'description': "Beschreibung",
    'isDone': false
}
*/


// Todo's holen
app.get('/', (req, res) => {
    const todos = todoService.getAll()
    res.send(todos)
})

// Todo via id holen
app.get('/:id', (req, res) => {
    try {
        const todo = todoService.getBy(req.params.id)
        res.send(todo)
    } catch (e) {
        if (e instanceof NotFoundError) {
            res.status(404)
            res.send()
            return
        }
        res.status(500)
        res.send()
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


// Todo erstellen
app.post('/', function (req, res) {
    todoService.add(req.body)
    res.status(201)
    res.send()
})


// Todo updaten / Todo abhaken
app.put('/:id', function (req, res) {
    try {
        const todo = todoService.updateBy(req.params.id, req.body)
        res.send(todo)
    } catch (e) {
        if (e instanceof NotFoundError) {
            res.status(404)
            res.send()
            return
        }
        res.status(500)
        res.send()
    }
})


// Todo löschen
app.delete('/:id', function (req, res) {
    try {
        todoService.deleteBy(req.params.id)
        res.status(204)
        res.send()
    } catch (e) {
        if (e instanceof NotFoundError) {
            res.status(404)
            res.send()
            return
        }
        res.status(500)
        res.send()
    }
})