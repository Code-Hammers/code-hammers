# Code Hammers

## dev environment setup

- Clone the repo down to your local machine.
- Run **npm i** in the root directory.
- Run **npm i** in the root of the client folder.
- Before servers are spun up you will need to run the initial tailwind script.
    - In the **client** folder run **npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch** in your terminal. This will run the inital css build. It will also leave it running and provide live compiles for any changes to styling.
- Open a new terminal and in the **root** run **npm run dev-ts**. This will spin up the backend server and a   localhost render on 8080.

You will ned to set up the .env file. This should include **"NODE_ENV=development"** as well as any database connection strings, api keys, seeder phrases as required.



