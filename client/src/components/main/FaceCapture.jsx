import React, { useEffect, useRef, useState } from "react";
import userData from "../../store/userData";
import { observer } from "mobx-react-lite";

const FaceCapture = observer(() => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [photo, setPhoto] = useState(null);
    const streamRef = useRef(null); // храним stream здесь, чтобы не вызывать ререндер
    const [reset, setReset] = useState(false);
    // Включаем камеру один раз при монтировании
    useEffect(() => {
        const startCamera = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: "user" }, // фронтальная камера
                });
                streamRef.current = mediaStream;
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } catch (err) {
                console.error("Ошибка при доступе к камере:", err);
            }
        };

        startCamera();

        return () => {
            // Отключаем камеру только при размонтировании
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
            }
        };
    }, [reset]);

    // Захват фото
    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;

            ctx.drawImage(videoRef.current, 0, 0);

            const dataUrl = canvas.toDataURL("image/png");
            // console.log(dataUrl);
            userData.userPhoto = dataUrl;
            setPhoto(dataUrl);
        }
    };

    // Сброс фото
    const resetPhoto = () => {
        userData.userPhoto = "";
        userData.changeAgreed(false);
        setPhoto(null);
        setReset(!reset);
    };

    return (
        <div className='flex flex-col items-center gap-4'>
            {!photo ? (
                <>
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className='rounded-2xl shadow-md w-80'
                    />
                    <button
                        onClick={capturePhoto}
                        className='px-4 py-2 bg-blue-600 text-white rounded-lg'>
                        Сделать фото
                    </button>
                </>
            ) : (
                <div className='flex flex-col items-center gap-2'>
                    <img
                        src={photo}
                        alt='Пациент'
                        className='rounded-2xl shadow-lg w-80'
                    />
                    <button
                        onClick={resetPhoto}
                        className='px-4 py-2 bg-gray-600 text-white rounded-lg'>
                        Сделать заново
                    </button>
                </div>
            )}

            <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
    );
});

export default FaceCapture;
