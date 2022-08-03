const { Router } = require("express");
const router = Router();
const {
  getAllCountries,
  getByCode,
  postActivity,
  getActivity,
} = require("../controllers");

router.get("/countries", getAllCountries);
router.get("/countries/:id", getByCode);
router.post("/activities", postActivity);
router.get("/activities", getActivity);
module.exports = router;
