import { memo, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import SignatureCanvas from "react-signature-canvas";
import useStore from "../store/useStore";
import Button from "./Button";

const SignaturePad = memo(() => {
    const { t } = useTranslation();
    const { signature, setSignature } = useStore();
    const sigPadRef = useRef(null);

    const handleClear = useCallback(() => {
        if (sigPadRef.current) {
            sigPadRef.current.clear();
        }
        setSignature("");
    }, [setSignature]);

    const handleEnd = useCallback(() => {
        if (sigPadRef.current && !sigPadRef.current.isEmpty()) {
            const signatureData = sigPadRef.current.toDataURL("image/png");
            setSignature(signatureData);
        }
    }, [setSignature]);

    return (
        <div className='mb-6'>
            <label className='block text-sm font-semibold leading-6 text-gray-900 mb-2'>
                {t("drawSignature")} <span className='text-red-500'>*</span>
            </label>

            <div className='flex flex-col items-center gap-4'>
                <div className='w-full max-w-md border-2 border-gray-300 rounded-lg bg-white overflow-hidden'>
                    <SignatureCanvas
                        ref={sigPadRef}
                        canvasProps={{
                            className: "w-full h-40",
                            style: { width: "100%", height: "160px" },
                        }}
                        backgroundColor='white'
                        penColor='black'
                        onEnd={handleEnd}
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
