const express=require("express")
const app = express()
const mongoose=require("mongoose")
const bodyParser = require("body-parser");
const Users=require("./data")
const Inventery=require("./inventerydata")
const Form=require("../models/form")
const port = 3000
const DB="mongodb+srv://shivam:ft12shivam12@cluster0.xlfgmkt.mongodb.net/?retryWrites=true&w=majority"


mongoose.connect(DB,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("connection successful")
}).catch((err)=>console.log("err"))

///
app.use(express.json());
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use(bodyParser.json())


//

app.get("/",(req,res)=>{

        res.render("user.ejs",{
            userlist:Users
        })
 
  })


  app.get("/inventery",(req,res)=>{

    res.render("inventery.ejs",{
        userlist:Inventery
    })

})



app.get("/form",(req,res)=>{
    Form.find({},function(err,user){
        res.render("order.ejs",{
            userlist:user
        })
    })
 
 
  })

app.get("/formpost",(req,res)=>{
    //  res.status(200).send("Hello world")
     res.render("form.ejs")
  })


app.post('/formpost', function (req, res) {
   try{
    var new_form = new Form({
        customer_Id:req.body.customer_Id,
        Inventery_id:req.body.Inventery_id,
         item_name:req.body.item_name,
         quantity:req.body.quantity,
    })
 
if(req.body.customer_Id){
    Users.id == req.body.customer_Id;
}
if(req.body.Inventery_id){
    Inventery.id == req.body.Inventery_id;
}
if(req.body.item_name){
  Inventery.itemname == req.body.item_name;
}
if(req.body.quantity){
    Inventery.quantity> req.body.quantity;
}

   console.log(new_user)
    new_form.save()
    res.redirect("/form")

}   catch (e) {
    res.status(400).json({
        status: "Failure",
        message: e.message
    })
}
});

  app.listen(port, () => console.log(`App listening on port ${port}!`))