## Screenshots of the deployed app
sign-in and sign up pages
<img width="500" alt="Screenshot 2024-12-12 at 15 30 03" src="https://github.com/user-attachments/assets/b7115c20-4aad-401e-a036-6b2cb000d716" />
<img width="500" alt="Screenshot 2024-12-12 at 15 30 06" src="https://github.com/user-attachments/assets/8c7f0216-3a8f-4862-b7de-45b0ce82c926" />

Profile pages
<img width="1280" alt="Screenshot 2024-12-12 at 15 34 25" src="https://github.com/user-attachments/assets/39fc6200-090d-4f1e-8541-a0586b53097e" />



The dashboard can only be accessed by admins and only admins
<img width="500" alt="Screenshot 2024-12-12 at 15 34 42" src="https://github.com/user-attachments/assets/e466ab03-4ced-45ce-a6a9-2eb94fae0cb5" />
<img width="500" alt="Screenshot 2024-12-12 at 15 34 33" src="https://github.com/user-attachments/assets/7c5f557f-3d7e-4089-908d-3e6014da2084" />

## Getting Started
First clone the app from github

```bash
npm install --force

```
The --force flag is to force installation of some of the dependencies because as of right now am using next 15 RC which is the latest version and react 19 is not yet compatible with some libraries yet.

We then have to run
```bash
npx prisma generate 
```
In this project i have opted to use an ORM (Prisma) just incase you would like to migrate from one database to another.This brings out flexibility because it can work with any nosql and sql databases out of the box without affecting performance

## Running the project in DEVELOPMENT
To run The project
```bash
npm run dev 
```
## Running the project in PRODUCTION
We first need to build the project
```bash
npm run build
```
After building the project we then have to run this to start the server
```bash
npm run start
```

## Environment Variables
we the have to Update the environment variables

```bash
//in this case i used mongodb
DATABASE_URL="mongodb+srv://#########@cluster0.gyxsf.mongodb.net/memblymanagementsystem?retryWrites=true&w=majority&appName=Cluster0"

//This is a random string that will be used to encrypt your credential passwords

BETTER_AUTH_SECRET=uDY2bBjj1jz5ZyFGjgV8oaUViImATqzv

//This is the server name that your application is running on

BETTER_AUTH_URL=http://localhost:3000

//we then have to setupup the email verified route which is your server name followed by the /email-verified route

EMAIL_VERIFICATION_CALLBACK_URL=http://localhost:3000/email-verified

//we have also implemented GITHUB OAUTH 
//input GITHUB_ID AND GITHUB_SECRET as obtained in Github

GITHUB_CLIENT_ID="Ov23l######ZtPm6TE"
GITHUB_CLIENT_SECRET="a95805706f#################589956fc2"

//we have also implemented GOOGLE OAUTH

GOOGLE_CLIENT_ID="141535844853-e###############af8k.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSP##################8NxrVTi-f"

//For our image and file storage we use uploadthing
//For it to work correctly we need to input our uploadthing access token as obtained from uploadthing.com

UPLOADTHING_TOKEN='eyJhcGlLZXkiOiJza19saXZlXzNhMm#################################################iLCJhcHBJZCI6Imk1YWdudzViZm8iLCJyZWdpb25zIjpbInNlYTEiXX0='

```
## Self Hosting
This project is fully optimized for self hosting and has used the best development practices

