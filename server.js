import express from "express";
import { graphqlHTTP } from "express-graphql";
import { connectDB } from "./config/connect_db.js";
import { configDotenv } from "dotenv";
import { schema } from "./models/graphQLSchema.js";

const PORT = process.env.PORT || 3000

//dotenv called
configDotenv();

const app = express();
//DB Connection
connectDB();

//MiddleWares

//Routes
app.use('/graphql', graphqlHTTP({
    schema:schema,
    graphiql: true
}))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})