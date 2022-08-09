CREATE TYPE delivery_status 
AS ENUM ('active', 'complete');
CREATE TABLE ORDERS(
    ID SERIAL PRIMARY KEY,
    USER_ID INT NOT NULL REFERENCES USERS(ID),
    STATUS delivery_status
);