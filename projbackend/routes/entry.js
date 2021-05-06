
const express = require("express");
const router = express.Router();

const { getEntryById, createEntry,getEntry,deleteEntry,updateEntry,getAllEntries} = require("../controllers/entry");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//all of params
router.param("userId", getUserById);
router.param("entryId", getEntryById);

//*Create Routes
router.post(
  "/entry/create/:userId",
  isSignedIn,
  isAuthenticated,
  createEntry
);

//*Read Routes
router.get("/entry/:userId/:entryId",isSignedIn,isAuthenticated, getEntry)

router.get("/entries/:userId",isSignedIn,isAuthenticated, getAllEntries)


//*Delete Routes
router.delete("/delete/:userId/:entryId", isSignedIn, isAuthenticated,deleteEntry)

//*Update Routes
router.put("/entry/:userId/:entryId", isSignedIn, isAuthenticated,updateEntry)
module.exports = router;
