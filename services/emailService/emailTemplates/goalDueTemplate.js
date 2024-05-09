const footerTemplate = require("./footerTemplate");
const headerTemplate = require("./headerTemplate");

const goalDueTemplate = (notification) => {
  const { name, goalName } = notification;
  const firstName = name.split(' ')[0];
  const title = "Goal due date!";
  const subject = "Today's the Day! Your Goal Due Date Has Arrived 🎉";
  const text =
    `Today is a significant day - it's the due date for your goal: ${goalName}! We hope this journey has been inspiring and transformative for you.
    Whether you've fully achieved your goal or made significant strides, Cheers to your perseverance and hard work, ${firstName}! `;
  const html = `
  ${headerTemplate(title, firstName)}
    <div>
      <p>Today is a significant day - it's the due date for your goal: ${goalName}! We hope this journey has been inspiring and transformative for you.</p>
      <p><strong>Reflect on Your Journey:</strong></p>
      <ul>
        <li><strong>Goal Achieved:</strong> Have you crossed the finish line? If yes, take a moment to savor this achievement! 🌟</li>
        <li><strong>Learning Points:</strong> Regardless of the outcome, there's always something valuable to learn. What insights have you gained?</li>
        <li><strong>Challenges Overcome:</strong> Reflect on the hurdles you've encountered and how you've dealt with them. Every challenge you've overcome has contributed to your growth.</li>
      </ul>
      <p><strong>Next Steps:</strong></p>
      <ul>
        <li><strong>Celebrate Your Progress:</strong> Whether you've fully achieved your goal or made significant strides, it's important to celebrate your hard work and dedication.</li>
        <li><strong>Review and Reset:</strong> If there are tasks left unfinished, consider why and how you can approach them differently. It might be time to set a new goal!</li>
        <li><strong>Share Your Experience:</strong> Consider sharing your journey with friends, family, or fellow Dojologs users. Your story could inspire others!</li>
      </ul>
      <p><strong>We're Here for You:</strong></p>
      <p>
        Remember, Dojologs is more than just an app; it's a community. Whether you're celebrating a victory or facing setbacks, we're here to support you on your path to success.
        <br /><br />
        Cheers to your perseverance and hard work, ${firstName}! We're excited to see what you'll tackle next.
      </p>
      <p>P.S. Ready for the next challenge? Log in to Dojologs to set your new goal and continue your journey to success! 🚀</p>
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

module.exports = goalDueTemplate;
