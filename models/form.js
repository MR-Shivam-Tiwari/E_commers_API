const mongooose = require('mongoose');


const FormSchema = new mongooose.Schema({
    
    customer_Id:Number,
   Inventery_id:Number,
    item_name:String,
    quantity:Number,

    
})

const Form = mongooose.model('Form', FormSchema);



module.exports = Form;