import React from "react";
import SignaturePad from "./SignaturePad/SignaturePad";
import { Field, Label, Switch } from "@headlessui/react";
import { useEffect, useState, useRef } from "react";
import UserDataStore from "../store/userData";
function SignPage() {
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
                <p className="font-medium text-center">
                    Пожалуйста заполните все поля{" "}
                </p>{" "}
            </div>
        );
    }

    return (
        <div className="mx-auto mt-16 max-w-xl sm:mt-20 sd:mt-24">
            {alertState ? alertBox() : ""}
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-10">
                    Подпишите документ
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
                        <span className="sr-only">Agree to policies</span>
                        <span
                            aria-hidden="true"
                            className={classNames(
                                agreed ? "translate-x-3.5" : "translate-x-0",
                                "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                            )}
                        />
                    </Switch>
                </div>
                <Label className="text-sm leading-6 text-gray-600">
                    я согласен с условиями документа .
                </Label>
            </Field>
            <div className="mt-10">
                <p
                    onClick={(e) => {
                        if (agreed) validateData();
                    }}
                    className={`block w-full rounded-md sd:w-40 sd:mx-auto ${
                        agreed ? "bg-indigo-600" : " bg-gray-600"
                    } px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm ${
                        agreed ? "bg-indigo-500" : " bg-gray-500"
                    } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                        agreed ? "bg-indigo-600" : " bg-gray-600"
                    } cursor-pointer`}
                >
                    Подписать
                </p>
            </div>
        </div>
    );
}

export default SignPage;
