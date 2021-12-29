const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");

const send_logon_mail =  function(fullname, email) {
var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://bolmapay.com.ng/kanz_mail/logon_notification.php',
  'headers': {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ fullname: fullname, email: email }),

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
}
const send_forget_mail =  function(email, pass) {
var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://bolmapay.com.ng/kanz_mail/forget_password.php',
  'headers': {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email: email, pass:pass }),

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
}
const send_wallet_mail =  function(fullname, type, email, amount) {
var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://bolmapay.com.ng/kanz_mail/send_mail_wallet.php',
  'headers': {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email: email, fullname:fullname, type:type, amount:amount }),

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
}

const send_welcome_mail =  function(email, fullname) {
  var request = require('request');
  var options = {
    'method': 'POST',
    'url': 'https://bolmapay.com.ng/kanz_mail/user_welcome.php',
    'headers': {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, fullname:fullname }),
  
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
  }

const send_withdrawal_request_mail =  function(amount, fullname, email) {
  var request = require('request');
  var options = {
    'method': 'POST',
    'url': 'https://bolmapay.com.ng/kanz_mail/withdrawal_request.php',
    'headers': {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, fullname:fullname, amount: amount }),
  
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
  }
class userService {
  async getUsers() {
    try {
      const results = await db.getUsers();
      if (!results.length) return { status: 400, msg: "Data not found" };
      return { status: 200, msg: "User retreived", results };
    } catch (error) {
      return error;
    }
  }

  async send_logon_mail(fullname, email) {
    var request = require("request");
    var options = {
      method: "POST",
      url: "https://bolmapay.com.ng/kanz_mail/logon_notification.php",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullname: fullname, email: email }),
    };
    request(options, function (error, response) {
      // console.log(reponse)
  
        // if (error) throw new Error(error);
    });
  }
  async getOne(email) {
    try {
      const results = await db.getOne(email);
      if (!results.length) return { status: 400, msg: "User not found!" };

      return { status: 200, msg: "Users retreived", results };
    } catch (error) {
      return error;
    }
  }

  async updateUserPin(formData, userid) {
    try {
      const user = await db.getOneUser(userid);
      console.log(user);
      if (user.length) {
        const results = await db.updateUserPin(formData);
        return { status: 200, msg: "PIN updated Successfully", data: results };
      } else {
        return { status: 400, msg: "User not found!", data: results };
      }
    } catch (error) {
      return error;
    }
  }
  async updateUserBank(formData, userid) {
    try {
      const user = await db.getOneUser(userid);
      if (user.length) {
        const results = await db.updateUserBank(formData);
        return { status: 200, msg: "updateUserBank updated Successfully", data: results };
      } else {
        return { status: 400, msg: "User not found!", data: results };
      }
    } catch (error) {
      return error;
    }
  }

  async pinVerify(formData) {
    try {
      const user = await db.pinVerify(formData.userid, formData.pin);
      console.log(formData.userid);
      if (user.length) {
        return { status: 200, msg: "PIN validated Successfully" };
      } else {
        return { status: 400, msg: "Cannot Validate PIN" };
      }
    } catch (error) {
      return error;
    }
  }
  async idVerify(formData) {
    try {
      const user = await db.idVerify(formData.userid, formData.id_file);
      // console.log(user);
      // if (user.length) {
        return { status: 200, msg: "File Uploaded Successfully" };
      // } else {
      //   return { status: 400, msg: "Cannot Upload File" };
      // }
    } catch (error) {
      return error;
    }
  }

  async changePassword(formData, userid) {
    try {
      const user = await db.getOneUser(userid);
      if (!user.length) {
        return { status: 400, msg: "User not found!" };
      } else {
        const hashPassword = await bcrypt.hash(formData.new_pass, 10);
        if (!hashPassword) throw err;
        const results = await db.changePassword(hashPassword, userid);
        // console.log(results);
        return { status: 200, msg: "Password changed Successfully" };
      }
    } catch (error) {
      return error;
    }
  }

  async forgetPassword(formData) {
    try {
      const user = await db.getOne(formData.email);
     
      if (!user.length) {
        return { status: 400, msg: "User not found!" };
      } else {
        var rand1 = Math.floor(Math.random() * 120);
        var rand2 = "Kanz";
        var rand3 = "@@";
        var pass = rand2 + rand1 + rand3;
        const hashPassword = await bcrypt.hash(pass, 10);
        if (!hashPassword) throw err;
        const results = await db.changePassword(user[0].userid, hashPassword);
        send_forget_mail(formData.email, pass);
        return { status: 200, msg: "Password retrive Successfully" };

      }
    } catch (error) {
      return error;
    }
  }

  async register(formData) {
    try {
      const user = await db.getOne(formData.phone);
      if (user.length !== 0) {
        return { status: 400, msg: "This phone is already in use!" };
      } else {
        // username is available
        const hashPassword = await bcrypt.hash(formData.password, 10);
        if (!hashPassword) throw err;
        // has hashed pw => add to database
        const results = await db.createUser(formData, hashPassword);
        // if (!results) throw err;
        // send_welcome_mail(formData.email. formData.fullname)
        return { status: 200, msg: "User created Successfully" };
      }
    } catch (error) {
      return error;
    }
  }

  async userWallet(formData, userid) {
    try {
      const user = await db.getOneUser(userid);
        var balance = Number(user[0].wallet_balance);
      var amount = Number(formData.amount);
      var fullname = user[0].first_name;
      var email = user[0].email;
      // User not found
      if (formData.inFlaw === "true") {
        // Update wallet
        var type = "CREDIT";
        const user = await db.updateBalancePlus(formData, userid);
        // if (user.length)
        send_wallet_mail(fullname, type, email, amount);
          return { status: 200, msg: "Wallet Balance Updated Succesfully!" };
      } else if (formData.inFlaw === "false") {
        if (balance < amount) {
          return { status: 400, msg: "Insufficient Wallet Balance!" };
        } else {
          var type = "DEBIT";
          const user = await db.updateBalanceMinus(formData, userid);
          // if (user.length)
          send_wallet_mail(fullname, type, email, amount);

            return {
              status: 200,
              msg: "Wallet Balance Updated Succesfully!",
              user,
            };
        }
      }
    } catch (error) {
      return error;
    }
  }



  async doWithdrawal(formData, userid) {
    try {
      const user = await db.getOneUser(userid);
      var email = user[0].email;
      var fullname = user[0].first_name;
      if (!user.length) return { status: 400, msg: "User doesnt exist!" };
      // User not found
        if (user[0].wallet_balance < formData.amount) {
          return { status: 204, msg: "Insufficient Wallet Balance!" };
        } else {
          // Update wallet
          const user = await db.doWithdrawal(formData, userid);
          const insert_transaction = await db.doWithdrawalTransation(formData, userid);
          send_withdrawal_request_mail(formData.amount, fullname, email)
          if (!user.length)
            return {
              status: 200,
              msg: "doWithdrawal Submitted Succesfully!",
              user,
            };
        }
      
    } catch (error) {
      return error;
    }
  }

  async user_plans(userid) {
    try {
          // Update wallet
      const plans = await db.user_plans(userid);
          if (plans.length)
            return {
              status: 200,
              msg: "Plans Retrive Successfully!",
              plans,
            };
      
    } catch (error) {
      return error;
    }
  }
  async user_withdraw(userid) {
    try {
          // Update wallet
      const plans = await db.user_withdraw(userid);
          if (plans.length)
            return {
              status: 200,
              msg: "user_withdraw Retrive Successfully!",
              plans,
            };
      
    } catch (error) {
      return error;
    }
  }


  
  async invest_transactions(userid) {
    try {
      const transactions = await db.invest_transactions(userid);
          if (transactions.length)
            return {
              status: 200,
              msg: "invest_transactions Retrive Successfully!",
              transactions,
            };
      
    } catch (error) {
      return error;
    }
  }
  async invest_transactions_plan(userid, plan_id) {
    try {
      const transactions = await db.invest_transactions_plan(plan_id, userid);
          if (transactions.length)
            return {
              status: 200,
              msg: "invest_transactions Retrive Successfully!",
              transactions,
            };
      
    } catch (error) {
      return error;
    }
  }
  async plans() {
    try {
      const plans = await db.plans();
          if (plans.length)
            return {
              status: 200,
              msg: "Plans Retrive Successfully!",
              plans,
            };
      
    } catch (error) {
      return error;
    }
  }

  async user_plans_detail(formData, userid) {
    try {
      const plans_detail = await db.user_plans_detail(formData.plan_id, userid);
          if (plans_detail.length)
            return {
              status: 200,
              msg: "Plans Retrive Successfully!",
              plans_detail,
            };
      
    } catch (error) {
      return error;
    }
  }

  async add_user_plans(formData, userid) {
    try {
      const plan = await db.getOnePlan(formData.plan_id, userid);
      if (plan.length) {
        return {
          status: 400,
          msg: "Plans Already Added!"
        };
      } else {
        const plans_detail = await db.add_user_plans(formData.plan_id, formData.plan_name, formData.deposit_amount, userid);
        console.log(plans_detail);
        return {
          status: 200,
          msg: "Plans Added Successfully!"
        };
      }
    } catch (error) {
      return error;
    }
  }
  async update_plan_detail(formData, userid) {
    // try {
    //   const plan = await db.update_plan_detail(formData.plan_id, formData.amount, formData.inFlaw, userid);
    //         return {
    //           status: 200,
    //           msg: "Plans Updated Successfully!"
    //         };
      
    // } catch (error) {
    //   return error;
    // }
    try {
      const user = await db.getOneUserPlan(userid, formData.plan_id);
      // if (!user.length) return { status: 400, msg: "User doesnt exist!" };
      var balance = Number(user[0].plan_balance);
        var amount = Number(formData.amount);
      // User not found
      if (formData.inFlaw === "true") {
        // Update wallet
        const user = await db.update_plan_detail_plus(formData.plan_id, formData.amount, formData.inFlaw, userid);
        // if (user.length)
          return { status: 200, msg: "Wallet Balance Updated Succesfully!" };
      } else if (formData.inFlaw === "false") {
      
        if (balance < amount) {
          return { status: 400, msg: "Insufficient Wallet Balance!" };
        }else{
          const user = await db.update_plan_detail_minus(formData.plan_id, formData.amount, formData.inFlaw, userid);
          // if (user.length)
            return {
              status: 200,
              msg: "Wallet Balance Updated Succesfully!",
              user,
            };
        }
      }
    } catch (error) {
      return error;
    }


  }
  async update_user_pin(formData, userid) {
    try {
      const plan = await db.update_user_pin(formData.new_pin, userid);
            return {
              status: 200,
              msg: "PIN Updated Successfully!"
            };
      
    } catch (error) {
      return error;
    }
  }

  async login(formData) {
    try {
      const user = await db.getOne(formData.phone);
      if (!user.length) return { status: 400, msg: "User doesnt exist!" };
      // User not found
      const matchPassword = await bcrypt.compare(
        formData.password,
        user[0]["password"]
      );
      if (!matchPassword)
        return { status: 400, msg: "Phone Number or Password is incorrect" };

      const token = jwt.sign(
        {
          email: user[0].email,
          phone: user[0].phone,
          userId: user[0].userid,
        },
        process.env.SECREAT,
        {
          expiresIn: "1d",
        }
      );

      // const settings = await db.getSettings();
      // const plan_balance = await db.plan_balance(user[0].userid);

      var fullname = user[0].first_name;
     var email = user[0].email
      send_logon_mail(fullname, email);

      return {
        status: 200,
        token,
        user: user[0],
        // plan_balance: plan_balance,
        // settings:settings,
      };
      
    } catch (error) {
      return error;
    }
  }

  async auth(formData) {
    try {
      const user = await db.getOneUser(formData.userid);
      if (!user.length) return { status: 400, msg: "User doesnt exist!" };
      // User not found
      const token = jwt.sign(
        {
          email: user[0].email,
          userId: user[0].userid,
        },
        process.env.SECREAT,
        {
          expiresIn: "1d",
        }
      );

      // const settings = await db.getSettings();

      // const plan_balance = await db.plan_balance(user[0].userid);

      return {
        status: 200,
        token,
        user: user[0],
        // settings:settings,
        // plan_balance: plan_balance,
      };
    } catch (error) {
      return error;
    }
  }
}

module.exports = new userService();
