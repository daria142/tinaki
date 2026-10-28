# Тинаки — Лотос: инструкция для новичка
Нужно: компьютер, интернет, 30–40 минут. Всё бесплатно.
1. Установите Node.js (сайт nodejs.org, кнопка LTS) — как обычную программу.
2. Распакуйте архив. Получится папка `tinaki`.
3. Зарегистрируйтесь на supabase.com → New project → придумайте имя и пароль базы (запишите) → регион ближайший → ждите 2 минуты.
4. В Supabase слева «SQL Editor» → New query → откройте файл `supabase/schema.sql` блокнотом, скопируйте всё, вставьте → Run. Должно быть «Success».
5. В Supabase: Authentication → Providers → Email → выключите «Confirm email» (для проверки; для боевого сайта лучше включить) → Save.
6. Supabase: Project Settings → API. Скопируйте Project URL и anon public key.
7. В папке `tinaki` скопируйте файл `.env.local.example`, назовите копию `.env.local`, откройте блокнотом и вставьте URL и ключ вместо примеров. Сохраните. (Ключ service_role НЕ нужен и его нельзя никому показывать.)
8. Откройте терминал в папке `tinaki` (Windows: в проводнике в адресной строке напишите `cmd` и Enter). Выполните по очереди: `npm install` (несколько минут), потом `npm run dev`.
9. Откройте http://localhost:3000, зарегистрируйтесь, пройдите тест.
10. Выложить в интернет: загрузите папку на GitHub (без `.env.local` и `node_modules`), на vercel.com нажмите Add New → Project → выберите репозиторий, в Environment Variables добавьте те же два ключа → Deploy. Потом в Supabase: Authentication → URL Configuration → Site URL поставьте адрес вашего сайта.
Тексты интерфейса — `lib/content.ts`, вопросы и описания типов — `lib/data.ts`, картинки кладите в `public/`.
Ошибка «Invalid API key» — проверьте `.env.local`, перезапустите `npm run dev`. «relation does not exist» — не выполнен шаг 4.

## Публикация в интернете (Vercel)
См. шаги в ответе чата: GitHub → Vercel → две переменные окружения → Deploy → Site URL в Supabase.
