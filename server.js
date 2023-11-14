const express = require("express");
const app = express();
const Joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use(express.json());
const cors = require("cors");
app.use(cors());

const upload = multer({ dest: __dirname + "/public/images" });

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

let athletes = [{
    _id: 1, 
    name: "Michael Jordan", 
    sport: "Basketball",
    description: "A trash takling basketball genius who will challenge anybody on and off the court",
    awards: [
        "6x NBA Champion",
        "6x NBA Finals MVP",
        "5x NBA League MVP",
        "10x NBA Scoring Champion",
        "9x All-Defensive First Team",
        "14x All Star",
        "2x Olympic Gold Medalist",
    ],
},
{
    _id: 2,
    name:"Tom Brady",
    sport: "Football",
    description: "A natural born winner with high football IQ to back it up", 
    awards: [
        "7x Super Bowl Champion",
        "4x Super Bowl MVP",
        "14 Pro Bowls",
        "2007 Bert Bell Award (Player of the Year)",
    ],
},
{
    _id: 3,
    name: "Michael Phelps",
    sport: "Swimming",
    description: "A high decorated olympian that will swim his way to victory",
    awards: [
        "Won 23 Olympic Gold Medal",
    ],
},
{
    _id: 4,
    name: "Deion Sanders",
    sport: "Baseball, Football ",
    description: "One of the most talented athletes in the world. He can on the gridiron or the in the stadium",
    awards: [
        "6x All Pro Selections",
        "2x Super Bowl Champion",
        "1994 NFL Defensive Player of the Year",
        "Won the Jim Thorpe Award with Florida State University",
    ],
},
{
    _id: 5,
    name: "Serena Williams",
    sport: "Tennis",
    description: "A inspiration to female athletes who dominates the tennis court",
    awards: [
        "2013 Best Female Athlete ESPY Award",
        "73 titles in singles",
        "23 titles in doubles",
        "2 titles in mixed",
        "23 Grand Slam Singles Titles",
    ],
},
{
    _id: 6,
    name: "Lionel Messi",
    sport: "Soccer",
    description: "The most well-known athlete in the world. He is proof that hard work beats talent when talent doesn't work hard",
    awards: [
        "4x League Champion with FC Barcelona",
        "7x Copa del Rey with FC Barcelona",
        "Won the Beijing Olympic Games Gold Medal with Argentina",
        "2023 Leagues Cup with Inter Miami",
    ],
},
];

app.get("/api/athletes", (req,res) => {
    res.send(athletes);
});

app.post("/api/athletes", upload.single("img"), (req,res) =>{
    const result = validateAthlete(req.body);

    if (result.error) {
        res.send(400).send(result.error.details[0].message);
        return;
    }

    const athlete= {
        _id: athletes.length +1, 
        name: req.body.name,
        sport: req.body.sport,
        description: req.body.description,
        awards: req.body.award.split(",")
    }

    athletes.push(athlete);
    res.send(athletes);
});

const validateAthlete = (athlete) => {
    const schema = Joi.object({
        _id: Joi.allow(""),
        awards: Joi.allow(""),
        sport: Joi.allow(""),
        name: Joi.string().min(3).required(),
        description: Joi.string().min(3).required()
    });

    return schema.validate(athlete);
};

app.listen(3000, () =>{
    console.log("Let me Hear it");
});