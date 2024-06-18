const router = require("express").Router();
const Feedback = require("../models/feedback");

// Route for adding feedback
router.post("/addFeedback", async (req, res) => {
    const { name, email, rating, service, feedback, date } = req.body;

    const currentDate = date || new Date();
    const newFeedback = new Feedback({
        name,
        email,
        rating,
        service,
        feedback,
        date: currentDate,
        user_id:req.user._id
    });

    try {
        await newFeedback.save();
        res.json("Feedback added");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error adding feedback" });
    }
});

// Route for updating feedback
router.route("/updateFeedback/:id").put(async (req, res) => {
    try {
      const { id } = req.params;
  
      const result = await Feedback.findByIdAndUpdate(id, req.body, { new: true });
  
      if (!result) {
        return res.status(404).json({ message: "Feedback not found" });
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });

// Route for deleting feedback
router.route("/deleteFeedback/:id").delete(async (req, res) => {
    try {
      const { id } = req.params;
  
      await Feedback.findByIdAndDelete(id)
        .then(() => {
          return res
            .setMaxListeners(200)
            .send({ message: "feedback deleted successfully" });
        })
        .catch(() => {
          return res.status(404).json({ message: "Client not found" });
        });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });


//Route for get specific feedback
router.route("/getFeedback/:id").get(async (req, res) => {
    try {
      const { id } = req.params;
  
      await Feedback.findById(id)
        .then((feedback) => {
          return res.status(200).json(feedback);
        })
        .catch(() => {
          return res.status(404).json({ message: "feedback not found" });
        });
    } catch (err) {
      console.timeLog(err.message);
      res.status(500).send({ message: err.message });
    }
  });

// Route for getting all feedback
router.get("/allFeedback", async (req, res) => {
  const user_id=req.user._id
    try {
        const feedbacks = await Feedback.find({user_id});
        res.json(feedbacks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching feedback" });
    }
});
router.get("/", async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.json(feedbacks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching feedback" });
    }
});

//Route for rejected feedbacks
router.route("/rejectFeedback/:id").delete(async (req, res) => {
  try {
    const { id } = req.params;

    await Feedback.findByIdAndDelete(id)
      .then(() => {
        return res
          .setMaxListeners(200)
          .send({ message: "feedback deleted successfully" });
      })
      .catch(() => {
        return res.status(404).json({ message: "Client not found" });
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


module.exports = router;