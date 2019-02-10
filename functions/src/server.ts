import * as express from "express";
import renderAdmittedEmail from "./AdmittedEmail";
import renderReminderEmail from "./ReminderEmail";

const app = express();
const port = 3000;

app.get("/admitted", (req, res) => res.send(renderAdmittedEmail("Nicholas")));
// Create the RejectedEmail file and import renderRejectedEmail here!
//app.get("/rejected", (req, res) => res.send(renderRejectedEmail()))
app.get("/reminder", (req, res) => res.send(renderReminderEmail()));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
