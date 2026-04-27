const express = require("express");
const cors = require("cors");
const habitsRoutes = require("./routes/habitsRoutes");
const notesRoutes = require('./routes/notesRoutes');



const app = express();
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/habits", habitsRoutes);
app.use('/notes', notesRoutes);

const PORT = 5001;
// اضافه کردن 0.0.0.0 باعث می‌شود بک‌اند روی شبکه داخلی در دسترس قرار بگیرد
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running on network port ${PORT}`);
});
