const multer= require('multer');
const {CloudinaryStorage}=require('multer-storage-cloudinary')
const cloudinary =require('cloudinary').v2;

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

//storage 

const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'uploads',
        format:async(req,file)=>'png',
      //*  format: async (req, file) => {
           // return file.mimetype.split('/')[1];  // Dynamically use the file's MIME type format (jpeg, png, etc.)
        //},
        public_id:(req,file)=>file.originalname.split('.')[0]+""
    },
});

const cloudinaryFileUploader=multer({storage:storage});

module.exports={
    cloudinaryFileUploader
}
