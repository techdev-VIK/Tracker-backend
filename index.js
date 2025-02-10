const express = require('express');

const app = express();

require('dotenv').config();


const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));


const {initializeDatabase} = require('./db/db.connect');


const TrackerLead = require('./models/lead.models');

const TrackerSalesAgent = require('./models/sales.models');

const TrackerTag = require('./models/tag.models');

const TrackerComment = require('./models/comment.models');


//middleware
app.use(express.json());

initializeDatabase();



//create a lead

 async function addLead(leadData){
  try {
    const newLead = new TrackerLead(leadData);

    await newLead.save();

    return newLead;

  } catch (error) {
    console.error(error);
    throw error;
  }
}

app.post('/leads', async(req, res) => {
  try {
    const newLead = await addLead(req.body);

    res.status(200).json({message: 'Lead Added Successfully', lead: newLead})

  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'Failed to add Lead'});
  }
})


// read all leads


async function readLeads() {
  try {
    const getLeads = await TrackerLead.find().populate("salesAgent");
    return getLeads;
  } catch (error) {
      console.log(error);
      throw error;
  }
}


app.get('/allLeads', async (req, res) => {
  try {
    const readAll = await readLeads();
    if(readAll){
      res.json(readAll)
    }else{
      res.status(404).json({error: "Failed to find leads."})
    }
  } catch (error) {
    res.status(500).json({error: 'Failed to fetch data.'})
  }
})


//update the lead

async function updateLead(leadId, dataToUpdate) {
  try {
    const editLead = await TrackerLead.findByIdAndUpdate(leadId, dataToUpdate, {new: true});

    return editLead;

  } catch (error) {
      console.log(error);
      throw error;
  }
}


app.post('/lead/edit/:id', async(req, res) => {
  try {
    const editedLead = await updateLead(req.params.id, req.body);

    if(editedLead){
      res.status(200).json({message: 'Data updated for lead', editedLead})
    }else{
      res.status(404).json({error: 'Failed to update the lead.'})
    }
  } catch (error) {
    res.status(500).json({error: "Failed to update data."})
  }
})



// delete a lead:

async function deleteLead(leadId) {
  try {
    const delLead = await TrackerLead.findByIdAndDelete(leadId);

    return delLead;

  } catch (error) {
      console.error(error);
      throw error;
  }
}


app.delete('/delete/lead/:id', async(req,res) => {
  try {
      const delLead = await deleteLead(req.params.id);

      if(delLead){
        res.status(200).json({message: "Lead deleted", delLead})
      }else{
        res.status(404).json({error: "Failed to Delete."})
      }
  } catch (error) {
    res.status(500).json({error: "Failed to delete."})
  }
})


// Create an agent


async function addAgent(agentData) {
  try {
    const newAgent = new TrackerSalesAgent(agentData);

    await newAgent.save();

    return newAgent;

  } catch (error) {
    console.error(error);
    throw error;
  }
}

app.post('/agent', async(req, res) => {
    try {
       const newAgent = await addAgent(req.body);

       if(newAgent){
          res.status(200).json({message: "Agent Added"})
       }
    } catch (error) {
      console.log(error)
        res.status(500).json({error: 'Failed to add Agent'})
    }
})



// read all Agents;

async function readAgents() {
    try {
        const getAgents = await TrackerSalesAgent.find();

        return getAgents;

    } catch (error) {
      console.error(error);
      throw error;
    }
}


app.get('/allAgents', async(req, res) => {
  try {
    const getAgents = await readAgents();

    if(getAgents){
      res.json(getAgents)
    }else{
      res.status(404).json({error: "Failed to get agents"})
    }
  } catch (error) {
      res.status(500).json({error: error})
  }
})



//update an agent:

async function updateAgent(agentId, dataToUpdate) {
  try {
     const agentUpdate = await TrackerSalesAgent.findByIdAndUpdate(agentId, dataToUpdate, {new: true});

     return agentUpdate;
  } catch (error) {
      console.error(error);
      throw error;
  }
}


app.post("/agent/update/:id", async(req, res) => {
  try {
      const agentUpdate = await updateAgent(req.params.id, req.body);

      if(agentUpdate){
        res.status(200).json({message: "Agent updated successfully", agentUpdate});
      }else{
        res.status(404).json({error: "Failed to update agent"})
      }
  } catch (error) {
      res.status(500).json({error: "Failed to updated Agent"})
  }
})



//Add a tag

async function addTag(tagData) {
  try {
    const newTag = new TrackerTag(tagData);
    await newTag.save();
    return newTag;

  } catch (error) {
      console.log(error);
      throw error;
  }
}

app.post("/tag", async(req, res) => {
  try {
      const newTag = await addTag(req.body);

      if(newTag){
        res.json(newTag)
      }else{
        res.status(404).json({error: "Failed to add a tag"})
      }
  } catch (error) {
    console.error(error)
    res.status(500).json({error: "Failed to add a tag"})
  }
})


// read all tags:

async function readTags() {
  try {
    const getTags = await TrackerTag.find();

    return getTags;

  } catch (error) {
    console.error(error);
    throw error;
  }
}


app.get("/allTags", async(req, res) => {
  try {
      const getTags = await readTags();

      if(getTags){
        res.json(getTags)
      }
  } catch (error) {
      res.status(500).json({error: "Tags not found"})
  }
})


// Add a comment


async function addComment(commentData) {
  try {
     const newComment = new TrackerComment(commentData);

     await newComment.save();

     return newComment;
  } catch (error) {
      console.error(error);
      throw error;
  }
}


app.post("/lead/:id/comment", async(req, res) => {
  try {
      const newComment = await addComment(req.body);

      if(newComment){
        res.json(newComment)
      }else{
        res.status(404).json({error: "Failed to add a comment"})
      }
  } catch (error) {
     res.status(500).json({error: "Comment not added"})
  }
})


// read a comment


async function readComment(leadId) {
    try {
        const getComments = await TrackerComment.find({leadId});

        return getComments
    } catch (error) {
      console.error(error);
      throw error;
    }
}


app.get("/lead/:id/readComments", async(req, res) => {
  try {
      const getComments = await readComment(req.params.id);

      if(getComments){
        res.json(getComments);
      }else{
        res.status(404).json({error: "Failed to get comments"})
      }
  } catch (error) {
      res.status(500).json({error: "Failed to get comments"})
  }
})


const PORT = process.env.PORT ||  3000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

