# Full-Stack React-Flask Application

This project is a demo test project for volocopter with a React frontend (Typescript) and a Flask backend, containerized using Docker. 


Demo Link : https://www.loom.com/share/312ac92a4c23410d8f1a870ce898bc94


## Project Structure

- `/client`: Contains the React application built with Vite.
- `/server`: Contains the Flask API application.
- `docker-compose.yml`: Defines the services, networks, and volumes for container orchestration.
- `Dockerfile` (in both frontend and backend directories): Defines the environment for running the frontend and backend.


# server structure

It creates a basic flask application with SQLite DB and tests directory.

# Run Locally

```bash
- python -m venv venv
- .\venv\Scripts\activate
- pip install -r requirements.txt
- flask run
```

To run tests use 
`pytest tests`


# client 

It contains typscript application with the following structure

- `/pages`: Contains the Main Dashboard page of board.
- `/components` : Contains all the tsx components of the modules.
- `/services` : contains API calling instance and logic for services.
- `/styles` : contains styling css files for all the component classes
- `/types` : contains interfaces and constants of the app.

# Run Locally

```bash
npm i
npm run dev
```




## Setup and Running using Docker

- Docker
- Docker Compose

Ensure Docker and Docker Compose are installed on your system to run the application in containers.

### Building the Containers

To build the Docker containers for the first time or after any changes to the Dockerfiles or the application code, run:

```bash
docker-compose build
``` 
