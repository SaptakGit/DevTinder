const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
    {
        fromUserId : {
            type : mongoose.Schema.Types.ObjectId,
            ref: "User", // Referance to the User collection
            required : true
        },
        toUserId : {
            type : mongoose.Schema.Types.ObjectId,
            ref: "User", // Referance to the User collection
            required : true
        },
        status : {
            type : String,
            required : true,
            enum : {
                values : ["ignored", "interested", "accepted", "rejected"],
                message : `{VALUE} is incorrect status type` 
            }
        }
    }, {
        timestamps : true,
    }
);


// Compound Index
connectionRequestSchema.index({ fromUserID : 1, toUsreId : 1})

// Pre Method
connectionRequestSchema.pre("save", function(next){
    const connectionRequest = this;
    // Check if the fromUserId is same as toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send conection request to yourself!");
    }
    next();
})

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);