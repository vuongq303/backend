var express = require("express");
var router = express.Router();
const emailTrans = require("../middleware/email");
const env = require("../config/env");

router.get("/", function (req, res) {
    res.status(200).render("index");
});

router.get("/lien-he", function (req, res) {
    res.status(200).render('lien-he');
});

router.get("/tien-do", function (req, res) {
    res.status(200).render('tien-do');
});

router.get("/vi-tri", function (req, res) {
    res.status(200).render('vi-tri');
});

router.get("/tin-tuc", function (req, res) {
    res.status(200).render('tin-tuc');
});

router.get("/gia-ban", function (req, res) {
    res.status(200).render('gia-ban');
});

router.post("/send-email", async function (req, res) {
    var name = req.body.fullname || "";
    var tel = req.body.phone || "";
    var email = req.body.email || "";

    try {
        const mailOptions = {
            from: env.EMAIL_USER,
            to: env.EMAIL_RECEIVE,
            subject: "Đăng kí nhận thông tin ",
            text: `Tên: ${name}\nSố điện thoại: ${tel}\nEmail: ${email}\n`,
        };

        await emailTrans.sendMail(mailOptions);
        return res.status(200).json({
            message: "Đăng kí nhận thông tin thành công",
            status: true,
        });
    } catch (error) {
        console.error("Lỗi gửi email:", error);
        return res.status(500).json({
            message:
                "Lỗi đăng kí, vui lòng liên hệ qua số điện thoại để được hỗ trợ sớm",
            status: false,
        });
    }
});

module.exports = router;
