import { useEffect, useState, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Field, Label, Switch } from "@headlessui/react";
import SignaturePad from "../SignaturePad/SignaturePad";
import UserDataStore from "../../store/userData";
import userData from "../../store/userData";
// import AccordionBody from "../AccordionBody";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Example() {
    const childRef = useRef();
    const [signature, setSignature] = useState(null);

    const handleEnd = (signature) => {
        setSignature(signature);
    };
    const [agreed, setAgreed] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [usersData, setUserData] = useState({
        name: "",
        surName: "",
        thirthName: "",
        userSide: "",
        Email: "",
        cardModel: "",
        cardCount: "",
    });

    useEffect(() => {
        UserDataStore.changeUser(usersData);
    }, [usersData]);
    useEffect(() => {
        UserDataStore.changeAgreed(agreed);
    }, [agreed]);
    return (
        <div className="isolate bg-white px-6 py-24 sm:py-24 lg:px-8">
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
                            Имя
                        </label>
                        <div className="mt-2.5">
                            <input
                                onChange={(e) => {
                                    setUserData({
                                        ...usersData,
                                        name: e.target.value,
                                    });
                                }}
                                value={usersData.name}
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
                            Фамилия
                        </label>
                        <div className="mt-2.5">
                            <input
                                onChange={(e) => {
                                    setUserData({
                                        ...usersData,
                                        surName: e.target.value,
                                    });
                                }}
                                value={usersData.surName}
                                type="text"
                                name="last-name"
                                id="last-name"
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 mb-6">
                    <div>
                        <label
                            htmlFor="first-name"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                            Очество
                        </label>
                        <div className="mt-2.5">
                            <input
                                onChange={(e) => {
                                    setUserData({
                                        ...usersData,
                                        thirthName: e.target.value,
                                    });
                                }}
                                value={usersData.thirthName}
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
                                type="text"
                                name="last-name"
                                id="last-name"
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
