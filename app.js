const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const tasksRouter = require('./routes/taskRoute');
app.use(express.json());
// Connect to MongoDB   
const connectdb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("db connected successfully: " , connect.connection.name , connect.connection.host);
    }
    catch (err) {
        console.log(err);

        //means that stop entire node js / application as without db app would not function as expected
        process.exit(1);
    }
};

connectdb();
app.use('/tasks', tasksRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});