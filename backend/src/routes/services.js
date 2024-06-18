const router = require("express").Router();
const { request, response } = require("express");
let Service = require("../models/Service.js");

//add service
router.route("/add").post((request, response) => {

    const sname = request.body.sname;
    const availability = Number(request.body.availability);
    const type = request.body.type;
    const description = request.body.description;
    const status = request.body.status;
    const icon = request.body.icon;

    const newService = new Service({

        sname,
        availability,
        type,
        description,
        status,
        icon
    })
    newService.save().then(() => {
        response.json("New service added!");
    }).catch((error) => {
        console.log(error);
    })
})

//retreive all services
router.route("/all").get((request, response) => {

    Service.find().then((services) => {
        response.json(services)
    }).catch((error) => {
        console.log(error);
    })
})

//update a service
router.route("/update/:id").put(async (request, response) => {

    let serviceid = request.params.id;
    const sname = request.body.sname;
    const availability = Number(request.body.availability);
    const type = request.body.type;
    const description = request.body.description;
    const status = request.body.status;

    const updateservice = {
        sname,
        availability,
        type,
        description,
        status
    }
    const update = await Service.findByIdAndUpdate(serviceid, updateservice)
    .then(() => {
        response.status(200).send({status: "Service updated!"});
    }).catch((error) => {
        console.log(error);
        response.status(214).send({status: "Error while updating"});
    })
})

//delete a service
router.route("/delete/:id").delete(async (request, response) => {
    
    let serviceid = request.params.id; 

    await Service.findByIdAndDelete(serviceid)
    .then(() => {
        response.status(200).send({status: "Successfully deleted the active service"});
    }).catch((error) => {
        console.log(error);
        response.status(210).send({status: "Deletion unsuccessful!"});  
    });
});

//get one service
router.route("/get/:id").get(async (request, response) => {
    let serviceid = request.params.id;
    await Service.findById(serviceid)
    .then((service) => {
        response.status(200).send(service);
    }).catch((error) => {
        console.log(error);
        response.status(206).send({status: "service fetching unsuccess!"});
    })
})

module.exports = router;