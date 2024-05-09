const footerTemplate = require("./footerTemplate");
const headerTemplate = require("./headerTemplate");

const weeklyGoalUpdateTemplate = (notification) => {
  const { name, goalName, dueDate } = notification;
  const dueDateString = new Date(dueDate).toDateString();
  const firstName = name.split(' ')[0];
  const title = "Your weekly goal progress check-in";
  const subject = "Keep Pushing Forward! Your Weekly Goal Progress Check-in 🚀";
  const text =
    `I hope this message finds you well and motivated! As part of our commitment to your success, here's your weekly 
    reminder to keep your momentum going and stay focused on your goal: ${goalName} with the due date: ${dueDateString}`;
  const html = `
  ${headerTemplate(title, firstName)}
    <div>
      <p>I hope this message finds you well and motivated! As part of our commitment to your success, here's your weekly reminder to keep your momentum going and stay focused on your goal:</p>
      <p><strong>Goal:</strong> ${goalName}<br /><strong>Due Date:</strong> ${dueDateString}</p>
      <p>Here's a quick check-in:</p>
      <ul>
        <li>How close are you to achieving this goal?</li>
        <li>What steps can you take this week to bring you closer to success?</li>
        <li>Are there any obstacles that you're facing? Remember, identifying challenges is the first step towards overcoming them.</li>
      </ul>
      <p>Remember, every little step counts. Here are a few tips to keep you motivated:</p>
      <ol>
        <li><strong>Review Progress:</strong> Take a few minutes to reflect on what you've accomplished towards your goal so far.</li>
        <li><strong>Celebrate Progress:</strong> Don't forget to celebrate the progress you've made, no matter how small.</li>
        <li><strong>Break It Down:</strong> If your goal feels overwhelming, break it down into smaller, more manageable tasks.</li>
      </ol>
      <p>We believe in you, ${firstName}! Your determination and hard work can turn this goal into a reality</p>
      <p>P.S. Don't forget to update your progress in Dojologs! Your future self will thank you. 🌟</p>
    </div>
    <div class="farewell zero-margin-bottom">
      <p>Best regards,<br />Dojologs team</p>
    </div>
  ${footerTemplate(false)}
`;
  return {
    text,
    html,
    subject,
  };
};

module.exports = weeklyGoalUpdateTemplate;
