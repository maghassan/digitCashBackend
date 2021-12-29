const express = require("express");
const userController = require("../controllers/userController");
const middlewares = require("../middlewares");

const Router = express.Router();

Router.get("/users", userController.getUsers);
Router.get("/user", middlewares.isLoggedIn, userController.getOne);

Router.post(
  "/updateUserPin",
  middlewares.isLoggedIn,
  userController.updateUserPin
);
Router.post(
  "/updateUserBank",
  middlewares.isLoggedIn,
  userController.updateUserBank
);
Router.post("/pinVerify", middlewares.isLoggedIn, userController.pinVerify);
Router.post("/idVerify", middlewares.isLoggedIn, userController.idVerify);
Router.post("/userWallet", middlewares.isLoggedIn, userController.userWallet);
Router.post("/doWithdrawal", middlewares.isLoggedIn, userController.doWithdrawal);
Router.post("/user_plans", middlewares.isLoggedIn, userController.user_plans);
Router.post("/user_withdraw", middlewares.isLoggedIn, userController.user_withdraw);
Router.post("/invest_transactions", middlewares.isLoggedIn, userController.invest_transactions);
Router.post("/invest_transactions_plan", middlewares.isLoggedIn, userController.invest_transactions_plan);
Router.post("/plans", middlewares.isLoggedIn, userController.plans);
Router.post("/add_user_plans", middlewares.isLoggedIn, userController.add_user_plans);
Router.post("/user_plans_detail", middlewares.isLoggedIn, userController.user_plans_detail);
Router.post("/update_plan_detail", middlewares.isLoggedIn, userController.update_plan_detail);
Router.post("/update_user_pin", middlewares.isLoggedIn, userController.update_user_pin);

Router.post(
  "/changePassword",
  middlewares.isLoggedIn,
  userController.changePassword
);
Router.post("/forgetPassword", userController.forgetPassword);

Router.post("/register", middlewares.validateRegister, userController.register);
Router.post("/login", userController.login);
Router.post("/re-auth", userController.auth);

module.exports = Router;
