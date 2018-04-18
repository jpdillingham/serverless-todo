const AWS = require('aws-sdk');

const TABLE_NAME = 'qccoders_todos';

AWS.config.update({ region: 'us-east-1' });
const dynamoDB = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10', convertEmptyValues: true });

exports.get = (property, key) => {
    let params = {
        TableName: TABLE_NAME,
        Key: {
            user: key,
        },
        ProjectionExpression: property,
    };
    
    return dynamoDB.get(params).promise();
}

exports.set = (property, key, value) => {
    let params = {
        TableName: TABLE_NAME,
        Key: { 
            user: key
        },
        UpdateExpression: 'SET #property = :value',
        ExpressionAttributeNames: { '#property' : property },
        ExpressionAttributeValues: { ':value': value }        
    } 
    
    return dynamoDB.update(params).promise();  
}