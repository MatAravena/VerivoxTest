# VerivoxTest 
<br />

## To create docker image, use one of them
docker buildx build --tag verivox-app .
docker build -t verivox-app .


## Run docker Container
<!-- docker run -d -p 8080:80 verivox-app . -->
docker run -d -p 4200:4200 verivox-app

## Test the web application
http://localhost:4200

<br />

## Extra commands
### To check eventual problems
docker logs <container_id>

### To check Container status and information
docker ps -a

### To stop the image
docker stop <container_id>
