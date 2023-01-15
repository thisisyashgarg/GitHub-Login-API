# Github Authentication using Express

  This application provides an easy way of authenticating the user's GitHub in Express.

  ## Running the App

  To run the application, use the following NPM command:

  ```
  $ npm init -y
  $ npm install
  ```

  Then execute the server with: ```$ node app```

  The application should be running on port `3000`.

  ## Usage

  Use the ```/login``` page to log in with your GitHub account. This should redirect to ```/dashboard``` page with your profile ID if the authentication is successful. 

  On the dashboard page, use the ```Logout``` button to logout.
  
  Note that you need to set the environment variables in `.env` file which will provide the Client ID and Client Secret for your application.

  ## Contributing
  Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
