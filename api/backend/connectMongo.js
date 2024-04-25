const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://federicodacal:WUFGVHgU9SW4kWlg@cluster0.gbfhnx0.mongodb.net/musicbook");
        console.log('Connected');
    }
    catch (err) {
        console.log('Failed to connect ' + err.message);
    }
}

module.exports = connectDB;