// src/components/PDFDocument.js
import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image,
    Font,
} from "@react-pdf/renderer";
import roboto from "./Roboto-Regular.ttf"; // Укажите путь к вашему файлу шрифта
import UserDataStore from "../../store/userData";
import { observer } from "mobx-react-lite";

// Регистрация шрифта
Font.register({
    family: "Roboto",
    src: roboto,
    fontWeight: "normal",
});

// Создание стилей
const styles = StyleSheet.create({
    page: {
        fontFamily: "Roboto",
        fontSize: 14,
        padding: 20,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
        textAlign: "justify",
    },
    image: {
        width: 160,
        height: 50,
        marginVertical: 15,
    },
    title: {
        textAlign: "center",
        fontSize: 18,
        marginBottom: 40,
        fontWeight: "bold",
    },
    subTitle: {
        textAlign: "justify",
        fontSize: 16,
        marginBottom: 40,
    },
    first: {
        marginLeft: 60,
    },
    main: {
        fontSize: 14,
    },
    tab: {
        // marginLeft: 10,
        textIndent: 30,
    },
    marginTop: {
        textIndent: 30,
        marginTop: 20,
    },
    tab2: {
        textIndent: 30,
        marginBottom: 30,
    },
    flexeble: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        fontSize: 12,
    },
    blocks: {
        display: "block",
        width: "47%",
    },
    photo: {
        width: 150,
        marginLeft: 20,
        // marginTop: 20,
        border: "1px solid black",
    },
    imgblock: {
        flexDirection: "row",
    },
});

function kzDoc(signature) {
    return (
        <>
            <Page style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>
                        «MEXEL HEALTH» ЖШС АМБУЛАТОРЛЫҚ-КЕҢЕС БЕРУ ОРТАЛЫҒЫНДА
                        МЕДИЦИНАЛЫҚ ҚЫЗМЕТ КӨРСЕТУГЕ ПАЦИЕНТТІҢ
                        АҚПАРАТТАНДЫРЫЛҒАН ЕРКІН КЕЛІСІМІ
                    </Text>

                    <Text style={styles.title}>
                        31.07.2024 ж. ақылы медициналық қызметтер көрсетуге
                        арналған жария оферта (жария шарт) шартына 3-қосымша
                    </Text>

                    <Text style={styles.tab}>
                        Мен: {UserDataStore.user.fio}, ЖСН{" "}
                        {UserDataStore.user.iin} , Тұрғылықты мекенжайы{" "}
                        {UserDataStore.user.adress} , Байланыс телефоны{" "}
                        {UserDataStore.user.phone}
                    </Text>

                    <Text style={styles.tab}>
                        «MEXEL HEALTH» ЖШС амбулаторлық-кеңес беру орталығының
                        мамандары маған жоғары білікті медициналық көмек көрсету
                        үшін бар күш-жігерін салатыны туралы хабарландым.
                    </Text>
                    <Text style={styles.tab}>
                        Мен ақылы медициналық қызметтерді көрсетуге арналған
                        жария оферта шартының (жария шарт) талаптарымен және
                        жоғарыда аталған шарт талаптарын толық және сөзсіз
                        қабылдау туралы дәлелдемелерді оқып шықтым және
                        қабылдаймын.
                    </Text>
                    <Text style={styles.tab}>
                        Мен өзімнің жеке деректерімді (тегім, атым, әкемнің аты
                        (бар болса), ұлтым, жынысым, туған күнім, жеке
                        сәйкестендіру нөмірім, заңды мекенжайым, тұрғылықты
                        мекенжайым, байланыс абоненттік нөмірім) және «MEXEL
                        HEALTH» ЖШС мен Қазақстан Республикасы Денсаулық сақтау
                        министрлігінің (бұдан әрі – Қазақстан Республикасы
                        Денсаулық сақтау министрлігі) ақпараттық жүйелеріндегі
                        медициналық жазбаларымды тексеру және емдеу процесіне
                        қатысушылардың осы ақпаратпен алмасуы үшін қосуға және
                        пайдалануға ерікті түрде келісімімді беремін.
                    </Text>
                    <Text style={styles.tab}>
                        Мен ақылы емделуге келісемін және басқа емханаларда
                        тегін емделуден өз еркіммен бас тартамын және
                        медициналық қызметтерге арналған «MEXEL HEALTH» ЖШС-нің
                        бағалар прейскурантына сәйкес көрсетілетін қызметтерге
                        ақы төлеуге болашақта ешқандай қосымша шағымдар
                        келтірмеуге кепілдік беремін.
                    </Text>
                    <Text style={styles.tab}>
                        Менің денсаулығым туралы ақпаратты жарияламау
                        асқынулардың дамуына ықпал етуі мүмкін екенін түсінемін.
                    </Text>
                    <Text style={styles.tab}>
                        Емдеудің ең жақсы нәтижелерін алу үшін мен емдеуші
                        дәрігерге денсаулыққа қатысты барлық мәселелер, соның
                        ішінде аллергиялық көріністер немесе дәрі-дәрмектерге
                        жеке төзбеушілік, менің басымнан өткен барлық
                        жарақаттар, операциялар, аурулар, басқаларға қауіп
                        төндіретін жұқпалы немесе басқа аурудың болуы туралы
                        сенімді және толық ақпарат беруге міндеттенемін. Тұқым
                        қуалаушылық туралы, сондай-ақ алкогольді, есірткілік
                        және улы заттарды қолдану туралы, басқа мамандардан бір
                        мезгілде емделу және олардың ұсыныстарын орындау туралы
                        шынайы ақпарат беруге міндеттенемін. Осылайша, мен
                        медициналық мекеме мен дәрігерлерді бұл ақпарат болмаған
                        жағдайда туындауы мүмкін зардаптар үшін жауапкершілікке
                        тартпаймын.
                    </Text>
                    <Text style={styles.tab}>
                        Мен өз құқықтарыммен және міндеттеріммен, сондай-ақ
                        «MEXEL HEALTH» ЖШС амбулаторлық – кеңес беру орталығында
                        белгіленген емдік-қорғау режимінің тәртібі мен
                        ережелерімен таныспын және оларды сақтауға
                        міндеттенемін.
                    </Text>
                    <Text style={styles.tab}>
                        Маған емделуіме және күтім алуыма, қадір-қасиетіме, жеке
                        құндылықтарым мен сенімдеріме құрметпен қарауға құқылы
                        екендігім түсіндірілді.
                    </Text>
                    <Text style={styles.tab}>
                        Мен диагнозым және емдеу туралы балама пікір алуым үшін
                        басқа дәрігерден/ұйымнан кеңес алу құқығыммен таныстым.
                    </Text>
                    <Text style={styles.tab}>
                        Мен жеке және медициналық ақпаратымды, соның ішінде
                        медициналық жазбаларымды құпия ұстау құқығыммен
                        таныстым.
                    </Text>
                    <Text style={styles.tab}>
                        Мен емдеу және күтім мәселелері бойынша шағым беру
                        құқығыммен және шағым процесіне қатысу құқығыммен
                        таныстым. Маған медициналық көмектің сапасына қатысты
                        шағымдар мен ұсыныстарды беру нысандары мен тәртібі
                        жеткілікті түрде түсіндірілді.
                    </Text>
                    <Text style={styles.tab}>
                        Менің денсаулығым, тексеру және емдеу нәтижелерім туралы
                        ақпаратты мына кісілерге хабарлауға рұқсат беремін:{" "}
                        {UserDataStore.user.phone}
                    </Text>
                    <Text style={styles.tab}>
                        Маған кез келген уақытта, тіпті ақпараттандырылған
                        келісімге қол қойғаннан кейін де тексеруден және
                        емдеуден бас тартуға құқығым бар екені айтылды, бұл
                        құқық емдеуден жазбаша бас тартқаннан кейін жүзеге
                        асырылуы мүмкін;
                    </Text>
                    <Text style={styles.tab}>
                        Мен жоғарыда айтылғандардың барлығын оқып, түсінгенімді
                        және өзімді қызықтыратын және ауруымды емдеуге
                        байланысты түсінбейтін барлық сұрақтарды емдеуші
                        дәрігермен талқылауға және одан бас тартуға жеткілікті
                        уақытым мен мүмкіндігім болғанын растаймын. Қойылған
                        сұрақтардың барлығына қанағаттанарлық жауап алдым және
                        дәрігерде жауапсыз қалған сұрақтарым қалмады.
                    </Text>
                    <Text style={styles.tab}>
                        Медициналық қызметтерді көрсетуге арналған менің
                        ақпараттандырылған ерікті келісімім өтініш берген күннен
                        бастап бір күнтізбелік жыл ішінде «MEXEL HEALTH» ЖШС-не
                        кейінгі барлық жүгінулеріме қатысты болатынымен
                        келісемін.
                    </Text>

                    <Text style={styles.marginTop}>
                        күні {date.getDate()}.{date.getMonth() + 1}.
                        {date.getFullYear()}
                    </Text>
                    <Text>{UserDataStore.user.fio}</Text>

                    {signature && (
                        <Image style={styles.image} src={signature} />
                    )}
                </View>
            </Page>
        </>
    );
}

function rusDoc(signature, userPhoto) {
    return (
        <>
            <Page style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>
                        ИНФОРМИРОВАННОЕ ДОБРОВОЛЬНОЕ СОГЛАСИЕ ПАЦИЕНТА НА
                        ОКАЗАНИЕ МЕДИЦИНСКИХ УСЛУГ В АМБУЛАТОРНО -
                        КОНСУЛЬТАТИВНОМ ЦЕНТРЕ ТОО «MEXEL HEALTH»
                    </Text>

                    <Text style={styles.title}>
                        Приложение 3 к договору публичной оферты по
                        предоставлению платных медицинских услуг (публичный
                        договор) от 31.07.2024 г.
                    </Text>

                    <Text style={styles.tab}>
                        Я, : {UserDataStore.user.fio}, Иин{" "}
                        {UserDataStore.user.iin} , Адрес проживания{" "}
                        {UserDataStore.user.adress} , Контактный телефон{" "}
                        {UserDataStore.user.phone}
                    </Text>

                    <Text style={styles.tab}>
                        Я информирован(а), о том, что специалисты амбулаторно -
                        консультативного центра ТОО «MEXEL HEALTH» приложат все
                        условия для оказания мне высококвалифицированной
                        медицинской помощи.
                    </Text>
                    <Text style={styles.tab}>
                        Я ознакомлен(а) и принимаю условия договора публичной
                        оферты по предоставлению платных медицинских услуг
                        (публичный договор) и свидетельством полного и
                        безоговорочного акцепта (принятия) условий
                        вышесказанного договора.
                    </Text>
                    <Text style={styles.tab}>
                        Я даю добровольное согласие на включение и использование
                        своих персональных данных (фамилия, имя, отчество (при
                        его наличии), национальность, пол, дата рождения,
                        индивидуальный идентификационный номер, юридический
                        адрес, место жительства, абонентский номер средства
                        связи) и медицинских записей в информационных системах
                        ТОО «MEXEL HEALTH» и Министерства здравоохранения
                        Республики Казахстан (далее – МЗ РК) в целях обмена этой
                        информацией участниками процесса обследования и лечения.
                    </Text>
                    <Text style={styles.tab}>
                        Я согласен(-а) в пользу платного лечения, и добровольно
                        отказываюсь от бесплатного лечения в других клиниках и
                        гарантирую оплату за оказанные услуги по Прейскуранту
                        цен ТОО «MEXEL HEALTH» на медицинские услуги без
                        предъявления в дальнейшем каких либо претензий.
                    </Text>
                    <Text style={styles.tab}>
                        Я понимаю, что сокрытие информации о состоянии моего
                        здоровья может способствовать развитию осложнений.
                    </Text>
                    <Text style={styles.tab}>
                        В целях получения лучших результатов лечения обязуюсь
                        представить лечащему врачу достоверную и полную
                        информацию обо всех проблемах, связанных со здоровьем, в
                        том числе об аллергических проявлениях или
                        индивидуальной непереносимости лекарственных препаратов,
                        обо всех перенесенных мною травмах, операциях,
                        заболеваниях, в т.ч. наличии инфекционного и иного
                        заболевания, представляющих опасность для окружающих. А
                        также предоставлении правдивых сведении о
                        наследственности, а также об употреблении алкоголя,
                        наркотических и токсических средств, об одновременном
                        лечении у других специалистов и выполнении их
                        рекомендаций. Я тем самым не буду возлагать
                        ответственность на лечебное учреждение и врачей за
                        последствия, которые могут возникнуть при отсутствии
                        данной информации.
                    </Text>
                    <Text style={styles.tab}>
                        Я ознакомлен(а) со своими правами и обязанностями, а
                        также распорядком и правилами лечебно-охранительного
                        режима, установленного в амбулаторно - консультативном
                        центре ТОО «MEXEL HEALTH», и обязуюсь их соблюдать.
                    </Text>
                    <Text style={styles.tab}>
                        Я ознакомлен(а) с правом на лечение и уход, с
                        уважительным отношением к достоинству, личностным
                        ценностям, убеждениям и правам
                    </Text>
                    <Text style={styles.tab}>
                        Я ознакомлен(а) с правом обратиться к другому врачу/в
                        другую организацию для получения альтернативного мнения
                        о диагнозе и лечении.
                    </Text>
                    <Text style={styles.tab}>
                        Я ознакомлен(а) с правом на конфиденциальность личной и
                        медицинской информации, в том числе конфиденциальность
                        моих медицинских записей
                    </Text>
                    <Text style={styles.tab}>
                        Я ознакомлен(а) с правом на подачу жалобы по вопросам
                        лечения и ухода, а также правом на участие в процессе
                        реагирования на жалобу. Мне в доступной форме разъяснены
                        формы и порядок предоставления жалоб и предложений по
                        качеству оказания медицинской помощи
                    </Text>
                    <Text style={styles.tab}>
                        Информацию о состоянии моего здоровья, результатах
                        обследования и лечения я разрешаю сообщать следующим
                        лицам: (Ф.И.О. лица которому разрешается сообщать
                        информацию о ходе лечения, указать родство/отношение,
                        телефон): {UserDataStore.user.phone}
                    </Text>
                    <Text style={styles.tab}>
                        Я информирован(а), что имею право отказаться от
                        обследования и лечения в любой момент, даже после
                        подписания информированного согласия, данное право может
                        быть реализовано после письменного отказа от лечения.
                    </Text>
                    <Text style={styles.tab}>
                        Я подтверждаю, что прочитал(а) и понял(а) все
                        вышеизложенное, имел(а) достаточное время и возможность
                        обсудить с моим лечащим врачом все интересующие меня и
                        непонятные мне вопросы, связанные с лечением моего
                        заболевания и отказом от него. На все заданные вопросы я
                        получил(а) удовлетворившие меня ответы и у меня не
                        осталось невыясненных вопросов к врачу.
                    </Text>
                    <Text style={styles.tab}>
                        Я согласен (а), что мое информированное добровольное
                        согласие на оказание медицинских услуг распространяется
                        на все последующие мои обращения в ТОО «MEXEL HEALTH» в
                        течении одного календарного года с момента обращения.
                    </Text>

                    <Text style={styles.tab}>
                        Пациент(ка): {UserDataStore.user.fio}
                    </Text>

                    <Text style={styles.marginTop}>
                        Дата {date.getDate()}.{date.getMonth() + 1}.
                        {date.getFullYear()}
                    </Text>

                    <View style={styles.imgblock}>
                        {signature && (
                            <Image style={styles.image} src={signature} />
                        )}
                        {userPhoto && (
                            <Image style={styles.photo} src={userPhoto} />
                        )}
                    </View>
                </View>
            </Page>
        </>
    );
}
function enDoc(signature) {
    return (
        <>
            <Page style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>
                        Appendix to the public offer agreement for the provision
                        of paid medical services
                    </Text>

                    <Text style={styles.title}>
                        Informed voluntary consent of the patient for paid
                        services
                    </Text>

                    <Text style={styles.tab}>
                        I, the patient/legal representative:{" "}
                        {UserDataStore.user.fio}, IIN {UserDataStore.user.iin},
                        being in "UMIT" International Oncological Center of
                        Tomotherapy" LLP (hereinafter referred to as the
                        "Center"),hereby confirm that before receiving paid
                        medical services, the Center in an accessible form
                        acquainted me with the Rules for the provision of paid
                        services by healthcare entities approved by Order of the
                        Ministry of Healthcare of the Republic of Kazakhstan
                        dated October 29, 2020 No. KR DSM-170/2020, and I am
                        notified and agree that the examination and treatment in
                        the department of the Center, provided to me on a paid
                        basis, will be carried out at my own choice and desire,
                        I refuse free treatment and guarantee payment for paid
                        medical services provided, including (day) hospital
                        stay, I am also informed of the following:
                    </Text>

                    <Text style={styles.tab}>
                        - my rights of hospitalization and treatment according
                        to the list of guaranteed volume of free medical care,
                        (in accordance with the Decree of the Government of the
                        Republic of Kazakhstan No. 2136 dated 09/28/2009 "On the
                        approval of the guaranteed volume of free medical care")
                        and the possibility of obtaining appropriate types and
                        volumes of medical care without charging, and I
                        voluntarily refuse free treatment in favor of paid;
                    </Text>
                    <Text style={styles.tab}>
                        - the list of paid medical services provided by the
                        Center, prices for paid services, conditions, form and
                        procedure for their provision and payment, and a
                        preliminary examination and treatment plan, a
                        preliminary amount of payment within the framework of
                        the main / concomitant diseases were agreed with me at
                        the time of receipt, while the final agreement on
                        examination, treatment and payment for the main and for
                        concomitant diseases will be carried out during the
                        workflow (on the day of discharge, a Calculation
                        (Certificate if Completion) is issued for payment and an
                        Extract from the medical documentation of the
                        established sample is issued);
                    </Text>
                    <Text style={styles.tab}>
                        - the benefits of providing paid services for certain
                        categories of citizens;
                    </Text>
                    <Text style={styles.tab}>
                        - medical workers involved in the provision of paid
                        medical services, their level of professional education
                        and qualifications;
                    </Text>
                    <Text style={styles.tab}>
                        - information about the Center, including information
                        about the Center's license to carry out medical
                        activities (number and date of issue, list of subtypes
                        of the licensed type of activity, full name of the
                        licensor), about the working hours, work schedule of
                        medical workers involved in providing medical care
                        within the guaranteed volume of free medical care and
                        (or) in the system of compulsory social health
                        insurance, paid services;
                    </Text>
                    <Text style={styles.tab}>
                        - the regulatory authorities: addresses and phone
                        numbers of the authorized body, the local body of the
                        state health administration of the capital, territorial
                        divisions of the state body in the field of medical
                        services (assistance), territorial divisions of the
                        state body in the field of circulation of medicines and
                        medical devices;
                    </Text>
                    <Text style={styles.tab}>
                        - the goals, nature, risk factors and possible
                        complications in the provision of paid medical services;
                    </Text>
                    <Text style={styles.tab}>
                        - that the collection of necessary analyzes and
                        examinations is carried out according to the existing
                        requirements of sanitary and epidemiological supervision
                        and according to the indications of the attending
                        physician, and the timing of the latter taken into
                        account should be no more than 10 days ago;
                    </Text>
                    <Text style={styles.tab}>
                        - other information provided by the rules for the
                        provision of paid medical services.
                    </Text>
                    <Text style={styles.tab}>
                        I am informed and agree that:
                    </Text>
                    <Text style={styles.tab}>
                        - according to the testimony of the attending physician
                        (council), in complex and controversial diagnostic
                        cases, according to indications and on demand
                        (monitoring of examination and response to treatment,
                        etc.), more than one study is allowed after prior
                        approval and without prejudice to my interests;
                    </Text>
                    <Text style={styles.tab}>
                        - The Center has the right to refuse paid treatment in
                        case of detection before and during hospitalization of
                        non-core diseases (infectious, mental, etc.) requiring
                        treatment in specialized medical institutions, as well
                        as in the detection of somatic decompensated and other
                        diseases, at the stage of terminal complications,
                        requiring palliative treatment on an outpatient basis at
                        the place of residence;
                    </Text>
                    <Text style={styles.tab}>
                        - in case of emergency and threatened conditions, about
                        transfer within the framework of the guaranteed volume
                        of free medical care to urgent clinics in Astana, and in
                        case of refusal - about the possibility of transfer to
                        departments of the clinic providing emergency medical
                        care;
                    </Text>
                    <Text style={styles.tab}>
                        - in case of unforeseen complications that threaten my
                        health during the examination and treatment, I give my
                        consent to change the nature of treatment (including the
                        scope of surgery), including refusal to perform it, and
                        then inform me about it;
                    </Text>
                    <Text style={styles.tab}>
                        - The Center has the right, for a reasonable reason, to
                        replace the attending physician with notification by
                        telephone no later than 2 (two) hours before the time
                        and date of admission, I confirm that I have the right
                        to refuse replacement by notifying the Center, or to
                        postpone the appointment to another day \ time in
                        agreement with the Center, I will not have any claims
                        against the Center due to the replacement of a doctor in
                        these cases.
                    </Text>
                    <Text style={styles.tab}>
                        - it is possible to transfer information as part of the
                        provision of paid medical services through telephone
                        calls or e-mail specified when filling out the
                        application. Email address {UserDataStore.user.Email}
                    </Text>
                    <Text style={styles.tab}>
                        I am warned that non-compliance with the instructions
                        (recommendations) of the Center (a medical professional
                        providing a paid medical service), including the
                        prescribed treatment regimen, may reduce the quality of
                        the paid medical service provided, entail the inability
                        to complete it on time or adversely affect the state of
                        health. I hereby guarantee that I have voluntarily and
                        in my interest, without any compulsion, selected the
                        types of paid medical services that I want to receive at
                        the Center, I have read the current price list for paid
                        medical and other paid services at the Center and agree
                        to pay for them in accordance with it, in the future I
                        will not have any claims, both material and
                        non-material, against the Center in connection with
                        charging for services.
                    </Text>
                    <Text style={styles.tab}>
                        I certify that the text of this informed consent has
                        been read by me, signed after an explanatory
                        conversation, its provisions are clear to me, I give my
                        consent to receive and pay for paid medical and other
                        paid services at the Center, and confirm giving consent
                        to the Center to collect, process, transfer the
                        necessary personal data, to the extent and in accordance
                        with the legislation of the Republic of Kazakhstan.
                    </Text>
                    <Text style={styles.tab}>
                        This informed voluntary consent to the provision of paid
                        medical services is accepted by acceptance and is an
                        integral part of the Contract of a public offer for the
                        provision of paid medical services, which is accepted by
                        the Customer/Patient by joining the specified Contract
                        as a whole without any conditions, exceptions and
                        reservations.
                    </Text>
                    <Text style={styles.tab}>
                        I received a copy of this Informed Consent of the
                        patient for the provision of paid services.
                    </Text>

                    <Text style={styles.marginTop}>
                        Date {date.getDate()}.{date.getMonth() + 1}.
                        {date.getFullYear()}
                    </Text>
                    <Text>{UserDataStore.user.fio}</Text>

                    {signature && (
                        <Image style={styles.image} src={signature} />
                    )}
                </View>
            </Page>
            <Page style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>
                        CONTRACT No. _____ for the provision of paid medical
                        services (assistance)
                    </Text>
                    <Text style={styles.tab}>
                        "UMIT" International Oncological Center of Tomotherapy"
                        LLP, (hereinafter referred to as the Contractor)
                        represented by Director Ye.M. Shayakhmetov, acting on
                        the basis of the Charter, on the one hand, and
                        {UserDataStore.user.fio}, hereinafter referred to as the
                        "Customer"/"Patient", born on {UserDataStore.user.data},
                        ID card (passport) No. {UserDataStore.user.numberUcard}{" "}
                        issued {UserDataStore.user.dateUcard},{" "}
                        {UserDataStore.user.cardSide}, IIN{" "}
                        {UserDataStore.user.iin}, on the other hand,
                        collectively referred to as the "Parties", within the
                        framework of a Public Offer Agreement for the provision
                        of paid medical services, posted on the the Contractor's
                        information stand and at the registry, as well as on the
                        website: https://tomo.kz / and https://onkoclinic.com /,
                        have concluded this contract for the provision of
                        medical services (hereinafter referred to as the
                        Contract) about the following:
                    </Text>
                    <Text style={styles.tab}>1. Предмет Договора</Text>
                    <Text style={styles.tab}>
                        1.1. The Contractor, based on the Customer's request,
                        undertakes to provide paid medical consultations and
                        other paid medical services (Services) to the Patient in
                        accordance with the price list of medical services, and
                        the Customer undertakes to accept and pay for Services
                        in accordance with the terms hereof.
                    </Text>
                    <Text style={styles.tab}>
                        1.2. The Contractor undertakes to provide medical
                        services at the actual location of the Contractor:
                        Republic of Kazakhstan, Astana, Almaty district, Abylai
                        Khan Ave., 42/1.
                    </Text>
                    <Text style={styles.tab}>2. Payment Procedure</Text>
                    <Text style={styles.tab}>
                        2.1. The cost of paid medical services provided to the
                        Customer/Patient is determined in accordance with the
                        current Price List of paid medical services (the Price
                        List is posted at the Reception of the Tomotherapy
                        Contractor) at the time of the Patient's treatment.
                    </Text>
                    <Text style={styles.tab}>
                        2.2. The provision of Services is subject to full
                        prepayment. The Customer/Patient is obliged to pay for
                        the Services of the Contractor before receiving them.
                        The payment can be made both in cash and non-cash, in
                        the national currency of the Republic of Kazakhstan.
                    </Text>
                    <Text style={styles.tab}>
                        2.3. The Contractor issues to the Customer/Patient a
                        document of the established sample confirming the fact
                        of payment. Medical documents based on the results of
                        the provision of Services are issued after payment of
                        the entire amount of Services actually rendered.
                    </Text>
                    <Text style={styles.tab}>
                        2.4. The Contractor issues to the Customer/Patient a
                        document of the established sample confirming the fact
                        of payment. Medical documents based on the results of
                        the provision of Services are issued after payment of
                        the entire amount of Services actually rendered.
                    </Text>
                    <Text style={styles.tab}>
                        2.5. The Services of the Contractor can be obtained by
                        Patients on a paid basis, at the expense of the state
                        order or third parties.
                    </Text>
                    <Text style={styles.tab}>
                        3. Obligations of the Parties
                    </Text>
                    <Text style={styles.tab}>
                        3.1. The Contractor is obliged to:
                    </Text>
                    <Text style={styles.tab}>
                        - provide services for the provision of paid medical
                        care to Customers/Patients, in accordance with the
                        licenses available to the Contractor and the current
                        regulatory legal acts on healthcare in the Republic of
                        Kazakhstan, taking into account the specifics of the
                        provision of Services;
                    </Text>
                    <Text style={styles.tab}>
                        - provide to the Customer/Patient an opportunity to get
                        acquainted with the Price List valid for the period of
                        provision of medical services hereunder;
                    </Text>
                    <Text style={styles.tab}>
                        - ensure the provision of medical Services in accordance
                        with clinical protocols for the diagnosis and treatment
                        of diseases, in the absence of clinical protocols for
                        these nosologies – in accordance with generally accepted
                        approaches and the base of evidence-based medicine for
                        medical indications;
                    </Text>
                    <Text style={styles.tab}>
                        - ensure confidentiality of the Customer's/Patient's
                        health status and his/her personal data;
                    </Text>
                    <Text style={styles.tab}>
                        - maintain the necessary sanitary and hygienic and
                        anti-epidemic order on the territory of the organization
                        when providing medical services;
                    </Text>
                    <Text style={styles.tab}>
                        - treat the Customer/Patient with respect and humanity;
                    </Text>
                    <Text style={styles.tab}>
                        - provide medical services with high quality, using
                        modern methods of diagnosis and treatment, in full in
                        accordance herewith after the Customer/Patient has made
                        a payment in accordance with the procedure specified in
                        Section 2 hereof, and provided documents confirming
                        payment;
                    </Text>
                    <Text style={styles.tab}>
                        - keep records of the types, volumes, and costs of the
                        medical services provided to the Customer/Patient, as
                        well as funds received from him/her, including using
                        medical information systems and accounting systems;
                    </Text>
                    <Text style={styles.tab}>
                        - provide to the Customer/Patient an invoice in
                        accordance with Article 412 of the Tax Code of the
                        Republic of Kazakhstan, indicating the types and volume
                        of medical services (assistance) provided, within the
                        established time frame.
                    </Text>
                    <Text style={styles.tab}>
                        3.2. The Customer is obliged to:
                    </Text>
                    <Text style={styles.tab}>
                        - comply with the rules established by the Contractor,
                        which determine the order and mode of operation;
                    </Text>
                    <Text style={styles.tab}>
                        - comply with the legislation of the Republic of
                        Kazakhstan when receiving medical services (assistance)
                        under the Contract;
                    </Text>
                    <Text style={styles.tab}>
                        - inform the Contractor about the refusal to receive
                        medical services (assistance) or part of medical
                        services (assistance) one or more days before the date
                        of provision of medical services (assistance)
                        established by the Contract;
                    </Text>
                    <Text style={styles.tab}>
                        - make payments to the Contractor for the medical
                        services (assistance) provided, according to the terms
                        specified in the Contract.
                    </Text>
                    <Text style={styles.tab}>4. Rights of the parties</Text>
                    <Text style={styles.tab}>
                        4.1. The Customer has the right to:
                    </Text>
                    <Text style={styles.tab}>
                        - select the attending physician from among the doctors
                        providing paid medical services (assistance);
                    </Text>
                    <Text style={styles.tab}>
                        - carry out an examination of the quality of treatment
                        and the validity of medical prescriptions in accordance
                        with the order of the Minister of Health of the Republic
                        of Kazakhstan dated December 3, 2020 No. KR DSM-230/2020
                        "On approval of the rules for organizing and conducting
                        internal and external examinations of the quality of
                        medical services (assistance)" (registered in the
                        Register of State Registration of Regulatory Legal Acts
                        under No. 21727).
                    </Text>
                    <Text style={styles.tab}>
                        - 4.2. The Contractor has the right to early termination
                        of treatment in case of violation by the Customer of the
                        rules established hereby.
                    </Text>
                    <Text style={styles.tab}>
                        5. Responsibility of the parties
                    </Text>

                    <Text style={styles.tab}>
                        5.1. The Contractor is responsible for the violations
                        committed in the provision of paid medical services:
                    </Text>
                    <Text style={styles.tab}>
                        - provision of medical services of inadequate volume and
                        quality;
                    </Text>
                    <Text style={styles.tab}>
                        - charging the Customer for services included in the
                        guaranteed amount of free medical care and (or) in the
                        system of compulsory social health insurance, in
                        accordance with paragraph 2 of Article 424 of the Code
                        of the Republic of Kazakhstan "On Administrative
                        Offenses";
                    </Text>
                    <Text style={styles.tab}>
                        - charging double fees for the provision of the same
                        medical service (at the expense of the Customer and
                        budget funds).
                    </Text>
                    <Text style={styles.tab}>
                        5.2. In case of non-fulfillment or improper fulfillment
                        of obligations provided for herein, the parties shall be
                        liable in accordance with the laws of the Republic of
                        Kazakhstan.
                    </Text>
                    <Text style={styles.tab}>
                        5.3. The Customer is responsible for late reimbursement
                        of costs to the Contractor for the medical services
                        (assistance) actually provided.
                    </Text>
                    <Text style={styles.tab}>
                        5.4. In case of non-fulfillment or improper fulfillment
                        by the Parties of their obligations under this
                        Agreement, all disputes and disagreements are resolved
                        in accordance with the current civil legislation of the
                        Republic of Kazakhstan.
                    </Text>
                    <Text style={styles.tab}>6. Force majeure</Text>
                    <Text style={styles.tab}>
                        6.1 The Parties are not responsible for non-fulfillment
                        of the terms hereof if it was the result of force
                        majeure.
                    </Text>
                    <Text style={styles.tab}>
                        6.2 The Center is not responsible for the payment of
                        penalties or termination of the Contract due to
                        non-fulfillment of its terms, if the delay in the
                        execution hereof is the result of force majeure.
                    </Text>
                    <Text style={styles.tab}>
                        6.3 For the purposes hereof, "force majeure" means an
                        event beyond the control of the Parties and having an
                        unforeseen character. Such events may include, but not
                        exclusively: natural disasters, epidemics, military
                        actions, strikes, appropriate decision-making by
                        competent authorities, and others.
                    </Text>
                    <Text style={styles.tab}>
                        6.4 In case of force majeure, the Center must
                        immediately, within one or more business days, notify
                        the Customer/Patient of such circumstances and their
                        causes.
                    </Text>
                    <Text style={styles.tab}>
                        6.5 If no other written instructions are received from
                        the Customer/Patient, the Center shall continue to
                        fulfill its obligations hereunder, to the extent
                        appropriate, and shall search for alternative ways of
                        fulfilling the Contract that do not depend on force
                        majeure circumstances.
                    </Text>
                    <Text style={styles.tab}>
                        7. Amendment and termination of the Contract
                    </Text>
                    <Text style={styles.tab}>
                        7.1. The terms hereof may be amended and supplemented by
                        written agreement of the parties.
                    </Text>
                    <Text style={styles.tab}>
                        7.2. The parties are obliged to notify each other of the
                        intention to terminate the Contract early within three
                        or more working days.
                    </Text>
                    <Text style={styles.tab}>
                        7.3. Termination of this Contract is allowed by
                        agreement of the Parties or by a court decision on the
                        grounds provided for by the civil legislation of the
                        Republic of Kazakhstan.
                    </Text>
                    <Text style={styles.tab}>8. Final provisions</Text>
                    <Text style={styles.tab}>
                        8.1. Neither party has the right to transfer its
                        obligations hereunder to a third party without the
                        written consent of the parties.
                    </Text>
                    <Text style={styles.tab}>
                        8.2. This Contract comes into force from the date of its
                        signing by the parties and is valid until the
                        fulfillment of all obligations of the parties hereunder,
                        with the exception of early termination hereof.
                    </Text>
                    <Text style={styles.tab}>
                        8.3. This Conract is drawn up in two copies having the
                        same legal force, one copy is with the Customer, the
                        other is with the Contractor.
                    </Text>
                    <Text style={styles.tab}>
                        The Contract may be concluded in paper and electronic
                        form in accordance with the civil legislation of the
                        Republic of Kazakhstan.
                    </Text>
                    <Text style={styles.tab}>
                        8.4. All disputes between the Customer and the
                        Contractor related to the fulfillment of the terms
                        hereof are resolved in accordance with the civil
                        legislation of the Republic of Kazakhstan.
                    </Text>
                    <Text style={styles.tab}>
                        8.5. In everything that is not provided for herein, the
                        Parties are guided by the civil legislation of the
                        Republic of Kazakhstan.
                    </Text>
                    <Text style={styles.tab2}>
                        9. Addresses and details of the Parties:
                    </Text>
                    <View style={styles.flexeble}>
                        <View style={styles.blocks}>
                            <Text>CONTRACTOR:</Text>
                            <Text>
                                UMIT International Oncological Center of
                                Tomotherapy LLP
                            </Text>
                            <Text>Address: 42/1 Abylai Khan Ave., Astana,</Text>
                            <Text>010000, Republic of Kazakhstan</Text>
                            <Text>BIN: 160440010230 </Text>
                            <Text>IIC: KZ896017111000008471</Text>
                            <Text>Bank: Halyk Bank of Kazakhstan JSC</Text>
                            <Text>BIC: HSBKKZKX</Text>
                            <Text>e-mail: too.umit@tomo.kz</Text>
                            <Text>
                                tel.: +7 7172 95 44 84, +7 (702) 201 94 44,
                            </Text>
                            <Text>+7 (777) 201 44 44</Text>
                            <Text>Director:</Text>
                            <Text>___________________ Ye. M. Shayakhmetov</Text>
                        </View>

                        <View style={styles.blocks}>
                            <Text>CUSTOMER:</Text>
                            <Text>{UserDataStore.user.fio}</Text>
                            <Text>Address:{UserDataStore.user.adress}</Text>
                            <Text>IIN:{UserDataStore.user.iin}</Text>
                            <Text>e-mail: {UserDataStore.user.Email}</Text>
                            <Text>tel.: {UserDataStore.user.phone}</Text>

                            <Text>
                                Date {date.getDate()}.{date.getMonth() + 1}.
                                {date.getFullYear()}
                            </Text>
                            <Text>{UserDataStore.user.fio}</Text>

                            <View>
                                {signature && (
                                    <Image
                                        style={styles.image}
                                        src={signature}
                                    />
                                )}
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </>
    );
}

let date = new Date();
const PDFDocument = ({ signature }) => (
    <Document>
        {UserDataStore.langs == "ru"
            ? rusDoc(signature, UserDataStore.userPhoto)
            : ""}
        {UserDataStore.langs == "kz" ? kzDoc(signature) : ""}
        {UserDataStore.langs == "en" ? enDoc(signature) : ""}
    </Document>
);

export default PDFDocument;
