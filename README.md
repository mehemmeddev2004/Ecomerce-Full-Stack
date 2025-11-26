E-Commerce Project (Next.js + NestJS + PostgreSQL)

Bu layihə Next.js (Frontend) və NestJS (Backend) istifadə edilərək hazırlanmış full-stack e-commerce platformasıdır.
Frontend TypeScript, backend isə NestJS + PostgreSQL üzərində qurulub.

ℹ️ Qeyd: Layihə sentyabr ayından etibarən development prosesində deyil və sonradan yenilənməyib. Tezliklə təkmilləşdirmə və davam etdirilməsi planlaşdırılır.

🚀 Texnologiyalar
Frontend

Next.js 14



TypeScript

App Router

TailwindCSS

next/font (Geist)

Backend

NestJS

TypeORM

PostgreSQL

REST API

Deployment

Backend → Render.com

Frontend → Vercel

📦 Development üçün başlamaq
Frontend-i işə salmaq
npm run dev
# veya
yarn dev
# veya
pnpm dev
# veya
bun dev


Daha sonra brauzerdə aç:
http://localhost:3000

Frontend kodları app/ folderində yerləşir.
app/page.tsx faylını dəyişdikcə project avtomatik yenilənəcək.

🗄️ Backend-i işə salmaq (NestJS)

Backend folderinə keç və:

npm run start:dev


Backend default olaraq 3001 portunda çalışır:
http://localhost:3001

Environment dəyişənləri (.env) PostgreSQL bağlantısı üçün belə olur:

DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB_NAME

🌐 Canlı Demo

Frontend (Vercel):
https://coming-soon-swart-tau.vercel.app/

Backend (Render):
Render cold-start səbəbilə bir qədər gec cavab verə bilər.

📘 Öyrənmək üçün resurslar

Next.js Docs: https://nextjs.org/docs

NestJS Docs: https://docs.nestjs.com/

TypeORM Docs: https://typeorm.io/

🛠️ Deploy haqqında

Frontend-in deploy-u üçün Vercel istifadə olunub.
Backend-in deploy-u üçün isə Render.com seçilib (free plan cold start səbəbi ilə bir qədər gec cavab verir).

Deploy haqqında daha çox məlumat:

Next.js Deploy: https://nextjs.org/docs/app/building-your-application/deploying

NestJS Deploy Render: https://docs.render.com/deploy-nestjs

📌 Status

🟡 Development paused — Layihə sentyabr ayından bu yana yenilənmir. Gələcəkdə genişləndirilərək tam istifadəyə veriləcək.
