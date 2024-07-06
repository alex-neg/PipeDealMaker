const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const dotenv = require("dotenv");

// Init express app
const app = express();
// Middleware to parse JSON
app.use(bodyParser.json());

// Pipedrive API token

const apiToken = process.env.PIPEDRIVE_API_TOKEN;
