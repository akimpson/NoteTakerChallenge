const express = require("express");

//const port = process.env.port || 3000;
const app = express();
const apiroutes = require("./routes/apiroutes");
const htmlRoutes = require("./routes/htmlRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use("/api", apiroutes);
app.use("/", htmlRoutes);

app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
  console.log("Server is running.");
});
