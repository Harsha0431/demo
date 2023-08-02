// To connect with your mongoDB database
const mongoose = require('mongoose');
async function connectToDatabase() {
    try {
      await mongoose.connect('mongodb+srv://harshapolamarasetty:Elliegoulding1173@harshacluster.nprzy38.mongodb.net/ShareWithMe', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
  
      console.log('Connected to ShareWithMe database');
    } catch (err) {
      console.error('Error connecting to the database:', err.message);
    }
  }
  
  // Call the function to connect to the database
  connectToDatabase();




// For backend and express
const express = require('express');
const app = express();
const path = require('path');
const cors = require("cors");
app.use(express.json());
app.use(cors());
const User = require('./UserSchemaInsert');




// app.use(express.static(path.join(__dirname, '../build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../build', 'index.html'));
// });





app.get("/", (req, resp) => {
  resp.send("App is Working ...");
});


app.get("/getFileURI" , async (req, resp) => {
  try {
    const uniqueId = req.query.uniqueId;
    const user = await User.findOne({ uniqueId });
    if (user) {
      resp.json({ url: user.url , status:true});
    } else {
      resp.json({staus: false});
    }
  } catch (e) {
    resp.status(500).json({ error: 'Something went wrong' });
  }
})


app.get("/getDocumentCount" , async (req, resp) => {
  try{
    const count = await User.countDocuments();
    resp.json({count: count});
  }
  catch (e) {
    resp.status(500).json({ error: 'Something went wrong' });
  }
})


app.post("/register", async (req, resp) => {
	try {
        console.log('Directed to register');
		    const uniqueID = req.body.uniqueID;
        const url = req.body.url;
        const name = req.body.name;
        console.log(uniqueID);
        console.log(url);
        const user = new User({
            uniqueId: uniqueID,
            url: url,
            name: name,
        });
        console.log("1111");
        try{
            await user.save();
            console.log('Insered')
        }
        catch(e){
            console.log(e)
        }
	} catch (e) {
		resp.send("Something Went Wrong");
	}
});
app.listen(8080 , ()=>{
    console.log('Server is running on port 8080');
});
