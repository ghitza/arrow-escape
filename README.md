# Arrow Escape — prototip Telegram Mini App

Acesta este un prototip funcțional pentru jocul cu săgeți lungi și îndoite.

## Cum îl pornești

Deschide `index.html` direct în browser sau folosește Live Server:

1. Deschide folderul proiectului în Visual Studio Code.
2. Instalează extensia **Live Server**.
3. Apasă cu butonul drept pe `index.html` și alege **Open with Live Server**.

## Ce funcționează deja

- săgeți independente, formate din linii lungi și îndoite;
- apăsare cu mouse-ul sau cu degetul;
- o săgeată iese când traseul din fața capului este liber;
- mișcare de tip Snake: capul înaintează, iar coada urmărește toate curbele;
- colțuri de 90° foarte puțin șlefuite, păstrate și în timpul animației;
- mărire și micșorare cu două degete, inclusiv sub dimensiunea inițială;
- deplasarea planului în orice direcție, astfel încât oricare colț să poată ajunge în centrul ecranului;
- zoom cu rotița mouse-ului pe calculator;
- punctele gri-deschis ale platformei apar numai în spațiile eliberate, nu peste corpul sau coada săgeților;
- vârfuri triunghiulare ascuțite, cu o șlefuire foarte mică și egală pe toate cele trei colțuri;
- o săgeată este oprită dacă ar trece peste altă săgeată sau peste propriul corp;
- tablă compactă, complet ocupată, fără caroiaj general vizibil;
- primul nivel reproduce structura de 20 × 28 poziții și cele 42 de trasee extrase din referință;
- 560 din 560 de poziții sunt ocupate — nu există celule libere;
- animație fluidă până când întreaga săgeată părăsește platforma;
- apăsarea rapidă a următoarelor săgeți fără a aștepta terminarea animației precedente;
- mai multe săgeți pot părăsi platforma simultan;
- pierderea unei vieți când alegi o săgeată blocată;
- 3 vieți și regenerarea unei vieți la 5 minute;
- monede și progres păstrate în browser;
- generator procedural activ pentru nivelurile următoare — toate traseele sunt amestecate pe aceeași tablă, fără regiuni independente;
- fiecare nivel generat conține săgeți îndreptate în sus, jos, stânga și dreapta;
- fiecare nivel are o soluție garantată și verificată;
- verificarea automată a soluției înainte ca nivelul să fie afișat;
- interfață adaptată pentru telefon;
- suport de bază pentru Telegram WebApp și vibrații.

## Ce este încă demonstrativ

- Telegram Stars nu procesează încă plăți reale;
- datele sunt salvate local, nu într-o bază de date;
- pentru lansare publică trebuie adăugate botul Telegram, serverul Node.js și PostgreSQL.

## Fișiere

- `index.html` — structura paginii și controalele jocului;
- `config.js` — setările vizuale editabile pentru fundal, săgeți, puncte și culori;
- `style.css` — designul responsive;
- `script.js` — jocul, generatorul, verificarea soluției și viețile.
- `CLASAMENT.md` — structura recomandată pentru autentificarea Telegram și clasamentul global.
