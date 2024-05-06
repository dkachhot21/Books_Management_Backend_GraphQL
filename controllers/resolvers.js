import { Book, Author } from "../models/booksModel.js";

const deleteEmptyAuthors = async () => {
    const authors = await Author.find();
    const deletedAuthors = [];

    for (const author of authors) {
        const booksCount = await Book.countDocuments({ authorId: author._id });
        if (booksCount === 0) {
            await Author.deleteOne({ _id: author._id });
            deletedAuthors.push(author.name);
        }
    }

    return deletedAuthors;

}

export const resolvers = {
    Query: {
        async books() {
            return await Book.find();
        },
        async book(_, args) {
            const book = await Book.findOne({ id: args.id });
            if (!book) {
                throw new Error(`Book with ID ${args.id} not found`);
            }
            return book;
        },
        async authors() {
            return await Author.find();
        },
        async author(_, args) {
            const author = await Author.find(author => author.id === args.id);
            if (!author) {
                throw new Error(`Author with ID ${args.id} not found`);
            }
            return author;
        }
    },
    Book: {
        async author(parent) {
            return await Author.findOne({ _id: parent.authorId });
        }
    },
    Author: {
        async books(parent) {
            return await Book.find({ authorId: parent.id });
        }
    },
    Mutation: {
        async createBook(_, args) {
            // check if book exists
            const book = await Book.findOne({ title: args.book.title });
            if (book) {
                throw new Error(`Book with title ${args.book.title} already exists`);
            }
            // check if author exists
            var author = await Author.findOne({ name: args.book.authorName });
            if (!author) {
                author = await Author.create({
                    name: args.book.authorName
                })
            }

            const authorId = author._id
            const newBook = await Book.create({
                title: args.book.title,
                genre: args.book.genre,
                price: args.book.price,
                ISBN: args.book.ISBN,
                authorId: authorId
            })
            return newBook;
        },
        async deleteBook(_, args) {
            //Check if book exists
            const book = await Book.findOne({ _id: args.id });
            if (!book) {
                throw new Error(`Book with ID ${args.id} not found`);
            }
            const deletedBook = await Book.findOneAndDelete({ _id: args.id });
            //Delete author if no other books are associated with it
            const deleted = await deleteEmptyAuthors();
            console.log(`Authors Removed:${deleted}`);
            return deletedBook;
        },
        async updateBook(_, args) {
            //Check if Book exists
            const book = await Book.findOne({ _id: args.id });
            if (!book) {
                throw new Error(`Book with ID ${args.id} not found`);
            }
            const authorName = args.edits.authorName || book.author
            // check if author exists
            var author = await Author.findOne({ name: authorName });
            if (!author) {
                author = await Author.create({
                    name: authorName
                })
            }
            const authorId = author._id

            const updatedBook = await Book.findOneAndUpdate({ _id: args.id }, {
                title: args.edits.title,
                genre: args.edits.genre,
                price: args.edits.price,
                ISBN: args.edits.ISBN,
                authorId: authorId
            }, { new: true });
            //Delete author if no other books are associated with it
            const deleted = await deleteEmptyAuthors();
            console.log(`Authors Removed:${deleted}`);
            return updatedBook;
        },
        async updateAuthor(_,args){
            //Check if author exists or not
            const author = await Author.findOne({_id:args.id})
            if(!author){
                throw new Error(`Author with ID ${args.id} not found`)
            }
            const newAuthor = await Author.findOneAndUpdate({_id:args.id},{
                name:args.edits.name,
                email:args.edits.email,
                country:args.edits.country,
                phone:args.edits.phone
            },{new:true})
            return newAuthor;
        }
    }
};
