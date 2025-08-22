const express = require("express");
const nodemailer = require("nodemailer");
const multer = require("multer");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3003; // или любой другой порт

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({ storage: storage });

// Настройка транспортера для Nodemailer с использованием Яндекс Почты
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true для 465, false для других портов
    auth: {
        user: "mexelsend@gmail.com", // ваш email на Яндекс aidarmukhamedin@yandex.ru
        pass: "lifr ufym nyes tlrn", // ваш пароль allqaysmjeudveun
    },
});

// Роут для загрузки PDF файла
app.post("/send", upload.single("files"), (req, res) => {
    const pdfFile = req.file;
    const jsonData = JSON.parse(req.body.jsonData);
    if (!pdfFile) {
        return res.status(400).send("Файл PDF не был загружен");
    }

    // Далее можно добавить код для отправки этого файла по почте
    let mailOptions = {
        from: "tomosign@tomo.kz",
        to: jsonData.userMail,
        subject: `new message for  `,
        text: ``,
        attachments: [
            {
                filename: pdfFile.filename,
                path: pdfFile.path,
            },
        ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Ошибка при отправке почты:", error);
            return res.status(500).send("Ошибка при отправке PDF");
        }

        console.log("Email sent: " + info.response);
        res.send("PDF успешно отправлен по почте");
    });
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
