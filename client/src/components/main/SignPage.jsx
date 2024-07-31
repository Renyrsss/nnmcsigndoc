import React from "react";
import SignaturePad from "../SignaturePad/SignaturePad";
import { Field, Label, Switch } from "@headlessui/react";
import { useEffect, useState, useRef } from "react";
import UserDataStore from "../../store/userData";
function SignPage() {
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

    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }

    return (
        <div className="mx-auto mt-16 max-w-xl sm:mt-20">
            <SignaturePad
                onEnd={handleEnd}
                agreed={agreed}
                agreedFunc={setAgreed}
                submit={submit}
                submitFunc={setSubmit}
                setUserData={setUserData}
            />
            {signature && (
                <div>
                    <h2>Saved Signature</h2>
                    <img src={signature} alt="Client signature" />
                </div>
            )}
            <Field as="div" className="flex gap-x-4 sm:col-span-2">
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
                    я беру ответственность за{" "}
                    <a href="#" className="font-semibold text-indigo-600">
                        картридж&nbsp;модель - {usersData.cardModel} , кол-во -{" "}
                        {usersData.cardCount}
                    </a>
                    .
                </Label>
            </Field>
            <div className="mt-10">
                <p
                    onClick={(e) => {
                        setSubmit(true);
                    }}
                    className={`block w-full rounded-md ${
                        agreed ? "bg-indigo-600" : " bg-gray-600"
                    } px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm ${
                        agreed ? "bg-indigo-500" : " bg-gray-500"
                    } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                        agreed ? "bg-indigo-600" : " bg-gray-600"
                    } cursor-pointer`}
                >
                    Взять картридж
                </p>
            </div>
        </div>
    );
}

export default SignPage;
