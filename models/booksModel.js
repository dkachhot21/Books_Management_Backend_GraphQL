import mongoose from "mongoose";

export const Author = mongoose.model("Author", mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    country: {
        type: String,
    },
    phone: {
        type: String,
    }
}, {
    timestamps: true
})
)
export const Book = mongoose.model("Book", mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre:{
        type: String,
        required: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
        required: true
    },
    price: {
        type: Number,
    },
    ISBN: {
        type: String,
    }
}, {
    timestamps: true
}))