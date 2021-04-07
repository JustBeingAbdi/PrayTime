let adhan = require("adhan");
let express = require("express");
let moment = require("moment");

let app = express();



app.get("/", async(req,res) => {
    res.send("Api Is Online, Mashallah");
})


app.get("/prayer/current", async(req,res) => {
    let cordinatesQuery = req.query.cord + ''.replace("%20", " ").replace("+", " ").split(" ");
    let dateQuery = req.query.date + ''.replace("%20", " ").split(" ");

    if(!cordinatesQuery || !dateQuery) return res.status(404).send("Invalid Query's");

    let cordinates = adhan.Coordinates(cordinatesQuery[0], cordinatesQuery[1]);
    let date = new Date(date[0], date[1], date[2]);
    var params = adhan.CalculationMethod.MuslimWorldLeague();
    params.madhab = adhan.Madhab.Shafi;
    params.polarCircleResolution = adhan.PolarCircleResolution.AqrabYaum;
    params.adjustments.fajr = 2;

    let prayerTimes = new adhan.PrayerTimes(cordinates, date, params);

    res.send(prayerTimes.currentPrayer);
})