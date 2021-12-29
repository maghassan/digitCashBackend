const userService = require("../services/userService");

class userController {
  async getUsers(req, res) {
    console.log(req.userData);
    try {
      const result = await userService.getUsers();
      console.log(result);
      res.status(result.status).json({ data: result });
    } catch (error) {
      res.status(400).json({ msg: "Error for getting user", error });
    }
  }

  async getOne(req, res) {
    // console.log(req.userData);
    try {
      const result = await userService.getOne(req.userData.email);
      console.log(result);
      res.status(result.status).json({responsestatus: "00", data: result });
    } catch (error) {
      res.status(400).json({ msg: "Error for getting user", error });
    }
  }

  async register(req, res) {
    try {
      const result = await userService.register(req.body);
      // console.log(result.status);
      res.status(result.status).json({ responsestatus: "00", data: result });
    } catch (error) {
      res.status(400).json({ msg: "Registerion Error", error });
    }
  }

  async login(req, res) {
    try {
      const result = await userService.login(req.body);
      res.status(result.status).json({ responsestatus: "00", data: result });
    } catch (error) {
      res.status(400).json({ msg: "Login Error", error });
    }
  }

  async auth(req, res) {
    try {
      const result = await userService.auth(req.body);
      res.status(result.status).json({ responsestatus: "00", data: result });
    } catch (error) {
      res.status(400).json({ msg: "Login Error", error });
    }
  }

  async userWallet(req, res) {
    try {
      const result = await userService.userWallet(
        req.body,
        req.userData.userId
      );
      console.log("D", result);
      res.status(result.status).json({ data: result });
    } catch (error) {
      res.status(400).json({ msg: "userWallet Error", error });
    }
  }

  async doWithdrawal(req, res) {
    try {
      const result = await userService.doWithdrawal(
        req.body,
        req.userData.userId
      );
      console.log("D", result);
      res.status(result.status).json({ data: result });
    } catch (error) {
      res.status(400).json({ msg: "doWithdrawal Error", error });
    }
  }
  async user_plans(req, res) {
    try {
      const result = await userService.user_plans(req.userData.userId);
      // console.log("Dss", result.plans);
      res.status(result.status).json({ data: result });
    } catch (error) {
      res.status(400).json({ msg: "user_plans Error", error });
    }
  }
  async user_withdraw(req, res) {
    try {
      const result = await userService.user_withdraw(req.userData.userId);
      console.log("Dss", result.plans);
      res.status(result.status).json({ data: result });
    } catch (error) {
      res.status(400).json({ msg: "user_withdraw Error", error });
    }
  }
  async invest_transactions(req, res) {
    try {
      const result = await userService.invest_transactions(req.userData.userId);
      // console.log("Dss", result.plans);
      res.status(result.status).json({ data: result });
    } catch (error) {
      res.status(400).json({ msg: "invest_transactions Error", error });
    }
  }
  async invest_transactions_plan(req, res) {
    try {
      const result = await userService.invest_transactions_plan(req.userData.userId, req.body.plan_id);
      console.log("Dss", result.plans);
      res.status(result.status).json({ data: result });
    } catch (error) {
      res.status(400).json({ msg: "invest_transactions Error", error });
    }
  }
  async plans(req, res) {
    try {
      const result = await userService.plans();
      // console.log("Dss", result.plans);
      res.status(result.status).json({ data: result });
    } catch (error) {
      res.status(400).json({ msg: "plans Error", error });
    }
  }
  async add_user_plans(req, res) {
    try {
      const result = await userService.add_user_plans(req.body, req.userData.userId);
      // console.log("Dss", result.plans);
      res.status(result.status).json({ data: result });
    } catch (error) {
      res.status(400).json({ msg: "add_user_plans Error", error });
    }
  }
  async user_plans_detail(req, res) {
    try {
      const result = await userService.user_plans_detail(req.body, req.userData.userId);
      // console.log("Dss", result);
      res.status(result.status).json({ data: result });
    } catch (error) {
      res.status(400).json({ msg: "user_plans Error", error });
    }
  }
  async update_plan_detail(req, res) {
    try {
      const result = await userService.update_plan_detail(req.body, req.userData.userId);
      console.log("Dss", result);
      res.status(result.status).json({ data: result });
    } catch (error) {
      res.status(400).json({ msg: "update_plan_detail Error", error });
    }
  }
  async update_user_pin(req, res) {
    try {
      const result = await userService.update_user_pin(req.body, req.userData.userId);
      // console.log("Dss", result);
      res.status(result.status).json({ data: result });
    } catch (error) {
      res.status(400).json({ msg: "update_user_pin Error", error });
    }
  }

  async updateUserPin(req, res) {
    try {
      const result = await userService.updateUserPin(
        req.body,
        req.userData.userId
      );
      console.log("D", result);
      res.status(result.status).json({ data: result });
    } catch (error) {
      res.status(400).json({ msg: "UpdatePIN Error", error });
    }
  }
  async updateUserBank(req, res) {
    try {
      const result = await userService.updateUserBank(
        req.body,
        req.userData.userId
      );
      console.log("D", result);
      res.status(result.status).json({ data: result });
    } catch (error) {
      res.status(400).json({ msg: "updateUserBank Error", error });
    }
  }

  async pinVerify(req, res) {
    try {
      const result = await userService.pinVerify(req.body);
      console.log("D", result);
      res.status(result.status).json({ responsecode: "00", data: result });
    } catch (error) {
      res.status(400).json({ responsecode: "10", msg: "VerifyPIN Error", error });
    }
  }
  async idVerify(req, res) {
    try {
      const result = await userService.idVerify(req.body);
      console.log("D", result);
      res.status(result.status).json({ responsecode: "00", data: result });
    } catch (error) {
      res.status(400).json({ responsecode: "01", msg: "idVerify Error", error });
    }
  }

  async changePassword(req, res) {
    try {
      const result = await userService.changePassword(req.body, req.userData.userId);
      res.status(result.status).json({ data: result });
    } catch (error) {
      res.status(400).json({ msg: "changePassword Error", error });
    }
  }

  async forgetPassword(req, res) {
    try {
      const result = await userService.forgetPassword(req.body);
      res.status(result.status).json({ data: result });
    } catch (error) {
      res.status(400).json({ msg: "Error for getting user", error });
    }
  }
}

module.exports = new userController();
