Command to create a migration: add-migration {migration name}
Command to update database with last migration: update-database

Next steps:
1. DONE - convertire EditReservation da HttpPut a Http Patch?
2. DONE - come integro un'applicazione frontend in React?
3. DONE - come connetto l'app frontend con le API?
4. DONE - refactoring dei form, testare creazione, modifica e messaggi di errore in entrambi i form
5. DONE - modifica di una prenotazione
6. CRUD con <DataGrid /> + display dei messaggi di error nella snackbar
	DONE- salvare la prenotazione con la data selezionata
	- delete di una prenotazione
	- svuotare il form di creazione dopo il submit
	DONE - paginazione filtrata per giorno
	- check di usare gli Effect nel modo corretto
7. DONE salvare correttamente il campo 'hour', perché row.Hour e non row.hour?
8. DONE paginazione con i giorni dell'anno corrente
9. eliminazione di una prenotazione anche per giorni futuri
10. impedire di aggiungere e modificare prenotazioni in giorni passati 
11. fare altri test per salvataggio, modifica, e messaggi di errore
12. DONE - sistemare CssVariables con l'issue che ho aperto su github
13. calendario per agevolare la selezione di una data
14. timeout che reimposta la data di oggi dopo un intervallo di tempo
15. alert (vedi notion)
16. DONE - centrare spinner
17. tradurre "No rows" in "Nessun prenotazione per questo giorno"
18. backend deve restituire tutti i messaggi di errore e in italiano
19. eliminare progetti della solution non più necessari
20. form:
    - se è valido, viene svuotato
    - se contiene errori, non viene svuotato
    - se contiene errori ma viene modificato il campo, si svuotano gli errori del campo modificato

Todo:
- svuotare il form di creazione dopo aver premuto submit
- testare i messaggi di errore
- controllare che non ci siano side effect e che i componenti siano stati creati seguendo le guide di react
1. DONE - controllare di aver abilitato correttamente in CORS
2. validazione corretta degli input dell'utente: 
	- DONE il campo 'People' deve essere di tipo numerico e non accettare valori inferiori a 1
	- il campo 'Table' dovrebbe suggerire la lista di tavoli liberi o dovrebbe controllare che vengano inseriti solamente dei valori validi (magari basandosi sulla mappa?)
	- DONE il campo 'DateTime' deve accettare valori da 0 a 24 per le ore e da 0 a 60 per i minuti
3. DONE - testare la validazione dei dati e i messaggi di errore

Resources:
1. CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
2. Icons: https://mui.com/material-ui/material-icons/
3. Pluralsight: https://app.pluralsight.com/library/courses/asp-dot-net-core-6-web-api-react-building-end-to-end-spa/table-of-contents

