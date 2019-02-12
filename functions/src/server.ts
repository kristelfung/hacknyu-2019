import * as express from "express";
import renderReminderEmail from "./ReminderEmail";
import renderAdmittedEmail from "./AdmittedEmail";
import renderRejectedEmail from "./RejectedEmail";
import { getRejectedUsersData } from "./index";

const app = express();
const port = 3000;

app.get("/admitted", (req, res) => res.send(renderAdmittedEmail("Nicholas")));
app.get("/rejected", (req, res) => res.send(renderRejectedEmail("")));
app.get("/rejected-users", (req, res) => {
  getRejectedUsersData().then(rejected => res.json(rejected));
});
app.get("/reminder", (req, res) => res.send(renderReminderEmail()));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
