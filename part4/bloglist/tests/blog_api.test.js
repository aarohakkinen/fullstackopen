const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

describe('users', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    })

    test('are returned as json', async () => {
        await api
            .get('/api/users')
            .expect('Content-Type', /application\/json/)
        await api
            .post('/api/users')
            .send(helper.testUser)
            .expect('Content-Type', /application\/json/)
    })

    test('can be created', async () => {
        await api.post('/api/users')
            .send(helper.testUser)
            .expect(201)
        const response = await api.get('/api/users')
        expect(response.body.length).toBe(1)
        expect(response.body[0].username).toBe('niilo22')
        expect(response.body[0].name).toBe('Mikael Kosola')
        expect(response.body[0].id).toBeDefined()
    })

    test('cannot create duplicates', async () => {
        await api.post('/api/users')
            .send(helper.testUser)
            .expect(201)
        await api.post('/api/users')
            .send(helper.testUser)
            .expect(400)
    })

    test('can be used to fetch authentication token', async () => {
        await api.post('/api/users')
            .send(helper.testUser)
        const response = await api.post('/api/login')
            .send({
                username: helper.testUser.username,
                password: helper.testUser.password,
            })
            .expect(200)
        expect(response.body.token).toBeDefined()
    })
})

describe('blogs', () => {
    describe('viewing', () => {
        beforeAll(async () => {
            await Blog.deleteMany({})
            const blogObjects = helper.threeBlogs.map(blog => new Blog(blog))
            const promiseArray = blogObjects.map(blog => blog.save())
            await Promise.all(promiseArray)
        })

        test('blogs are returned as json', async () => {
            await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })

        test('all blogs are returned', async () => {
            const response = await api.get('/api/blogs')
            expect(response.body.length).toBe(3)
        })

        test('blogs contain required fields', async () => {
            const response = await api.get('/api/blogs')
            for (let index in response.body) {
                expect(response.body[index].title).toBeDefined()
                expect(response.body[index].author).toBeDefined()
                expect(response.body[index].url).toBeDefined()
                expect(response.body[index].likes).toBeDefined()
            }
        })

        test('blogs contain id field instead of _id', async () => {
            const response = await api.get('/api/blogs')
            for (let index in response.body) {
                expect(response.body[index].id).toBeDefined()
                expect(response.body[index]._id).not.toBeDefined()
            }
        })
    })

    describe('creating', () => {
        let token

        beforeAll(async () => {
            await Blog.deleteMany({})
            await User.deleteMany({})
            await api.post('/api/users')
                .send(helper.testUser)
            const response = await api.post('/api/login')
                .send({
                    username: helper.testUser.username,
                    password: helper.testUser.password,
                })
            token = 'Bearer ' + response.body.token
        })

        test('request with valid fields returns 201', async () => {
            await api
                .post('/api/blogs')
                .send(helper.oneBlog[0])
                .set('Authorization', token)
                .expect(201)
        })

        test('request with invalid fields returns 400', async () => {
            await api
                .post('/api/blogs')
                .send({ author: 'Arttu Pulkkinen' })
                .set('Authorization', token)
                .expect(400)
        })

        test('request without authentication header returns 401', async () => {
            await api
                .post('/api/blogs')
                .send(helper.oneBlog[0])
                .expect(401)
        })

        test('request with invalid token returns 401', async () => {
            await api
                .post('/api/blogs')
                .send(helper.oneBlog[0])
                .set('Authorization', 'invalid123')
                .expect(401)
        })

        test('the number of blogs increases', async () => {
            const before = await api.get('/api/blogs')
            await api
                .post('/api/blogs')
                .send(helper.oneBlog[0])
                .set('Authorization', token)
                .expect(201)
            const after = await api.get('/api/blogs')
            expect(after.body.length - before.body.length).toBe(1)
        })

        test('likes field is not required', async () => {
            const blog = {
                title: helper.oneBlog[0].title,
                author: helper.oneBlog[0].author,
                url: helper.oneBlog[0].url
            }
            await api
                .post('/api/blogs')
                .send(blog)
                .set('Authorization', token)
                .expect(201)
        })
    })
})

afterAll(() => {
    mongoose.connection.close()
})
