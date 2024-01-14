const express = require('express')
const app = express()
const port = process.env.PORT || 4000;
const cors = require('cors')

//middleware
app.use(cors());
app.use(express.json());

//hF2btWt7D7pu0xFP

app.get('/', (req, res) => {
    res.send('Hello, Mr. Ganesh Vairagar..!')
})

//--------MongoDB-----------------------------------------------------------------------------------------------

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://Mern-Prestige-Planner:hF2btWt7D7pu0xFP@employee.4j7vr.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    
    //post db--------------------------------------------------------------------------------------------------------
    //create a collection of a documents and insert a Customer to the database using post method
    const eventCollections = client.db("EventMangement").collection("customer");
    app.post("/upload-customer", async(req, res) =>{
        const data = req.body;
        const result = await eventCollections.insertOne(data);
        res.send(data);
    })


    //create a collection of a documents and insert a event to the database using post method
    const eventCollections1 = client.db("EventMangement").collection("partner");
    app.post("/upload-event", async(req, res) =>{
        const data = req.body;
        const result = await eventCollections1.insertOne(data);
        res.send(data);
    })
//---------------------------------------------------------------------------------------------------------------------


    //get++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //get all customers
    app.get("/all-customers", async(req, res) => {
        const customers = eventCollections.find();
        const result = await customers.toArray();
        res.send(result);
    })

    //get all events
    app.get("/all-events", async(req, res) => {
        const events = eventCollections.find();
        const result = await events.toArray();
        res.send(result);
    })
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    //patch==========================================================================================================

    
    //Update Customers data
    app.patch("/customers/:id", async(req, res) => {
        const id = req.params.id;
       // console.log(id);
       const updateCustomerData =req.body;
       const filter = {_id: new ObjectId(id)};
       const options = { upsert: true };
       const updateCustomerDoc = {
            $set: {
                ...updateCustomerData
            }
       }
       const result = await eventCollections.updateOne(filter, updateCustomerDoc, options);
       res.send(result);
    })

     //Update events data
     app.patch("/events/:id", async(req, res) => {
      const id = req.params.id;
     // console.log(id);
     const updateEventData =req.body;
     const filter = {_id: new ObjectId(id)};
     const options = { upsert: true };
     const updateEventDoc = {
          $set: {
              ...updateEventData
          }
     }
     const result = await eventCollections1.updateOne(filter, updateEventDoc, options);
     res.send(result);
  })

    //===============================================================================================================

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //delete a Customer data
  app.delete("/customers/:id", async(req, res) =>{
      const id = req.params.id;
      const filter = { _id:new ObjectId(id)};
      const result = await eventCollections.deleteOne(filter);
      res.send(result);
  })

  //delete a Customer data
  app.delete("/events/:id", async(req, res) =>{
    const id = req.params.id;
    const filter = { _id:new ObjectId(id)};
    const result = await eventCollections1.deleteOne(filter);
    res.send(result);
})

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
  
  app.get("/all-events", async(req, res) =>{
    let query = {};
    if(req.query?.event_type){
      query = {event_type : req.query.event_type}
    }
    const result =  await eventCollections1.find(query).toArray();
    res.send(result);
  })

    







    await client.db("admin").command({ ping: 1 });
    console.log("Hey Ganesh, Your deployment successfully connected to MongoDB!");
  } finally {
    // first comment these below line
    //await client.close();
  }
}
run().catch(console.dir);
//-------------------------------------------------------------------------------------------

app.listen(port, () => {
    console.log(`Example of listening port ${port}`);
})