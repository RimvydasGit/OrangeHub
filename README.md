                         O r a n g e H u b 

Home Page  <br>
<img width="958" alt="End Result Home Page" src="https://github.com/user-attachments/assets/59e7ddbf-3f96-4e86-9b56-c7a697354ec6" /><br>

Contribution Page  <br>
<img width="956" alt="End Result Contribution Page" src="https://github.com/user-attachments/assets/01a887d6-ff14-4d56-aca4-3fbed0226f35" /><br>

Media Galery Page  <br>
<img width="950" alt="End Result Media Galery Page" src="https://github.com/user-attachments/assets/c6d85d9d-2383-4b71-bd38-fc8f296b1c54" /><br>

Database Table Sample  <br>
<img width="807" alt="My Sql Sample" src="https://github.com/user-attachments/assets/9c514570-2b9a-49be-b7c9-69fd07ef4b2e" /><br>

Where to insert you Database Credentials  <br>
<img width="360" alt="Db credential spot" src="https://github.com/user-attachments/assets/8c06d82c-b2ef-4ab0-bc8a-114a5b257149" /><br>
  
  

I used MySQL Db.  <br>
  
CREATE DATABASE IF NOT EXISTS orange_farm;  <br>
  
USE orange_farm;  <br>
  
CREATE TABLE contributions (  
    id INT AUTO_INCREMENT PRIMARY KEY,  
    farm_name VARCHAR(255) NOT NULL,  
    country VARCHAR(100) NOT NULL,  
    orange_kind VARCHAR(100),  
    contribution_date DATE NOT NULL,  
    description TEXT,  
    certified_organic BOOLEAN DEFAULT FALSE,  
    file_name VARCHAR(255)  
);  
SELECT CURRENT_USER();  <br>

To run server:  cd: to where server.js file exists + node server.js  




