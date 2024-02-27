const { default: mongoose } = require("mongoose");
const SaleOrderDetails = require("../../modal/SaleOrder_details_schema");
const SaleOrder = require("../../modal/Sales_order_modal");
const stock_module = require("../../modal/stock_module");

const SaleOrderController = {
  addSaleOrder: async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { saleOrderData, saleOrderDetailsData } = req.body;
      console.log("sale order data", saleOrderData, saleOrderDetailsData);

      const saleOrder = await SaleOrder.create(saleOrderData);

      // Create an array to hold the detail documents
      const detailDocuments = [];

      // Iterate through the detail data and create detail documents
      for (const detail of saleOrderDetailsData) {
        // Assign the sale order id to each detail
        detail.saleorder_id = saleOrder._id;
        const detailDocument = new SaleOrderDetails(detail);
        detailDocuments.push(detailDocument);

        let a = await stock_module.findById(detail.stock_id);
        let qty = parseInt(a.qty) - parseInt(detail.quantity);

        // console.log("aa", qty,a?.qty,detail.quantity);

        await stock_module.findByIdAndUpdate(detail.stock_id, { qty: qty });
      }

      // Insert detail documents into the database
      const insertedDetails = await SaleOrderDetails.insertMany(
        detailDocuments
      );

      res.status(201).json({ saleOrder, insertedDetails });

     
    } catch (err) {
      console.error("Error creating sale order:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  },


  getAllSaleOrdersWithDetails: async (req, res) => {
    try {
      // Find all sale orders
      const saleOrders = await SaleOrder.find();

      // Populate details for each sale order
      const populatedSaleOrders = await Promise.all(saleOrders.map(async (order) => {
        const details = await SaleOrderDetails.find({ saleorder_id: order._id });
        return { ...order.toObject(), details };
      }));

      res.status(200).json(populatedSaleOrders);
    } catch (err) {
      console.error("Error fetching sale orders:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getSaleOrderWithDetails: async (req, res) => {
    try {
      const { id } = req.params; // Assuming the sale order ID is provided in the URL params

      // Find the sale order by its ID
      const saleOrder = await SaleOrder.findById(id);

      if (!saleOrder) {
        return res.status(404).json({ message: "Sale order not found" });
      }

      // Populate details for the sale order
      const details = await SaleOrderDetails.find({ saleorder_id: saleOrder._id });

      // Combine sale order with its details
      const saleOrderWithDetails = { ...saleOrder.toObject(), details };

      res.status(200).json(saleOrderWithDetails);
    } catch (err) {
      console.error("Error fetching sale order:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

};

module.exports = SaleOrderController;
