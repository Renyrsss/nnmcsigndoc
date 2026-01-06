import { memo, useRef, useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useStore from "../store/useStore";
import Button from "./Button";

const FaceCapture = memo(() => {
    const { t } = useTranslation();
    const { userPhoto, setUserPhoto } = useStore();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const [error, setError] = useState("");
    const [isMobile, setIsMobile] = useState(false);

    // Определяем мобильное устройство
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                    navigator.userAgent
                ) || window.innerWidth < 768
            );
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const stopCamera = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => {
                track.stop();
            });
            streamRef.current = null;
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
        setIsStreaming(false);
    }, []);

    const startCamera = useCallback(async () => {
        try {
            setError("");

            // Останавливаем предыдущий поток если есть
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
            }

            // Настройки для мобильных и десктопа
            const constraints = {
                video: {
                    facingMode: "user",
                    width: { ideal: isMobile ? 480 : 640 },
                    height: { ideal: isMobile ? 640 : 480 },
                },
                audio: false,
            };

            // На iOS нужно сначала запросить разрешение
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                const stream = await navigator.mediaDevices.getUserMedia(
                    constraints
                );

                streamRef.current = stream;

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;

                    // Важно для iOS Safari
                    videoRef.current.setAttribute("playsinline", "true");
                    videoRef.current.setAttribute("webkit-playsinline", "true");
                    videoRef.current.muted = true;

                    // Ждём загрузки метаданных видео
                    await new Promise((resolve, reject) => {
                        videoRef.current.onloadedmetadata = resolve;
                        videoRef.current.onerror = reject;
                        setTimeout(reject, 10000); // Таймаут 10 секунд
                    });

                    // Запускаем воспроизведение
                    await videoRef.current.play();
                    setIsStreaming(true);
                }
            } else {
                throw new Error("getUserMedia not supported");
            }
        } catch (err) {
            console.error("Camera error:", err);

            if (
                err.name === "NotAllowedError" ||
                err.name === "PermissionDeniedError"
            ) {
                setError(t("cameraNotAllowed"));
            } else if (
                err.name === "NotFoundError" ||
                err.name === "DevicesNotFoundError"
            ) {
                setError(t("cameraNotFound"));
            } else if (
                err.name === "NotReadableError" ||
                err.name === "TrackStartError"
            ) {
                setError(
                    t("cameraInUse") || "Камера занята другим приложением"
                );
            } else if (err.name === "OverconstrainedError") {
                // Пробуем с базовыми настройками
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({
                        video: true,
                        audio: false,
                    });
                    streamRef.current = stream;
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        videoRef.current.setAttribute("playsinline", "true");
                        videoRef.current.muted = true;
                        await videoRef.current.play();
                        setIsStreaming(true);
                    }
                    return;
                } catch {
                    setError(t("cameraError"));
                }
            } else {
                setError(t("cameraError"));
            }
        }
    }, [t, isMobile]);

    // Автоматически включаем камеру при загрузке (если нет фото)
    useEffect(() => {
        if (!userPhoto) {
            // Небольшая задержка для мобильных устройств
            const timer = setTimeout(() => {
                startCamera();
            }, 500);
            return () => clearTimeout(timer);
        }

        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    const capturePhoto = useCallback(() => {
        if (!videoRef.current || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const video = videoRef.current;
        const context = canvas.getContext("2d");

        // Используем реальные размеры видео
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;

        if (videoWidth === 0 || videoHeight === 0) {
            setError(t("cameraError"));
            return;
        }

        canvas.width = videoWidth;
        canvas.height = videoHeight;

        // Отзеркаливаем изображение для фронтальной камеры
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        context.drawImage(video, 0, 0, videoWidth, videoHeight);

        const photoData = canvas.toDataURL("image/jpeg", 0.8);
        setUserPhoto(photoData);
        stopCamera();
    }, [setUserPhoto, stopCamera, t]);

    const removePhoto = useCallback(() => {
        setUserPhoto("");
        setTimeout(() => {
            startCamera();
        }, 300);
    }, [setUserPhoto, startCamera]);

    // Обработка загрузки фото с устройства (альтернатива для проблемных устройств)
    const handleFileUpload = useCallback(
        (e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = canvasRef.current;
                    const maxSize = 640;

                    let width = img.width;
                    let height = img.height;

                    if (width > height && width > maxSize) {
                        height = (height * maxSize) / width;
                        width = maxSize;
                    } else if (height > maxSize) {
                        width = (width * maxSize) / height;
                        height = maxSize;
                    }

                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, width, height);

                    const photoData = canvas.toDataURL("image/jpeg", 0.8);
                    setUserPhoto(photoData);
                    stopCamera();
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        },
        [setUserPhoto, stopCamera]
    );

    return (
        <div className='mb-6'>
            <label className='block text-sm font-semibold leading-6 text-gray-900 mb-2'>
                {t("photo")} <span className='text-red-500'>*</span>
            </label>

            <div className='flex flex-col items-center gap-4'>
                <div className='relative w-48 h-48 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-300'>
                    {userPhoto ? (
                        <img
                            src={userPhoto}
                            alt='User photo'
                            className='w-full h-full object-cover'
                        />
                    ) : (
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            webkit-playsinline='true'
                            muted
                            className='w-full h-full object-cover'
                            style={{
                                display: isStreaming ? "block" : "none",
                                transform: "scaleX(-1)", // Зеркалим для естественного вида
                            }}
                        />
                    )}

                    {!userPhoto && !isStreaming && (
                        <div className='absolute inset-0 flex items-center justify-center text-gray-400'>
                            <svg
                                className='w-16 h-16'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={1.5}
                                    d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                                />
                            </svg>
                        </div>
                    )}
                </div>

                <canvas ref={canvasRef} className='hidden' />

                <div className='flex flex-wrap gap-3 justify-center'>
                    {!userPhoto && !isStreaming && (
                        <>
                            <Button onClick={startCamera}>
                                {t("startCamera")}
                            </Button>
                            {/* Альтернативная загрузка фото */}
                            <label className='cursor-pointer px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium'>
                                {t("uploadPhoto") || "Загрузить фото"}
                                <input
                                    type='file'
                                    accept='image/*'
                                    capture='user'
                                    onChange={handleFileUpload}
                                    className='hidden'
                                />
                            </label>
                        </>
                    )}

                    {isStreaming && (
                        <>
                            <Button onClick={capturePhoto}>
                                {t("takePhoto")}
                            </Button>
                            <Button variant='secondary' onClick={stopCamera}>
                                {t("cancel")}
                            </Button>
                        </>
                    )}

                    {userPhoto && (
                        <Button variant='secondary' onClick={removePhoto}>
                            {t("retakePhoto")}
                        </Button>
                    )}
                </div>

                {error && (
                    <div className='text-center'>
                        <p className='text-sm text-red-500 mb-2'>{error}</p>
                        {/* Показываем альтернативу при ошибке */}
                        {!userPhoto && (
                            <label className='cursor-pointer text-sm text-indigo-600 hover:text-indigo-800 underline'>
                                {t("uploadPhotoInstead") ||
                                    "Загрузить фото с устройства"}
                                <input
                                    type='file'
                                    accept='image/*'
                                    capture='user'
                                    onChange={handleFileUpload}
                                    className='hidden'
                                />
                            </label>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
});

FaceCapture.displayName = "FaceCapture";

export default FaceCapture;
