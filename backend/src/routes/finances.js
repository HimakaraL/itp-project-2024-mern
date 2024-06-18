const router = require("express").Router();
let Finance = require("../models/Finance");
const requireAuth = require("../middleware/requireAuth");

router.route("/add").post(requireAuth, async (req, res) => {
  try {
    if (
      !req.body.transactionType ||
      !req.body.category ||
      !Number(req.body.amount) ||
      !Date(req.body.date) ||
      !req.body.paymentMethod ||
      !req.body.paymentStatus ||
      !req.body.description
    ) {
      return res.status(400).send({
        message:
          "Send all required fields: transactionType, category, amount, date, payementMethod, rpaymentStatus, location, description",
      });
    }
    
    const newFinance ={
        transactionType:req.body.transactionType,
        category:req.body.category,
        amount:req.body.amount,
        date:req.body.date,
        paymentMethod:req.body.paymentMethod,
        paymentStatus:req.body.paymentStatus,
        description:req.body.description,
        invoiceImage:req.body.invoiceImage
      };

    const finance = await Finance.create(newFinance);

    return res.status(201).send(finance);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

router.route("/").get(async (req, res) => {
  try {
    const finances = await Finance.find();
    const financesCount = await Finance.countDocuments();

    res.status(200).json({
      financesCount: financesCount,
      data: finances,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.route("/update/:id").patch(async (req, res) => {
  let invoiceID = req.params.id;
  const {
    transactionType,
    category,
    amount,
    date,
    paymentMethod,
    paymentStatus,
    description,
    invoiceImage,
  } = req.body;

  const updateFinance = {
    transactionType,
    category,
    amount,
    date,
    paymentMethod,
    paymentStatus,
    description,
    invoiceImage,
  };

  const update = await Finance.findByIdAndUpdate(invoiceID, updateFinance)
    .then(() => {
      res.status(200).send({ status: "Transactions Updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

router.route("/delete/:id").delete(async (req, res) => {
  let invoiceID = req.params.id;
  await Finance.findByIdAndDelete(invoiceID)
    .then(() => {
      res.status(200).send({ status: "Deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with delete data", error: err.message });
    });
});

router.route("/get/:id").get(async (req, res) => {
  let invoiceID = req.params.id;
  try {
    const finance = await Finance.findById(invoiceID);
    res.status(200).json(finance);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: "Error fetching data", error: err.message });
  }
});

//find by type
router.route("/all").get(async (req, res) => {
  let query = {};
  if (req.query?.transactionType) {
    query = { transactionType: req.query.transactionType };
  }
  try {
    const finances = await Finance.find(query);
    const financesCount = finances.length;

    res.status(200).json({
      financesCount: financesCount,
      data: finances,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.route("/search").get(async (req, res) => {
  const { query } = req.query;
  try {
    const results = await Finance.find({
      $or: [{ transactionType: { $regex: query, $options: "i" } }],
    });
    res.status(200).json(results);
  } catch (err) {
    res
      .status(500)
      .send({ status: "error with searching data", error: err.message });
  }
});

module.exports = router;
