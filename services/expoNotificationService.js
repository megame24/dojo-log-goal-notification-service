const buildExpoNotifications = (notification, dueDateReached) => {
  const { expoNotificationTokens, name, goalName, dueDate, logbookId, goalId } = notification;
  const firstName = name.split(' ')[0];
  const dueDateString = new Date(dueDate).toDateString();
  let notificationData;
  if (dueDateReached) {
    notificationData = {
      title: `Goal Due Today! 🎉`,
      body: `Today marks a significant milestone for your goal, ${goalName}, ${firstName}! Reflect on your journey, celebrate your progress, and think about the next steps. Your hard work is inspiring! 🌟 Ready for the next challenge? Log in to Dojologs to set your new goal`,
      data: {
        view: 'GOAL_SCREEN',
        payload: { goalId, logbookId }
      }
    }
  } else {
    notificationData = {
      title: `Weekly Goal Check-in! 🚀`,
      body:`Stay motivated with your goal, ${goalName}, due on ${dueDateString}. 🗓️ This week, reflect on your progress, celebrate your wins, and plan your next steps. Facing obstacles? Identifying them is your first step to overcoming.

Keep moving forward ${firstName}! every step brings you closer to success. Don't forget to update your progress in Dojologs!`,
      data: {
        view: 'LOGBOOK_SCREEN',
        payload: { logbookId }
      }
    }
  }

  const expoNotifications = expoNotificationTokens.map((token) => {
    return { token, notificationData };
  });

  return expoNotifications;
};

module.exports = {
  buildExpoNotifications
}
