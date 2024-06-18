const router = require("express").Router();

let Rental = require("../models/Rental");

//Create order
router.route("/add").post((req, res) => {
   
    try {
        if (!req.body.equipment || !req.body.supName || !Number(req.body.quantity) || !Date(req.body.startDate) || !Date(req.body.endDate) || !Number(req.body.cost) || !req.body.status) {
            return res.status(400).send({
                message: "Send all required fields: equipment, supName, quantity, startDate, endDate, cost, status",
            });
        }

        const { equipment, supName, quantity, startDate, endDate, cost, status } = req.body;

        const newRental = new Rental({
            equipment,
            supName,
            quantity,
            startDate,
            endDate,
            cost,
            status
        });

        newRental.save().then(() => {
            res.json("Rental Added");
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error adding rental", error: err.message });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "Server Error", error: error.message });
    }
});

//Fetch all orders
router.route("/view").get(async (req, res) => {
    try {
      const rentals = await Rental.find();
      return res.status(200).json({
        count: rentals.length,
        data: rentals,
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ message: err.message });
    }
  });

//Update order
router.route("/update/:id").put(async (req, res) => {
    let rentId = req.params.id;
    const {equipment, supName, quantity, startDate, endDate, cost, status} = req.body;

    const updateRental = {
        equipment,
        supName,
        quantity,
        startDate,
        endDate,
        cost,
        status
    }

    const update = await Rental.findByIdAndUpdate(rentId, updateRental)
    .then(() => {
        res.status(200).send({status: "Rental Updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    })
});

//Delete order
router.route("/delete/:id").delete(async (req, res) => {
    let rentId = req.params.id;

    await Rental.findByIdAndDelete(rentId)
    .then(() => {
        res.status(200).send({status: "Rental Deleted"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with deleting rental", error: err.message});
    })

});

//Fetch a specific order
router.route("/get/:id").get(async (req, res) => {
    let rentId = req.params.id;

    const user = await Rental.findById(rentId)
    .then((rental) => {
        res.status(200).send({status: "Rental Fetched", rental})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with getting rental", error: err.message});
    })

});

//Search orders
router.route("/search").get(async (req, res) => {
    const { query } = req.query;
    try {
      const results = await Rental.find({
        $or: [
          { equipment: { $regex: query, $options: "i" } }, 
          { supName: { $regex: query, $options: "i" } },
          { status: { $regex: query, $options: "i" } },
        ],
      });
      res.status(200).json(results);
    } catch (err) {
      res.status(500)
      .send({ status: "error with searching data", error: err.message });
    }
  });

module.exports = router;
