const express = require('express');
const app = express();
const port = 4000;
const usersData = require('./model.js');
const mongoose = require('mongoose');
const cors = require('cors')
const url = 'mongodb+srv://padmamahendhar96:' + encodeURIComponent('Mahendhar@9652') + '@apicrudtask.ud28zpc.mongodb.net/?retryWrites=true&w=majority';

app.use(express.json());

app.use(cors({
  origin: '*'
}));

// Connect to MongoDB
mongoose.connect(url)
  .then(() => {
    console.log('Connected successfully to MongoDB');

    // Welcome message
    app.get('/', (req, res) => {
      res.send('Welcome');
    });

    // Get the users list
    app.get('/users', async (req, res) => {
      try {
        const users = await usersData.find();
        res.json(users);
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
      }
    });

    // Create user
    app.post('/createuser', async (req, res) => {
      const { name, email, address } = req.body;
      try {
        const userObj = new usersData({ name, email, address });
        await userObj.save();
        console.log('Successfully created user');
        res.status(201).json({ message: 'User created successfully' });
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
      }
    });
// delete user
    app.delete('/deleteuser/:id', (req, res) => {
      const { id } = req.params;
        usersData.findByIdAndDelete(id).then((response)=>{
       if(response){
        res.send('successfully deleted user')
       }else{
        res.send('error deleting user')
       }

      })
    });
    
    // update
    app.put('/updateuser/:id', (req, res) => {
      const { id } = req.params;
      const { name, email, address } = req.body;
      usersData.findOneAndUpdate({ _id: id }, { name, email, address })
        .then((updatedUser) => {
          if (updatedUser) {
            res.json(updatedUser); 
          } else {
            res.status(404).json({ error: 'User not found' }); 
          }
        })
        .catch((err) => {
          res.status(400).json({ error: 'Error updating user' }); 
        });
    });
    


    // Server running
    app.listen(port, () => {
      console.log('Server is running on ' + port);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
