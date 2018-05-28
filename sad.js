//Install express and nodemon through npm
const Joi = require('joi')
const express = require('express'); //create express function
const app = express(); //create an object for the function
 //this middleware is used in the app.post to parse the name property of the request
//const bodyParser = require('body-parser');

app.use(express.json());


const courses = [           //create the params ID in relation to name
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
];

app.get('/', (req, res) => {  //implement endpoints that respond to a get request, then a callback function once the req has been made
    res.send('Hello werld'); //also called route handler
});

app.get('/api/courses', (req, res) => {  //Create route handler for this endPoint. respond with an array later will be a list of courses. 
    res.send(courses); //return courses array
    });
    
    
                                                    // add courses 
    app.post('/api/courses', (req, res) => {
      
      const schema ={
          name: Joi.string().min(3).required()
      };
      
      const result = Joi.validate(req.body, schema);
      
      console.log(result);
      
      
       if(result.error)  {
           res.status(400).send(result.error);
           return;
       }
       
       const course = {
           id: courses.length + 1, //because we have no data base we need to manually assign an id
           name: req.body.name //name property. This needs to be the "name" property in the body of the request 
        }; 
           
           courses.push(course);//push the object to the server. 
           res.send(course);   //server returns the object in response **not returning the "name"
       
    });
    
    
    // /api/courses/1    
    app.get('/api/courses/:id', (req, res) => { //Create route handler with ID param for individual course /1 /2 etc.. 
        //res.send(req.params.id); // Route params
       const course = courses.find(c => c.id === parseInt(req.params.id));  // .find(method) looks in the array object, the argument that c.id is equal to req.params.id
    if (!course) res.status(404).send('Uh Oh that course was not found..'); //if course not equal, return http status code
        res.send(course); //return course with id to client
    });         // req.params.id returns a string and we need an Int. So we parseInt() the params into an int, then make the result a const object to use     
    
// need environment variable "PORT" use || to otherwise use 8080 if PORT is unavailable 
const port = process.env.PORT || 8080;

app.listen(8080, () => console.log(`Listening on port ${port} ..`)); //Bring up express listener for req, and add function that says something what its doing
                                                    // replace 8080 with a dynamic value obtained from 'port', replace ' ' with ``

    