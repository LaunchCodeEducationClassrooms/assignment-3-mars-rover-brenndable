const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

// test 7

  it ("constructor sets position and default values for mode and generalWatts", function() {
    let test = new Rover(98382)
    expect(test.mode).toEqual('NORMAL')
    expect(test.position).toEqual(98382)
    expect(test.generatorWatts).toEqual(110)

  })

// test 8

  it ("response returned by receiveMessage contains name of message", function() {
    let rover = new Rover(98382)
    let commands = [new Command('MODE_CHANGE', 'MOVE'), new Command("STATUS_CHECK")]
    let message = new Message("Message Test", commands)
    let response = rover.receiveMessage(message)
    expect(response.message).toEqual("Message Test")

  })

// test 9

  it ("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let rover = new Rover(98382)
    let commands = [new Command('MODE_CHANGE', 'MOVE'), new Command("STATUS_CHECK")]
    let message = new Message("Message Test", commands)
    let response = rover.receiveMessage(message)
    expect((response.results).length).toEqual(2)
    
  })

// test 10

  it ("responds correctly to status check command", function() {
    let rover = new Rover(98382)
    let commands = [new Command('STATUS_CHECK')]
    let message = new Message("Message Test", commands)
    let response = rover.receiveMessage(message)
    expect(response.results).toEqual([{completed: true, roverStatus:{mode: "NORMAL", generatorWatts: 110, position: 98382}}])

  })

// test 11

  it ("responds correctly to mode change command", function() {
    let rover = new Rover(98382)
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')]
    let message = new Message("Message Test", commands)
    let response = rover.receiveMessage(message)
    expect(response.results).toEqual([{completed: true}])
    expect(rover.mode).toEqual('LOW_POWER')

  })

// test 12

  it ("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let rover = new Rover(98382)
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 87382098)]
    let message = new Message("Message Test", commands)
    let response = rover.receiveMessage(message)
    expect(response.results).toEqual([{completed: true}, {completed: false}])

  })

// test 13

  it ("responds with position for move command", function() {
    let rover = new Rover(87382098)
    let commands = [new Command('MOVE', 87382098)]
    let message = new Message("Message Test", commands)
    let response = rover.receiveMessage(message)
    expect(rover.position).toEqual(87382098)
    expect(response.results).toEqual([{completed: true}])
  
  })


});