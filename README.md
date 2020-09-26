[![Nodejs banner](https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png)](https://nodejs.org)
[![Angular banner](https://raw.githubusercontent.com/dart-lang/angular/master/doc/angulardart-logo.png)](https://angularjs.org/) 


<hr>

# Design

FrontEnd- AngularJs,Bootstrap

BackEnd-  NodeJS,ExpressJs,MongoDb

---
## Prerequisite

1.NPM installed

2.Angular installed

3.MongoDB DataBase

## Install Dependencies

```
$ npm install 
```

## Usage

1.For the Backend
```
$ npm start 
```
2.For the Frontend
```
$ ng Serve 
```
3.MongoDb database

**Configuration**:

1.Change the Database Connection to your database in **server.js** file in the backend

```
  mongoose.connect(""/*MongoDb Connection string*/, {
    useNewUrlParser: true}).then(() => {
    console.log('Connected to MongoDB');
    http.listen(port, () =>{
      console.log(`listening on *:${port}`);
    });
  })
```
