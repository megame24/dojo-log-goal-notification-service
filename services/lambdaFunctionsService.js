const { TextDecoder, TextEncoder } = require('util');
const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");

const lambdaClient = new LambdaClient({ region: process.env.AWS_REGION });

const invokeLambda = async (functionName, payload) => {
  const params = {
    FunctionName: functionName,
    InvocationType: 'RequestResponse',
    Payload: new TextEncoder().encode(JSON.stringify(payload))
  };

  const invokeCommand = new InvokeCommand(params);

  try {
    const data = await lambdaClient.send(invokeCommand);
    const decodedPayload = JSON.parse(new TextDecoder("utf-8").decode(data.Payload));
    console.log('Lambda invoke successful:', decodedPayload);
  } catch (err) {
    console.error('Error invoking Lambda function:', err);
    throw err;
  }
}

module.exports = {
  invokeLambda
}
