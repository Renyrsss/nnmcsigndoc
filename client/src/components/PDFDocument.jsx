import {
    Document,
    Page,
    Text,
    View,
    Image,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";

// Регистрируем шрифт с поддержкой кириллицы (Google Fonts CDN)
Font.register({
    family: "Roboto",
    fonts: [
        {
            src: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf",
            fontWeight: "normal",
        },
        {
            src: "https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlvAx05IsDqlA.ttf",
            fontWeight: "bold",
        },
    ],
});

const styles = StyleSheet.create({
    page: {
        fontFamily: "Roboto",
        fontSize: 10,
        padding: 30,
        lineHeight: 1.5,
    },
    header: {
        marginBottom: 15,
        borderBottom: "1px solid #000",
        paddingBottom: 10,
    },
    title: {
        fontSize: 11,
        fontWeight: "bold",
        textAlign: "center",
    },
    section: {
        marginBottom: 10,
    },
    paragraph: {
        textAlign: "justify",
        marginBottom: 6,
        fontSize: 9,
    },
    userInfo: {
        backgroundColor: "#f5f5f5",
        padding: 8,
        marginBottom: 10,
    },
    userInfoRow: {
        flexDirection: "row",
        marginBottom: 3,
    },
    userInfoLabel: {
        fontSize: 9,
        fontWeight: "bold",
        width: 80,
    },
    userInfoValue: {
        fontSize: 9,
    },
    footer: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    column: {
        width: "48%",
    },
    columnTitle: {
        fontSize: 9,
        fontWeight: "bold",
        marginBottom: 8,
        borderBottom: "1px solid #000",
        paddingBottom: 4,
    },
    label: {
        fontSize: 8,
        color: "#555",
        marginBottom: 1,
    },
    value: {
        fontSize: 9,
        marginBottom: 5,
    },
    companyInfo: {
        fontSize: 8,
        marginBottom: 3,
    },
    photoSignatureRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
        marginBottom: 8,
    },
    photoBlock: {
        alignItems: "center",
        width: "45%",
    },
    signatureBlock: {
        alignItems: "center",
        width: "45%",
    },
    photoImage: {
        width: 60,
        height: 60,
        border: "1px solid #ccc",
    },
    signatureImage: {
        width: 100,
        height: 40,
    },
    blockLabel: {
        fontSize: 8,
        color: "#555",
        marginTop: 3,
        textAlign: "center",
    },
    dateRow: {
        marginTop: 8,
        alignItems: "center",
    },
});

// Функция для подстановки данных пользователя
const replaceUserData = (text, userData) => {
    if (!text) return "";
    const currentDate = new Date().toLocaleDateString("ru-RU");

    return text
        .replace(/\{fio\}/g, userData.fio || "_______________")
        .replace(/\{iin\}/g, userData.iin || "_______________")
        .replace(/\{phone\}/g, userData.phone || "_______________")
        .replace(/\{date\}/g, currentDate);
};

// Функция для разбивки текста на параграфы
const splitIntoParagraphs = (text) => {
    if (!text) return [];

    // Убираем markdown заголовки (#)
    const cleaned = text.replace(/^#+\s*/gm, "");

    // Разбиваем по двойным переносам или одинарным
    const parts = cleaned
        .split(/\n\n|\n/)
        .map((part) => part.trim())
        .filter((part) => part.length > 0);

    return parts;
};

const PDFDocument = ({
    userData,
    signature,
    userPhoto,
    language = "ru",
    documentData,
}) => {
    const currentDate = new Date().toLocaleDateString("ru-RU");

    const labels = {
        ru: {
            fio: "ФИО:",
            iin: "ИИН:",
            phone: "Телефон:",
            date: "Дата:",
            signature: "Подпись",
            photo: "Фото",
            customer: "ЗАКАЗЧИК",
            contractor: "ИСПОЛНИТЕЛЬ",
        },
        kz: {
            fio: "Аты-жөні:",
            iin: "ЖСН:",
            phone: "Телефон:",
            date: "Күні:",
            signature: "Қолы",
            photo: "Фото",
            customer: "ТАПСЫРЫС БЕРУШІ",
            contractor: "ОРЫНДАУШЫ",
        },
    };

    const l = labels[language] || labels.ru;

    // Получаем контент из Strapi
    const getContent = () => {
        if (!documentData) {
            return { title: "Документ", paragraphs: [] };
        }

        const attrs = documentData.attributes || documentData;

        let content = "";
        let title = "";

        if (language === "kz") {
            title = attrs.titleKz || attrs.title || "Құжат";
            content = attrs.contentKz || attrs.contentRu || "";
        } else if (language === "en") {
            title = attrs.titleEn || attrs.title || "Document";
            content = attrs.contentEn || attrs.contentRu || "";
        } else {
            title = attrs.titleRu || attrs.title || "Документ";
            content = attrs.contentRu || "";
        }

        content = replaceUserData(content, userData);
        const paragraphs = splitIntoParagraphs(content);

        return { title, paragraphs };
    };

    const { title, paragraphs } = getContent();

    return (
        <Document>
            <Page size='A4' style={styles.page}>
                {/* Заголовок */}
                <View style={styles.header}>
                    <Text style={styles.title}>{title}</Text>
                </View>

                {/* Данные пользователя */}
                <View style={styles.userInfo}>
                    <View style={styles.userInfoRow}>
                        <Text style={styles.userInfoLabel}>{l.fio}</Text>
                        <Text style={styles.userInfoValue}>{userData.fio}</Text>
                    </View>
                    <View style={styles.userInfoRow}>
                        <Text style={styles.userInfoLabel}>{l.iin}</Text>
                        <Text style={styles.userInfoValue}>{userData.iin}</Text>
                    </View>
                    <View style={styles.userInfoRow}>
                        <Text style={styles.userInfoLabel}>{l.phone}</Text>
                        <Text style={styles.userInfoValue}>
                            {userData.phone}
                        </Text>
                    </View>
                </View>

                {/* Текст согласия из Strapi */}
                <View style={styles.section}>
                    {paragraphs.map((text, index) => (
                        <Text key={index} style={styles.paragraph}>
                            {text}
                        </Text>
                    ))}
                </View>

                {/* Подписи сторон */}
                <View style={styles.footer}>
                    {/* Исполнитель */}
                    <View style={styles.column}>
                        <Text style={styles.columnTitle}>{l.contractor}</Text>
                        <Text style={styles.companyInfo}>
                            ТОО «MEXEL HEALTH»
                        </Text>
                        <Text style={styles.companyInfo}>
                            г. Астана, пр. Абылай хана, 42/1
                        </Text>
                        <Text style={styles.companyInfo}>
                            БИН: 160440010230
                        </Text>
                    </View>

                    {/* Заказчик */}
                    <View style={styles.column}>
                        <Text style={styles.columnTitle}>{l.customer}</Text>

                        <Text style={styles.label}>{l.fio}</Text>
                        <Text style={styles.value}>{userData.fio}</Text>

                        <Text style={styles.label}>{l.iin}</Text>
                        <Text style={styles.value}>{userData.iin}</Text>

                        {/* Фото и подпись рядом */}
                        <View style={styles.photoSignatureRow}>
                            <View style={styles.photoBlock}>
                                {userPhoto && (
                                    <Image
                                        style={styles.photoImage}
                                        src={userPhoto}
                                    />
                                )}
                                <Text style={styles.blockLabel}>{l.photo}</Text>
                            </View>

                            <View style={styles.signatureBlock}>
                                {signature && (
                                    <Image
                                        style={styles.signatureImage}
                                        src={signature}
                                    />
                                )}
                                <Text style={styles.blockLabel}>
                                    {l.signature}
                                </Text>
                            </View>
                        </View>

                        {/* Дата */}
                        <View style={styles.dateRow}>
                            <Text style={styles.label}>{l.date}</Text>
                            <Text style={styles.value}>{currentDate}</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default PDFDocument;
