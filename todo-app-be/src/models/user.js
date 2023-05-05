const getDb = require('../utils/database').getDb;

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  save() {
    const db = getDb();
    db.collection('users')
      .insertOne(this)
      .then((result) => console.log('New user created!'))
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = User;
