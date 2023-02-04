const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        bookCount: Int 
        savedBooks: [Book]
    }

    type Book {
        bookId: String!
        authors: [Author]
        description: String!
        image: String
        link: String
        title: String!
    }

    type Author {
        name: String
    }

    type Auth {
        token: String
        user: User
    }

    input BookInput {
        bookId: String!
        authors: [Author]
        description: String!
        image: String
        link: String
        title: String!
    }

    type Query {
        users: [User]
        me(_id: ID, username: String): User
    }

    type Mutation {
        login(email: String, password: String!): Auth

        addUser(username: String!, email: String!, password: String!): Auth

        saveBook(input: BookInput): User

        removeBook(bookId: String!): User
    }
`

module.exports = typeDefs