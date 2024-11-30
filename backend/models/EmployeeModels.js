const mongoose=require('mongoose');
const Schema =mongoose.Schema;

const EmployeeSchema = new Schema({
    name:{
       type: String,
       required:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    phone:{
       type: String,
       required:true
    },
    department:{
        type:String,
        require:true,
        unique:true
    },
    salary:{
       type: Number,
       required:true
    },
    profileImage:{
        type:String,
        require:false,
        
    },
    CreatedAt:{
       type: Date,
       default:new Date()
    },
    updatedAt:{
        type:Date,
        default:new Date()
    }


});

const EmployeeModel=mongoose.model('employees',EmployeeSchema);
module.exports=EmployeeModel