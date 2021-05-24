const express = require('express');
const { graphqlHTTP } = require('express-graphql')
const schema = require('./Schemas/index.js')
const cors = require('cors')
const mongoose = require("mongoose")
const url = "mongodb+srv://rizaladityoo:*******@cluster0.lrfoj.mongodb.net/node_graphql?retryWrites=true&w=majority"
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology:true})
    .then(() => console.log('connected to db'))
    .catch((err) => console.log(err))

const app = express();
const PORT = 3000;

const loggingMiddleware = (req, res, next) => {
    console.log('ip:', req.ip);
    next();
  }

app.use(cors())
app.use(loggingMiddleware);

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(PORT, () => {
    console.log("Server running");
})
