const adminAuth = (req, res, next) => {
    console.log("Admin Auth Middle Checked");
    const token = "xyz";
    const isAdminAuthorised = token === "xyz";
    if(!isAdminAuthorised){
        res.status(401).send("Unauthorised Requests");
    } else{
        next();
    }
}

const userAuth = (req, res, next) => {
    console.log("User Auth Middle Checked");
    const token = "xyz";
    const isAdminAuthorised = token === "xyz";
    if(!isAdminAuthorised){
        res.status(401).send("Unauthorised Requests");
    } else{
        next();
    }
}

module.exports = {adminAuth, userAuth} 