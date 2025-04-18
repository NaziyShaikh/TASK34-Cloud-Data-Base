const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Cloud Data Base API',
        endpoints: {
            users: '/api/users',
            register: '/api/users'
        }
    });
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Root route
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        console.log('Sending users:', users); 
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Error fetching users' });
    }
});
// MongoDB connection
const uri = process.env.MONGODB_URI;
mongoose.set('strictQuery', false);

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));


const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

// Routes
app.post('/api/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});
app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // First i want to ckeck then it will say message
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // in the task it si not define delete button to 
    //add but i had to add that when user register his personal infoormation showing that way i added 
    await User.findByIdAndDelete(id);
    console.log(`User deleted successfully: ${id}`);

    res.json({ 
      success: true, 
      message: 'User deleted successfully',
      deletedId: id 
    });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ 
      success: false,
      message: 'Error deleting user',
      error: err.message 
    });
  }
});

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json('Error: ' + err);
    }
});

// Starting server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});