const weeklyGoalUpdateTemplate = require("./emailTemplates/weeklyGoalUpdateTemplate");
const goalDueTemplate = require("./emailTemplates/goalDueTemplate");

const buildEmailNotification = (notification, dueDateReached) => {
  const { email } = notification;
  let emailData;
  if (dueDateReached) {
    emailData = goalDueTemplate(notification);
  } else {
    emailData = weeklyGoalUpdateTemplate(notification);
  }

  const { html, text, subject } = emailData;
   
  return { recipientEmails: [email], htmlContent: html, rawContent: text, subject };
};

module.exports = {
  buildEmailNotification
}
