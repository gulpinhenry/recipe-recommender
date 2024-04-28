const mongoose = require('mongoose');
const Mocha = require('mocha');
const fs = require('fs');
const path = require('path');


const mocha = new Mocha({
    timeout: 10000, 
    reporter: 'spec' 
});


process.env.NODE_ENV = 'test';

mongoose.connect(process.env.TESTDBURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully for testing.');
    runTests();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
  });

const testDir = './'; 

fs.readdirSync(testDir).filter(function(file) {
    return file.substr(-8) === '.test.js';
}).forEach(function(file) {
    mocha.addFile(path.join(testDir, file));
});

function runTests() {
    mocha.run(function(failures) {
        mongoose.disconnect();
        process.exitCode = failures ? 1 : 0;  
    });
}
