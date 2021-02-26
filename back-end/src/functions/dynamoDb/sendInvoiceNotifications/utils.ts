import * as AWS  from 'aws-sdk';

export const docClient = new AWS.DynamoDB.DocumentClient();
export const connectionsTable = process.env.WEB_SOCKET_CONNECTIONS_TABLE;
const stage = process.env.STAGE;
const apiId = process.env.API_ID;

//provision connection parameters used to create a client that we will send messages to
const connectionParams = {
    apiVersion: "2018-11-29",
    endpoint: `${apiId}.execute-api.ca-central-1.amazonaws.com/${stage}`
};
//we also set permissions to be able to send GatewayManagementConnections request for websockets
const wsClient = new AWS.ApiGatewayManagementApi(connectionParams);


//This method will send the newly added invoice data to the user
export async function sendMessageToClient(connection: any, payload: any) {

    try {
        console.log('Sending message to a connection', connection)
        
        await wsClient.postToConnection({
            ConnectionId: connection,
            Data: JSON.stringify(payload),
        }).promise();
        
    } catch (e) {
        console.log('Failed to send message', JSON.stringify(e))
        if (e.statusCode === 410) {
            console.log('Stale connection')
        
            await docClient.delete({
                TableName: connectionsTable,
                Key: {
                  id: connection
                }
            }).promise();
        
        }
    }
}
