This is a platform where developers can connect to each other make new projects, make new friends, connections etc.

# Backend

## EP 01:
    SDLC => Software Development Life Cycle

    Waterfall Model

        Requirements: Done by Product/Project Manager with Designer for mock
        ^  |
        |  ---> Design Architecture: Done by Senior Engineer/ Engineer Manager/ Tech Lead
        |          |                   Design the Architecture. what tech stack, High Level Design(HLD),  Low Level Design(LLD),
        |          |                   Monolith, Microservice.
        |          |
        |          |
        |          ----> Development: SD1, SDE2, Intern
        |                    |
        |                    |
        |                    ----> Testing: SDET
        |                             |
        |                             |
        ^                             -----> Deployment: Seniour Developer/DevOps
        |                                       |
        |                                       |
        |                                       ---> Maintainance:
        |                                              |
        |                                              |
        |__<_____Back to Requirements__________<________V
                                                

    ----------------------------------------------------------------------------------------------------------------
                    |                  Monolith                 |                    Microservice
    ----------------|-------------------------------------------|---------------------------------------------------
    Dev Speed:      |  Slower                                   |  Fast
    ----------------|-------------------------------------------|---------------------------------------------------          
    Code Repo:      |  Single Code Repo                         |  Multiple Code Repo
    ----------------|-------------------------------------------|---------------------------------------------------       
    Scalability:    |  No probloem for cmall Code but for large |  Easy to maintain Large codebase
                    |  code base it is a huge problem.          |  
    ----------------|-------------------------------------------|---------------------------------------------------
    Deployment:     |  Single Deployment. But for every small   |  Multiple Deployment for each project.    
                    |  change the whole project have to deploy. |  Specific project deployed for
                    |                                           |  specific change.But chance of mismatch 
                    |                                           |  if all the projects version not updated
    ----------------|-------------------------------------------|---------------------------------------------------
    Tech Stack:     |  Restricted Tech Stack                    |  Individual Tech Stack
    ----------------|-------------------------------------------|---------------------------------------------------
    Infra Cost:     |  Lower                                    |  Higher
    ----------------|-------------------------------------------|---------------------------------------------------
    Complexity:     |  small project-> Easy                     |  small project-> Hard
                    |  large project-> Hard                     |  large project-> Easy
    ----------------|-------------------------------------------|---------------------------------------------------
    Fault Isolation:|  If fault happen the whole project        |  If fault happen only the Microservice will
                    |  will be down                             |  be down
    ----------------|-------------------------------------------|---------------------------------------------------
    Testing:        |  Easy in Monolith                         |  Hard as there are different Microservice running.
    ----------------|-------------------------------------------|---------------------------------------------------   
    Ownership:      |  Central Ownership                        |  Separate Ownership for each Microservice
    ----------------|-------------------------------------------|---------------------------------------------------
    Maintainance:   |  Hard                                     |  Easy
    ----------------|-------------------------------------------|---------------------------------------------------
    Rewamps:        |  Hard                                     |  Easy
    ----------------|-------------------------------------------|---------------------------------------------------
    Debugging:      |  Slightly Easy                            |  Can be hard, blame game can happen
    ----------------|-------------------------------------------|---------------------------------------------------
    Dev Experience: |  Personal Openion                         |  Personal Openion
    ----------------|-------------------------------------------|---------------------------------------------------


    NamsteDev.com
    4 Microservice
    Frontend ->  Student-web : Next.js
                Admin-web : React.js
                Student-app : React Native
    Backend  -> Node.js


    DevTinder: 
        2 Microservice
        Frontend : React
        Backend : NodeJs


## EP 02:
    DevTinder SDLC
    Requirements Gathering:
        1) Create an account/ Sign up
        2) Log in
        3) Update/Create Your Profile
        4) Feed Page -> Explore other people
        5) Send Connection Request.
        6) See our Matches
        7) See the Request we have sent/ receive
        8) Update your Profile

    Tech-Planning/Architecture:
        HLD:
            2 Micreservices
                Frontend:
                    1) React
                Backend:
                    1) NodeJS
                    2) MongoDB 

        LLD:
            DB Design:
                Collection
                    -> User
                        -> Firstname
                        -> Lastname
                        -> EmailId
                        -> Password
                        -> Age, Gender
                    -> ConnectionRequest
                        -> From UsesrId
                        -> To UsesrId
                        -> Status = Pending/ Ignored/ Accepted/ Rejected

            API Design 
                {Rest API} HTTP Methods:
                    GET -> Get the Data from the Database
                    POST -> Push the Data from the Database
                    PUT -> Update the Data from the Database
                    PATCH -> Update the Data from the Database
                    DELETE -> Delete the Data from the Database

                POST   --> /signup
                POST   --> /login
                GET    --> /profile
                POST   --> /profile
                PATCH  --> /profile
                DELETE --> /profile         |----> interested
                POST   --> /sendRequest ----|
                                            |----> ignored  
                                              |----> accept
                POST   --> /reviewRequest ----|
                                              |----> reject
                GET    --> /requests
                GET    --> /connections


                *** API:
                    API stands for Application Programming Interface. It's a software interface that connects computer programs or computers. 
                    APIs are used to provide services to other software programs. 

                *** REST API:
                    A REST API (also called a RESTful API or RESTful web API) is an application programming interface (API) that 
                    conforms to the design principles of the Representational State Transfer (REST) architectural style.

                *** SOAP API:
                    SOAP API (Simple Object Access Protocol) is a messaging protocol that allows applications to communicate with each 
                    other. It uses XML (Extensible Markup Language) data to send requests and responses. 

                *** Difference between Put & Patch ?
                    PUT and PATCH are HTTP methods used to update resources. PUT is used to replace an entire resource, 
                    while PATCH is used to update only part of a resource. 

                
## EP 03:
    varsion:
    express -> 4.19.2
                4  -> Major Verion: Breaking change.It is not safe to  
                                    update any project that are running 
                                    on 4.x.x .
                19 -> Minor Verion: Extra feature and Backward Compatable.
                                    It is safe to update any project that 
                                    are running on 4.x.x .
                2  -> Patch Verion: Bug fix/ Small change.It is safe to  
                                    update any project that are running 
                                    on 4.x.x .

                ^ -> autometically updte to any version 4.x.x (4.19.2 to < 5.0.0)
                ~ -> autometically updte to any version 4.19.x (4.19.2 to < 4.20.0)

    create backend folder
    npm init -> create package.json
    add /backend/node_modules to .gitignore
    install express -> npm i express
    install nodemon -> npm install -g nodemon
    change running script in package.json
        -> "start" : "node src/app.js"
        -> "dev" : "nodemon src/app.js"
        npm run start
        npm run dev
    Create first server on express


## EP 04:
    Order of route matter a lot
    Install Postman
        -> create Workspace
        -> create Collections

    app.use => This will match all the HTTP method API calls

    Advanced Routing:
            app.get("/ab?c") => ? Makes it optional. It will work for /ac and /abc both
            app.get("/ab+c") => + Makes it allow multiple 'b'. 
                                It will work for /ac and /abbbbbbc both
            app.get("/ab*cd") => * Makes it allow anythig in between optional. 
                                It will work for /abcd and /ab'ANYTHING IN BETWEEN'cd both
            app.get("/a(bc)?d") => () Makes it group optional. It will work for /ac and /abcd both
            app.get("/a(bc)+cd") => + Makes it allow multiple 'b'. 
                                It will work for /ac and /abcbcbcd both
            Regex Also work:
                app.get("/a/") => If any 'a' comes on the url it will work.
                app.get("/.*fly$/") => If  that starts with anythig and ends with 'fly' it will work.

            http://localhost:7777/user?userId=101&password=test =>
                console.log(req.query);
            http://localhost:7777/user/101 =>
                app.get("/user/:userId/:name/:password"), (req, res) => {
                    console.log(req.params);
                    res.send({"firstname": "Saptak", "lastname" : "Das"})
                });

## EP 05:
    One route can have multiple route handler.
    app.use("/user", 
            (req, res) => {
                res.send("Response 1");
            },
        (req, res) => {
                res.send("Response 2");
        }
    )

    *** if response is not sended (res.send()) it will be keep waiting for response.

    next() => It calls the 2nd route handler if response is not send from the 1st
            route
                (req, res, next) => {
                    // res.send("Response 1");
                    next();
                } => calls 2nd route handler

                (req, res, next) => {
                    res.send("Response 1");
                    next();
                } => send response & next will not called

                (req, res, next) => { 
                    next(); 
                    res.send("Response 1");
                } => calls the next handler, will come back here and throws an error
                    as response is already sent from the 2nd handler.   

                *** details about next();

    we can write route handler as array also
        app.use("/route", rH, rH2, rH3, rH4, rH5)    *** rH => route handler
        app.use("/route", [rH, rH2, rH3, rH4, rH5])
        app.use("/route", [rH, rH2], rH3, rH4, rH5)
        app.use("/route", rH, [rH2], rH3, rH4, rH5)

    Middleware => The handler which does not send the response back is known as Middleware.
                The handler waich sends the response is know as request handler.
                Generally Middleware are use 'app.use' or 'app.all'
                Diff between 'app.use' & 'app.all'
                
                // Handle Auth Middleware for all GET POST ... Requests
                app.use("/admin/ge", (req, res, next) => {
                    console.log("Admin Atuh Middle Checked")
                    const token = "xyz";
                    const isAdminAuthorised = token === "xyz"
                    if(!isAdminAuthorised){
                        res.send("Unauthorised Requests")
                    } else{
                        next()
                    }
                })

                app.get("/user", (req, res) => {
                    res.send("User Data Sent")
                }) => Middleware NOT Checked 

                app.get("/admin/getAllUser", (req, res) => {
                    res.send("All Data Sent")
                }) => Middleware Checked

                app.get("/admin/deleteUser", (req, res) => {
                    res.send("User Deleted")
                }) => Middleware Checked

    Error Handling:
        1)  try{}
            catch(e){}

        2)  Wildcard Error Handling:
                app.use("/", (err, req, res, next) => {
                    if(err){
                        res.status(500).send("Something Went Wrong");
                    }
                })

## EP 06:
    mongoose: (https://mongoosejs.com/docs/guide.html)
        npm i mongoose
        connect with the database usig connection string
        "Connection-url"/devTinder

    call app.listen only after sucessfull database connection.

    create model folder
    creating schema using new mongoose.Schema inside model.
    create a POST Api to create user data using User Model.

    __v in a mongoDb document ?


## EP 07:
    Differance between JS Object and JSON
    express.json() middleware for converting incoming API JSON data to JS Objects

    Mongoose Documentation : Source -> https://mongoosejs.com/docs/api/model.html

    User.findOne({emailId : req.body.emailId}) // find the one users with the emailId(most probaly first document)

    User.findOne({}) //conditions is optional, and if conditions is null or undefined, mongoose will send an empty findOne command to MongoDB, which will return an 
    arbitrary document. If you're querying by _id, use findById() instead.

    User.find({emailId : req.body.emailId}) // find all the users with this email

    User.find({}) // find all the users with this email

    User.findOneAndDelete() // findByIdAndDelete(id) is a shorthand for findOneAndDelete({ _id: id }).

    User.findByIdAndUpdate(id, data, options) // Issues a mongodb findOneAndUpdate command by a document's _id field. findByIdAndUpdate(id) is equivalent to 
    findOneAndUpdate({ _id: id }). findByIdAndUpdate uses id and findOneAndUpdate uses any unique field. Explore the 'options'.


## EP 08:
    Schema Level Validation
        minLength: 4, // set minimum length 4 in Name field.

        maxLength: 50 // set maximum length 50 in Name field.

        lowercase: true, // stores the email always in lowercase

        required: true, // makes the field required

        unique: true, // makes the field unique, prevents duplicacy

        trim: true, // clear extra spaces in email

        min: 18, // set min value as 18

        validate(value){  //custom validation
                        if(!['male','female','others'].includes.value){
                            throw new Error("Gender data is not Valid");
                        }
                    },
        the custom validation warks autometically at the time of creation, to work it at the time of
        update we have to pass 'runValidators: true' in 'option's in 'patch'

        default: "https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg", // set default value

        timestamps: true, // createdAT and UpdatedAt

    API level Validation

    External Validator:
        validator.js (https://www.npmjs.com/package/validator)
        npm i validator

        const validator = require("validator");

        validate(value){ // validation by external validator
                    if(!validator.isEmail(value)){
                        throw new Error("Invalid Email Address "+value)
                    }
                }

## EP 09:
    Encrypt the password:
        bcrypt (https://www.npmjs.com/package/bcrypt)
        npm i bcrypt
        
        *** Sign Up ***
        bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
            // Store hash in your password DB.
        });

        *** Login ***
        // Load hashPassword from your password DB.
        bcrypt.compare(myPlaintextPassword, hashPassword).then(function(result) {
            // result == true
        });

                    
## EP 10:
    Authentication:

        User                         |                          Server
    -------------------------------------------------------------------------
            --------->------- Login(Email, Pass) ----------->  validate,
                                                            Create a JWT Token.
                                                            Wrap the JWT Token inside
            <---------<----- (token inside cookie) ----------  a cookie and send back.

            ----------x------ Connection Closed -------x-----

            -------->------- Profile (with token) ---------->  Validated token,
            <---------------<---------------------<----------  Send data back,

            ----------x------ Connection Closed -------x-----


        Express cookie: 
        
            Set Cookie: res.cookie(name, value [, options]);
            Get Cookie: 
                    use cookie-parser (https://www.npmjs.com/package/cookie-parser) to parse to cookie
                    npm i cookie-parser
                Then use : req.cookies.name
                Use cookie Expairy

        JWT Token:
            jsonwebtoken (https://www.npmjs.com/package/jsonwebtoken)
            npm i jsonwebtoken
            Use token Expairy

    schemaMethods: This is a good practice to write model related functionality inside model as a schema mothod. It ofloads many task from main script.
    Such as here the JWT token creation. Since it is a user specific operation we can write it as a schema method. 
    Same thing for validating a password.
    It will make our life easier and keep the code clean.


## EP 11:
    API List:

        authRouter:
            - POST /signup
            - POST /login
            - POST /logout

        rofileRouter:
            - GET /profile/view
            - PATCH /profile/edit
            - PATCH /profile/password

        connectionRequestRouter:
            - POST /request/send/interested/:userId
            - POST /request/send/ignored/:userId
            => POST /request/send/:status/:userId
        
            - POST /request/review/accepted/:requestId
            - POST /request/review/rejected/:requestId

        userRouter:
            - GET /user/connections
            - GET /user/requests/received
            - GET /user/feed - Gets the profiles of other users on platform

            Status: ignore, interested, accepted, rejected

        Express Router:

## EP 12:
    Schema Validation:
        schema.pre

    $or and $and in mongoose
    https://www.mongodb.com/docs/manual/reference/operator/query/

    Creating Index in our DB
    in mongoDb if a field is Unique then mongoDb automettically
    create an index on it.

    compound index:
        https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/
        https://mongoosejs.com/docs/api/schema.html#Schema.prototype.index()
        connectionRequestSchema.index({ fromUserID : 1, toUsreId : 1})

    ALLWAYS THINK ABOUT CORNER CASES


  


