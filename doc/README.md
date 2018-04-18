# Prepare Files

## Install Dependencies

Open a command prompt and navigate to the `serverless-todo` directory, then execute `npm install`.

## Build the Project

When the installation is finished, execute `npm run build`.  This script will create the static files that we'll upload to S3.

When complete, a new directory `build` should have been created containing an `index.html` file, a `static` folder, and a few other things.

## Create a Zip

Zip the entire project, being sure to include `node_modules` and the `src` folder.  Name it whatever you like, and save it somewhere outside of the project folder.

# S3
## Create an S3 Bucket

Log in to the AWS console, select S3 from the 'Services' menu under 'Storage', and click 'Create Bucket'.

The 'Create bucket' dialog should open.  Enter a name for your new bucket, then click 'Next' and accept all of the default properties on the next page.  

On the 'Set permissions' page, select 'Grant public read access' under the 'Manage public permissions' heading.

Click 'Next', then 'Create bucket'.

Select your new bucket from the list, then click 'Properties' and 'Static website hosting' to open the 'Static website hosting' dialog.

Select 'Use this bucket to host a website' and enter `index.html` for both the 'Index document' and 'Error document' fields, then click 'Save'.

Click on the 'Static website hosting' box one more time to re-open the dialog, then copy the URL listed as 'Endpoint'.  This is the public address for your app's static content.

## Upload the Static Content to S3

Navigate back to your bucket, then click 'Upload'.  The 'Upload' dialog will open and provide a space for you to drag and drop your static files.  Do this, then click 'Next'.

Under the 'Manage public permissions' heading on the next page, select 'Grant public read access to this object(s)', then click 'Upload'.

## Test the Static Content

Navigate a browser to the URL noted above and confirm that the application loads.  Note that it won't be functional yet, and the console should contain an error or two.

# Lambda

Select Lambda From the 'Services' menu under 'Compute'.

On the 'Create function' screen, select 'Author from scratch', enter a name, select 'Node.js 6.10' as the 'Runtime', and select 'Create a new role from template(s)' for 'Role'.  Enter a name for the role and leave the templates blank (Lambda permissions will be added automatically).  Click 'Create function' to create the Lambda.

When the Lambda is created, scroll down to the 'Function code' section and select 'Upload a .ZIP file' under 'Code entry type.  Select the zip that was created earlier and upload it.

When the upload is complete, update the 'Handler' field with the value `src/server.handler`.  This indicates the path to the file containing the Lambda code, and the name of the function to invoke.

## Test a GET

Near the top of the screen click the 'Test' button.  The 'Configure test event' dialog will open; enter 'GET' in the 'Event name' field and paste the following json into the code field:

```json
{
  "resource": "/{proxy+}",
  "headers": {
    "Content-Type": "application/json"
  },
  "pathParameters": {
    "proxy": "todos"
  },
  "httpMethod": "GET",
  "path": "/todos"
}
```

Select 'GET' from the drop-down list next to the 'Test' button, then click 'Test'.  Expand the result to reveal the result and ensure that response is the following:

```json
  "statusCode": 200,
  "body": "[]",
```

## Test a POST

Select 'Configure test events' from the drop-down list next to 'Test', then click 'Test' and choose 'Create new test event' from the available options.  Repeat the steps above, naming the event 'POST' and pasting the following json:

```json
{
  "body": "{\"id\":\"1\", \"todo\":\"test\"}",
  "resource": "/{proxy+}",
  "headers": {
    "Content-Type": "application/json"
  },
  "pathParameters": {
    "proxy": "todos"
  },
  "httpMethod": "POST",
  "path": "/todos"
}
```

Select 'POST' from the drop-down list next to the 'Test' button, then click 'Test' and ensure the result is as follows: 

```json
  "statusCode": 200,
  "body": "[{\"id\":\"1\",\"todo\":\"test\"}]",
```

Note that repeated tests will append to the returned list.

# API Gateway

Select API Gateway from 'Services' under 'Networking & Content Delivery', then click 'Create API'.

Select 'New API' and enter a name, then click 'Create API'.  Click the 'Actions' drop-down button and select 'Create Resource'.  The 'New Child Resource' page will load.

Tick the box next to 'Configure as proxy resource', tick 'Enable API Gateway CORS', then click 'Create Resource'.

On the Setup page, select 'Lambda Function Proxy', the region in which you created your Lambda, and select your Lambda (you may need to type the first letter to get the list to appear).  Click 'Save'.  When prompted to accept permissions, accept.

Click the 'Actions' drop-down button and select 'Deploy API'.  The 'Deploy API' dialog will open.  Select '[New Stage]' for 'Development stage' and type in a name, then click 'Deploy'.

Note the 'Invoke URL'; this is the endpoint for the front end to use.

## Test GET

Open a browser and navigate to your invoke url with '/todos' appended to the end.  The browser should display the contents of the todo array.

# Update Front End and Test

Open the front end application in a text editor and edit the contents of `constants.js`, setting `REMOTE_API_URL` to your invoke url + '/todos'.

Run `npm run build`, then follow the instructions above to redeploy your static files to S3, then navigate your browser to your static file url to test the application.  

# DynamoDB

Select DynamoDD from 'Services' under 'Database', then click 'Create table'.  Enter any name you wish, and enter 'user' for the primary key.  Accept all other defaults and click 'Create'.  It will take a minute or two to create your table.

## Add DynamoDB Permissions to your IAM Role

Select IAM from 'Services' under 'Security, Identity & Compliance'. Click on 'Roles' beneath 'IAM Resources', then select the IAM role you created when setting up your Lambda.

Click 'Attach policy' near the top of the permissions list, then type in 'dynamo' to filter the list.  Select 'AmazonDynamoDBFullAccess', then click 'Attach policy'.

Note that in a production environment you'll want to put more consideration into the permissions you grant here.

## Switch to the Dynamo Branch

From a command prompt, execute `git checkout dynamo` to retrieve the code required for DynamoDB integration.

Update the `REMOTE_API_URL` and `TABLE_NAME` constants in `constants.js` and `database.js`, respectively.

Save, build and deploy the application to S3 and Lambda.

# Test!

Navigate your browser to your S3 URL and test it out!