'use strict';

var Message = require('../message');
var inherits = require('util').inherits;
var stashcore = require('@stashcore/stashcore-lib');
var BufferReader = stashcore.encoding.BufferReader;
var BufferWriter = stashcore.encoding.BufferWriter;
var $ = stashcore.util.preconditions;

function GetMnListDiffMessage(args, options) {
  Message.call(this, options);
  this.command = 'getmnlistdiff';
  if (!args) {
    args = {};
  }

  this.baseBlockHash = args.baseBlockHash;
  this.blockHash = args.blockHash;
}
inherits(GetMnListDiffMessage, Message);

GetMnListDiffMessage.prototype.setPayload = function (payload) {
  var parser = new BufferReader(payload);
  $.checkArgument(!parser.finished(), 'No data received in payload');

  this.baseBlockHash = parser.read(32).toString('hex');
  this.blockHash = parser.read(32).toString('hex');
};

GetMnListDiffMessage.prototype.getPayload = function () {
  var bw = new BufferWriter();
  bw.write(new Buffer(this.baseBlockHash, 'hex'));
  bw.write(new Buffer(this.blockHash, 'hex'));
  return bw.concat();
};

module.exports = GetMnListDiffMessage;
