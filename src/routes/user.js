const { Router } = require("express");
const isAuth = require("../middleware/is-user");
const userController = require("../controllers/user");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
const isBusiness = require("../middleware/is-business");

const router = Router({ strict: true });

const s3Client = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: "AKIAQHH6SRR475V7VN65", 
    secretAccessKey: "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", 
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: "vibed",
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString()}_${file.originalname}`);
    },
  }),
});

// Rutas
router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/auth-user", isAuth, userController.getAuthUser);
router.put(
  "/:userId",
  isAuth,
  upload.single("image"),
  userController.updateUser
);
router.get("/all-users", isBusiness, userController.getUsers);
router.post('/send-requests', isAuth, userController.sendRequests);
router.get('/check-application/:userId', isAuth, userController.checkApplication);
router.post('/google-login', userController.googleLogin);
router.post("/google-register", userController.googleRegister);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password/:token', userController.resetPassword);


module.exports = router;
