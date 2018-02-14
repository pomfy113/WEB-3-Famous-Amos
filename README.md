# Famous Amos's Pet Emporium!

## Tasks

### Add SQL with Sequlizer
convert pets and comments to use SQL ORM

### Add `bower`
Add bootstrap and jQuery with bower into the `public/vendor` folder

### Add jQuery
Submit comments form with jQuery

### Simple Search & Pagination
Add a search bar in the navbar to search pets. Paginate the results.

### Upload Images
Upload pictures of pets from new and edit forms

### Websockets
Set pet status updates with websockets

### Payment Gateways
Buy pets using Stripe.



Sequelize in Heroku
1. Add pg module to Heroku
1. Update .env with local db url
1. npm install --save sequelize-cli
1. update config.json
config.json
"production": {
  "use_env_variable": "DATABASE_URL"
}
1. update server.js
    ```js
    
    ```
