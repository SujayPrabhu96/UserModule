const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const port = process.env.port || 5000;
const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req , res) => res.send("<h2>WELCOME TO USERS MODULE</h2>"));

app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`Server listening at PORT: ${port}`);
});