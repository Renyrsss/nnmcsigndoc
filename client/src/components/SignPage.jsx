import React from "react";
import SignaturePad from "./SignaturePad/SignaturePad";
import { Field, Label, Switch } from "@headlessui/react";
import { useEffect, useState, useRef } from "react";
import UserDataStore from "../store/userData";
import { useTranslation } from "react-i18next";

function SignPage() {
    const { t, i18n } = useTranslation();
    const childRef = useRef();
    const [signature, setSignature] = useState(null);
    const [alertState, setalertState] = useState(false);

    const handleEnd = (signature) => {
        setSignature(signature);
    };
    const [agreed, setAgreed] = useState(false);
    const [submit, setSubmit] = useState(false);

    useEffect(() => {
        UserDataStore.changeAgreed(agreed);
    }, [agreed]);

    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }

    function validateData() {
        if (
            UserDataStore.user.fio &&
            UserDataStore.user.iin &&
            UserDataStore.user.data &&
            UserDataStore.user.Email
        ) {
            console.log(UserDataStore.user.fio);
            setSubmit(true);
            console.log("submit is activated");
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
                <p className="font-medium text-center">{t("alertField")}</p>
            </div>
        );
    }

    function loadingBox() {
        return (
            <>
                <div className=" fixed w-full h-full bg-black opacity-20 z-10"></div>

                <div className="fixed top-1/2 left-1/2 -translate-x-1/2">
                    <div role="status">
                        <svg
                            aria-hidden="true"
                            className="inline w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="-mt-20 pt-20 ">
                {UserDataStore.loading ? loadingBox() : " "}
                <div className="mx-auto mt-16 max-w-xl sm:mt-20 sd:mt-24">
                    {alertState ? alertBox() : ""}
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-10">
                            {t("sign")}
                        </h2>
                    </div>
                    <div
                        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                        aria-hidden="true"
                    >
                        <div
                            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-50 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                            }}
                        />
                    </div>
                    <SignaturePad
                        onEnd={handleEnd}
                        agreed={agreed}
                        agreedFunc={setAgreed}
                        submit={submit}
                        submitFunc={setSubmit}
                    />
                    {signature && (
                        <div>
                            <h2>Saved Signature</h2>
                            <img src={signature} alt="Client signature" />
                        </div>
                    )}
                    <Field
                        as="div"
                        className="flex gap-x-4 sm:col-span-2 sd:justify-center"
                    >
                        <div className="flex h-6 items-center">
                            <Switch
                                checked={agreed}
                                onChange={setAgreed}
                                className={classNames(
                                    agreed ? "bg-indigo-600" : "bg-gray-200",
                                    "flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                )}
                            >
                                <span className="sr-only">
                                    Agree to policies
                                </span>
                                <span
                                    aria-hidden="true"
                                    className={classNames(
                                        agreed
                                            ? "translate-x-3.5"
                                            : "translate-x-0",
                                        "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                                    )}
                                />
                            </Switch>
                        </div>
                        <Label className="text-sm leading-6 text-gray-600">
                            {t("agree")}
                        </Label>
                    </Field>
                    <div className="mt-10">
                        <p
                            onClick={(e) => {
                                if (agreed) {
                                    UserDataStore.chagneLoading(true);
                                    validateData();
                                }
                            }}
                            className={`block w-full rounded-md sd:w-40 sd:mx-auto ${
                                agreed ? "bg-indigo-600" : " bg-gray-600"
                            } px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm ${
                                agreed ? "bg-indigo-500" : " bg-gray-500"
                            } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                                agreed ? "bg-indigo-600" : " bg-gray-600"
                            } cursor-pointer`}
                        >
                            {t("sign")}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignPage;
