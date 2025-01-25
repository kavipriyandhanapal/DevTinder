# DEVTINDER APIs

## AUTH router
POST /Sigunup
POST /Login
POST /LogOut

## Profile router
GET / Profile
PATCH / Profile/edit
PATCH / Profile/password


## Connection Request Router
POST / Request/send/interest :userID
POST / Request/send/ignored: userID
POST / Request/received/accept: RequestID
POST / Request/received/rejected: RequestID

## User Router
GET /user/ connections
GET/ user/ feed
Get/ user /request   what are the request we got 