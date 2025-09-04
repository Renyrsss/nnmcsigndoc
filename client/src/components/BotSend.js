import axios from "axios";

const _TOKEN = "6515245927:AAExFk8USVwQ2IVcwtqszfutM-hqgbfp0Dg";
const _BOTAPI = `https://api.telegram.org/bot${_TOKEN}/sendMessage`;
async function BotSend(payload) {
    let massage = `<b>ФИО:</b> ${payload.FIO}\n<b>ИИН:</b> ${payload.IIN}\n<b>Телефон:</b> ${payload.phone}\n<b>Почта:</b> ${payload.email}`;

    try {
        await axios
            .post(_BOTAPI, {
                chat_id: "-4806315112",
                parse_mode: "html",
                text: massage,
            })
            .then((res) => {
                console.log(res);
            });
    } catch (e) {
        console.log(e);
    }
}

export default BotSend;
