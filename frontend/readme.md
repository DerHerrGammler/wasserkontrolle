# Frontend für BetterBEE

## Angular

Als Frontend Framework wird an dieser Stelle Angular eingesetzt.


## Development

Für das Entwickeln wird an dieser Stelle eine Instalation von NodeJS und Angular CLI vorrausgesetzt.<br />
Dann muss der cmd Befehlt `npm install` ausgeführt werden.<br />
Nachdem dieser erfolgreich durchlaufen ist kann mit `npm run ng:serve` der Dev-Server gestartet werden, der dann unter der Addresse `http://localhost:4210` erreichbar ist.

## Auslieferung

Für eine Auslieferung muss alles aus der `Development` Rubrik funktionieren.
Falls eine API existiert, muss diese in der `/src/enironments/environment.prod.ts` Datei noch richtig eingestellt werden. Unter dem Punkt `apiSettings` sollte nun in `main: ""` die richtige URL für die API eingetragen werden, welche im Productionbuild verwendet wird.<br />
Nun kann mit `npm run build:prod` einer funktionierender Prodoktionbuild erstellt werden, welcher dann im `/dist` Verzeichnis zu finden ist.<br />
Dieses `/dist` Verzeichniss kann nun auf einen Server hochgeladen werden und dort eingesetzt werden.


### FAQ

Für weitere Fragen stehe ich gerne über WhatsApp oder E-Mail (herold_felix@web.de) zur Verfügung.
