const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const uri = 'mongodb+srv://rabnaz1234567:9CM1vh9QQBwKDOKD@naziya.fixbe.mongodb.net/?retryWrites=true&w=majority&appName=naziya';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define a schema and model
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

// Endpoint to save user data
app.post('/api/users', (req, res) => {
    const newUser = new User(req.body);
    newUser.save()
        .then(user => res.status(201).json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// Endpoint to get all users
app.get('/api/users', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});