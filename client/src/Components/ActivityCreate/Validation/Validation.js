export default function validation(arg) {
  let error = {};
  if (!arg.name) {
    error.name = "You must complete this field";
  } else if (parseInt(arg.name)) {
    error.name = "You must complete this field correctly";
  } else if (arg.dificulty < 1) {
    error.dificulty = "You must set the difficulty";
  } else if (arg.duration < 10) {
    error.duration =
      "You must complete this field, it can't be less than 10 minutes";
  } else if (arg.duration > 300) {
    error.duration =
      "You must complete this field, it can't be more than 300 minutes";
  } else if (arg.season === "") {
    error.season = "You must choose a season";
  } else if (arg.countriesId.length < 1) {
    error.countriesId = "You must choose at least one country";
  }
  return error;
}
