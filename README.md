# Vereinfachung des Bierpong-Turniermanagements

Ein kleines Spaßprojekt, das wir dazu verwenden, um bei BierPong-Turnieren die Gruppenphase zu erstellen und zu verwalten.
Implementiert mit Vue.js und vuetify.

Da die Software auch ohne Internet laufen soll und auf Rechnern eingesetzt wird, die kein Entwicklungssetup besitzen (z.B. docker, postgresql) läuft dieses Programm OHNE externe Abhängigkeiten wie zum Beispiel Datenbanken. Das ist zwar nicht schön, aber erfüllt den Zweck. Eine cleanere Version setzt auf eine postgresql-Anbindung, die auch das Anmelden und Teilen von Turnieren ermöglicht. Diese ist aktuell noch in der Entwicklung und wird dann ggf. auch an dieser Stelle veröffentlicht.


### Funktionen:
- Generierung Gruppen von Spielplänen durch:
  - Angabe der Spieler (Zufällige Aufteilung in Teams und Gruppen), oder
  - Angabe der Teams (Zufällige Aufteilung in Gruppen), oder
  - Angabe von gewünschter Team- und Gruppenanzahl (manuell), oder
  - Import/Export von bestehenden Turnieren
- Berechnet nach Eingabe der Ergebnisse automatisch die Tabellen
- Flexible Oberfläche zur Anpassung an verschiedene Turniergrößen
- Flexible Anpassung von Spielen und Teams während der Gruppenphase 


### Unterstützt:
- Gruppenanzahl: Unbeschränkt
- Gruppengröße: 2-7 Teams pro Gruppe
- Teamgröße: Unbeschränkt/Bei zufälliger Aufteilung der Spieler: 2
- Spieleranzahl: Unbeschränkt
