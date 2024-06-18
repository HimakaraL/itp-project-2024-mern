const router = require("express").Router();
let Reservation = require("../models/Reservation");
const requireAuth = require("../middleware/requireAuth")

router.route("/create-reservation").post(requireAuth,async (req, res) => {
  try {
    if (
      !req.body.clientName ||
      !req.body.clientEmail ||
      !req.body.contactNumber ||
      !req.body.eventType ||
      !req.body.eventDescription ||
      !req.body.eventDate ||
      !req.body.venueLocation ||
      !req.body.paymentAmount
    ) {
      return res.status(400).send({
        message:
          "Send all required fields: name, nic, address, gender, contactNo, email",
      });
    }
    const newReservation = {
      clientName: req.body.clientName,
      clientEmail: req.body.clientEmail,
      contactNumber: req.body.contactNumber,
      eventType: req.body.eventType,
      eventDescription: req.body.eventDescription,
      eventDate: req.body.eventDate,
      venueLocation: req.body.venueLocation,
      receipt: req.body.receipt,
      paymentAmount: req.body.paymentAmount,
      user_id:req.user._id
    };
    
    const reservation = await Reservation.create(newReservation);

    return res.status(201).send(reservation);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

router.route("/all-reservations").get(async (req, res) => {
  const user_id=req.user._id
  try {
    const reservations = await Reservation.find({});
    res.send(reservations);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
  
});

router.route("/update-reservation/:id").patch(async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Reservation.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.send(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


router.route("/delete-reservation/:id").delete(async (req, res) => {
  try {
    const { id } = req.params;

    await Reservation.findByIdAndDelete(id)
      .then(() => {
        return res
          .setMaxListeners(200)
          .send({ message: "Client deleted successfully" });
      })
      .catch(() => {
        return res.status(404).json({ message: "Client not found" });
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.route("/reservation/:id").get(async (req, res) => {
  try {
    const { id } = req.params;

    await Reservation.findById(id)
      .then((reservation) => {
        return res.status(200).json(reservation);
      })
      .catch(() => {
        return res.status(404).json({ message: "Client not found" });
      });
  } catch (err) {
    console.timeLog(err.message);
    res.status(500).send({ message: err.message });
  }
});

router.route("/pending-reservations").get(async (req, res) => {
  try {

    await Reservation.find({ reservationStatus: 'pending' })
      .then((reservation) => {
        return res.status(200).json(reservation);
      })
      .catch(() => {
        return res.status(404).json({ message: "Client not found" });
      });
  } catch (err) {
    console.timeLog(err.message);
    res.status(500).send({ message: err.message });
  }
});

router.route("/approved-reservations").get(async (req, res) => {
  try {

    await Reservation.find({ reservationStatus: 'approved' })
      .then((reservation) => {
        return res.status(200).json(reservation);
      })
      .catch(() => {
        return res.status(404).json({ message: "Client not found" });
      });
  } catch (err) {
    console.timeLog(err.message);
    res.status(500).send({ message: err.message });
  }
});

router.route("/cancelled-reservations").get(async (req, res) => {
  try {

    await Reservation.find({ reservationStatus: { $in: ['cancelled', 'deleted'] } })
      .then((reservation) => {
        return res.status(200).json(reservation);
      })
      .catch(() => {
        return res.status(404).json({ message: "Client not found" });
      });
  } catch (err) {
    console.timeLog(err.message);
    res.status(500).send({ message: err.message });
  }
});


router.route("/search-pending").get(async (req, res) => {
  const { query } = req.query;
  try {
    const results = await Reservation.find({
      $and: [
        {
          $or: [
            { clientName: { $regex: query, $options: "i" } },
            { clientEmail: { $regex: query, $options: "i" } },
            { contactNumber: { $regex: query, $options: "i" } },
            { eventType: { $regex: query, $options: "i" } },
            { eventDescription: { $regex: query, $options: "i" } },
            { eventDate: { $regex: query, $options: "i" } },
            { venueLocation: { $regex: query, $options: "i" } },
            { reservationStatus: { $regex: query, $options: "i" } }
          ]
        },
        { reservationStatus: "pending" }
      ]
    });
    res.status(200).json(results);
  } catch (err) {
    res.status(500).send({ status: "error with searching data", error: err.message });
  }
});

router.route("/search-cancelled").get(async (req, res) => {
  const { query } = req.query;
  try {
    const results = await Reservation.find({
      $and: [
        {
          $or: [
            { clientName: { $regex: query, $options: "i" } },
            { clientEmail: { $regex: query, $options: "i" } },
            { contactNumber: { $regex: query, $options: "i" } },
            { eventType: { $regex: query, $options: "i" } },
            { eventDescription: { $regex: query, $options: "i" } },
            { eventDate: { $regex: query, $options: "i" } },
            { venueLocation: { $regex: query, $options: "i" } },
            { reservationStatus: { $regex: query, $options: "i" } }
          ]
        }
      ]
    });
    res.status(200).json(results);
  } catch (err) {
    res.status(500).send({ status: "error with searching data", error: err.message });
  }
});

router.route("/search-approved").get(async (req, res) => {
  const { query } = req.query;
  try {
    const results = await Reservation.find({
      $and: [
        {
          $or: [
            { clientName: { $regex: query, $options: "i" } },
            { clientEmail: { $regex: query, $options: "i" } },
            { contactNumber: { $regex: query, $options: "i" } },
            { eventType: { $regex: query, $options: "i" } },
            { eventDescription: { $regex: query, $options: "i" } },
            { eventDate: { $regex: query, $options: "i" } },
            { venueLocation: { $regex: query, $options: "i" } },
            { reservationStatus: { $regex: query, $options: "i" } }
          ]
        },
        { reservationStatus: "approved" }
      ]
    });
    res.status(200).json(results);
  } catch (err) {
    res.status(500).send({ status: "error with searching data", error: err.message });
  }
});

router.route("/all-event-dates").get(async (req, res) => {
  try {
    const eventDates = await Reservation.find({}, 'eventDate');
    const dates = eventDates.map(reservation => reservation.eventDate);
    res.status(200).json(dates);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});


module.exports = router;
