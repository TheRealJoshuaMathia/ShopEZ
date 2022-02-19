CREATE TABLE Items (
    item_id BIGINT NOT NULL AUTO_INCREMENT, 
    title VARCHAR(30) NOT NULL,
    typeOfItem VARCHAR(20),
    catagory VARCHAR(20),
    store VARCHAR(20),
    PRIMARY KEY (item_id)
);

INSERT INTO Items (title, type)
VALUES ('Candy', 'Sour Patch')