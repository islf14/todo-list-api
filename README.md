# Todo List API

JavaScript solution for [Todo List API](https://roadmap.sh/projects/todo-list-api) from [roadmap.sh](https://roadmap.sh/).

## Requirements

- Node.js must be installed.
- MongoDB must be installed.

## How to run

Perform the following steps:

- To install dependencies, run in console:

```bash
npm install
```

- To start the project, run in console:

```bash
npm start
```

- Open in your browser.

```bash
http://localhost:3000/
```

## Routes

### User Registration

```bash
POST /register
{
  "name": "John Doe",
  "email": "john@doe.com",
  "password": "password"
}
```

### User Login

```bash
POST /login
{
  "email": "john@doe.com",
  "password": "password"
}
```

### Create a To-Do Item

```bash
POST /todos
{
  "title": "Buy groceries",
  "description": "Buy milk, eggs, and bread"
}
```

### Update a To-Do Item

```bash
PUT /todos/82b21e34-c984-4d0c-90e4-17069ab089d5
{
  "title": "Buy groceries",
  "description": "Buy milk, eggs, bread, and cheese"
}
```

### Delete a To-Do Item

```bash
DELETE /todos/82b21e34-c984-4d0c-90e4-17069ab089d5
```

### Get To-Do Items

- Get all.

```bash
GET /todos
```

- Get with page and limit.

```bash
GET /todos?page=1&limit=10
```
