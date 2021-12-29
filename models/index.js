const pool = require("../models/database");
const uuid = require("uuid");

let db = {};

db.getUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users", (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

db.getOne = (phone) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM users WHERE LOWER(phone) = LOWER(${pool.escape(phone)});`,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};
db.getSettings = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM settings WHERE id='1'`,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};


db.plan_balance = (userid) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT SUM(plan_balance) AS balance FROM user_plans WHERE userid=${pool.escape(userid)}`,
      (err, results) => {
        if (err) {
          return reject(err);

          console.log(err)
        }
        return resolve(results);
      }
    );
  });
};

db.user_plans = (userid) => {
  return new Promise((resolve, reject) => {
    // console.log("uid"+ userid)
    pool.query(
      `SELECT * FROM user_plans WHERE userid = ${pool.escape(userid)};`,
      (err, results) => {
        // console.log(results);
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};
db.user_withdraw = (userid) => {
  return new Promise((resolve, reject) => {
    // console.log("uid"+ userid)
    pool.query(
      `SELECT * FROM withdrawal_request WHERE userid = ${pool.escape(userid)};`,
      (err, results) => {
        // console.log(results);
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

db.invest_transactions = (userid) => {
  return new Promise((resolve, reject) => {
    // console.log("uid"+ userid)
    pool.query(
      `SELECT * FROM invest_transactions WHERE userid = ${pool.escape(userid)};`,
      (err, results) => {
        // console.log(results);
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};
db.invest_transactions_plan = (plan_id, userid) => {
  return new Promise((resolve, reject) => {
    // console.log("uid"+ userid)
    pool.query(
      `SELECT * FROM invest_transactions WHERE userid='${userid}' AND plan_id = ${pool.escape(plan_id)};`,
      (err, results) => {
        console.log(results);
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};
db.plans = (userid) => {
  return new Promise((resolve, reject) => {
    // console.log("uid"+ userid)
    pool.query(
      `SELECT * FROM plans ORDER BY id DESC`,
      (err, results) => {
        // console.log(results);
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

db.update_plan_detail_plus = (plan_id, amount, inFlaw, userid) => {
  return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE user_plans SET plan_balance = plan_balance + '${amount}' WHERE plan_id=${plan_id} And userid=${pool.escape(userid)}`,
        (err, results) => {
          // console.log(results);
          if (err) {
            // console.log(err);
            return reject(err);
          }
          return resolve(results);
        }
      );
   
  });
};
db.update_plan_detail_minus = (plan_id, amount, inFlaw, userid) => {
  return new Promise((resolve, reject) => {
  
    pool.query(
      `UPDATE user_plans SET plan_balance = plan_balance - '${amount}' WHERE plan_id=${plan_id} And userid=${pool.escape(userid)}`,
      (err, results) => {
        // console.log(results);
        if (err) {
          // console.log(err);
          return reject(err);
        }
        return resolve(results);
      }
    );
   
  });
};

db.update_user_pin = (new_pin, userid) => {
  return new Promise((resolve, reject) => {
   
      pool.query(
        `UPDATE users SET pin=${new_pin} WHERE userid=${pool.escape(userid)}`,
        (err, results) => {
          // console.log(results);
          if (err) {
            // console.log(err);
            return reject(err);
          }
          return resolve(results);
        }
      );
   
  });
};
db.user_plans_detail = (plan_id, userid) => {
  return new Promise((resolve, reject) => {
    // console.log("uid"+ userid)
    pool.query(
      `SELECT * FROM user_plans WHERE LOWER(plan_id) = LOWER(${pool.escape(plan_id)});`,
      (err, results) => {
        // console.log(results);
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};
db.getOneUser = (userid) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM users WHERE LOWER(userid) = LOWER(${pool.escape(userid)});`,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};
db.getOneUserPlan = (userid, plan_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM user_plans WHERE userid = '${userid}' AND plan_id='${plan_id}';`,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};
db.getOnePlan = (plan_id, userid) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM user_plans WHERE LOWER(userid) = ${pool.escape(userid)} AND plan_id= LOWER(${pool.escape(plan_id)});`,
      (err, results) => {
        if (err) {
          console.log(err)
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

db.getOneUser = (userid) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM users WHERE userid = ${pool.escape(userid)};`,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

db.pinVerify = (userid, pin) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM users WHERE userid = '${userid}' AND pin = '${pin}'`,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};
db.idVerify = (userid, file) => {
  var d = new Date();

  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO id_verification (userid, id_file, ondate) VALUES ('${userid}', '${
        file
      }', '${d}')`,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

db.createUser = (data, hashedPass) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO users (userid, fullname, phone, email, password) VALUES ('${uuid.v4()}', '${
        data.fullname
      }', '${data.phone}', ${pool.escape(data.email)}, ${pool.escape(
        hashedPass
      )})`,
      (err, results) => {
        if (err) {
          // console.log(err)
          return reject(err);
        }
        // console.log(results)

        return resolve(results);
      }
    );
  });
};


db.add_user_plans = (plan_id, plan_name, deposit_amount, userid) => {
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;

  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO user_plans (userid, plan_name, plan_id, deposit_amount, ondate) VALUES ('${userid}', '${
        plan_name
      }','${
        plan_id
      }','${
        deposit_amount
      }', '${today}')`,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

db.updateUserPin = (data) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE users SET pin = '${data.pin}' WHERE userid = '${data.userid}'`,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    )
  });
};

db.updateUserBank = (data) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE users SET bank_name = '${data.bank_name}', bank_account = '${data.account_number}', bank_account_name = '${data.account_name}' WHERE userid = '${data.userid}'`,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    )
  });
};

db.updateBalancePlus = (data, userid) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE users SET wallet_balance = wallet_balance + '${data.amount}' WHERE userid = '${userid}' AND wallet_balance <= wallet_balance`,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    )
  });
};

db.updateBalanceMinus = (data, userid) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE users SET wallet_balance = wallet_balance - '${data.amount}' WHERE userid = '${userid}' AND wallet_balance <= wallet_balance`,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    )
  });
};
db.doWithdrawal = (data, userid) => {
 
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE users SET wallet_balance = wallet_balance - '${data.amount}' WHERE userid = '${userid}' AND wallet_balance <= wallet_balance`,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    )
  });
};
db.doWithdrawalTransation = (data, userid) => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;
  
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO withdrawal_request (userid, amount, ondate) VALUES ('${userid}', '${data.amount}', '${today}')`,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    )
  });
};


db.changePassword = (userid, hashPassword) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE users SET password = '${hashPassword}' WHERE userid = '${userid}'`,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    )
  });
};

module.exports = db;
