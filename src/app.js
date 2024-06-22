const express = require('express');
const doteenv = require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:false }));



app.use('/', require('./routes/todos'));

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server runiing on ${PORT}`);
});