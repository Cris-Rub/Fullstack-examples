const express = require('express');
const app = express();
const {buildSchema} = require('graphql');
const {graphqlHTTP} = require('express-graphql');
let {books} = require('./data.json');

const schema = buildSchema(`
    type Query {
        getWelcome: String,
        getAge: Int,
        getPersonalInfo(name: String, age: Int): String,
        getBooks: [Book]
    }
    type Mutation {
        addBook(id : Int, title: String, author: String): [Book]
        updateBook(id : Int, title: String, author: String): Book
        deleteBook(id: Int): [Book]
    }
    type Book {
        id: Int,
        title: String,
        author: String
    }
`);

function getWelcome(){
    return 'Hello World!';
};

function getAge(){
    return 1 + 3;
};

function getPersonalInfo (args){
    return 'Hello' + args.name + 'your age is' + args.age;
}

function getBooks(){

}

function addBook({id, title, author}){
    // Insertar objeto en arreglo Books
    books.push({id: id, title: title, author: author});
    // Retornar arreglo Book
    return books;
}

function updateBook({id, title, author}){
    // Encontrar libro a actualizar
    let bookFounded = books.find(book => {
        if(book.id === id){
            book.title = title ? title : book.title;
            book.author = author ? author : book.author;
        }
        return book;
    });

    return bookFounded;
    // Actualizar información del libro

    // Retornar libro actualizado
}

function deleteBook({id}){
    let bookFounded = books.find(book => {
        if(book.id === id){
            return true;
        }
    })
    if (bookFounded){
        const filter = books.filter(book => book.id !== id)
        books = filter;
        return books;
    }
}

const root = {
    // Metodos de schema o funciones que resuelven los metodos
    getWelcome: getWelcome,
    getAge: getAge,
    getPersonalInfo: getPersonalInfo,
    getBooks: getBooks,
    addBook,
    updateBook,
    deleteBook
};

app.use('/api/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(3000, () => {
    return console.log('server is running')
});
