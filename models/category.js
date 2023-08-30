const mongoose= require("mongoose");
// test schema for crud
const dataStructurerTest= new mongoose.Schema({
    name:String,
    category:String
})
const structureExported = mongoose.model("structureExported", dataStructurerTest)
module.exports=structureExported;
// test schema for crud

const categories = new mongoose.Schema({
    category:{
        type: String,
        enum:["red", "yellow", "green"],
        required:true
    },
    description:String,
    show:{
        type:String,
        enum:["yes","no"],
        default:"yes"
    }
})

const structureCategory = mongoose.model("structureCategory", categories);
module.exports=structureCategory;