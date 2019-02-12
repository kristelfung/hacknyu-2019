import * as admin from "firebase-admin";
import * as sgMail from "@sendgrid/mail";

import { getRejectedUsersData } from "./index";
import renderRejectedEmail from "./RejectedEmail";

// invoked manually; add API_KEY to env with your key
export const sendRejectionEmail = () => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const db = admin.firestore();
  const auth = admin.auth();
  const messages = [];

  return getRejectedUsersData()
    .then((rejectedUsersData: object) => {
      let emails = Object.entries(rejectedUsersData)
        .map(([uid, data]) => data.email)
        .filter(email => !!email);

      const msg = {
        to: emails,
        from: "confirm@hacknyu.org",
        subject: "Update on Your Admission Status",
        text: "Update on your HackNYU Admission status",
        html: renderRejectedEmail("")
      };

      console.log(emails);
      console.log(emails.length);
      return sgMail.send(msg, true);
    })
    .then(() => console.log("SENT"))
    .catch(err => console.error(err.response.body));
};

sendRejectionEmail();
