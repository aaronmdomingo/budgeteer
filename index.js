const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

if (process.env.NODE_ENV === 'production') {  
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => {    
        res.sendfile(path.join(__dirname = 'client/build/index.html'));  
    })
};


mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/budgeteer', 
{ useNewUrlParser: true, useUnifiedTopology: true });


const expenseRouter = require('./server/routes/expense');
const userRouter = require('./server/routes/user');
const monthRouter = require('./server/routes/month');


app.use('/api/expense/', expenseRouter);
app.use('/api/user/', userRouter);
app.use('/api/month/', monthRouter);

app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`)
})