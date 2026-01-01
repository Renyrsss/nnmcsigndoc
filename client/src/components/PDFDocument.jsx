import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

// Стили для PDF
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    padding: 40,
    lineHeight: 1.5,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 15,
  },
  paragraph: {
    textAlign: 'justify',
    textIndent: 20,
    marginBottom: 10,
  },
  userInfo: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  footer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    width: '45%',
  },
  label: {
    fontSize: 10,
    color: '#666',
    marginBottom: 3,
  },
  value: {
    fontSize: 11,
    marginBottom: 8,
  },
  signatureSection: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  signatureImage: {
    width: 150,
    height: 50,
  },
  photoImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    border: '1px solid #ccc',
  },
  date: {
    fontSize: 10,
    color: '#666',
    marginTop: 5,
  },
});

/**
 * Компонент PDF документа
 */
const PDFDocument = ({ userData, signature, userPhoto, documentContent, language = 'ru' }) => {
  const currentDate = new Date().toLocaleDateString('ru-RU');
  
  // Заголовки по языкам
  const titles = {
    ru: 'ИНФОРМИРОВАННОЕ ДОБРОВОЛЬНОЕ СОГЛАСИЕ ПАЦИЕНТА НА ОКАЗАНИЕ МЕДИЦИНСКИХ УСЛУГ В АМБУЛАТОРНО-КОНСУЛЬТАТИВНОМ ЦЕНТРЕ ТОО «MEXEL HEALTH»',
    kz: '«MEXEL HEALTH» ЖШС АМБУЛАТОРЛЫҚ-КЕҢЕС БЕРУ ОРТАЛЫҒЫНДА МЕДИЦИНАЛЫҚ ҚЫЗМЕТ КӨРСЕТУГЕ ПАЦИЕНТТІҢ АҚПАРАТТАНДЫРЫЛҒАН ЕРКІН КЕЛІСІМІ',
    en: 'PATIENT INFORMED CONSENT FOR MEDICAL SERVICES AT THE OUTPATIENT ADVISORY CENTER OF MEXEL HEALTH LLP',
  };
  
  const subtitles = {
    ru: 'Приложение 3 к договору публичной оферты по предоставлению платных медицинских услуг от 31.07.2024 г.',
    kz: '31.07.2024 ж. ақылы медициналық қызметтер көрсетуге арналған жария оферта шартына 3-қосымша',
    en: 'Appendix 3 to the public offer agreement for the provision of paid medical services dated 31.07.2024',
  };
  
  const labels = {
    ru: {
      fio: 'ФИО:',
      iin: 'ИИН:',
      phone: 'Телефон:',
      email: 'Email:',
      address: 'Адрес:',
      date: 'Дата:',
      signature: 'Подпись:',
      customer: 'ЗАКАЗЧИК:',
      contractor: 'ИСПОЛНИТЕЛЬ:',
    },
    kz: {
      fio: 'Аты-жөні:',
      iin: 'ЖСН:',
      phone: 'Телефон:',
      email: 'Email:',
      address: 'Мекенжай:',
      date: 'Күні:',
      signature: 'Қолы:',
      customer: 'ТАПСЫРЫС БЕРУШІ:',
      contractor: 'ОРЫНДАУШЫ:',
    },
    en: {
      fio: 'Full Name:',
      iin: 'IIN:',
      phone: 'Phone:',
      email: 'Email:',
      address: 'Address:',
      date: 'Date:',
      signature: 'Signature:',
      customer: 'CUSTOMER:',
      contractor: 'CONTRACTOR:',
    },
  };
  
  const l = labels[language] || labels.ru;
  
  // Основной текст согласия
  const getConsentText = () => {
    if (documentContent) {
      return documentContent;
    }
    
    const texts = {
      ru: [
        `Я, ${userData.fio}, ИИН ${userData.iin}, Контактный телефон ${userData.phone}`,
        'Я информирован(а), о том, что специалисты амбулаторно-консультативного центра ТОО «MEXEL HEALTH» приложат все условия для оказания мне высококвалифицированной медицинской помощи.',
        'Я ознакомлен(а) и принимаю условия договора публичной оферты по предоставлению платных медицинских услуг (публичный договор) и свидетельством полного и безоговорочного акцепта (принятия) условий вышесказанного договора.',
        'Я даю добровольное согласие на включение и использование своих персональных данных (фамилия, имя, отчество, национальность, пол, дата рождения, индивидуальный идентификационный номер, юридический адрес, место жительства, абонентский номер средства связи) и медицинских записей в информационных системах ТОО «MEXEL HEALTH» и Министерства здравоохранения Республики Казахстан.',
        'Я согласен(-а) в пользу платного лечения, и добровольно отказываюсь от бесплатного лечения в других клиниках и гарантирую оплату за оказанные услуги по Прейскуранту цен ТОО «MEXEL HEALTH» на медицинские услуги без предъявления в дальнейшем каких либо претензий.',
        'Я понимаю, что сокрытие информации о состоянии моего здоровья может способствовать развитию осложнений.',
        'Я ознакомлен(а) со своими правами и обязанностями, а также распорядком и правилами лечебно-охранительного режима, установленного в амбулаторно-консультативном центре ТОО «MEXEL HEALTH», и обязуюсь их соблюдать.',
      ],
      kz: [
        `Мен: ${userData.fio}, ЖСН ${userData.iin}, Байланыс телефоны ${userData.phone}`,
        '«MEXEL HEALTH» ЖШС амбулаторлық-кеңес беру орталығының мамандары маған жоғары білікті медициналық көмек көрсету үшін бар күш-жігерін салатыны туралы хабарландым.',
        'Мен ақылы медициналық қызметтерді көрсетуге арналған жария оферта шартының (жария шарт) талаптарымен және жоғарыда аталған шарт талаптарын толық және сөзсіз қабылдау туралы дәлелдемелерді оқып шықтым және қабылдаймын.',
        'Мен өзімнің жеке деректерімді және «MEXEL HEALTH» ЖШС мен Қазақстан Республикасы Денсаулық сақтау министрлігінің ақпараттық жүйелеріндегі медициналық жазбаларымды тексеру және емдеу процесіне қатысушылардың осы ақпаратпен алмасуы үшін қосуға және пайдалануға ерікті түрде келісімімді беремін.',
        'Мен ақылы емделуге келісемін және басқа емханаларда тегін емделуден өз еркіммен бас тартамын және медициналық қызметтерге арналған «MEXEL HEALTH» ЖШС-нің бағалар прейскурантына сәйкес көрсетілетін қызметтерге ақы төлеуге кепілдік беремін.',
        'Менің денсаулығым туралы ақпаратты жарияламау асқынулардың дамуына ықпал етуі мүмкін екенін түсінемін.',
      ],
      en: [
        `I, ${userData.fio}, IIN ${userData.iin}, Contact phone ${userData.phone}`,
        'I am informed that the specialists of the outpatient advisory center of MEXEL HEALTH LLP will make every effort to provide me with highly qualified medical care.',
        'I have read and accept the terms of the public offer agreement for the provision of paid medical services and the evidence of full and unconditional acceptance of the terms of the above agreement.',
        'I voluntarily consent to the inclusion and use of my personal data and medical records in the information systems of MEXEL HEALTH LLP and the Ministry of Health of the Republic of Kazakhstan.',
        'I agree to paid treatment and voluntarily refuse free treatment in other clinics and guarantee payment for services rendered according to the Price List of MEXEL HEALTH LLP without any further claims.',
        'I understand that concealing information about my health condition may contribute to the development of complications.',
      ],
    };
    
    return texts[language] || texts.ru;
  };
  
  const consentTexts = getConsentText();
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Заголовок */}
        <View style={styles.header}>
          <Text style={styles.title}>
            {titles[language] || titles.ru}
          </Text>
          <Text style={styles.subtitle}>
            {subtitles[language] || subtitles.ru}
          </Text>
        </View>
        
        {/* Основной текст */}
        <View style={styles.section}>
          {Array.isArray(consentTexts) ? (
            consentTexts.map((text, index) => (
              <Text key={index} style={styles.paragraph}>
                {text}
              </Text>
            ))
          ) : (
            <Text style={styles.paragraph}>{consentTexts}</Text>
          )}
        </View>
        
        {/* Футер с данными и подписью */}
        <View style={styles.footer}>
          {/* Исполнитель */}
          <View style={styles.column}>
            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>
              {l.contractor}
            </Text>
            <Text style={styles.value}>ТОО «MEXEL HEALTH»</Text>
            <Text style={styles.value}>г. Астана, пр. Абылай хана, 42/1</Text>
            <Text style={styles.value}>БИН: 160440010230</Text>
            <Text style={styles.value}>e-mail: too.umit@tomo.kz</Text>
          </View>
          
          {/* Заказчик */}
          <View style={styles.column}>
            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>
              {l.customer}
            </Text>
            
            {/* Фото пользователя */}
            {userPhoto && (
              <Image style={styles.photoImage} src={userPhoto} />
            )}
            
            <Text style={styles.label}>{l.fio}</Text>
            <Text style={styles.value}>{userData.fio}</Text>
            
            <Text style={styles.label}>{l.iin}</Text>
            <Text style={styles.value}>{userData.iin}</Text>
            
            <Text style={styles.label}>{l.phone}</Text>
            <Text style={styles.value}>{userData.phone}</Text>
            
            <Text style={styles.label}>{l.email}</Text>
            <Text style={styles.value}>{userData.email}</Text>
            
            <Text style={styles.label}>{l.date}</Text>
            <Text style={styles.value}>{currentDate}</Text>
            
            <Text style={styles.label}>{l.signature}</Text>
            {signature && (
              <Image style={styles.signatureImage} src={signature} />
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;
