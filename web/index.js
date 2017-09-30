const fs = require('fs')

const Runner = require('reg-task').Runner
const winston = require('winston')
const Docker = require('dockerode')

const aDayInSeconds = 24 * 60 * 60
const socketPath = process.env.DOCKER_SOCKET || '/var/run/docker.sock'

;(async () => {
  
  // Save logs to a file
  winston.add(winston.transports.File, { filename: 'logs/app.log' })
  
  
  // Check that its a valid socket
  if (!fs.statSync(socketPath).isSocket()) {
    winston.error('Cannot connect to docker')
  }
  
  
  // Create a docker client
  let docker = new Docker({ socketPath })
  
  
  // Parse the max image, or default to 15
  let parsed = parseInt(process.env.MAX_AGE)
  const numDays = !Number.isNaN(parsed) ? parsed : 15
  
  
  // Let the user know we're starting up
  winston.info(`Starting up, ageLimit=${numDays}`)
  
  
  // Create a runner to do the pruning
  let task = new Runner({ h: 1 }, async () => {
    
    // Calculate a time 'MAX_AGE' ago
    let nowInUnix = Math.round((new Date()).getTime() / 1000)
    let until = nowInUnix - (numDays * aDayInSeconds)
    
    // Prune old images
    let pruning = await docker.pruneImages({ until })
    
    // Log what happened
    winston.info(pruning)
  })
  
  
  // Start the task
  task.start()
})()
