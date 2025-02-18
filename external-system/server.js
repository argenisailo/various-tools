require("dotenv").config();

const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

// Sample JSON data
const data = [
    { id: 1, name: "A", text: "Task A", people: "Argenis Lopez", status: "Listo" },
    { id: 2, name: "B", text: "Task B", people: "Argenis Lopez", status: "Estancado" },
    { id: 3, name: "C", text: "Task C", people: "Argenis Lopez", status: "En proceso" },
    { id: 4, name: "D", text: "Task D", people: "Argenis Lopez", status: "" }
];

// Webhook creation sample
const WEBHOOK_URL_CREATION = "https://api-gw.monday.com/automations/apps-events/473178466";
const webhookCreate = {
    "trigger": {
        "outputFields": {
        "boardId": 8050129513,
        "data": [
            { id: 1, name: "A", text: "Task A", people: "Argenis Lopez", status: "Listo" },
            { id: 2, name: "B", text: "Task B", people: "Argenis Lopez", status: "Estancado" },
            { id: 3, name: "C", text: "Task C", people: "Argenis Lopez", status: "En proceso" },
            { id: 4, name: "D", text: "Task D", people: "Argenis Lopez", status: "" }
        ]
        }
    }
};

// Webhook updation sample
const WEBHOOK_URL_UPDATION = "https://api-gw.monday.com/automations/apps-events/473179231";
const webhookUpdate = {
    "trigger": {
        "outputFields": {
        "boardId": 8050129513,
        "data": [
            { id: 1, name: "AA", text: "Task AA", people: "Argenis Lopez", status: "" },
        ]
        }
    }
};

// Middleware to parse JSON
app.use(express.json());

// Function to send data to webhook
const sendCreationWebhook = async () => {
    try {
        const response = await axios.post(WEBHOOK_URL_CREATION, webhookCreate, {
            headers: {
                "Authorization": process.env.MONDAY_SIGNING_SECRET, //Monday App Signing Secret
                "Content-Type": "application/json"
            }
        });
        console.log(`✅ Webhook sent successfully: ${response.status}`);
    } catch (error) {
        console.error("❌ Error sending webhook:", error.message);
    }
};

// Endpoint to trigger webhook manually
app.post("/send-webhook-creation", async (req, res) => {
    await sendCreationWebhook();
    res.json({ message: "Webhook sent!" });
});

// Function to send data to webhook
const sendUpdationWebhook = async () => {
    try {
        const response = await axios.post(WEBHOOK_URL_UPDATION, webhookUpdate, {
            headers: {
                "Authorization": process.env.MONDAY_SIGNING_SECRET, //Monday App Signing Secret
                "Content-Type": "application/json"
            }
        });
        console.log(`✅ Webhook sent successfully: ${response.status}`);
    } catch (error) {
        console.error("❌ Error sending webhook:", error.message);
    }
};

// Endpoint to trigger webhook manually
app.post("/send-webhook-updation", async (req, res) => {
    await sendUpdationWebhook();
    res.json({ message: "Webhook sent!" });
});

// RestAPI route
app.get("/data", (req, res) => {
    res.json(data);
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Public API URL: Use the ngrok URL from your terminal`);

    // Send webhook when the server starts
    //sendWebhook();
});
