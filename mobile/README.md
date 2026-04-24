# Glofit Mobile

Application mobile Glofit — prototype interactif basé sur le design fourni.

## Stack

- **Expo SDK 51** + **React Native 0.74** + **TypeScript**
- **expo-router** — routing file-based
- **react-native-svg** — silhouettes et illustrations
- **expo-linear-gradient** — dégradés (hero, cartes)
- **@expo-google-fonts/syne** + **dm-sans** — typographie (Syne pour les titres, DM Sans pour le texte)

## Démarrer

```bash
cd mobile
npm install
npm run start      # ouvre Expo Dev Tools
npm run ios        # simulateur iOS
npm run android    # émulateur Android
npm run web        # version web
npm run typecheck  # vérifie les types
```

## Écrans

| Route                    | Description                                          |
| ------------------------ | ---------------------------------------------------- |
| `/`                      | Onboarding avec transformation IA (avant → après)    |
| `/(tabs)/home`           | Dashboard — transformation, stats, workout du jour   |
| `/(tabs)/fitmap`         | Carte des FitPals + liste à proximité                |
| `/(tabs)/plan`           | Plan de la semaine + liste d'exercices interactive   |
| `/(tabs)/coach`          | Coach IA + coachs humains (réservation)              |
| `/(tabs)/chat`           | Liste des conversations                              |
| `/chat/[id]`             | Conversation 1-à-1 + invitation de session           |

## Structure

```
mobile/
├── app/                        # routes expo-router
│   ├── _layout.tsx             # root layout (chargement des fonts)
│   ├── index.tsx               # onboarding
│   ├── (tabs)/                 # 5 onglets
│   └── chat/[id].tsx           # conversation stackée
├── src/
│   ├── components/             # UI (Button, Pill, Card, BodySilhouette…)
│   ├── data/mock.ts            # données mock (FitPals, coachs, exos…)
│   ├── theme/                  # couleurs + fonts
│   └── types/                  # types partagés
├── app.json                    # config Expo
└── tsconfig.json               # chemins @/* → src/*
```

## Palette

| Token       | Valeur      |
| ----------- | ----------- |
| `lime`      | `#C8F135`   |
| `black`     | `#0A0A0A`   |
| `dark`      | `#111111`   |
| `card`      | `#1A1A1A`   |
| `accent`    | `#FF6B35`   |
| `blue`      | `#4FC3F7`   |

## À faire (hors scope prototype)

- Backend & auth (Supabase / Firebase)
- Persistance (AsyncStorage → API)
- Vraie carte (react-native-maps) pour FitMap
- Intégration IA pour la projection corporelle
- Paiements coachs (Stripe)
