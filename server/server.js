const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const userRouter = require('./routes/userRoutes')
const path = require('path');
const resetDailyCounts = require('./cronJobs');

// Initialize Express
const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 } // Max file size: 10 MB
}));

app.use(cors({
    origin: true,
    methods: 'GET,POST,PUT,DELETE,PATCH',
    credentials: true,
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/app", (req, res) => {
    const userAgent = req.headers["user-agent"].toLowerCase();
    console.log("User-Agent:", userAgent);
    console.log("Query Parameters:", req.query);

    const iosLink = req.query.ios || "#";
    const androidLink = req.query.android || "#";
    const windowsLink = req.query.windows || "#";
    const macLink = req.query.mac || "#";

    if (userAgent.includes("iphone") || userAgent.includes("ipad")) {
        res.redirect(iosLink);
    } else if (userAgent.includes("android") && !userAgent.includes("windows")) {
        res.redirect(androidLink);
    } else if (userAgent.includes("windows")) {
        res.redirect(windowsLink);
    } else if (userAgent.includes("macintosh")) {
        res.redirect(macLink);
    } else {
        res.send("Unsupported device");
    }
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((error) => {
        console.log('Error:', error);
    });

app.use('/api', userRouter);


app.use(express.static(path.join(__dirname, '..', 'admin', 'dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'admin', 'dist', 'index.html'))
})
// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    resetDailyCounts();
});
