const { Router } = require("express");
const {
  getAllCountries,
  getByCode,
  postActivity,
  getActivity,
} = require("../controllers");
const router = Router();

router.get("/countries", getAllCountries);
router.get("/countries/:id", getByCode);
router.post("/activities", postActivity);
router.get("/activities", getActivity);
module.exports = router;
