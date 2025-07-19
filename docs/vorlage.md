[⬅️ Zurück zur Übersicht](../README.md)

## Inhalt
- [Anwendungsfelder](#anwendungsfelder)
- [Medizin](#medizin)
- [Umweltschutz](#umweltschutz)
- ...





# Die möglichen Anwendungen und das Potenzial programmierbarer Materie

Je mehr man sich mit dem Konzept programmierbarer Materie auseinandersetzt, desto mehr
wächst die Erkenntnis, dass spätere Generationen in einer Welt leben möchten in der
sie allgegenwärtig ist. Nachfolgend ein paar mögliche Anwendungsfelder.

- Mittlere CellBots (1 cm – 10 cm)
Wartung & Sanierung:
Intelligente Rohrroboter zur Inspektion und Sanierung (Gas, Wasser, Öl)
Bauwesen:
Formbare Schalungen für Beton oder andere Baustoffe, die nach dem Aushärten entfernt werden
Automatische Wärmedämmung/Isolation bei Gebäuden
Haushalt & Alltag:
„Universalhelfer“: adaptive Werkzeuggriffe, Möbel, die sich dem Nutzer anpassen, selbstaufräumende Boxen
Sicherheit:
Temporäre Schutzräume bei Gefahr (z. B. Einbruch, Unwetter, Feuer)
Mobile Schutz- oder Sichtblenden in Krisensituationen
Forschung:
Modular einsetzbare Geräte in Laboren, die für verschiedene Versuchsaufbauten genutzt werden

- Mikro- und Nano-CellBots (<1 cm)
Gesundheit / Medizin:
Intelligente Wirkstoff-Carrier, die Medikamente punktgenau platzieren
Dynamische Stents, die sich an Gefäßverengungen anpassen
Bio-Printer, die Gewebe direkt im Körper rekonstruieren
Temporäre Mikro-Gerüste, um Zellen beim Heilen zu stützen
Tumorabschirmung, Gefässversiegelung, Endoskopie
Umweltschutz:
Mikro-Roboter zum Sammeln von Mikroplastik aus Gewässern
Intelligente Filterstrukturen für Luft und Wasser
Materialwissenschaft:
Selbstheilende Strukturen im Bauwesen, etwa Risse in Beton, Brücken, Flugzeugen
Intelligente Verpackungen, die sich an Produkt oder Transportbedingungen anpassen
Elektronik:
Adaptive Platinen und Schaltungen, die sich je nach Aufgabe neu verschalten
Optik und Tarnung:
Adaptive Oberflächen für Chamäleon-Effekte (z. B. in der Mode oder für das Militär)
„Elektronisches Papier“ mit 3D-Struktur, das Form und Farbe anpassen kann
Kunst & Design:
Interaktive Skulpturen, die auf Umgebung oder Publikum reagieren
Adaptive Bühnenbilder für Theater, Film, Events

- Visionäre/abgefahrene Felder, die als Impuls dienen können:
Terraforming:
Riesige Schwärme von CellBots, die Landschaften gezielt umformen (Mars, Mond, Katastrophenschutz)
Weltraum:
Raumschiffe, die sich im Flug je nach Belastung oder Funktion umstrukturieren
Weltraumteleskope, die erst im Orbit ihre komplexe Form ausbilden
Bildung:
„Magische Bauklötze“, die sich von Kindern programmieren lassen und so das kreative Denken und Problemlösen fördern

„Die größte Stärke liegt jedoch darin, dass programmierbare Materie sich je nach Bedarf in Sekundenschnelle neu strukturieren und anpassen kann – von der Großbaustelle bis zum Mikro-Implantat.“


--

Sven Pohl <sven.pohl@zen-systems.de> — MIT License © 2025


CellBots ist ein offenes Simulations- und Kontrollsystem für programmierbare Materie. 
Es basiert auf einer fiktiven Hardware, einem CellBot, der sich an baugleichen Elementen
bewegen, stapeln und fest verbinden kann, um beliebige Strukturen zu "morphen". 


* test

<center>
<img src="./skizze1.png" alt="Mein Bild" width="30%">
</center>


<figure>
 <center>
<img src="./skizze1.png" alt="Mein Bild" width="30%">
</center>
  <figcaption>Abbildung 1: Technische Skizze eines CellBots mit Richtungs-Pfeilen</figcaption>
</figure>


## Installation

1. Wechsle in das Verzeichnis `botcontroller`:
    ```sh
    cd botcontroller
    npm install
    ```
2. Wechsle in das Verzeichnis `clustersim`:
    ```sh
    cd ../clustersim
    npm install
    ```
    

# Mein Markdown-Beispiel

[Zurück Mainpage](testm.md)


# CellBot-Kommunikationsprotokoll (Stand Juli 2025)

## 1. Grundlegende Kommandos

| Befehl   | Richtung   | Beschreibung                    |
|----------|------------|---------------------------------|
| INFO     | → Bot      | Status/Identifikation anfragen  |
| RINFO    | ← Bot      | Antwort mit Statusdaten         |
| MOVE     | → Bot      | Bewegung (siehe unten)          |
| ALIFE    | → Bot      | Lebenszeichen anfordern         |
| RALIFE   | ← Bot      | Lebenszeichen senden            |
| ...      |            |                                 |

## 2. MOVE-Unterbefehle

MOVE kann folgende Subcommands enthalten:
- **move:**    Bewegung zu Koordinate (X,Y,Z)
- **spin:**    Rotation auf der Stelle
- **carry:**   Transportvorgang (in Arbeit)

## Wichtige Formatierungen


# CellBots – Projektstruktur

Das Repository besteht aus zwei Hauptkomponenten:  
- **botcontroller**: Steuert die Bots, berechnet Morphing, verarbeitet Sequenzen.
- **cluster_sim**: Visualisiert und simuliert die Bot-Cluster, inklusive Web-GUI.

## Verzeichnisübersicht

```text
.
├── botcontroller/
│   ├── bot_class_mini.js
│   ├── botcontroller_class.js
│   ├── botcontroller.js
│   ├── botexport.json
│   ├── cmd_parser_class.js
│   ├── config.cfg
│   ├── log.txt
│   ├── logger.js
│   ├── logs/
│   ├── morph/
│   ├── node_modules/
│   ├── package.json
│   ├── package-lock.json
│   ├── self_assembly.js
│   ├── sequences/
│   ├── structures/
│   └── webguicontroller/
│       └── index.html
│
├── cluster_sim/
│   ├── bot_class.js
│   ├── cluster_sim.js
│   ├── cmd_parser_class.js
│   ├── config.cfg
│   ├── constructs/
│   ├── logger_blender.js
│   ├── logger.js
│   ├── logs/
│   ├── masterbot_class.js
│   ├── node_modules/
│   ├── package.json
│   ├── package-lock.json
│   └── webguisim/
│       └── index.html

´´´

**Fett**  
*Kursiv*  
~~Durchgestrichen~~

# CellBot – Befehle & Opcodes

| Opcode | Beschreibung             | Parameter   | Antwort       |
|--------|--------------------------|-------------|---------------|
| PING   | Lebt-Check               | -           | PONG          |
| MOVE   | Bot bewegen              | Richtung    | OK / ERROR    |
| INFO   | Bot-Status abfragen      | -           | JSON-Status   |
| ...    | ...                      | ...         | ...           |

Weitere Details siehe [Nachrichtenformate](nachrichtenformate.md).

---


## **Einfache Blockstruktur (Graph):**

```markdown
```mermaid
graph LR
    A[Web-App] --> B((Controller))
    B --> C{CellBot}
    C --> D((Sensor))
    C --> E((Motor))
    

---

```mermaid
flowchart TD
    User["User (WebGUI)"] -->|sendet| Controller
    Controller -->|sendet PING| CellBot1
    Controller -->|sendet MOVE| CellBot2
    CellBot1 -->|antwortet PONG| Controller
    CellBot2 -->|antwortet OK| Controller
    Controller -->|Antwort an| User

```


---

### Liste

- Erster Punkt
- Zweiter Punkt
- Dritter Punkt

1. Nummeriert
2. Zweiter Eintrag

---

> **Zitat:**  
> „Markdown ist einfach zu lesen und zu schreiben.“

---

### Code

`Inline-Code`  
```js
function hello(name) {
  console.log("Hallo, " + name + "!");
}


---

**Du kannst das so direkt in MacDown, Typora, GitHub oder VS Code testen.**  
Das Bild nimmt eine reale URL – du kannst natürlich auch lokale Bilder wie  
`![Mein Bild](./bild.jpg)` verwenden.

Wenn du einen bestimmten Stil, ein anderes Beispiel oder Emoji möchtest, einfach melden!


![Mein Bild](./bild.jpg)





---

## 1. INFO

**Allgemeine Infoanfrage an Bot.**  
Format:  
`[(Slot)#INFO#TMPID#(Return-Adress)]`

**Beispiel:**  
`F#INFO#001#S` (z.B. Anfrage von „B“/Back)

**Antwort (RINFO):**  
`B#RINFO#(ID);(TMPID);(Type);(Slot[-Quelle]);(Vektor)`  
_Beispiel:_  
`B#RINFO#B01;001;0;B;-1,0,0`  
- Vektor = Richtung (ggf. auch Drehwinkel bei T/D)

---

## 2. CHECK

**Prüft, ob an einem Slot ein CellBot ist und ob er antwortet.**  
Format:  
`[(Slot)#CHECK#(Slot[Target])#(Return-Adress)]`  
_Beispiel:_  
`F#CHECK#R#B`

**Antwort (RCHECK):**  
`B#RCHECK#(ID);(Status)`  
- Status: `OK`, `OFFL`, `EMPT`

---

## 3. MOVE

**Motorik-Befehl, umfasst verschiedene Aktionen, Subkommandos durch Kommas getrennt.**  
Allgemeines Format:  
`[(Slot)#MOVE#D_MF_D#(Return-Adress)]`

**Typische Subkommandos:**  
- move (MF): Geradeaus vorwärts, Angabe von Wiederholungen (`D_MF_D2`)
- climb (TF/DF): Klettern auf/von Nachbarbot
- spin (SR): Rotation um eigene Achse (`D_SR_D2`)
- connect (CLR): Verbindung zu Nachbarbot herstellen oder lösen (`#CLR`)
- grab (GF): Greifen/Loslassen (`GF`, `G`)
- lifesign: Lebenszeichen anfordern (`...,ALIFE`)

**Antwort (RALIFE):**  
`[(Slot)#RALIFE#B001]`

---

## 4. CUSTOM (X-Befehle)

**Eigene Spezialkommandos, immer mit „X“ beginnend.**  
Format:  
`[(Slot)#X[CUSTOM-BEFEHL]#(PARAM)]#(Return-Adress)`

_Beispiele:_  
- Setze Farbe: `F#XSC#ff0000`
- Lese Farbe: `F#XRC#B`
- Touchsensor: `F#XGTS#get-touch-sensor-analog`

**Antwort:**  
meistens ja (je nach Befehl)

---

## SONDERFÄLLE

Derzeit keine berücksichtigt.

---

### **ASCII-Übersicht der Slots**

```text
        T    L
        |   / 
         ------
        / ->  /|  
       ------  |  
B <-   |    |  |   -> F
       |    | / 
       ------
        |  /
        D  R

