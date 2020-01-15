# server

### Prerequirements:
place `config.json` in /vote-service/api/etc

        {
        "serverPort": "8080",
        "db": {
            "username": "username_db",
            "pass": "pass_bd",
            "host": "host_db",
            "port": "port_db",
            "name": "name_db"
             }
        }

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