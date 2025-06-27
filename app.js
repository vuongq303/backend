var express = require("express");
var cors = require("cors");
var config = require("./config/config");
var cookieParser = require("cookie-parser");
var renderRouter = require("./routes/render");
const path = require("path");

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: config.client,
    credentials: true,
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", renderRouter);

app.use(function (req, res, next) {
  res.status(404).render('error', {
    status: 404,
    title: 'Không tìm thấy trang',
    message: 'Trang bạn cần tìm có thể đã bị xóa hoặc không tồn tại',
  });
});

app.use(function (err, req, res, next) {
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  console.error(err);
  res.status(500).render("error", {
    status: err.status || 500,
    title: 'Lỗi hệ thống',
    message: 'Hệ thống đã xảy ra sự cố, vui lòng thử lại sau',
  });
});

module.exports = app;
