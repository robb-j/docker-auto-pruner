
# Docker Auto Pruner

> **Archived** – This project has been archived and is generally unsupported

Periodically removes dangling docker images over a certain age

## Features
- Runs every hour, removing dangling images that are older than 15 days
- The logs is stored at `/app/logs/app.log` if you want mount it out (Defaults to a volume)
- Requires the docker socket mounted in mounted at `/var/run/docker.sock`



## Optional Variables
| Variable      | Purpose |
| ------------- | ------- |
| MAX_AGE       | The maximum age a dangling image can be, a number of days |
| DOCKER_SOCKET | Where the docker socket is mounted in (default: `/var/run/docker.sock`) | 
