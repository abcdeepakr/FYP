const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");

const { getOrderById, createOrder, getAllOrders, getOrderStatus, updateStatus } = require("../controllers/order");

//*params

router.param("userId", getUserById)
router.param("orderId", getOrderById)

//*Actual Routes

router.post("/order/create/:userId",isSignedIn, isAuthenticated, pushOrderInPurchaseList, createOrder)
router.get("/order/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders)
//*status of orders

router.get("/order/status/:userId", isSignedIn, isAuthenticated, isAdmin,getOrderStatus )
router.put("/order/:orderid/status/:userId", isSignedIn, isAuthenticated, isAdmin,updateStatus)
module.exports = router;
