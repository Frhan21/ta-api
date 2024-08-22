const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');

const app = express(); 
app.use(bodyParser.json())
app.use(express.json()); 
app.get("/", (req, res) => res.send("Express on Vercel"));

app.use('/api', routes); 

const PORT = 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})