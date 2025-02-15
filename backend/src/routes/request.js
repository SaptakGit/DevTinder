const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored", "interested"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message: "Invalid status type: " + status});
        }

        // Check for the valid user id
        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(404).json({message : "User not found"});
        }

        // If there is an existing connection request
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId : toUserId, toUserId : fromUserId }
            ],
        });
        if(existingConnectionRequest){
            return res.status(400).send({message : "Connection Request already Exists"});
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId, toUserId, status
        });

        const data = await connectionRequest.save();
        res.json({
            message: "Connection Request Sent Successfullt!",
            data,
        });

    } catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
})

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user;
        const {status, requestId} = req.params;
        const allowedStatus = ["accepted", "rejecteed"];

        if(!allowedStatus.includes(status)){
            return res.status(400).json({message: "Status not allowed!"});
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id : requestId,
            toUserId : loggedInUser._id,
            status : 'interested'
        })

        if(!connectionRequest){
            return res.status(404).json({message:"Connection request not Found!"});
        }

        connectionRequest.status = status;
        const data = await connectionRequest.save();

        return res.json({message:"Connection Requested " + status, data})

    } catch(err){
        res.status(400).send("ERROR :" + err.message);
    }
})

module.exports = requestRouter;