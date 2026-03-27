const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const crypto = require("crypto")
const sendMail = require("../utils/sendMail");

router.post("/register", async(req,res)=>{
try {
    const { name, email, password} = req.body;

    if (!name || !email  || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email });

    if (user) return res.status(404).json({ message: "User already exists" });

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });
    await newUser.save();
    return res.json({ message: "User Created" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
}
});


router.post("/login", async(req,res)=>{
try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });
    const user = await User.findOne({ email });
    
    if (!user || user===null) {
    
      return res.status(404).json({ message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({message:"Invalid Credentials"});

    const token = crypto.randomBytes(32).toString("hex");
    await User.updateOne({_id: user._id},{token});
    return res.json({token:token});
  } catch (err) {
     return res.status(500).json({ message: err.message });
  }
});

router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ message: "Email is required" });

    let user = await User.findOne({ email });

    if (!user) {
     return res.status(404).json({ message: "User does not exist" });
    }

    if (user.otpLastSent && Date.now() - user.otpLastSent < 60000) {
      return res.status(400).json({
        message: "Wait before requesting another OTP"
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedOTP = await bcrypt.hash(otp, 10);

    user.otp = hashedOTP;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    user.otpLastSent = Date.now();

    await user.save();
    await sendMail(email, otp);
    return res.json({ message: "OTP sent" });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});
router.post("/resend-otp", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    if (user.otpLastSent && Date.now() - user.otpLastSent < 60000) {
      return res.status(400).json({
        message: "Wait before requesting another OTP"
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedOTP = await bcrypt.hash(otp, 10);

    user.otp = hashedOTP;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    user.otpLastSent = Date.now();

    await user.save();
     await sendMail(email, otp);

    return res.json({ message: "OTP resent" });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp)
      return res.status(400).json({ message: "All fields required" });

    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    if (!user.otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const isMatch = await bcrypt.compare(otp, user.otp);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid OTP" });

    user.otp = null;
    user.otpExpiry = null;

    const token = crypto.randomBytes(32).toString("hex");
    user.token = token;

    await user.save();

    return res.json({ token });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;