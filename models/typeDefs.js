//Schema using GraphQL schema language
export const typeDefs = `
    type Author {
        id: ID!
        name: String!
        country:String
        email:String
        phone:String
        books: [Book!]!
    }

    type Book {
        id: ID!
        title: String!
        genre: String!
        price: Int
        ISBN: String
        author: Author!
    }

    type Query {
        books: [Book]
        book(id: ID!): Book
        authors: [Author]
        author(id: ID!): Author
    }

    type Mutation {
        createBook(book:createBook): Book
        deleteBook(id: ID!): Book
        updateBook(id:ID!, edits:updateBook): Book
        updateAuthor(id:ID!, edits:updateAuthor): Author
    }
    input createBook {
        title:String!,
        genre:String!,
        authorName:String!,
        price:Int,
        ISBN:String
    }
    input updateBook {
        title:String,
        genre:String,
        authorName:String,
        price:Int,
        ISBN:String
    }
    input updateAuthor {
        name:String,
        country:String,
        email:String,
        phone:String
    }
`;