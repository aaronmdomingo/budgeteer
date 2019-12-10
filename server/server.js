const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = 4000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/budgeteer', { useNewUrlParser: true, useUnifiedTopology: true });


const expenseRouter = require('./routes/expense');
const userRouter = require('./routes/user');
const monthRouter = require('./routes/month');


app.use('/api/expense/', expenseRouter);
app.use('/api/user', userRouter);
app.use('/api/month/', monthRouter);

app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`)
})