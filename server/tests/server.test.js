const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

// Local files
const  {app} = require('./../server');
const {Todo} = require('./../models/todo');

// Dummie data for testing todos
const todos = [{
    _id: new ObjectID(),
    text: "first todo"
}, {
    _id: new ObjectID(),
    text: "second todo"
}];
// Add testing todos to DB.
beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        let text = 'Testing todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((error, res) => {
                if (error) {
                    // Stop function execution
                    return done(error);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((error) => done(error));
            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((error, res) => {
                if (error) {
                    return done(error);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((error) => done(error));
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    })
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        let hexID = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${hexID}`)
            .expect(404)
            .end(done);
    });

    it('shouldreturn 404 for non-object ids', (done) => {
        request(app)
            .get('/todos/invalid123')
            .expect(404)
            .end(done);
    });
});