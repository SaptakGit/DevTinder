const express = require("express")
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName photoUrl age about gender skills";

// Get all connection request for the logged in user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId : loggedInUser._id,
            status : 'interested'
        }).populate("fromUserId", USER_SAFE_DATA);

        res.json({
            message:"Data fetched successfully", 
            datda: connectionRequests
        })

         
    } catch (err){
        res.status(400).send("ERROR: " + err.message);
    }

});


// Get all accepted connections
userRouter.get("/user/connecetions", userAuth, async (req, res)=>{
    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or:[
                {
                    toUserId : loggedInUser._id,
                    status: 'accepted'
                },
                {
                    fromUserId : loggedInUser._id,
                    status: 'accepted'
                }
            ],
        }).populate("fromUserId", USER_SAFE_DATA)
        .populate("toUserId", USER_SAFE_DATA);

        //modifing the data according our need
        const data = connectionRequests.map((row) => {
            if(row.fromUserId._id.toString() == loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        } );

        res.json({data});

    } catch (err){
        res.status(400).send("ERROR: " + err.message);
    }
})

module.exports = userRouter;