Episode - 3 

- Craete A Rep And Int Open in Vs 
- init NPM
- package.json vs Package-lock.json
- Diff between (^ and ~)
- Why need both Package.Json And Package-lock.json
- What Is Npm 
- Install Express js Through Npm 
- Listening To the Local Host Server (7777)
- Creating A Req Handlers 



Episode -4 

- Init Git To our Local Repo
- Creating Git Ignore File
- Staging And Commit Our Files In Our Local Repo 
- Why We Need Puch The Package-Lock.Json also?
- Create A Remote Origin Repo In Github
- Push Our Local Repo To Main Origin Using Regestiring The GitHub Commands In Our Local Repo Terminal
- Understand How The Routing Will Handle By The Req Handlers, After / Req Handler Matchs Even If It Not In The Req Hand Route
- Order Of The Routes Matter lot
- We Can use Regex Inside The Routing String 
- Install Postman Create Wrokspace / collection And test the Api's
- Write Logic For GET/POST/PATCH/DELETE req handlers 
- Diff Between app.use and app.(methods) 
- Play Using Dynamic Route 
- Handle Req.params And Req.query In the Handler 


Episode -5 

- What is middlewares and Next ();
- why middlewares are important (similar logic for more than one req handler)
- we can write middleware in different context
- we can warp the middle wares inside the array
- sendind status code along with response using res.status
- we can wrape the middleswares inside modules and we can import it 
- use try and catch for error handlers 
- we can use error argument also to handle errors inside common handler(/) at last to handle the error but always prefer try and catch


Episode - 6 
- Intsall Mongoose Using npm
- connect to the with db using mongoose after that make the express to listen to the port 777
- create the schema and module using mongoose 
- create a user data using module instance 
- create a POST API to save the user instance 
- save the instance using asyn save method
- it will create a unique object id and --v 
- we can create our object id also 
- save the code in github


Episode - 7
- Need To Pass The Data To store dynamically from the api body
- Mongoose Will Understand Only The Js object not Json Wjich Are The Formats We Are PAssing From The APi Body
- Use Express.json method to parse the json to the js object and passing to the module instance to save.
- Creating pi for User(single document)
- Creating api for Feed (all documents)
- Creating api for Fetch By Id
- create api for deleting the user by id 
- creating api for update the document 
- explore mogoose modules for different modules methods 



Episode - 8
- Make a validation to OuR scheams 
- Requried, unique, validation function, enabling Validiation on Put Req endpoint, Min ,Max
- Create Validate Funtion for gender
- put All the validation function requried for our schema 
- Do API Level validation 
- Schema validation vs API validation
- DO API validation ON POST AND PUT
- Use Validator Lib To Make Our Life Easy
- Necer trust the Req.bosy From The user 
- ALWAYS NEED TO SANTIZE OUR CODE 


Episode - 9
- We Need To Validate Our User InComing Datas Before Working With It 
- We can do validation by using schema level validation or in api but we can do all the validation inside the API function itself so we can use helper functions
- All the datas from the user need to be validate 
- And Need to encrpty the use password before storing inside the DB 
- For encrypt we can use the npm package Called BCRYPT
- BCRYPT will convert the string password into HASH 

Episode - 10
- Install cokkie parser 
- Send Dummy cookie During login 
- create GET profile Api and acess the token with cookie 
- install jwt Libraray and Create cookie in login method and pass it to postman 
- pass the cookie to the GET profile method and find the user by the user id 
- Create A middleware for AUTHENTICATION of JWT token 
- If authenticate means Find The user And Add it To the Request
- Set Expire Date For Both JWT and Cookies
- Create Schema Methods For JWT token Genration 
- Create Schema Methods For Password Comparison Using Bcrypt



Episode-11

- We Need to decide what are the APIs and its method we want 
- Cant Manage inside the App.js Itself So we are grouping based on the similar types and using routes to access
- We use Express.Router for this and this will work same as app.use (router.use)
- Create a Router folder and create route for AUTH,PROFILE and Connection
- Shift the handlers to that folder and ipoer into app.js for inital routing
- Create a POST hadler for LogOut 
- Create PATCH handler for edit profile and do validition for the req
- Create PATCH handler for forgot password and do validition and update the password 


