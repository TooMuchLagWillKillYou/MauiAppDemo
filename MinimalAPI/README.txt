Command to create a migration: add-migration {migration name}
Command to update database with last migration: update-database

Next steps:
1. DONE - convertire EditReservation da HttpPut a Http Patch?
2. DONE - come integro un'applicazione frontend in React?
3. DONE - come connetto l'app frontend con le API?
4. DONE - refactoring dei form, testare creazione, modifica e messaggi di errore in entrambi i form
5. DONE - modifica di una prenotazione
6. CRUD con <DataGrid /> + display dei messaggi di error nella snackbar
	- salvare la prenotazione con la data selezionata
	- delete di una prenotazione
	- svuotare il form di creazione dopo il submit
	- paginazione filtrata per giorno
	- check di usare gli Effect nel modo corretto
7. salvare correttamente il campo 'hour', perché row.Hour e non row.hour?
8. paginazione con i giorni dell'anno corrente
navigazione ai componenti 'Prenotazioni' e 'Tavoli'

Todo:
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