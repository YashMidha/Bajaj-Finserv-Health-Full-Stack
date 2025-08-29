import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
const PORT = 3000;

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

const FULL_NAME = "yash_midha"; 
const DOB = "14062003"; 
const EMAIL = "yashmidha14715@gmail.com";
const REG_NUMBER = "22BDS0440";

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data || [];

    let odd = [];
    let even = [];
    let alphabets = [];
    let specials = [];
    let sum = 0;

    data.forEach(item => {
      if (!isNaN(item)) {
        let num = parseInt(item);

        if (num % 2 === 0) {
          even.push(item);
        } else {
          odd.push(item);
        }
        sum += num;
      } 
      
      else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } 

      else {
        specials.push(item);
      }
    });

    let concat = alphabets.join("");
    let reversed = concat.split("").reverse();
    let altCaps = reversed.map((char, i) =>
      i % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
    ).join("");

    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: REG_NUMBER,
      odd_numbers: odd,
      even_numbers: even,
      alphabets: alphabets,
      special_characters: specials,
      sum: sum.toString(),
      concat_string: altCaps
    });

  } 
  catch (err) {
    res.status(500).json({ is_success: false, message: err.message });
  }
});

app.listen(PORT, () =>  { 
    console.log(`Server running on ${PORT}`)
});