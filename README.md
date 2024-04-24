> [!CAUTION]
> This `readme.md` is not ready yet! Don't worry if the project doesn't work after following this documentation.
# AI content generator
This is a tool that allows you to generate ready-to-upload articles directly onto a website (i.e., ready HTML or any other desired format, e.g., .json).

## Generator setup

Firstly, you need to have a Google Cloud account. Install the [gcloud CLI](https://cloud.google.com/sdk/docs/install). Log into your Google Cloud account in your local CLI using this command:
```
gcloud auth application-default login
```
Create a new project or choose an existing one if you have used Vertex AI before (you can do this via a web browser). Within the new project, enable all the necessary APIs related to Vertex AI. In the `ai-content-generator\generator\config\credentials.json`, replace the placeholder credentials with your own. You can find the required credentials (OAuth 2.0 Client IDs in .json format) by creating them [there](https://console.cloud.google.com/apis/credentials). Credentials should look like this:
```json
{
  "type": "service_account",
  "project_id": "project_id",
  "private_key_id": "private_key_id",
  "private_key": "-----BEGIN PRIVATE KEY-----\n--IT WILL BE REALLY LONG--\n-----END PRIVATE KEY-----\n",
  "client_email": "client_email",
  "client_id": "client_id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "client_x509_cert_url",
  "universe_domain": "googleapis.com"
}
```
Now you can install all the dependencies using:
```
npm i
```
