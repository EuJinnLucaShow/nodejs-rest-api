## GoIT Node.js Course Template Homework

Виконайте форк цього репозиторію для виконання домашніх завдань (2-6)
Форк створить репозиторій на вашому http://github.com

Додайте ментора до колаборації

Для кожної домашньої роботи створюйте свою гілку.

- hw02
- hw03
- hw04
- hw05
- hw06

Кожна нова гілка для др повинна робитися з master

Після того, як ви закінчили виконувати домашнє завдання у своїй гілці, необхідно зробити пулл-реквест (PR). Потім додати ментора для рев'ю коду. Тільки після того, як ментор заапрувить PR, ви можете виконати мердж гілки з домашнім завданням у майстер.

Уважно читайте коментарі ментора. Виправте зауваження та зробіть коміт у гілці з домашнім завданням. Зміни підтягнуться у PR автоматично після того, як ви відправите коміт з виправленнями на github
Після виправлення знову додайте ментора на рев'ю коду.

- При здачі домашньої роботи є посилання на PR
- JS-код чистий та зрозумілий, для форматування використовується Prettier

**Читати на інших мовах: [Русский](README.md), [Українська](README.ua.md).**

# Домашнє завдання 2

Подивися пояснююче відео як це зробити та здавати ДЗ правильно: [![Title](./js.png)](https://www.youtube.com/watch?v=wabSW_sz_cM ' пояснення')

Написати REST API для роботи з колекцією контактів. Для роботи з REST API використовуй [Postman] (https://www.getpostman.com/).

Прочитай уважно readme в клонованому темплейті, там описаний механізм здачі домашніх завдань. Та починай виконувати ДЗ

## Крок 1

Створи гілку `hw02-express` з гілки master.

Встанови модулі командою

```bash
npm i
```

Такі модулі є в проекті:

- [express](https://www.npmjs.com/package/express)
- [morgan](https://www.npmjs.com/package/morgan)
- [cors](https://www.npmjs.com/package/cors)

## Крок 2

У `app.js` – веб сервер на `express` і прошарки `morgan` та `cors`. Почни налаштовувати раутінг для роботи з колекцією контактів.

REST API повинен підтримувати такі раути.

### @ GET /api/contacts

- нічого не отримує
- викликає функцію `listContacts` для роботи з json-файлом `contacts.json`
- повертає масив всіх контактів в json-форматі зі статусом `200`

### @ GET /api/contacts/:id

- Не отримує `body`
- Отримує параметр `id`
- викликає функцію `getById` для роботи з json-файлом `contacts.json`
- якщо такий `id` є, повертає об'єкт контакту в json-форматі зі статусом `200`
- якщо такого `id` немає, повертає json з ключем `"message": "Not found"` і статусом `404`

### @ POST /api/contacts

- Отримує `body` в форматі `{name, email, phone}` (усі поля обов'язкові)
- Якщо в `body` немає якихось обов'язкових полів, повертає json з ключем `{"message": "missing required name field"}` і статусом `400`
- Якщо з `body` все добре, додає унікальний ідентифікатор в об'єкт контакту
- Викликає функцію `addContact(body)` для збереження контакту в файлі `contacts.json`
- За результатом роботи функції повертає об'єкт з доданим `id` `{id, name, email, phone}` і статусом `201`

### @ DELETE /api/contacts/:id

- Не отримує `body`
- Отримує параметр `id`
- Викликає функцію `removeContact` для роботи з json-файлом `contacts.json`
- якщо такий `id` є, повертає json формату `{"message": "contact deleted"}` і статусом `200`
- якщо такого `id` немає, повертає json з ключем `"message": "Not found"` і статусом `404`

### @ PUT /api/contacts/:id

- Отримує параметр `id`
- Отримує `body` в json-форматі з оновленням будь-яких полів `name, email и phone`
- Якщо `body` немає, повертає json з ключем `{"message": "missing fields"}` і статусом `400`
- Якщо з `body` все добре, викликає функцію `updateContact(contactId, body)`. (Напиши її) для поновлення контакту в файлі `contacts.json`
- За результатом роботи функції повертає оновлений об'єкт контакту і статусом `200`. В іншому випадку, повертає json з ключем `"message": "Not found"` і статусом `404`

## Крок 3

Для маршрутів, що приймають дані (`POST` та ` PUT`), продумайте перевірку (валідацію) отриманих даних. Для валідації прийнятих даних використовуйте пакет [joi](https://github.com/sideway/joi)

## Критерії прийому дз # 2-6

- Створено репозиторій з домашнім завданням &mdash; REST API додаток
- При створенні репозиторія використаний [бойлерплейт](https://github.com/goitacademy/nodejs-homework-template)
- Пулл-реквест (PR) з відповідним дз відправлений менторові в [schoology](https://app.schoology.com/login) на перевірку (посилання на PR)
- Код відповідає технічному завданню проекта
- При виконанні коду не виникає необроблених помилок
- Назва змінних, властивостей і методів починається з малої літери і записуються в нотації CamelCase. Використовуються англійські іменники
- Назва функції або методу містить дієслово
- У коді немає закоментуваних ділянок коду
- Проект коректно працює з актуальною LTS-версією Node

### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок
