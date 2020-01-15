# server

### Code update / initial install:
        docker-compose build

### Container start:
        docker-compose up -d

### Container stop:
        docker-compose down

### Container logs:
        docker-compose logs

### API location:
        0.0.0.0:3080/api/

### Proxying explanation
        https --> external nginx (3080) --> http --> internal docker nginx (3080) --> docker container (80) --> node (8080)