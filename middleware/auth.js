const CryptoJS = require("crypto-js")
module.exports = (req,res,next) => {
    try {
        const authHeader = req.get("Authorization");
        if(!authHeader) {
            throw new Error("Authorization missing")
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new Error ("Token missing")
        }
        const decryptedBuffer = CryptoJS.AES.decrypt(token,"Random Secret Key e.g.wertgyrhue98et57483");
        const decryptedString = decryptedBuffer.toString(CryptoJS.enc.Utf8);
        console.log(token);
        const tokenData = JSON.parse(decryptedString);
        req.isAuth = true;
        req.userId = tokenData.userId;
        req.email = tokenData.email;
        return next();
    } catch (error) {
        console.log(error);
        req.isAuth = false;
        return next();
    }
}