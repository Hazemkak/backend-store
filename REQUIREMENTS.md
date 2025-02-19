# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- GET http://localhost:3000/products -Index
- GET http://localhost:3000/products/:id -Show
- POST http://localhost:3000/products/create -Create [token required]
- GET http://localhost:3000/products/category/:category -[OPTIONAL] Products by category (args: product category) #TODO:

#### Users

- GET http://localhost:3000/users -Index [token required]
- GET http://localhost:3000/users/:id -Show [token required]
- POST http://localhost:3000/users/create -Create N[token required]
- POST http://localhost:3000/users/login -Login

#### Orders

- GET http://localhost:3000/orders/active/:user_id -Current Order by user (args: user id)[token required]
- GET http://localhost:3000/orders/complete/:user_id -[OPTIONAL] Completed Orders by user (args: user id)[token required]
- POST http://localhost:3000/orders/create -create order "look at postman-collection for more info about the body of request"

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
