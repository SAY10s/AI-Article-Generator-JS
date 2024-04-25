# AI content generator
This tool allows you to generate a .json file that contains the ready-to-insert HTML article under the key 'html'. Sample returned JSON below:
```json
{
    "html": "<div> Article's html code. </div>"
}
```
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
To start the server, simply run this command in the project's root directory. In the following example, we will assume that the server is localhost.
```
node index.js
```
## Usage
When the server is already running, all you need to do is send a POST request to `yourserveradresss/generateHTML` with the following body:
| Key |Type | Description |
| --- | :---: | --- |
| `amountOfSections` | number | The number of sections in the article (the generator automatically adds a summary at the end, which is not included in the section count). |
| `title` | string | Title of the article. |
| `language` | string | language of the article (i.e. `polish`, `english`, `german`). | 
| `navigation` | bool | Generating a table of contents/navigation at the beginning of the article. |
| `additionalContext` | string | Any additional information for the prompt. (i.e. `Article should be written in formal form`). | 

```json
{
  "amountOfSections": 5,
  "title": "Write an article about Łukasz Nowak",
  "language": "polish",
  "navigation": true,
  "additionalContext": "It should be written in formal form"
}
```

It usually takes around `10 seconds` for AI to generate the article.

> [!IMPORTANT]
> To commemorate our beloved young specialist in the field of content marketing, [`Łukasz Nowak`](https://tech-studio.pl/_nuxt/author.9c4d32d8.jpg) (aka `Luke Newman`, `Lukas Neumann`), this microservice is named after him.
