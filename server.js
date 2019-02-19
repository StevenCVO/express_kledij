const express = require("express");
const cors = require("cors");

const { producten } = require("./producten");

const app = express();

// CORS pakket toevoegen als middleware
app.use(cors());

app.get("/", (req, res) => {
    res.send("Dank u voor de aanvraag!");
});

app.get("/producten", (req, res) => {
    res.send(producten);
});

app.get("/producten/:id", (req, res) => {
    const product = producten.find(product => {
        // Om het id uit het pad vast te krijgen
        // gebruiken we het params object uit het
        // request object (req)
        return product.id === +req.params.id;
    });

    if (!product) {
        res.status(404).send("Product niet gevonden");
    }
    
    res.send(product);
})

app.get("*", (req, res) => {
    res.status(404).send("Ongeldig eindpunt");    
})

app.listen(3333, () => {
    console.log(`Server runt op poort 3333`);
});