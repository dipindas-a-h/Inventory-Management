const stock_module = require("../../modal/stock_module");
const user_model = require("../../modal/user_model");
const { generateUserId } = require("../utilities/idGenerate");

const stockController = {
  addStock: async (req, res) => {
    try {
        const stocksToAdd = req?.body;

        if (!Array.isArray(stocksToAdd) || stocksToAdd.length === 0) {
            return res.status(400).json({ error: "Invalid or empty request body" });
        }

        const invalidStocks = [];
        const addedStocks = [];

        // Iterate through each stock object in the request body
        for (const stock of stocksToAdd) {
            const { user, stockName, qty, price, desc } = stock;

            // Check if all required fields are provided for each stock
            if (!user || !stockName || !qty || !price || !desc) {
                invalidStocks.push(stock);
                continue; // Skip to the next stock if any required field is missing
            }

            // Check if user exists
            const userExists = await user_model.findById(user);
            if (!userExists) {
                invalidStocks.push(stock);
                continue; // Skip to the next stock if the user doesn't exist
            }

            const stock_id = generateUserId();

            // Create new stock entry
            const newStock = new stock_module({
                user: user,
                stockName,
                qty,
                price,
                desc,
                stockId: stock_id,
            });

            // Save new stock entry
            await newStock.save();
            addedStocks.push(newStock);
        }

        // Prepare response with added and invalid stocks
        const response = {
            addedStocks: addedStocks,
            invalidStocks: invalidStocks
        };

        res.status(201).json({ message: "Stocks created successfully", data: response });
    } catch (error) {
        console.error("Error creating stocks:", error);
        res.status(500).json({ message: "Internal server error" });
    }
},


addSingleStock: async (req,res)=>{
    try {
        const { user, stockName, qty, price, desc } = req?.body;

            const userExists = await user_model.findById(user);

            if(!userExists){
                return res.status(404).json({ error: "user not found" });

            }

            const stock_id = generateUserId();

            // Create new stock entry
            const newStock = new stock_module({
                user: user,
                stockName,
                qty,
                price,
                desc,
                stockId: stock_id,
            });

            // Save new stock entry
            await newStock.save();
            res.status(201).json({ message: "Stocks created successfully", data: newStock });



    }
    catch(error){
        console.error("Error creating stocks:", error);
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
        const { stockName, price } = req.query;
        let query = {};

        // Check if stockName or user search parameters are provided
        if (stockName) {
            query.stockName = { $regex: new RegExp(stockName, 'i') }; // Case-insensitive search
        }
        if(price){
          query.price = { $gte: parseFloat(price) }; // Find prices greater than or equal to the provided price

        }


        // Find stocks based on the constructed query
        const data = await stock_module.find(query).populate("user");

        if (data.length > 0) {
            res.status(200).json({ message: "Stock details", data: data });
        } else {
            res.status(404).json({ message: "No stocks found matching the search criteria" });
        }
    } catch (error) {
        console.error("Error fetching stock:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
,

  
  editStock: async (req, res) => {
    try {
        const { id } = req?.params;
        const { user, stockName, qty, price, desc } = req?.body;

        // Check if all required fields are provided
        if (!id || !user || !stockName || !qty || !price || !desc) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Check if the stock entry exists
        const existingStock = await stock_module.findById(id);
        if (!existingStock) {
            return res.status(404).json({ error: "Stock not found" });
        }

        // Update the stock entry
        const updatedStock = await stock_module.findByIdAndUpdate(id, {
            user,
            stockName,
            qty,
            price,
            desc
        }, { new: true }); // Set { new: true } to return the updated document

        if (updatedStock) {
            return res.status(200).json({ message: "Stock updated successfully", data: updatedStock });
        } else {
            return res.status(400).json({ message: "Failed to update stock" });
        }
    } catch (error) {
        console.error("Error editing stock:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
},

deleteStock:  async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the stock entry exists
        const existingStock = await stock_module.findById(id);
        if (!existingStock) {
            return res.status(404).json({ error: "Stock not found" });
        }

        // Delete the stock entry
        await stock_module.findByIdAndDelete(id);

        return res.status(200).json({ message: "Stock deleted successfully" });
    } catch (error) {
        console.error("Error deleting stock:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
},


stockNotification : async (req,res)=>{
    try{
        console.log('callget=================================');
        const limit  = parseInt(10)
        const lowStocks = await stock_module.find({ qty: { $lt: limit } });

        return res.status(200).json({ message: "notifiaction" ,data:lowStocks});

    }catch(err){
        console.error("Error deleting stock:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

}

};

module.exports = stockController;
