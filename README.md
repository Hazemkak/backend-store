## running the project command

1- yarn "to install packages"
2- create a .env file with env variables including:
POSTGRES_USERNAME=postgres
POSTGRES_DATABASE=store
POSTGRES_DATABASE_TEST=store_test
POSTGRES_HOST=127.0.0.1
POSTGRES_PASS= "enter db password"
PORT=3000
NODE_ENV=DEV
BCRYPT_PASSWORD= "enter bcrypt secret"
SALT_ROUNDS=10
PEPPER=some_pepper
USER_SECRET= "enter user secret any string"
JWT_EXPIRES=14d
3- create a database with a name similar to one of env variable POSTGRES_DATABASE
4- create a database with a name similar to one of env variable POSTGRES_DATABASE_TEST
5- db-migrate up "to apply migrations to database"
6- yarn start

## database is running on PORT 127.0.0.1 & backend is running on PORT 3000

## API Endpoints

#### Products

- http://localhost:3000/products -Index
- http://localhost:3000/products/:id -Show
- http://localhost:3000/products/create -Create [token required]
- http://localhost:3000/products/category/:category -[OPTIONAL] Products by category (args: product category) #TODO:

#### Users

- http://localhost:3000/users -Index [token required]
- http://localhost:3000/users/:id -Show [token required]
- http://localhost:3000/users/create -Create N[token required]
- http://localhost:3000/users/login -Login

#### Orders

- http://localhost:3000/orders/active/:user_id -Current Order by user (args: user id)[token required]
- http://localhost:3000/orders/complete/:user_id -[OPTIONAL] Completed Orders by user (args: user id)[token required]
- http://localhost:3000/orders/create -create order "look at postman-collection for more info about the body of request"

## DATABASE SCHEMA
- USER
CREATE TABLE USERS(
    ID SERIAL PRIMARY KEY,
    FIRSTNAME VARCHAR(50) NOT NULL,
    LASTNAME VARCHAR(50) NOT NULL,
    USERNAME VARCHAR(50) UNIQUE NOT NULL ,
    PASSWORD TEXT NOT NULL
);
- PRODUCTS
CREATE TABLE PRODUCT(
    ID SERIAL PRIMARY KEY,
    NAME VARCHAR(50) NOT NULL,
    PRICE VARCHAR(50) NOT NULL,
    CATEGORY VARCHAR(50) NOT NULL
);
- ORDERS
CREATE TYPE delivery_status 
AS ENUM ('active', 'complete');
CREATE TABLE ORDERS(
    ID SERIAL PRIMARY KEY,
    USER_ID INT NOT NULL REFERENCES USERS(ID),
    STATUS delivery_status
);
- ORDERS_PRODUCTS "to reference between the order_id & products included in it"
CREATE TABLE ORDERS_PRODUCTS(
    ORDER_ID INT NOT NULL REFERENCES ORDERS(ID),
    PRODUCT_ID INT NOT NULL REFERENCES PRODUCT(ID),
    CONSTRAINT PK_ORDERS_PRODUCTS PRIMARY KEY (ORDER_ID ,PRODUCT_ID ),
    QUANTITY INT NOT NULL
);


## Project structure & how to get user token

# Way 1:

create a user using the endpoint /users/create & fill up the request body as required "look up the postman-collection file for more info"

# Way 2:

login with the username & password through endpoint /users/login "look up the postman-collection file for more info"

## To run the test

yarn test

## TO build project

yarn build "you will find the compiled project in the dist folder in the root dir"
