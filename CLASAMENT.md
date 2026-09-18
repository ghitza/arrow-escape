# Clasament Telegram — plan de implementare

Jocul actual rulează numai în browser și salvează progresul local. Pentru un
clasament comun tuturor jucătorilor este necesar un server și o bază de date.

## Cum este identificat jucătorul

Telegram oferă deja fiecărui utilizator un `user.id` unic și stabil. Mini App-ul
trimite către server șirul complet `Telegram.WebApp.initData`. Serverul verifică
semnătura Telegram și numai după verificare salvează sau actualizează jucătorul.

Nu se generează un ID aleatoriu în JavaScript și nu se acceptă direct numele sau
scorul trimis de telefon, deoarece acestea pot fi falsificate.

## Structura recomandată

- Mini App: HTML, CSS și JavaScript existente;
- server: Node.js cu Fastify sau Express;
- bază de date: PostgreSQL;
- autentificare: verificarea `initData` cu tokenul botului;
- clasament sezonier și clasament general păstrate separat.

## Tabele PostgreSQL

```sql
CREATE TABLE players (
  telegram_id BIGINT PRIMARY KEY,
  username TEXT,
  display_name TEXT NOT NULL,
  photo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE seasons (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE player_season_stats (
  season_id BIGINT NOT NULL REFERENCES seasons(id),
  telegram_id BIGINT NOT NULL REFERENCES players(telegram_id),
  points INTEGER NOT NULL DEFAULT 0,
  levels_completed INTEGER NOT NULL DEFAULT 0,
  perfect_levels INTEGER NOT NULL DEFAULT 0,
  total_time_ms BIGINT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (season_id, telegram_id)
);

CREATE INDEX leaderboard_order
ON player_season_stats
  (season_id, points DESC, levels_completed DESC, perfect_levels DESC, total_time_ms ASC);
```

## Poziția exactă 1, 2, 3 ... N

`ROW_NUMBER()` oferă un număr diferit fiecărui jucător, chiar dacă doi jucători
au același punctaj.

```sql
SELECT
  ROW_NUMBER() OVER (
    ORDER BY s.points DESC,
             s.levels_completed DESC,
             s.perfect_levels DESC,
             s.total_time_ms ASC,
             s.updated_at ASC
  ) AS rank,
  p.telegram_id,
  p.display_name,
  p.username,
  p.photo_url,
  s.points,
  s.levels_completed
FROM player_season_stats s
JOIN players p ON p.telegram_id = s.telegram_id
WHERE s.season_id = $1;
```

Dacă se dorește ca jucătorii cu rezultate identice să împartă același loc, se
înlocuiește `ROW_NUMBER()` cu `DENSE_RANK()`.

## API-ul minim

- `POST /api/auth/telegram` — verifică utilizatorul și îl înscrie automat;
- `POST /api/results` — primește rezultatul nivelului și calculează punctele pe server;
- `GET /api/leaderboard?limit=50&offset=0` — returnează lista paginată;
- `GET /api/leaderboard/me` — returnează locul și statisticile utilizatorului;
- `GET /api/leaderboard/around-me` — returnează câțiva jucători deasupra și dedesubt.

Interfața poate afișa primele 100 de poziții, apoi permanent o bară de forma
`Locul meu: #1 284 din 18 430`. Nu este necesar să se descarce întreaga listă
pe telefon; restul pozițiilor se încarcă pe pagini când utilizatorul derulează.

## Protecția clasamentului

- semnătura `initData` este verificată numai pe server;
- `auth_date` prea vechi este refuzat;
- punctajul este calculat de server, nu acceptat direct din JavaScript;
- fiecare nivel generat primește un seed și un ID de sesiune;
- serverul refuză rezultate imposibil de rapide sau trimise de două ori;
- tokenul botului nu este pus niciodată în fișierele Mini App-ului.

