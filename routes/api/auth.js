const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/auth");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
const { schemas } = require("../../schemas/user");

// signup
router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

// signin
router.post(
  "/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

router.patch(
  "/subscription/:id",
  authenticate,
  validateBody(schemas.subscriptionSchema),
  ctrlWrapper(ctrl.subscription)
);

module.exports = router;
