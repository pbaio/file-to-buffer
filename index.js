'use strict';

const Promise = require('bluebird');
const Readable = require('stream').Readable;

module.exports = {
  fileToBuffer: function fileToBuffer(stream) {
    return new Promise((resolve, reject) => {
      // 
      if (!(stream instanceof Readable))
        return reject('stream passed is not an instance of stream.Readable');

      // Array to store file chunk data
      let chunks = [];

      // Stream is done reading
      stream.once('end', () => {
        // Build buffer from chunks and resolve
        return resolve(Buffer.concat(chunks));
      });

      // Stream error occurred
      stream.once('error', (err) => {
        return reject(err);
      });

      // Populate fileData
      stream.on('data', (chunk) => {
        chunks.push(chunk);
      });
    });
  }
};