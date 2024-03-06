const mongoose = require('mongoose');

console.log(process.env.MONGODB_URI)
const n = mongoose.connect(process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
);

module.exports = n;