import { useEffect, useState, useRef } from "react";
import UserDataStore from "../store/userData";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Alert } from "@material-tailwind/react";

export default function Example() {
    const navigate = useNavigate();
    let [alertState, setalertState] = useState(false);
    const [usersData, setUserData] = useState({
        fio: "",
        data: "",
        iin: "",
        adress: "",
        phone: "",
        Email: "",
        numberUcard: "",
        dateUcard: "",
        cardSide: "",
    });

    function validateData() {
        if (
            usersData.fio.trim() &&
            usersData.data.trim() &&
            usersData.iin.trim() &&
            usersData.adress.trim() &&
            usersData.phone.trim() &&
            usersData.numberUcard.trim() &&
            usersData.dateUcard.trim() &&
            usersData.Email.trim().includes("@") &&
            usersData.cardSide.trim() &&
            usersData.cardSide != "Выберите"
        ) {
            console.log("enter the field");
            navigate("/Document");
        } else {
            setalertState(true);
            setTimeout(() => {
                setalertState(false);
            }, 2000);
        }
    }

    function alertBox() {
        return (
            <div
                className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 fixed w-90 left-1/2 -translate-x-1/2 top-1/3  box-border "
                role="alert"
            >
                <p className="font-medium text-center">
                    {/* Пожалуйста заполните все поля{" "} */}
                    {usersData.Email.trim().includes("@")
                        ? "Пожалуйста заполните все поля "
                        : "Введите корректные данные почты "}
                </p>{" "}
            </div>
        );
    }
    useEffect(() => {
        UserDataStore.changeUser(usersData);
    }, [usersData]);

    return (
        <div className="isolate bg-white px-6 py-24 sm:py-24 lg:px-8">
            {alertState ? alertBox() : ""}
            <div
                className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                aria-hidden="true"
            >
                <div
                    className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                />
            </div>
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Подпишите документ
                </h2>
                <p className="mt-2 text-lg leading-8 text-gray-600"></p>
            </div>
            <form
                action="#"
                method="POST"
                className="mx-auto mt-16 max-w-xl sm:mt-20"
            >
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2  mb-6">
                    <div>
                        <label
                            htmlFor="first-name"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                            ФИО
                        </label>
                        <div className="mt-2.5">
                            <input
                                onChange={(e) => {
                                    setUserData({
                                        ...usersData,
                                        fio: e.target.value,
                                    });
                                }}
                                value={usersData.fio}
                                type="text"
                                name="first-name"
                                id="first-name"
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="last-name"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                            Дата рождения
                        </label>
                        <div className="mt-2.5">
                            <input
                                onChange={(e) => {
                                    setUserData({
                                        ...usersData,
                                        data: e.target.value,
                                    });
                                }}
                                value={usersData.data}
                                type="date"
                                name="last-name"
                                id="last-name"
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>

                <div className=" flex flex-col items-end mb-4 sm:justify-between sm:flex-row">
                    <div className="w-full sm:basis-1/4 ">
                        <label
                            htmlFor="first-name"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                            удостоверение личности (паспорт) №
                        </label>
                        <div className="mt-2.5">
                            <input
                                onChange={(e) => {
                                    setUserData({
                                        ...usersData,
                                        numberUcard: e.target.value,
                                    });
                                }}
                                value={usersData.numberUcard}
                                type="number"
                                name="first-name"
                                id="first-name"
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="w-full sm:basis-1/4 ">
                        <label
                            htmlFor="last-name"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                            дата выдачи документа
                        </label>
                        <div className="mt-2.5">
                            <input
                                onChange={(e) => {
                                    setUserData({
                                        ...usersData,
                                        dateUcard: e.target.value,
                                    });
                                }}
                                value={usersData.dateUcard}
                                type="date"
                                name="last-name"
                                id="last-name"
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="w-full sm:basis-1/4 ">
                        <label
                            htmlFor="last-name"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                            орган выдавший документ
                        </label>
                        <div className="mt-2.5">
                            <select
                                onChange={(e) => {
                                    setUserData({
                                        ...usersData,
                                        cardSide: e.target.value,
                                    });
                                }}
                                value={usersData.cardSide}
                                id="country"
                                name="country"
                                className="block w-full rounded-md border-0 px-3.5 py-2   text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                <option defaultValue>Выберите</option>
                                <option>МВД РК</option>
                                <option>МЮ РК</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2  mb-6">
                    <div>
                        <label
                            htmlFor="first-name"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                            ИИН
                        </label>
                        <div className="mt-2.5">
                            <input
                                onChange={(e) => {
                                    setUserData({
                                        ...usersData,
                                        iin: e.target.value,
                                    });
                                }}
                                value={usersData.iin}
                                type="number"
                                name="first-name"
                                id="first-name"
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="last-name"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                            Адрес
                        </label>
                        <div className="mt-2.5">
                            <input
                                onChange={(e) => {
                                    setUserData({
                                        ...usersData,
                                        adress: e.target.value,
                                    });
                                }}
                                value={usersData.adress}
                                type="text"
                                name="last-name"
                                id="last-name"
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 mb-16">
                    <div>
                        <label
                            htmlFor="first-name"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                            Телефон
                        </label>
                        <div className="mt-2.5">
                            <input
                                onChange={(e) => {
                                    setUserData({
                                        ...usersData,
                                        phone: e.target.value,
                                    });
                                }}
                                value={usersData.phone}
                                type="tel"
                                name="first-name"
                                id="first-name"
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="last-name"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                            Email
                        </label>
                        <div className="mt-2.5">
                            <input
                                onChange={(e) => {
                                    setUserData({
                                        ...usersData,
                                        Email: e.target.value,
                                    });
                                }}
                                value={usersData.Email}
                                type="email"
                                name="last-name"
                                id="last-name"
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        validateData();
                    }}
                    className={`block w-44 rounded-md  mx-auto bg-indigo-600  px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm bg-indigo-500  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-indigo-600  cursor-pointer`}
                >
                    Просмотр документа
                </button>
            </form>
        </div>
    );
}
