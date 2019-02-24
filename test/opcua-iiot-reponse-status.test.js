/**
 * Original Work Copyright 2014 IBM Corp.
 * node-red
 *
 * Copyright (c) 2018 Klaus Landsdorf (http://bianco-royal.de/)
 * All rights reserved.
 * node-red-contrib-iiot-opcua
 *
 **/

'use strict'

jest.setTimeout(10000)

const injectNode = require('node-red/nodes/core/core/20-inject')
const functionNode = require('node-red/nodes/core/core/80-function')
const inputNode = require('../src/opcua-iiot-response')

const helper = require('node-red-node-test-helper')
helper.init(require.resolve('node-red'))

let readGoodInject = {
  'id': 'n1rsf1',
  'type': 'inject',
  'name': 'TestInject Read',
  'topic': 'TestTopic',
  'payload': '[{"value":{"dataType":"Double","arrayType":"Scalar","value":20},"statusCode":{"value":0,"description":"No Error","name":"Good"},"sourcePicoseconds":0,"serverPicoseconds":0}]',
  'payloadType': 'json',
  'repeat': '',
  'crontab': '',
  'once': true,
  'onceDelay': 0.1,
  'wires': [['n2rsf', 'n3rsfrd']]
}

let readBadInject = {
  'id': 'n1rsf2',
  'type': 'inject',
  'name': 'TestInject Read',
  'topic': 'TestTopic',
  'payload': '[{"value":{"dataType":"Double","arrayType":"Scalar","value":20},"statusCode":{"value":0,"description":"Fatal Error","name":"Bad"},"sourcePicoseconds":0,"serverPicoseconds":0}]',
  'payloadType': 'json',
  'repeat': '',
  'crontab': '',
  'once': true,
  'onceDelay': 0.1,
  'wires': [['n2rsf', 'n3rsfrd']]
}

let readOtherInject = {
  'id': 'n1rsf3',
  'type': 'inject',
  'name': 'TestInject Read',
  'topic': 'TestTopic',
  'payload': '[{"value":{"dataType":"Double","arrayType":"Scalar","value":20},"statusCode":{"value":0,"description":"Some Error","name":"Best"},"sourcePicoseconds":0,"serverPicoseconds":0}]',
  'payloadType': 'json',
  'repeat': '',
  'crontab': '',
  'once': true,
  'onceDelay': 0.1,
  'wires': [['n2rsf', 'n3rsfrd']]
}

let readResultSimulation = {
  'id': 'n3rsfrd',
  'type': 'function',
  'name': '',
  'func': "msg.nodetype = 'read'\nmsg.injectType = 'read'\nreturn msg;",
  'outputs': 1,
  'noerr': 0,
  'wires': [['n4rsf', 'n5rsf']]
}

let writeGoodInject = {
  'id': 'n1rsf5',
  'type': 'inject',
  'name': 'TestInject Write',
  'topic': 'TestTopic',
  'payload': '{"statusCodes":[{"value":0,"description":"No Error","name":"Good"}]}',
  'payloadType': 'json',
  'repeat': '',
  'crontab': '',
  'once': true,
  'onceDelay': 0.1,
  'wires': [['n2rsf', 'n3rsfwr']]
}

let writeBadInject = {
  'id': 'n1rsf6',
  'type': 'inject',
  'name': 'TestInject Write',
  'topic': 'TestTopic',
  'payload': '{"statusCodes":[{"value":0,"description":"Fatal Error","name":"Bad"}]}',
  'payloadType': 'json',
  'repeat': '',
  'crontab': '',
  'once': true,
  'onceDelay': 0.1,
  'wires': [['n2rsf', 'n3rsfwr']]
}

let writeOtherInject = {
  'id': 'n1rsf7',
  'type': 'inject',
  'name': 'TestInject Write',
  'topic': 'TestTopic',
  'payload': '{"statusCodes":[{"value":0,"description":"Some Error","name":"Best"}]}',
  'payloadType': 'json',
  'repeat': '',
  'crontab': '',
  'once': true,
  'onceDelay': 0.1,
  'wires': [['n2rsf', 'n3rsfwr']]
}

let writeResultSimulation = {
  'id': 'n3rsfwr',
  'type': 'function',
  'name': '',
  'func': "msg.nodetype = 'write'\nmsg.injectType = 'write'\nreturn msg;",
  'outputs': 1,
  'noerr': 0,
  'wires': [['n4rsf', 'n5rsf']]
}

let listenGoodInject = {
  'id': 'n1rsf8',
  'type': 'inject',
  'name': 'TestInject Listen',
  'topic': 'TestTopic',
  'payload': '{"value":{"dataType":"UInt16","arrayType":"Scalar","value":0},"statusCode":{"value":0,"description":"No Error","name":"Good"},"sourceTimestamp":"0","sourcePicoseconds":0,"serverTimestamp":"0","serverPicoseconds":0}',
  'payloadType': 'json',
  'repeat': '',
  'crontab': '',
  'once': true,
  'onceDelay': 0.1,
  'wires': [['n2rsf', 'n3rsfli']]
}

let listenBadInject = {
  'id': 'n1rsf9',
  'type': 'inject',
  'name': 'TestInject Listen',
  'topic': 'TestTopic',
  'payload': '{"value":{"dataType":"UInt16","arrayType":"Scalar","value":0},"statusCode":{"value":0,"description":"Fatal Error","name":"Bad"},"sourceTimestamp":"0","sourcePicoseconds":0,"serverTimestamp":"0","serverPicoseconds":0}',
  'payloadType': 'json',
  'repeat': '',
  'crontab': '',
  'once': true,
  'onceDelay': 0.1,
  'wires': [['n2rsf', 'n3rsfli']]
}

let listenOtherInject = {
  'id': 'n1rsf10',
  'type': 'inject',
  'name': 'TestInject Listen',
  'topic': 'TestTopic',
  'payload': '{"value":{"dataType":"UInt16","arrayType":"Scalar","value":0},"statusCode":{"value":0,"description":"Some Error","name":"Best"},"sourceTimestamp":"0","sourcePicoseconds":0,"serverTimestamp":"0","serverPicoseconds":0}',
  'payloadType': 'json',
  'repeat': '',
  'crontab': '',
  'once': true,
  'onceDelay': 0.1,
  'wires': [['n2rsf', 'n3rsfli']]
}

let listenResultSimulation = {
  'id': 'n3rsfli',
  'type': 'function',
  'name': '',
  'func': "msg.nodetype = 'listen'\nmsg.injectType = 'subscribe'\nreturn msg;",
  'outputs': 1,
  'noerr': 0,
  'wires': [['n4rsf', 'n5rsf']]
}

let testFlowPayload = [
  { id: 'n2rsf', type: 'helper' },
  { id: 'n4rsf', type: 'helper' },
  {
    'id': 'n5rsf',
    'type': 'OPCUA-IIoT-Response',
    'name': 'TestResponse',
    'compressedStruct': false,
    'showStatusActivities': false,
    'showErrors': false,
    'wires': [['n6rsf']]
  },
  { id: 'n6rsf', type: 'helper' }
]

const readGoodTestFlowPayload = testFlowPayload.concat([readResultSimulation, readGoodInject])
const writeGoodTestFlowPayload = testFlowPayload.concat([writeResultSimulation, writeGoodInject])
const listenGoodTestFlowPayload = testFlowPayload.concat([listenResultSimulation, listenGoodInject])

const readBadTestFlowPayload = testFlowPayload.concat([readResultSimulation, readBadInject])
const writeBadTestFlowPayload = testFlowPayload.concat([writeResultSimulation, writeBadInject])
const listenBadTestFlowPayload = testFlowPayload.concat([listenResultSimulation, listenBadInject])

const readOtherTestFlowPayload = testFlowPayload.concat([readResultSimulation, readOtherInject])
const writeOtherTestFlowPayload = testFlowPayload.concat([writeResultSimulation, writeOtherInject])
const listenOtherTestFlowPayload = testFlowPayload.concat([listenResultSimulation, listenOtherInject])

describe('OPC UA Response Status node Unit Testing', function () {
  beforeAll(function (done) {
    helper.startServer(function () {
      done()
    })
  })

  afterEach(function (done) {
    helper.unload().then(function () {
      done()
    }).catch(function () {
      done()
    })
  })

  afterAll(function (done) {
    helper.stopServer(function () {
      done()
    })
  })

  describe('Response Status node', function () {
    it('should get a message with payload on read', function (done) {
      helper.load([injectNode, functionNode, inputNode], readGoodTestFlowPayload, function () {
        let n4 = helper.getNode('n4rsf')
        n4.on('input', function (msg) {
          expect(msg.payload).toMatchObject([{ 'value': { 'dataType': 'Double', 'arrayType': 'Scalar', 'value': 20 }, 'statusCode': { 'value': 0, 'description': 'No Error', 'name': 'Good' }, 'sourcePicoseconds': 0, 'serverPicoseconds': 0 }])
          done()
        })
      })
    })

    it('should get a message with payload on write', function (done) {
      helper.load([injectNode, functionNode, inputNode], writeGoodTestFlowPayload, function () {
        let n4 = helper.getNode('n4rsf')
        n4.on('input', function (msg) {
          expect(msg.payload).toMatchObject({ 'statusCodes': [{ 'value': 0, 'description': 'No Error', 'name': 'Good' }] })
          done()
        })
      })
    })

    it('should get a message with payload on listen', function (done) {
      helper.load([injectNode, functionNode, inputNode], listenGoodTestFlowPayload, function () {
        let n4 = helper.getNode('n4rsf')
        n4.on('input', function (msg) {
          expect(msg.payload).toMatchObject({ 'value': { 'dataType': 'UInt16', 'arrayType': 'Scalar', 'value': 0 }, 'statusCode': { 'value': 0, 'description': 'No Error', 'name': 'Good' }, 'sourceTimestamp': '0', 'sourcePicoseconds': 0, 'serverTimestamp': '0', 'serverPicoseconds': 0 })
          done()
        })
      })
    })

    it('should verify a good message on read', function (done) {
      helper.load([injectNode, functionNode, inputNode], readGoodTestFlowPayload, function () {
        let n6 = helper.getNode('n6rsf')
        n6.on('input', function (msg) {
          expect(msg.entryStatus).toMatchObject([1, 0, 0])
          done()
        })
      })
    })

    it('should verify a good message on write', function (done) {
      helper.load([injectNode, functionNode, inputNode], writeGoodTestFlowPayload, function () {
        let n6 = helper.getNode('n6rsf')
        n6.on('input', function (msg) {
          expect(msg.entryStatus).toMatchObject([1, 0, 0])
          done()
        })
      })
    })

    it('should verify a good message on listen', function (done) {
      helper.load([injectNode, functionNode, inputNode], listenGoodTestFlowPayload, function () {
        let n6 = helper.getNode('n6rsf')
        n6.on('input', function (msg) {
          expect(msg.entryStatus).toMatchObject([1, 0, 0])
          done()
        })
      })
    })

    it('should verify a bad message on read', function (done) {
      helper.load([injectNode, functionNode, inputNode], readBadTestFlowPayload, function () {
        let n6 = helper.getNode('n6rsf')
        n6.on('input', function (msg) {
          expect(msg.entryStatus).toMatchObject([0, 1, 0])
          done()
        })
      })
    })

    it('should verify a bad message on write', function (done) {
      helper.load([injectNode, functionNode, inputNode], writeBadTestFlowPayload, function () {
        let n6 = helper.getNode('n6rsf')
        n6.on('input', function (msg) {
          expect(msg.entryStatus).toMatchObject([0, 1, 0])
          done()
        })
      })
    })

    it('should verify a bad message on listen', function (done) {
      helper.load([injectNode, functionNode, inputNode], listenBadTestFlowPayload, function () {
        let n6 = helper.getNode('n6rsf')
        n6.on('input', function (msg) {
          expect(msg.entryStatus).toMatchObject([0, 1, 0])
          done()
        })
      })
    })

    it('should verify a other message on read', function (done) {
      helper.load([injectNode, functionNode, inputNode], readOtherTestFlowPayload, function () {
        let n6 = helper.getNode('n6rsf')
        n6.on('input', function (msg) {
          expect(msg.entryStatus).toMatchObject([0, 0, 1])
          done()
        })
      })
    })

    it('should verify a other message on write', function (done) {
      helper.load([injectNode, functionNode, inputNode], writeOtherTestFlowPayload, function () {
        let n6 = helper.getNode('n6rsf')
        n6.on('input', function (msg) {
          expect(msg.entryStatus).toMatchObject([0, 0, 1])
          done()
        })
      })
    })

    it('should verify a other message on listen', function (done) {
      helper.load([injectNode, functionNode, inputNode], listenOtherTestFlowPayload, function () {
        let n6 = helper.getNode('n6rsf')
        n6.on('input', function (msg) {
          expect(msg.entryStatus).toMatchObject([0, 0, 1])
          done()
        })
      })
    })
  })
})
