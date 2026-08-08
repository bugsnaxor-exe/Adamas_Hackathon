const router = require("express").Router();
const veichle = require("./vehicle.model");
const mongoose = require("mongoose");

// router.get("/", (req, res) => {
//     let { pageNO } = req.query;
//     res.send(`Get all vehicles with page number ${pageNO}`);
//     veichle
//         .find()
//         .skip(pageNO * 10)
//         .limit(10)
//         .then((data) => {
//             res.json(data);
//         });
// });

module.exports = router;
