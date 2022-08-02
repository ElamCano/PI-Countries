const { Activity, Country, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Country model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Country.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Country.create({
          name: "",
        })
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Country.create({
          name: "Colombia",
        });
      });
    });
  });
  describe("Validators", () => {
    beforeEach(() => Activity.sync({ force: true }));
    describe("name", () => {
      it("should throw an error when duration is more than 300 minutes", (done) => {
        Activity.create({
          name: "Sky",
          dificulty: 4,
          duration: 350,
          season: "Winter",
        })
          .then(() => done(new Error("duration cant be more than 300 minutes")))
          .catch(() => done());
      });
      it("should work when difficulty is between 1 and 5", () => {
        Activity.create({
          name: "Kayak",
          dificulty: 3,
          duration: 350,
          season: "Summer",
        });
      });
    });
  });
});
