const express = require('express');
const mongoose = require('mongoose');
const connectionString = "mongodb+srv://backendnodejs:Zt0XfwBJZzPjmKRr@gamedb.h81cfsj.mongodb.net/?retryWrites=true&w=majority"
const gameRoute = require('./routes/games');
const reviewRoute = require('./routes/reviews')
const PORT = 8081;

mongoose.connect(connectionString);


const app = express();

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());


app.listen(
    PORT,
    () => console.log(`Server started on ${PORT}`)
);


//API Routes
app.use('/api', gameRoute)
app.use('/api', reviewRoute)