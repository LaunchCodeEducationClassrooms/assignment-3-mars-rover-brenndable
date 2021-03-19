class Rover {
  constructor(position) {
    this.position = position
    this.mode = "NORMAL"
    this.generatorWatts = 110
  }

  receiveMessage(message) {
    let results = [ ]
    let mode = this.mode
    let position = this.positon
    let generatorWatts = this.generatorWatts
   
    
    for (let i = 0; i < (message.commands).length; i++) {
      results.push(message.commands[i])
    }

    for (let i = 0; i < results.length; i++) {
      if (results[i].commandType == "STATUS_CHECK") {
        results[i] = {completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position} }
      } 
      
      else if (results[i].commandType == "MODE_CHANGE") {
        results[i] = {completed: true}
        mode = results[i].value
      }

      else if (results[i].commandType == "MOVE") {
        if (mode = "LOW_POWER") {
          results[i] = {completed: false}
        } else {
            positon = results[i].value
            results[i] = {completed: true}
          }
      }
    }
      return { 
        message: message.name,
        results: results
      }
  }
}

module.exports = Rover;