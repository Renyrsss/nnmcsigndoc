import React, {
    useEffect,
    useRef,
    useState,
    useImperativeHandle,
    forwardRef,
} from "react";
import SignatureCanvas from "react-signature-canvas";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import PDFDocument from "./PDFDoc";
import userData from "../../store/userData";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignaturePad.css";
import { useTranslation } from "react-i18next";
import BotSend from "../BotSend";
import { observer } from "mobx-react-lite";

const SignaturePad = observer(
    ({
        onEnd,
        takeCard,
        agreed,
        agreedFunc,
        submit,
        submitFunc,
        setUserData,
    }) => {
        const navigate = useNavigate();
        const sigCanvas = useRef({});
        const [signature, setSignature] = useState(null);
        const [loading, setLoading] = useState(true);
        const [signSuccess, setsignSuccess] = useState(false);

        const clear = (e) => {
            e.preventDefault();
            userData.userPhoto = "";
            sigCanvas.current.clear();
            setSignature(null);
            agreedFunc(false);
        };
        const { t, i18n } = useTranslation();
        useEffect(() => {
            if (userData.userPhoto == "" || sigCanvas.current.isEmpty()) {
                console.log(userData.userPhoto);

                agreedFunc(false);
                return;
            }
            if (agreed) {
                console.log("user data is agreed");
                if (sigCanvas.current.isEmpty()) {
                    alert("Please provide a signature first.");
                    return;
                }
                const signature = sigCanvas.current
                    .getTrimmedCanvas()
                    .toDataURL("image/png");
                setSignature(signature);
            }
        }, [agreed]);

        useEffect(
            (e) => {
                // console.log('use effect is worked' , agreed , userData.submitBtn);
                if (submit) {
                    generateAndSendPDF(e);
                } else {
                    // console.log(`error + ${agreed } , ${userData.submitBtn}`);
                    return;
                }
            },
            [submit]
        );
        const generateAndSendPDF = async (e) => {
            console.log("the btn to send is pressed");
            // e.preventDefault()
            if (sigCanvas.current.isEmpty()) {
                alert("Please provide a signature first.");
                return;
            }

            const signature = sigCanvas.current
                .getTrimmedCanvas()
                .toDataURL("image/png");
            const pdfBlob = await pdf(
                <PDFDocument signature={signature} />
            ).toBlob();

            const formData = new FormData();
            formData.append(
                "files",
                pdfBlob,
                `${userData.user.fio.trim()}.pdf`
            );

            const jsonData = {
                userName: userData.user.fio,
                userSide: userData.user.iin,
                // userSurname: userData.user.data,
                userMail: userData.user.Email,
            };
            console.log(pdfBlob);
            formData.append("jsonData", JSON.stringify(jsonData));
            try {
                console.log(pdf(<PDFDocument signature={signature} />));
                // const response = await axios.post('http://192.168.101.25:1337/api/bahadors', jsonData );
                axios
                    .post("http://192.168.101.25:1339/api/upload/", formData) //192.168.13.147  localhost
                    .then((res) => {
                        const fileId = res.data[0].id;
                        console.log(jsonData);
                        axios
                            .post(
                                `http://192.168.101.25:1339/api/podpisannye-dokumenties`,
                                {
                                    //192.168.13.147   localhost
                                    data: {
                                        userName: userData.user.fio,
                                        useriin: userData.user.iin,
                                        userPhone: userData.user.phone,
                                        userEmail: userData.user.Email,
                                        userDoc: fileId,
                                    },
                                }
                            )
                            .then((e) => {
                                console.log(jsonData);
                                //192.168.13.147  localhost
                                fetch("http://192.168.101.25:3003/send", {
                                    method: "POST",
                                    // headers: {
                                    // 'Content-Type': 'application/json'
                                    // },
                                    body: formData,
                                })
                                    .then(() => {
                                        BotSend({
                                            FIO: userData.user.fio,
                                            IIN: userData.user.iin,
                                            phone: userData.user.phone,
                                            email: userData.user.Email,
                                        });
                                    })
                                    .then(() => {
                                        // setUserData({
                                        //     name: "",
                                        //     surName: "",
                                        //     userSide: "",
                                        //     Email: "",
                                        // });
                                        sigCanvas.current.clear();
                                        setSignature(null);
                                        agreedFunc(false);
                                        submitFunc(false);
                                        setsignSuccess(true);
                                        // navigate("/");
                                        setTimeout(() => {
                                            setsignSuccess(false);
                                            userData.chagneLoading(false);
                                            navigate("/");
                                        }, 2000);
                                    })
                                    // .then(response => response.json())
                                    // .then(data => {
                                    //       if (data.success) {
                                    //             alert('Email sent successfully!');
                                    //       } else {
                                    //             alert('Failed to send email.');
                                    //       }
                                    // })
                                    .catch((error) => {
                                        console.error("Error:", error);
                                        alert("An error occurred.");
                                    });
                            });
                    });
            } catch (error) {
                console.error("Error sending PDF to server:", error);
                alert("An error occurred while sending PDF to the server");
            }
        };

        function alertSuccess() {
            return (
                <div
                    className='p-4 font-bold  mb-4 text-xl text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 fixed w-90 left-1/2 -translate-x-1/2 top-1/3  box-border z-50'
                    role='alert'>
                    <span className='font-medium'>{t("succ")}</span>
                </div>
            );
        }

        return (
            <div>
                {signSuccess ? alertSuccess() : ""}
                <p className='text-center'>Нарисуйте свою подпись</p>
                <div className='flex justify-center '>
                    <SignatureCanvas
                        ref={sigCanvas}
                        penColor='blue'
                        canvasProps={{
                            width: "300px",
                            height: "140px",
                            className: "sigCanvas",
                        }}
                    />
                </div>
                <div className='flex justify-between  mb-8  px-6  sm:flex-wrap sd:gap-2 sd:items-center sd:flex-col'>
                    <button
                        className={`block w-44 rounded-md  bg-indigo-600  px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm bg-indigo-500  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-indigo-600  cursor-pointer`}
                        onClick={clear}>
                        {t("reload")}
                    </button>

                    <PDFDownloadLink
                        document={<PDFDocument signature={signature} />}
                        fileName='signature.pdf'
                        className={`block w-44 rounded-md  bg-indigo-600  px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm bg-indigo-500  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-indigo-600  cursor-pointer`}>
                        {({ loading }) =>
                            loading ? "Generating PDF..." : t("lookdoc")
                        }
                    </PDFDownloadLink>
                </div>
            </div>
        );
    }
);

export default SignaturePad;
