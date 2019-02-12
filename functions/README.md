# Functions

If you need to send emails, add the SendGrid key to `sendgrid.key` via:

https://firebase.google.com/docs/functions/config-env

You will also need to set your local environmental variable for `GOOGLE_APPLICATION_CREDENTIALS`, pointing to the json file with the credentials, in order for Firebase to work as expected.

Take care not to trigger the email functions more than needed!
