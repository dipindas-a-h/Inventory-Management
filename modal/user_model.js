const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true,
        // minlength: 8, // Enforce minimum password length
        trim: true,
      },
      phone: {
        type: String,
        required: true,
        // Add appropriate validation (e.g., using a library like phone-number)
      },
      email: {
        type: String,
        required: true,
        unique: true, // Ensure unique email addresses
        lowercase: true, // Convert to lowercase for consistency
        trim: true,
        validate: {
          validator: (email) => /^[\w-\.]+@([\w-]+\.)+[a-zA-Z]{2,6}$/.test(email),
          message: 'Invalid email format',
        },
      },
      userId: {
        type: String, // Consider using Mongoose ObjectId if needed
        required: true,
        unique: true, // Ensure unique user IDs
      },

})

module.exports = mongoose.model('User',userSchema)