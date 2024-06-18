const router = require("express").Router();
let maintain  = require("../models/maintain");
const requireAuth = require("../middleware/requireAuth");

router.route("/add").post(requireAuth,async(req,res)=>{  //calling backend URL for create

    const {Equipment_name, Description,Maintenance_type,Sheduled_date,Status,Technician} = req.body;

    const newmaintain=new maintain({

        Equipment_name,
        Description,
        Maintenance_type,
        Sheduled_date,
        Status,
        Technician,
        })

    newmaintain.save().then(()=>{   //exception handling
        res.json("Record Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{ //calling backend URL for Read
   
    maintain.find().then((maintains)=>{   //exception handling
        res.json(maintains)
    }).catch((err)=>{
        console.log(err);
    })

})


router.route("/update/:id").put(async(req,res)=>{ //update operation
    let maintainID=req.params.id; //pass maintain id as parameter
    const {Equipment_name, Description,Maintenance_type,Sheduled_date,Status,Technician} = req.body;

    const newmaintain = {
        Equipment_name,
        Description,
        Maintenance_type,
        Sheduled_date,
        Status,
        Technician,
    };

    try {
        const update = await maintain.findByIdAndUpdate(maintainID, newmaintain, { new: true, omitUndefined: true });
        if (!update) {
            return res.status(404).send({ status: "error", error: "Record not found" });
        }
        res.status(200).send({ status: "Record updated", data: update });
    } catch (err) {
        res.status(500).send({ status: "error with updating data", error: err.message });
    }
});


router.route("/delete/:id").delete(async(req,res) => {  // delete operation
    let maintainID=req.params.id;

    await maintain.findByIdAndDelete(maintainID).then(()=>{
        res.status(200).send({status:"Record deleted"})  // 200= responce code for succuess server message
    }).catch(()=>{
        res.status(500).send({status:"error with deleting data"}) // 500= responce code for  server error message
    });

})

router.route("/get/:id").get(async(req,res) => {//get only one maintain details
    let id=req.params.id
    const resData = await maintain.findById( id ).then((data) => {
        
        res.status(200).send(data)  // 200= responce code for succuess server message
    }).catch(()=>{
        console.log(err.massage);
        res.status(500).send({status:"error with get maintain", error: err.message}) // 500= responce code for  server error message
    });
})

router.route("/search").get(async (req, res) => {//search filter
    const { query } = req.query;
    try {
      const results = await maintain.find({
        $or: [
          { Equipment_name: { $regex: query, $options: "i" } }, 
          { Description: { $regex: query, $options: "i" } }, 
          { Maintenance_type: { $regex: query, $options: "i" } }, 
          { Sheduled_date: { $regex: query, $options: "i" } }, 
          { Status: { $regex: query, $options: "i" } }, 
          { Technician: { $regex: query, $options: "i" } }, 
         
        ],
      });
      res.status(200).json(results);
    } catch (err) {
      res.status(500).send({ status: "error with searching data", error: err.message });
    }
  });


module.exports=router;