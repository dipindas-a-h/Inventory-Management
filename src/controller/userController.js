const user_model = require("../../modal/user_model");

const bcrypt = require('bcrypt');
const { generateUserId } = require("../utilities/idGenerate");

const userController = {
  addUser: async (req, res) => {
    try {
        const { user_name, password, phone, email } = req?.body;
        const existingUser = await user_model.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already exist" });
        }

        // Generate a salt to use for hashing
        const saltRounds = 10;
        const hashedPswd = await bcrypt.hash(password, saltRounds);

        // const newUser = new user_model({
        //     user_name,
        //     password: hashedPswd,
        //     phone,
        //     email,
        // });
        const userId = generateUserId()

        const newUser = new user_model({
          userId, // Assuming you have a function to generate a unique userId
          user_name,
          password: hashedPswd,
          phone,
          email,
      });
      

        await newUser.save();
        res.status(201).json({ message: 'User created successfully',data:newUser });

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
},



  loginUser:async(req,res)=>{
    try{

        const {email,password} = req?.body;
        const user = await user_model.findOne({email})
        console.log("e------",email,password,user);

        if(!user){
            return res.status(404).json({ message: 'User not found' });

        }

        const passwordMatch = await bcrypt.compare(password,user?.password)
        if(!passwordMatch){
            return res.status(401).json({ message: 'Invalid password' });

        }
        res.status(200).json({ message: 'Login successful' ,data:user});


    }
    catch(error){
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

  },

  getAllUser:async (req,res)=>{
    try{
      const users = await user_model.find()
      res
    }
    catch(err){
      console.error('Error logging in:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = userController
