const express = require("express");
const router = express.Router();

const InvoiceController = require("../controllers/invoice");
const invoice = require("../models/invoice");

router.post("/", InvoiceController.createInvoice);
router.get("/", InvoiceController.readInvoice);


module.exports = router;


