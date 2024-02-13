const stock_module = require("../../modal/stock_module");
const user_model = require("../../modal/user_model");
const { generateUserId } = require("../utilities/idGenerate");

const stockController = {
  addStock: async (req, res) => {
    try {
      const { user, stockName, qty, price, desc } = req?.body;
      // console.error('---',req);
      // // throw new Error(req);
      const UserExsist = await user_model.findById(user);
      if (!UserExsist) {
        throw new Error("User not found");
      }
      const stock_id = generateUserId();

      const newStock = new stock_module({
        user: user,
        stockName,
        qty,
        price,
        desc,
        stockId: stock_id,
      });
      await newStock.save();
      res
        .status(201)
        .json({ message: "stock created successfully", data: newStock });
    } catch (error) {
      console.error("Error creating stock:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getSingleStock: async (req, res) => {
    try {
      const { id } = req.params;
      const stockDetails = await stock_module.findById(id).populate("user");

      if (!stockDetails) {
        return res.status(404).json({ message: "Stock not found" });
      }

      res.status(200).json({ message: "Stock details", data: stockDetails });
    } catch (error) {
      console.error("Error fetching stock:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getAllStock: async (req, res) => {
    try {
      const data = await stock_module.find().populate("user");
      if (data) {
        res.status(200).json({ message: "Stock details", data: data });
      } else {
        res.status(400).json({ message: "Stock Not Found" });
      }
    } catch (error) {
      console.error("Error fetching stock:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  editStock: async (req, res) => {
    try {
      const { id } = req?.params;
      const { user, stockName, qty, price, desc } = req?.body;
      const datato = { user, stockName, qty, price, desc };
      const updatedData = stock_module.findByIdAndUpdate(id, datato);
      if(updatedData){
        res
        .status(200)
        .json({ message: "stock updated successfully", data: updatedStock });
      }else{
        res
        .status(400)
        .json({ message: "stock updation Failed" });
      }
     
    } catch (error) {
      console.error("Error editing stock:", error);
      res.status(500).json({ message: "Internal server error" }); // Send more specific error message if possible
    }
  },
};

module.exports = stockController;
