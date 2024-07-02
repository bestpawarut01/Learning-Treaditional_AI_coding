const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const axios = require('axios');
require ('dotenv').config();

const app = express();
const port = process.env.PORT || 5000 ;
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI
const client = new MongoClient(uri);

client.connect( err => {
  if (err) { throw err; }
  
  const collection = client.db("clustertestpawarut0").collection("ClusterTestPawarut0");
  const collectionAnalyze = client.db("DataForAnalyze").collection("AnalyzeBug");

  //get app feature request
  app.get('/api/posts', async (req, res) => {
    try {
      const result = await collection.find({}).toArray();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  });

  //get status Up Considerations
  app.get ('/api/UpCosideration' , async (req, res) => {
    try {
      const response = await collection.find({"Status_Consideration" : "Up Consideration"}).toArray();
      res.json(response)
    } catch (error) {
      res.status(400).json({ error: 'Failed to fetch posts'})
    }
  })

  //get status in develop
  app.get ('/api/InDevelop' , async (req, res) => {
    try {
      const response = await collection.find({"Status_Consideration" : "In develop"}).toArray();
      res.json(response)
    } catch (error) {
      res.status(400).json({ error: 'Failed to fetch posts'})
    }
  })

  //get status in shipped
  app.get ('/api/Shipped' , async (req, res) => {
    try {
      const response = await collection.find({"Status_Consideration" : "Shipped"}).toArray();
      res.json(response)
    } catch (error) {
      res.status(400).json({ error: 'Failed to fetch posts'})
    }
  })

  app.post('/api/findIdAddScore', async (req, res) => {
    try {
      const id_search = req.body.id.id_card;
      const response = await collection.find({"id_card" : id_search }).toArray();
      res.status(200).send(response);
    } catch (error) {
      res.status(400).json({ error });
    }
  });

  app.post ('/api/addBug', async (req, res) => {
    try {
      const payload = req.body
      console.log(payload);
      const response = await axios.post('https://hook.us1.make.com/qvyoa5tg5fnvuivbq2xvx75t6urn2uq2', payload)
      res.status(200).send(response);
    } catch (error) {
      res.status(400).send( error );
    }
  })

  app.post ('/api/addFeatureRequest' , async (req, res) => {
    try{
      const payload = req.body;

      const response = await axios.post('https://hook.us1.make.com/z56bublinty7vq7xwwm3bxglvscf3rhi' , payload);
      console.log(payload);
      res.status(200).send( response );
    } catch (error) {
      res.status(400).send( error );
    }
  })

  app.post ('/api/addScores' , async (req, res) => {
    try {
      const score = req.body;
      console.log(score);
      setTimeout(() => {
        const response = axios.post('https://hook.us1.make.com/2jbbuy8lpad64cv58kd1gou15uqg3lzp' , score);
        res.status(200).send( response );
      }, 1000);
    } catch (error) {
      res.status(400).send( error );
    }
  }),

    //get all Analyze
  app.get('/api/getAllAnalyze', async (req, res) => {
    try {
      const result = await collectionAnalyze.find({}).toArray();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });

})