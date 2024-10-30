const express = require("express");
const router = express.Router();
const Url = require("../database/shortUrlData");
const shortid = require("shortid");

router.get("/", async (req, res) => {
  try {
    const allUrls = await Url.find();
    if (!allUrls) {
      return res.status(404).json({ msg: "Urls not found" });
    }

    return res.status(200).json(allUrls);
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
});

//* create new url
router.post("/newUrl", async (req, res) => {
  const { originalUrl, clicks = 0 } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ msg: "Please provide the original URL." });
  }

  try {
    const existUrl = await Url.findOne({ originalUrl });
    if (existUrl) {
      return res
        .status(409)
        .json({ msg: "This URL already exists. Please try another." });
    }

    const shortId = shortid.generate();
    const newUrl = new Url({ shortId, originalUrl, clicks });
    await newUrl.save();

    return res.status(201).json(newUrl);
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
});

//* show url page
router.get("/show_url_page/:shortId", async (req, res) => {
  const { shortId } = req.params;
  try {
    const existUrl = await Url.findOne({ shortId });
    if (!existUrl) {
      return res
        .status(404)
        .json({ msg: "This URL not exists. Please try another." });
    }
    return res.status(200).json(existUrl);
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
});

//* when click url then increse clicks
router.put("/count-clicks/:shortId", async (req, res) => {
  const { shortId } = req.params;
  try {
    const urlData = await Url.findOne({ shortId });
    if (!urlData) {
      return res.status(404).json({ msg: "URL not found" });
    }

    urlData.clicks += 1;
    await urlData.save();

    return res.status(200).json(urlData);
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
});

module.exports = router;
