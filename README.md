# Alemeno Task

## RUNNING THE SERVER

1. Clone the repository:

```CMD
git clone https://github.com/alanansari/alemeno.git
```
To run the server, you need to have NodeJS installed on your machine. If you don't have it installed, you can follow the instructions [here](https://nodejs.org/en//) to install it.



2. Install the dependencies: 

```CMD
npm install
```


3. Setup .env file in base directory:

```
NEXTAUTH_URL = "http://localhost:3000"
NEXTAUTH_SECRET = "<next auth secret random string>"

GOOGLE_CLIENT_ID = "<smtp google oauth client id>"
GOOGLE_CLIENT_SECRET = "<smtp google oauth client secret>"

DATABASE_URL="<postgres database url>"
```


4. Run the backend server on localhost:

```CMD
npm run dev
```

5. Run on localhost:3000 (default: 3000)