const express = require("express")
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const USER_SAFE_DATA = "_id firstName lastName photoUrl age gender emailId about skills";

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
            data: connectionRequests
        })

         
    } catch (err){
        res.status(400).send("ERROR: " + err.message);
    }

});


// Get all accepted connections
userRouter.get("/user/connections", userAuth, async (req, res)=>{
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
});


// Get feed *** VVI ***
userRouter.get("/feed", userAuth, async (req, res) => {
    try{

        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page-1)*limit;

        const connectionRequests = await ConnectionRequest.find({
            $or:[
                {fromUserId: loggedInUser._id},
                {toUserId: loggedInUser._id}
            ],
        }).select("fromUserId toUserId");

        const hideUserFromFeed = new Set();
        connectionRequests.forEach((req) => {
            hideUserFromFeed.add(req.fromUserId);
            hideUserFromFeed.add(req.toUserId)
        })

        const users = await User.find({
            $and:[
                { _id: {$nin: Array.from(hideUserFromFeed)} },
                { _id: {$ne: loggedInUser._id}}
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);

        res.json({data: users});

    } catch(err){
        res.status(400).json({message : err.message});
    }
});


// Get Userlist 

userRouter.get("/userlist", userAuth, async (req,res) => {
    try{
        //console.log(req.query)
        const loggedInUser = req.user;
        
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page-1)*limit;


        const allUserList = await User.find().select(USER_SAFE_DATA);


        const userList = await User.find({
            $and :[
                { status : 1 }
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit); 
        if(userList.length > 0){
            res.json({status:true, userList:userList, totalUser:allUserList.length, limit:limit, offset:skip})
        }
        else{
            res.json({status:false, message:"No User Found"});
        }
    } catch(err){
        res.json({status:false, message:err.message});
    }
    
});

module.exports = userRouter;