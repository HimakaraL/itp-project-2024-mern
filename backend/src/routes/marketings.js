const router = require("express").Router();
const { request, response } = require("express");
let Marketing = require("../models/Marketing.js");

//add
router.route("/add").post((request, response) => {
  const expenseDate = new Date(request.body.expenseDate);
  const expenseCategory = request.body.expenseCategory;
  const expenseDescription = request.body.expenseDescription;
  const expenseAmount = Number(request.body.expenseAmount);
  const expenseDuedate = new Date(request.body.expenseDuedate);

  const newMarketing = new Marketing({
    expenseDate,
    expenseCategory,
    expenseDescription,
    expenseAmount,
    expenseDuedate,
  });
  newMarketing
    .save()
    .then(() => {
      response.json("New service added!");
    })
    .catch((error) => {
      console.log(error);
    });
});

//retreive
router.route("/all").get((request, response) => {
  Marketing.find()
    .then((marketings) => {
      response.json(marketings);
    })
    .catch((error) => {
      console.log(error);
    });
});

//update
router.route("/update/:id").put(async (request, response) => {
  let marketingid = request.params.id;
  const expenseDate = new Date(request.body.expenseDate);
  const expenseCategory = request.body.expenseCategory;
  const expenseDescription = request.body.expenseDescription;
  const expenseAmount = Number(request.body.expenseAmount);
  const expenseDuedate = new Date(request.body.expenseDuedate);

  const updatemarketing = {
    expenseDate,
    expenseCategory,
    expenseDescription,
    expenseAmount,
    expenseDuedate,
  };
  const update = await Marketing.findByIdAndUpdate(marketingid, updatemarketing)
    .then(() => {
      response.status(200).send({ status: "Marketing updated!" });
    })
    .catch((error) => {
      console.log(error);
      response.status(214).send({ status: "Error while updating" });
    });
});

//delete
router.route("/delete/:id").delete(async (request, response) => {
  let marketingid = request.params.id;

  await Marketing.findByIdAndDelete(marketingid)
    .then(() => {
      response.status(200).send({ status: "Successfully deleted!" });
    })
    .catch((error) => {
      console.log(error);
      response.status(210).send({ status: "Deletion unsuccessful!" });
    });
});

module.exports = router;
