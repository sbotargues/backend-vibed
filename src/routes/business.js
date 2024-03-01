const { Router } = require("express");
const isAuth = require("../middleware/is-business");
const isUser = require("../middleware/is-user");
const businessController = require("../controllers/business");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");

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
router.get(
  "/applied-users/:businessId",
  isAuth,
  businessController.getUsersAppliedToBusiness
);
router.post("/login", businessController.loginBusiness);
router.post("/register", businessController.registerBusiness);
router.get("/auth-business", isAuth, businessController.getAuthBusiness);
router.put(
  "/:businessId",
  isAuth,
  upload.single("image"),
  businessController.updateBusiness
);
router.get("/all-businesses", isUser, businessController.getAllBusinesses);
module.exports = router;
