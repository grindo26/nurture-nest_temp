const express = require('express');
const router = express.Router();
const data = require("../data");
const childCollection = data.child;
const helper = require('../helpers')
const { ObjectId } = require("mongodb");

router
      .route("/")
      .post(async (req, res) => {
            try {
                  let { name, age, sex, jobId, mealRequirements, vaccine, nannyId, appointments } = req.body;
                  const childCreated = await childCollection.createChild(name, age, sex, jobId, mealRequirements, vaccine, nannyId, appointments);
                  if (!childCreated) { throw "Couldn't create child"; }
                  return res.json(childCreated);
            } catch (e) { return res.status(404).json({ error: e }); }
      });
router
      .route('/:childId')
      .get(async (req, res) => {
            try {
                  const childFound = await childCollection.getChildById(req.params.childId);
                  if (!childFound) { throw "Child not found"; }
                  return res.json(childFound);
            } catch (e) { return res.status(404).json({ error: e }); }
      })
      .put(async (req, res) => {
            try {
                  let { name, age, sex, jobId, mealRequirements, vaccine, nannyId, appointments } = req.body;
                  const updatedChild = await childCollection.updateChild(req.params.childId, name, age, sex, jobId, mealRequirements, vaccine, nannyId, appointments);
                  if (!updatedChild) { throw "Couldn't update child"; }
                  res.json(updatedChild);
            } catch (e) { return res.status(400).json({ error: e }); }
      })
      .delete(async (req, res) => {
            try {
                  const childDeleted = await childCollection.removeChild(req.params.childId);
                  res.json({ Awesome: `child with id: ${req.params.childId} deleted successfully` });
            } catch (e) { return res.status(404).json({ error: e }); }
      });

      router
      .route("/vaccine/:childId")
      .get(async (req, res) => {
            childId = req.params.childId
            try {
                 await helper.validateInput(childId, "child Id")
                  await helper.onlyLettersNumbersAndSpaces(childId, "child Id")
                  if (!ObjectId.isValid(childId)) {
                        throw { statusCode: 400, message: "Child Id is not valid" };
                  }

            } catch (e) {
                  console.log(e)
                  return res.status(400).json({ error: e });
            }
            try {
                  const vaccineFound = await childCollection.getVaccines(childId);
                  if (!vaccineFound) { throw "Child not found"; }
                  return res.json(vaccineFound);
            } catch (e) {
                  console.log(e)
                  return res.status(404).json({ error: e });
            }
      })
      .post(async (req, res) => {
            childId = req.params.childId
            const postVaccine = req.body;
            try {
                  childId = await helper.execValdnAndTrim(childId, "Child Id");
                  if (!ObjectId.isValid(childId)) {
                        throw { statusCode: 400, message: "Child Id is not valid" };
                  }
                  await helper.execValdnAndTrim(postVaccine.name, "name")
                  await helper.onlyLettersNumbersAndSpaces(postVaccine.name, "name")
                  await helper.execValdnAndTrim(postVaccine.date, 'date')
                  await helper.isDateValid(postVaccine.date, "Date")
                  await helper.execValdnAndTrim(postVaccine.doses, 'Doses')
                  await helper.onlyNumbers(postVaccine.doses, 'doses')

            } catch (e) {
                  console.log(e)
                  return res.status(400).json({ error: e });
            }

            try {
                  const { name, date, doses } = postVaccine;
                  const vaccineAdded = await childCollection.addVaccine(name, date, doses, childId);
                  if (!vaccineAdded) { throw "Couldn't creatva" }
                  return res.json(vaccineAdded);
            } catch (e) {
                  console.log(e)
                  return res.status(404).json({ error: e });
            }
      });

router
      .route("/appointment/:childId")
      .get(async (req, res) => {
            childId = req.params.childId
            try {
                  childId = await helper.execValdnAndTrim(childId, "Child Id");
                  if (!ObjectId.isValid(childId)) {
                        throw { statusCode: 400, message: "Child Id is not valid" };
                  }

            } catch (e) {
                  console.log(e)
                  return res.status(400).json({ error: e });
            }


            try {
                  const appointmentFound = await childCollection.getAppointments(childId);
                  if (!appointmentFound) { throw "appointment not found"; }
                  return res.json(appointmentFound);
            } catch (e) {
                  console.log(e)
                  return res.status(404).json({ error: e });
            }
      })
      .post(async (req, res) => {
            childId = req.params.childId
            const postAppointment = req.body
            try {
                  childId = await helper.execValdnAndTrim(childId, "Child Id");
                  if (!ObjectId.isValid(childId)) {
                        throw { statusCode: 400, message: "Child Id is not valid" };
                  }
                  postAppointment.doctor = await helper.execValdnAndTrim(postAppointment.doctor, "doctor")
                  await helper.onlyLettersNumbersAndSpaces(postAppointment.doctor, "doctor")

                  postAppointment.hospital = await helper.execValdnAndTrim(postAppointment.hospital, "hospital")
                  await helper.onlyLettersNumbersAndSpaces(postAppointment.hospital, "hospital")

                  postAppointment.date = await helper.execValdnAndTrim(postAppointment.date, 'date')
                  await helper.isDateValid(postAppointment.date, "Date")


            } catch (e) {
                  console.log(e)
                  return res.status(400).json({ error: e });
            }

            try {
                  const { doctor, hospital, date, time } = postAppointment;
                  const appointmentAdded = await childCollection.addAppointment(doctor, hospital, date, time, childId);
                  if (!appointmentAdded) { throw "Couldn't create" }
                  return res.json(appointmentAdded);
            } catch (e) {
                  console.log(e)
                  return res.status(404).json({ error: e });
            }
      });

router
      .route("/vaccine/:vaccineId")
      .delete(async (req, res) => {
            const vaccId = req.params.vaccineId
            try {
                  await helper.execValdnAndTrim(vaccId, "Vaccine Id");
                  if (!ObjectId.isValid(vaccId)) {
                        throw { statusCode: 400, message: "Vaccine Id is not valid" };
                  }
            } catch (e) {
                  console.log(e)
                  return res.status(400).json({ error: e });
            }


            try {
                  const removedVaccine = await childCollection.removeVaccine(vaccId)
                  return res.status(200).json(removedVaccine);
            } catch (e) {
                  return res.status(500).json({ error: e });
            }
            //code here for DELETE
      })

router
      .route("/appointment/:appointmentId")
      .delete(async (req, res) => {
            const appointmentId = req.params.appointmentId
            try {
                  await helper.execValdnAndTrim(appointmentId, "Vaccine Id");
                  if (!ObjectId.isValid(appointmentId)) {
                        throw { statusCode: 400, message: "Appointment Id is not valid" };
                  }
            } catch (e) {
                  return res.status(400).json({ error: e });
            }
            try {
                  const removedAppointment = await childCollection.removeAppointment(appointmentId)
                  return res.status(200).json(removedAppointment);
            } catch (e) {
                  console.log(e, 'e')
                  return res.status(500).json({ error: e });
            }
            //code here for DELETE
      })

      router
      .route("/mealplan/:childId")
      .get(async (req, res) => {
            childId = req.params.childId
            try {
                  helper.validateInput(childId,"child Id")
                  helper.onlyLettersNumbersAndSpaces(childId, "child Id")
                  helper.isIdValid(childId)
                  const mealsFound = await childCollection.getMealPlans(childId);
                  if (!mealsFound) { throw "Meals not found"; }
                  return res.json(mealsFound);
                } catch (e) {
                  console.log(e)
                  return res.status(400).json({ error: e }); 
                }
      })

module.exports = router;