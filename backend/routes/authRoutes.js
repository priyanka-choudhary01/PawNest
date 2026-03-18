const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const crypto = require("crypto")

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

module.exports = router;