import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useStore from "../store/useStore";
import Layout from "../components/Layout";
import Input from "../components/Input";
import Button from "../components/Button";
import Alert from "../components/Alert";
import LanguageSelector from "../components/LanguageSelector";
import config from "../config";

const HomePage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { userData, setUserData, setFormCompleted, validateForm } =
        useStore();
    const [alert, setAlert] = useState(null);

    const handleChange = useCallback(
        (field) => (e) => {
            setUserData({ [field]: e.target.value });
        },
        [setUserData]
    );

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();

            if (!validateForm()) {
                let message = t("alertField");

                if (!userData.fio.trim()) {
                    message = t("fillFio");
                } else if (
                    userData.iin.trim().length < config.VALIDATION.IIN_LENGTH
                ) {
                    message = t("fillIin");
                } else if (
                    userData.phone.trim().length <
                    config.VALIDATION.MIN_PHONE_LENGTH
                ) {
                    message = t("fillPhone");
                }

                setAlert({ message, type: "warning" });
                return;
            }

            setFormCompleted(true);
            navigate("/document");
        },
        [validateForm, userData, t, setFormCompleted, navigate]
    );

    return (
        <Layout>
            <div className='isolate px-6 py-16 lg:px-8'>
                {alert && (
                    <Alert
                        message={alert.message}
                        type={alert.type}
                        onClose={() => setAlert(null)}
                    />
                )}

                <div className='mx-auto max-w-2xl text-center'>
                    <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                        {t("sign")}
                    </h1>
                    <p className='mt-2 text-lg leading-8 text-gray-600'>
                        {t("fillForm")}
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className='mx-auto mt-10 max-w-xl'>
                    <LanguageSelector />

                    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                        <Input
                            label={t("fio")}
                            name='fio'
                            value={userData.fio}
                            onChange={handleChange("fio")}
                            placeholder='Мухамедин Айдар Алибекулы'
                            required
                            className='sm:col-span-2'
                        />

                        <Input
                            label={t("iin")}
                            name='iin'
                            type='text'
                            inputMode='numeric'
                            maxLength={12}
                            value={userData.iin}
                            onChange={handleChange("iin")}
                            placeholder='123456789012'
                            required
                        />

                        <Input
                            label={t("phone")}
                            name='phone'
                            type='tel'
                            value={userData.phone}
                            onChange={handleChange("phone")}
                            placeholder='+7 777 123 4567'
                            required
                        />
                    </div>

                    <div className='mt-10'>
                        <Button
                            type='submit'
                            className='w-full sm:w-auto sm:mx-auto sm:block sm:px-8'>
                            {t("nextBtn1")}
                        </Button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default HomePage;
