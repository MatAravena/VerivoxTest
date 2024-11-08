# VerivoxTest 
<br />
For more details, see the [Project Documentation](https://github.com/yourusername/your-repo/blob/main/Developing%20an%20Angular%20Application%20for%20Comparing%20Electricity%20Tariffs.pdf).
<br />
<br />

## Installation and Setup
To set up the project locally, follow these steps:

### Clone the repository:
```bash
git clone https://github.com/MatAravena/VerivoxTest.git
```
### Navigate to the project directory:
```bash
cd VerivoxApp
```
### Install the required dependencies:
```bash
npm install
```
### Run locally the application
```bash
npm start
```
### Test the web application
http://localhost:4200

<br />
<br />

## Using Docker
### Navigate to the project directory:
```bash
cd VerivoxApp
```
### To create docker image
```bash
docker build -t verivox-app .
```
### Run docker container
```bash
docker run -d -p 4200:4200 verivox-app
```
### Test the web application
http://localhost:4200

<br />

### Extra commands
### To check Container status and information
```bash
docker ps -a
```
### To check eventual problems
```bash
docker logs <container_id>
```
### To stop the image
```bash
docker stop <container_id>
```
