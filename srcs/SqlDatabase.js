const mysql = require('mysql');


class SqlDatabase {
  constructor(connectionInformation) {
    this.isConnected_ = false;

    const { host, user, password, database } = connectionInformation;
    this.connection_ = mysql.createConnection({
      host, user, password, database
    });

    this.connection_.connect(e => {
      if (e) throw e;
      this.isConnected_ = true;
    });
  }

  connectionGuard() {
    if (!this.isConnected_)
      throw new Error('not connected');
  }

  queryUNSAFE_(query) {
    console.log(query);
    this.connectionGuard();

    return new Promise((s, f) => {
      this.connection_.query(query, (e, results, fields) => {
        if (e) return f(e);

        query = query
          .replace(/(\r\n\t|\n|\r\t)/g, '')
          .replace(/\s\s+/g, ' ')
          .trim();
        return s({ results, fields, query });
      });
    });
  }

  getUsersWithNicknameUNSAFE(nickname) {
    return this.queryUNSAFE_(
      `SELECT id, nickname, email FROM users
      WHERE nickname LIKE "%${nickname}%"`
    );
  }

  get connected() { return this.isConnected_; }
}

module.exports = SqlDatabase;
