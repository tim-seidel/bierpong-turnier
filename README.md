# BierPong-Turnier

Ein kleines Spaßprojekt, das wir dazu verwenden, um bei BierPong-Turnieren die Gruppenphase zu erstellen und zu verwalten.
Implementiert mit Vue.js und vuetify.

Da die Software auch ohne Internet laufen soll und auf Rechnern eingesetzt wird, die kein Entwicklungssetup besitzen (z.B. docker, postgresql) läuft dieses Programm OHNE Datenbankanbindung. Das ist zwar nicht schön, aber erfüllt den Zweck. Eine cleanere Version setzt auf eine postgresql-Anbindung, die auch das Anmelden und Teilen von Turnieren ermöglicht. Diese ist aktuell noch in der Entwicklung und wird dann ggf. auch an dieser Stelle veröffentlicht.

## Project setup
```
npm install

npm run dev
npm run build
```