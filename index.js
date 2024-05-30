const { SSMClient, GetParametersCommand } = require("@aws-sdk/client-ssm");
const { getNotifications, batchDeleteNotifications, batchUpdateNotifications } = require('./api');
const { areDatesEqual, addTimeToDate, getEndOfDay } = require('./services/dateService');
const { buildEmailNotification } = require('./services/emailService/emailService');
const { buildExpoNotifications } = require('./services/expoNotificationService');
const { invokeLambda } = require('./services/lambdaFunctionsService');

const ssmClient = new SSMClient({ region: process.env.AWS_REGION });

const parameterEnvNameMap = {
[process.env.HMAC_SECRETE_NAME]: 'HMAC_SECRETE'
};

const getAndSetSecretes = async () => {
  const params = {
    Names: [process.env.HMAC_SECRETE_NAME],
    WithDecryption: true
  }

  const command = new GetParametersCommand(params);
  const data = await ssmClient.send(command);

  data.Parameters.forEach(param => {
    process.env[parameterEnvNameMap[param.Name]] = param.Value;
  });
}

const getNewNotificationDate = (notification) => {
  const { dueDate } = notification;
  const today = getEndOfDay(new Date());
  let notificationDate = addTimeToDate(today, 7, "d");

  if (new Date(notificationDate) > new Date(dueDate)) {
    notificationDate = dueDate;
  }

  return notificationDate;
}



exports.handler = async (event) => {
  try {

    await getAndSetSecretes();
    
    const notifications = await getNotifications();

    const notificationsToUpdate = [];
    const notificationsToDelete = [];
    const emailNotifications = [];
    const inAppNotifications = [];

    notifications.forEach((notification) => {
      // if today equals dueDate, delete notification, else update it
      let dueDateReached = true;
      let dbOperationBuffer = notificationsToDelete;

      if (!areDatesEqual(new Date(notification.notificationDate), new Date(notification.dueDate))) {
        dueDateReached = false;
        dbOperationBuffer = notificationsToUpdate;
        const newNotificationDate = getNewNotificationDate(notification);
        notification.notificationDate = newNotificationDate;
      }

      const emailNotification = buildEmailNotification(notification, dueDateReached);
      const expoNotifications = buildExpoNotifications(notification, dueDateReached);
      emailNotifications.push(emailNotification);
      inAppNotifications.push(expoNotifications);

      notification.id = notification.notificationId;
      dbOperationBuffer.push(notification);
    });

    const sendInAppNotificationsPromise = invokeLambda(process.env.SEND_EXPO_NOTIFICATION_LAMBDA_NAME, inAppNotifications);
    const sendEmailNotificationsPromise = invokeLambda(process.env.SEND_EMAIL_LAMBDA_NAME, { sender: process.env.AWS_SES_SENDER, content: emailNotifications });

    await Promise.allSettled([sendInAppNotificationsPromise, sendEmailNotificationsPromise]);

    await batchDeleteNotifications(notificationsToDelete);
    await batchUpdateNotifications(notificationsToUpdate);

    return {
      statusCode: 200,
      body: JSON.stringify('Goals notifications sent successfully')
    }
  } catch (error) {
    console.error('Error ocurred', error)
  }
}
