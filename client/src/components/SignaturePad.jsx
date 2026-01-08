import { memo, useRef, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import SignatureCanvas from "react-signature-canvas";
import useStore from "../store/useStore";
import Button from "./Button";

const SignaturePad = memo(() => {
    const { t } = useTranslation();
    const { signature, setSignature } = useStore();
    const sigPadRef = useRef(null);

    // Восстанавливаем подпись если она уже есть
    useEffect(() => {
        if (signature && sigPadRef.current) {
            sigPadRef.current.fromDataURL(signature);
        }
    }, []);

    const handleClear = useCallback(() => {
        if (sigPadRef.current) {
            sigPadRef.current.clear();
        }
        setSignature("");
    }, [setSignature]);

    // Сохраняем подпись при каждом окончании рисования
    const handleEnd = useCallback(() => {
        if (sigPadRef.current && !sigPadRef.current.isEmpty()) {
            const signatureData = sigPadRef.current.toDataURL("image/png");
            setSignature(signatureData);
        }
    }, [setSignature]);

    // Также сохраняем при касании (для мобильных)
    const handleTouchEnd = useCallback(() => {
        setTimeout(() => {
            if (sigPadRef.current && !sigPadRef.current.isEmpty()) {
                const signatureData = sigPadRef.current.toDataURL("image/png");
                setSignature(signatureData);
            }
        }, 100);
    }, [setSignature]);

    return (
        <div className='mb-6'>
            <label className='block text-sm font-semibold leading-6 text-gray-900 mb-2'>
                {t("drawSignature")} <span className='text-red-500'>*</span>
            </label>

            <div className='flex flex-col items-center gap-4'>
                <div
                    className='w-full max-w-md border-2 border-gray-300 rounded-lg bg-white overflow-hidden touch-none'
                    style={{ touchAction: "none" }}>
                    <SignatureCanvas
                        ref={sigPadRef}
                        canvasProps={{
                            className: "signature-canvas",
                            style: {
                                width: "100%",
                                height: "160px",
                                touchAction: "none",
                            },
                        }}
                        backgroundColor='white'
                        penColor='black'
                        onEnd={handleEnd}
                        onTouchEnd={handleTouchEnd}
                    />
                </div>

                <div className='flex gap-3'>
                    <Button variant='secondary' onClick={handleClear}>
                        {t("clearSignature")}
                    </Button>
                </div>

                {signature && (
                    <p className='text-sm text-green-600'>
                        {t("signatureSaved")}
                    </p>
                )}
            </div>
        </div>
    );
});

SignaturePad.displayName = "SignaturePad";

export default SignaturePad;
