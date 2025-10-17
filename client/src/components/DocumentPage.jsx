import React from "react";
import AccordionBody from "./AccordionBody";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import userData from "../store/userData";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
const DocumentPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (userData?.user?.fio == "") {
            navigate("/"); // переход на главную страницу
        }
    }, [userData, navigate]);
    const { t, i18n } = useTranslation();

    return (
        <div className='mx-auto mt-16 max-w-xl sm:mt-16 sd:mt-20'>
            <div
                className='absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]'
                aria-hidden='true'>
                <div
                    className='relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]'
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                />
            </div>
            <div className='mx-auto max-w-2xl text-center mb-10'>
                <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                    {t("nextBtn1")}
                </h2>
            </div>
            <AccordionBody />

            <Link to='/SignPage'>
                <button
                    className={`  mb-4 block w-44 rounded-md  bg-indigo-600 mx-auto   px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm bg-indigo-500  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-indigo-600  cursor-pointer mt-10`}>
                    {t("sign")}
                </button>
            </Link>
        </div>
    );
};

export default DocumentPage;
