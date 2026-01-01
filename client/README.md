# Document Signing App

Приложение для электронной подписи документов с интеграцией Strapi CMS.

## Возможности

- ✅ Заполнение данных пользователя (ФИО, ИИН, телефон, email)
- ✅ Защита маршрутов (нельзя перейти к подписанию без заполнения формы)
- ✅ Мультиязычность (Русский, Қазақша, English)
- ✅ Просмотр документа из Strapi CMS
- ✅ Захват фото с камеры
- ✅ Рисование подписи
- ✅ Генерация PDF с подписью
- ✅ Загрузка на сервер Strapi
- ✅ Уведомления в Telegram (опционально)

## Установка

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build
```

## Настройка

### 1. Переменные окружения

Скопируйте `.env.example` в `.env` и настройте:

```env
VITE_API_URL=https://apps.nnmc.kz
VITE_TELEGRAM_ENABLED=true
VITE_TELEGRAM_TOKEN=your_bot_token
VITE_TELEGRAM_CHAT_ID=your_chat_id
```

### 2. Настройка Strapi

#### Создание коллекции Documents

В админ-панели Strapi (`https://apps.nnmc.kz/admin`) создайте коллекцию:

**Content-Type Builder → Create new collection type**

Название: `document`

Поля:
| Поле | Тип | Описание |
|------|-----|----------|
| title | Text | Заголовок документа |
| slug | UID (from title) | URL-идентификатор |
| content | Rich Text | Содержимое документа (HTML) |
| isActive | Boolean | Активен ли документ |
| locale | Enumeration | Язык (ru, kz, en) |

#### Создание коллекции Signatures

**Content-Type Builder → Create new collection type**

Название: `signature`

Поля:
| Поле | Тип | Описание |
|------|-----|----------|
| userName | Text | ФИО пользователя |
| userIIN | Text | ИИН |
| userPhone | Text | Телефон |
| userEmail | Email | Email |
| documentId | Relation | Связь с document |
| signedFile | Media | Подписанный PDF |
| signedAt | DateTime | Дата подписания |

#### Настройка прав доступа

**Settings → Roles → Public**

Разрешить:
- `document`: find, findOne
- `signature`: create
- `upload`: upload

### 3. Добавление документа

В Content Manager создайте документ с плейсхолдерами:
- `{fio}` → ФИО пользователя
- `{iin}` → ИИН
- `{phone}` → Телефон
- `{email}` → Email

## Защита маршрутов

1. `/` - Главная (форма) - доступна всегда
2. `/document` - Документ - требует заполненной формы
3. `/sign` - Подписание - требует заполненной формы И прочтения документа

## Безопасность

- Токены хранятся в `.env` файле, НЕ в коде
- Telegram уведомления отключены по умолчанию
- Валидация данных на клиенте
