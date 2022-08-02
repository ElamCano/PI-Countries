/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Country, conn } = require("../../src/db.js");

const agent = session(app);
const country = {
  id: "ARG",
  name: "Argentina",
  img: "https://flagcdn.com/ar.svg",
  continent: "Americas",
  capital: "Buenos Aires",
  subregion: "South America",
  area: 2780400,
  population: 45376763,
};

describe("Country routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Country.sync({ force: true }).then(() => Country.create(country))
  );
  describe("GET /countries", () => {
    it("should get 200", () => agent.get("/countries").expect(200));
  });
  describe("GET /countries?name=Argentina", () => {
    it("should get 200", () =>
      agent.get("/countries?name=argentina").expect(200));
  });
  describe("GET /countries?name=SomeCountry Fallido", () => {
    it("should get 404", () => agent.get("/countries?name=sarasa").expect(404));
  });
  describe("GET /countries/:id", () => {
    it("should get 200", () => agent.get("/countries/COL").expect(200));
  });
});
