require('dotenv').config();
const mongodb = require('mongodb');
const MongodbClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongodbClient.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zlhb3u9.mongodb.net/todo?retryWrites=true&w=majority`
  )
    .then((client) => {
      _db = client.db();
      console.log('Connected to mongodb database!');
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
