# Arrow Escape — prototip Telegram Mini App

Acesta este un prototip funcțional pentru jocul cu săgeți lungi și îndoite.

## Cum îl pornești

Varianta rapidă pe telefon:

1. Dezarhivează proiectul.
2. Deschide fișierul `DESCHIDE-JOCUL.html` în Google Chrome sau Microsoft Edge.

Fișierele `DESCHIDE-JOCUL.html` și `index.html` conțin tot jocul într-un singur
fișier. Funcționează și când Android îl deschide printr-o adresă `content://`.

Varianta recomandată în Visual Studio Code:

1. Deschide folderul proiectului în Visual Studio Code.
2. Instalează extensia **Live Server**.
3. Apasă cu butonul drept pe `index.html` și alege **Open with Live Server**.

## Ce funcționează deja

- săgeți independente, formate din linii lungi și îndoite;
- apăsare cu mouse-ul sau cu degetul;
- o săgeată iese când traseul din fața capului este liber;
- mișcare de tip Snake: capul înaintează, iar coada urmărește toate curbele;
- colțuri de 90° foarte puțin șlefuite, păstrate și în timpul animației;
- mărire cu două degete pe toată zona jocului, până la marginile ecranului;
- deplasarea liberă a planului mărit și zoom cu rotița mouse-ului;
- marcaje punctate discrete numai pe traseele săgeților;
- puncte gri-deschis rămase pe platformă după eliminarea fiecărei săgeți;
- vârfuri clasice, triunghiulare, proporționate ca în imaginea de referință;
- o săgeată este oprită dacă ar trece peste altă săgeată sau peste propriul corp;
- tablă compactă, complet ocupată, fără caroiaj general vizibil;
- primul nivel reproduce structura de 20 × 28 poziții și cele 42 de trasee extrase din referință;
- 560 din 560 de poziții sunt ocupate — nu există celule libere;
- animație fluidă până când întreaga săgeată părăsește platforma;
- apăsarea rapidă a următoarelor săgeți fără a aștepta terminarea animației precedente;
- mai multe săgeți pot părăsi platforma simultan;
- pierderea unei vieți când alegi o săgeată blocată;
- 3 vieți și regenerarea unei vieți la 5 minute;
- buton de indiciu;
- monede și progres păstrate în browser;
- niveluri dense în patru orientări;
- fiecare nivel are o soluție garantată și verificată;
- verificarea automată a soluției înainte ca nivelul să fie afișat;
- interfață adaptată pentru telefon;
- suport de bază pentru Telegram WebApp și vibrații.

## Ce este încă demonstrativ

- Telegram Stars nu procesează încă plăți reale;
- clasamentul, roata și profilul sunt butoane demonstrative;
- datele sunt salvate local, nu într-o bază de date;
- pentru lansare publică trebuie adăugate botul Telegram, serverul Node.js și PostgreSQL.

## Fișiere

- `DESCHIDE-JOCUL.html` — jocul complet într-un singur fișier, recomandat pentru telefon;
- `index.html` — aceeași variantă completă pentru browser sau publicare;
- `style.css` — designul responsive;
- `script.js` — jocul, generatorul, verificarea soluției și viețile.
