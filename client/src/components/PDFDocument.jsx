import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    padding: 40,
    lineHeight: 1.5,
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
  paragraph: {
    textAlign: 'justify',
    textIndent: 20,
    marginBottom: 10,
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
});

const PDFDocument = ({ userData, signature, userPhoto, language = 'ru' }) => {
  const currentDate = new Date().toLocaleDateString('ru-RU');
  
  const titles = {
    ru: 'ИНФОРМИРОВАННОЕ ДОБРОВОЛЬНОЕ СОГЛАСИЕ ПАЦИЕНТА НА ОКАЗАНИЕ МЕДИЦИНСКИХ УСЛУГ В АМБУЛАТОРНО-КОНСУЛЬТАТИВНОМ ЦЕНТРЕ ТОО «MEXEL HEALTH»',
    kz: '«MEXEL HEALTH» ЖШС АМБУЛАТОРЛЫҚ-КЕҢЕС БЕРУ ОРТАЛЫҒЫНДА МЕДИЦИНАЛЫҚ ҚЫЗМЕТ КӨРСЕТУГЕ ПАЦИЕНТТІҢ АҚПАРАТТАНДЫРЫЛҒАН ЕРКІН КЕЛІСІМІ',
  };
  
  const subtitles = {
    ru: 'Приложение 3 к договору публичной оферты по предоставлению платных медицинских услуг от 31.07.2024 г.',
    kz: '31.07.2024 ж. ақылы медициналық қызметтер көрсетуге арналған жария оферта шартына 3-қосымша',
  };
  
  const labels = {
    ru: {
      fio: 'ФИО:',
      iin: 'ИИН:',
      phone: 'Телефон:',
      date: 'Дата:',
      signature: 'Подпись:',
      customer: 'ЗАКАЗЧИК:',
      contractor: 'ИСПОЛНИТЕЛЬ:',
    },
    kz: {
      fio: 'Аты-жөні:',
      iin: 'ЖСН:',
      phone: 'Телефон:',
      date: 'Күні:',
      signature: 'Қолы:',
      customer: 'ТАПСЫРЫС БЕРУШІ:',
      contractor: 'ОРЫНДАУШЫ:',
    },
  };
  
  const l = labels[language] || labels.ru;
  
  const getConsentText = () => {
    const texts = {
      ru: [
        `Я, ${userData.fio}, ИИН ${userData.iin}, Контактный телефон ${userData.phone}`,
        'Я информирован(а), о том, что специалисты амбулаторно-консультативного центра ТОО «MEXEL HEALTH» приложат все условия для оказания мне высококвалифицированной медицинской помощи.',
        'Я ознакомлен(а) и принимаю условия договора публичной оферты по предоставлению платных медицинских услуг (публичный договор).',
        'Я даю добровольное согласие на включение и использование своих персональных данных и медицинских записей в информационных системах ТОО «MEXEL HEALTH» и Министерства здравоохранения Республики Казахстан.',
        'Я согласен(-а) в пользу платного лечения, и добровольно отказываюсь от бесплатного лечения в других клиниках.',
      ],
      kz: [
        `Мен: ${userData.fio}, ЖСН ${userData.iin}, Байланыс телефоны ${userData.phone}`,
        '«MEXEL HEALTH» ЖШС амбулаторлық-кеңес беру орталығының мамандары маған жоғары білікті медициналық көмек көрсету үшін бар күш-жігерін салатыны туралы хабарландым.',
        'Мен ақылы медициналық қызметтерді көрсетуге арналған жария оферта шартының талаптарын оқып шықтым және қабылдаймын.',
        'Мен өзімнің жеке деректерімді пайдалануға келісімімді беремін.',
      ],
    };
    
    return texts[language] || texts.ru;
  };
  
  const consentTexts = getConsentText();
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>
            {titles[language] || titles.ru}
          </Text>
          <Text style={styles.subtitle}>
            {subtitles[language] || subtitles.ru}
          </Text>
        </View>
        
        <View>
          {consentTexts.map((text, index) => (
            <Text key={index} style={styles.paragraph}>
              {text}
            </Text>
          ))}
        </View>
        
        <View style={styles.footer}>
          <View style={styles.column}>
            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>
              {l.contractor}
            </Text>
            <Text style={styles.value}>ТОО «MEXEL HEALTH»</Text>
            <Text style={styles.value}>г. Астана, пр. Абылай хана, 42/1</Text>
            <Text style={styles.value}>БИН: 160440010230</Text>
          </View>
          
          <View style={styles.column}>
            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>
              {l.customer}
            </Text>
            
            {userPhoto && (
              <Image style={styles.photoImage} src={userPhoto} />
            )}
            
            <Text style={styles.label}>{l.fio}</Text>
            <Text style={styles.value}>{userData.fio}</Text>
            
            <Text style={styles.label}>{l.iin}</Text>
            <Text style={styles.value}>{userData.iin}</Text>
            
            <Text style={styles.label}>{l.phone}</Text>
            <Text style={styles.value}>{userData.phone}</Text>
            
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
