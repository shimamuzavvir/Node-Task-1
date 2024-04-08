import express from "express";
import { format } from "date-fns";
import fs from "fs";

const app = express();
const PORT = 4000;


app.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:blue">WELCOME</h1>`)
})

// Endpoint for writing timestamp data
app.get('/write', (req, res) => {
    let today = format(new Date(), 'dd-mm-yyyy-hh=mm-ss');
    const filePath = `./Timestamps/${today}.txt`;
    fs.writeFileSync(filePath, `${today}`, 'utf8');
    res.status(200).send(`<h1 style="text-align: center;">Current TimeStamp: ${today}</h1><h3 style="text-align: center;">Timestamp data has been successfully saved to a folder named (TimeStamp) Change the endpoint to /read to retrieve all Timestamp data.</h3>`);
});

// Endpoint for reading all timestamp data
app.get('/read', (req, res) => {
    let timestamps = [];
    fs.readdirSync('./Timestamps').forEach(file => {
        timestamps.push(file);
    });
    res.status(200).json({ timestamps });
});

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
