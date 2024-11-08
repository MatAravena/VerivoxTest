# VerivoxTest 
<br />
For more details, see the ![Project Documentation](./Developing an Angular Application for Comparing Electricity Tariffs.pdf).
<br />
<br />


## To create docker image, use one of them
docker build -t verivox-app .
## Run docker container
docker run -d -p 4200:4200 verivox-app
## Test the web application
http://localhost:4200

<br />

## Extra commands
### To check Container status and information
docker ps -a
### To check eventual problems
docker logs <container_id>
### To stop the image
docker stop <container_id>
