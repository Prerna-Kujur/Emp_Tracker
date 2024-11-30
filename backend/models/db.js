const mongoose =require('mongoose');

const MONGODB_URI=process.env.MONGODB_URL

mongoose.connect(MONGODB_URI)
      .then(()=>{
            console.log("mongodb connected");
      }).catch((err)=>{
        console.log("error occured in mongodb connection",err);
      })