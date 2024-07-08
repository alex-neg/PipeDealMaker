const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
const cors = require("cors");

// Load env vars
dotenv.config({ path: "./config.env" });

// Init express app
const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(cors());

// Pipedrive API token, domain, URL
const apiToken = process.env.PIPEDRIVE_API_TOKEN;
console.log(apiToken);
const companyDomain = process.env.PIPEDRIVE_COMPANY_DOMAIN;
console.log(companyDomain);
const pipedriveURL = `https://${companyDomain}.pipedrive.com/api/v1/deals?api_token=${apiToken}`;

// API endpoint to create a new job in Pipedrive
app.post("/api/create-deal", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      email,
      jobType,
      jobSource,
      jobDescription,
      address,
      city,
      state,
      zipCode,
      region,
      startDate,
      startTime,
      endTime,
      testSelect,
    } = req.body;

    const dealData = {
      title: `${firstName}, ${lastName}`,
      "6d26bb0ff87689e5cb78b2cac3fdcdcfc55ed35b": firstName,
      "99fdc6288fa74a9c87df33516c12a50226488f4b": lastName,
      b0ebfd0446eea778f019fcf0d1cffffdd6830141: phone,
      "38c1e96721cb28663b823926ede4f1639db391fc": email,
      "8ef66774067325691175b176b0295932d80a0450": jobType,
      ede68c28cac3c31ac26ae2e64a27cd636a28314e: jobSource,
      "1b2a08f67d133783c3b3cdbb1dde3a278da9e86f": jobDescription,
      fa5a647d95d77d4f481a7c67d47e67e35f55cb51: address,
      ee8450b4b3be0cbe71669f87dc3c9861348b632c: city,
      d8ef0e1712b1f3f52443b6a3693f3ae5f8ccf7fd: state,
      "2ab456b2d8d88fe4c714346f0ae82384609fa063": zipCode,
      "18be866178a9249a2d991086540f94265e89f95e": region,
      "88f52abe48e9971c707795c1c17e998bc1098aec": startDate,
      "2f719495add209e99e98caac930a8ec647c979f7": startTime,
      "28a670c96bfd0bd1f06621847f1f8d514f344908": endTime,
      "48684124281febaf8e30bb891a32f2fecfc75a3d": testSelect,
    };

    console.log("Constructed dealData:", dealData);

    const response = await fetch(pipedriveURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dealData),
    });

    const result = await response.json();
    console.log("Response from Pipedrive API:", result);

    if (result.success) {
      res.json({ success: true });
    } else {
      res.json({ success: false, error: result.error });
    }
  } catch (error) {
    console.error(`Error creating deal: ${error}`);
    res.status(500).json({
      message: `Error creating deal: ${error.message}`,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}...`);
});
