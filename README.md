# Workout Log

Ett webbaserat träningsloggverktyg byggt med Vue 3 och Vite. Med applikationen kan man lägga till övningar, logga set med vikt och antal repetitioner, markera genomförda set och följa sin totala volym under passet.

## Funktioner

- Lägg till och ta bort övningar
- Lägg till och ta bort set per övning
- Ange vikt (kg) och antal repetitioner för varje set
- Markera enskilda set som klara
- Automatisk sammanfattning av passet:
  - antal övningar
  - antal set
  - antal repetitioner
  - total volym (kg × reps)
- Visar träningspassets progression
- Passet räknas som klart när alla set är markerade som gjorda
- Möjlighet att avsluta och rensa det aktuella passet
- Responsivt gränssnitt, anpassat för både mobil och större skärmar

## Teknik

- **Vue 3** — komponentbaserat användargränssnitt och reaktiv datahantering
- **Vite** — utvecklingsserver och byggverktyg
- **Vue Router** — routing mellan applikationens vyer
- **JavaScript** — applikationslogik och beräkningar
- **CSS** — styling och responsiv layout med media queries
- **HTML** — semantisk struktur genom Vue-komponenternas templates

## Filstruktur

```text
laboration2/
├── src/
│   ├── assets/
│   │   └── style.css              # Global styling
│   │
│   ├── components/
│   │   ├── AddExerciseForm.vue    # Formulär för att lägga till övningar
│   │   ├── ExerciseCard.vue       # Visar och hanterar en övning och dess set
│   │   ├── SummaryCard.vue        # Sammanfattning av träningspasset
│   │   └── WorkoutProgress.vue    # Visar progression och avslut av passet
│   │
│   ├── views/
│   │   ├── HomeView.vue           # Huvudvy och applikationens state
│   │   ├── Header.vue             # Sidhuvud
│   │   └── Footer.vue             # Sidfot
│   │
│   ├── router/
│   │   └── index.js               # Vue Router-konfiguration
│   │
│   ├── App.vue                    # Applikationens rotkomponent
│   └── main.js                    # Startpunkt för Vue-applikationen
│
├── index.html                     # HTML-entrypoint
├── package.json                   # Projektets beroenden och scripts
└── vite.config.js                 # Vite-konfiguration
```

## Kom igång

Installera projektets beroenden:

```bash
npm install
```

Starta sedan Vites utvecklingsserver:

```bash
npm run dev
```

Öppna den lokala adress som visas i terminalen, vanligtvis:

```text
http://localhost:5173
```

För att skapa en produktionsversion:

```bash
npm run build
```

## Hur det fungerar

Applikationens huvudsakliga state finns i `HomeView.vue`. Där hålls listan över aktuella övningar i den reaktiva variabeln `exercises`.

Varje övning innehåller ett namn och en lista med set:

```js
{
  name: "Marklyft",
  sets: [
    {
      kg: 100,
      reps: 5,
      done: true
    }
  ]
}
```

`HomeView` fungerar som förälder till de olika komponenterna och skickar data till dem med **props**. När en komponent behöver påverka state i `HomeView` skickar den en **event** med `emit`.

Exempelvis skickar `ExerciseCard` en `remove-exercise`-event när användaren vill ta bort en övning.

Sammanfattningen och träningsprogressionen beräknas med **computed properties**. Eftersom `exercises` är reaktivt uppdateras dessa värden automatiskt när övningar, set, vikt, repetitioner eller genomförda set ändras.

Applikationen använder därmed Vue:s reaktiva dataflöde:

```text
HomeView
   │
   ├── props ──→ ExerciseCard
   │               │
   │               └── emit ──→ HomeView
   │
   ├── props ──→ SummaryCard
   │
   └── props ──→ WorkoutProgress
                       │
                       └── emit ──→ HomeView
```
