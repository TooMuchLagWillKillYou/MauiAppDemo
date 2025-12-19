
+----------------------------------------------------------------------------------------------------------------------+
|   ENTITY FRAMEWORK                                                                                                   |
+----------------------------------------------------------------------------------------------------------------------+
Command to create a migration: add-migration {migration name}
Command to update database with last migration: update-database

+----------------------------------------------------------------------------------------------------------------------+
|   NEXT STEPS                                                                                                         |
+----------------------------------------------------------------------------------------------------------------------+
// BE
- generazione dei pdf secondo le options inserite dall'utente
- custom valueGetter per la colonna "Categoria". Non si deve vedere 1 o 0 ma "Classiche"/"Specialità"
- nuova feature che tramite AI dispone i tavoli nella maniera corretta in base al numero di persone e alle prenotazioni già esistenti

// DB
- inserire dei CHECK nel database dove necessario
- di tanto in tanto eseguire il comando DBCC CHECKCONSTRAINTS

// FE
- dare la possibilità all'utente di rimuovere il tavolo da uan prenotazione con una option vuota, sia in fase di creazione che in fase di aggiornamento
- sistemare l'update di una prenotazione
- impedire la modifica di una prenotazione passata o già arrivata
- cambio di stato di una prenotazione (Cancelled, Gone)
- nuova sezione "worked hours" per tenere traccia delle ore lavorate dai dipendenti. Teoricamente saranno i dipendenti a inserire le loro ore di lavoro
- sezione "calendario" per definire i giorni di chiusura del locale
- modifica del menù dal fronted
	- l'utente deve poter modificare la colonna "Categoria" scegliendo da un dropdown
	- update di una prenotazione (il componente <DataGrid> non funziona bene)
- controllare di usare gli Effect nel modo corretto
- eliminazione di una prenotazione anche per giorni futuri
- impedire di aggiungere e modificare prenotazioni in giorni passati 
- timeout che reimposta la data di oggi dopo un intervallo di tempo
- alert (vedi notion)
- tradurre "No rows" in "Nessun prenotazione per questo giorno"
- messaggi di errore in italiano
- il campo 'Table' dovrebbe suggerire la lista di tavoli liberi o dovrebbe controllare che vengano inseriti solamente dei valori validi (magari basandosi sulla mappa?)>
- considerare di sostituire open-meteo con Azure Maps Weather Service https://learn.microsoft.com/en-us/rest/api/maps/weather/get-hourly-forecast?view=rest-maps-2025-01-01&tabs=HTTP


+----------------------------------------------------------------------------------------------------------------------+
|   DONE STEPS                                                                                                         |
+----------------------------------------------------------------------------------------------------------------------+
- convertire EditReservation da HttpPut a Http Patch?
- come integro un'applicazione frontend in React?
- come connetto l'app frontend con le API?
- refactoring dei form, testare creazione, modifica e messaggi di errore in entrambi i form
- modifica di una prenotazione
- salvare la prenotazione con la data selezionata
- delete di una prenotazione
- svuotare il form di creazione dopo il submit
- paginazione filtrata per giorno
- salvare correttamente il campo 'hour', perché row.Hour e non row.hour?
- paginazione con i giorni dell'anno corrente
- con l'issue che ho aperto su github
- calendario per agevolare la selezione di una data
- backend deve restituire tutti i messaggi di errore
- centrare spinner
- testare la validazione dei dati e i messaggi di errore
- il campo 'People' deve essere di tipo numerico e non accettare valori inferiori a 1
- il campo 'DateTime' deve accettare valori da 0 a 24 per le ore e da 0 a 60 per i minuti
- controllare di aver abilitato correttamente in CORS
- eliminare progetti della solution non più necessari
- testare caricamento, create/update dei menu item tramite il nuovo endpoint
- rimuovere la dipendenza da @mui/joy
- aggiornare a EF Core 9? non necessario
- versionare il menù in modo da poter recuperare il menù di una data specifica, facendo attenzione a recuperare la corretta versione del menù quando serve. 
	Voglio essere in grado di recuperare ongi modifica di ogni elemento del menù. Hint: system-versioned tables
- riprendere in mano il frontend una volta completate le API. Decidere se continuare con MUI o usare un altra libreria grafica
- implementare le rotte con react-router
- creazione di una prenotazione
- validare che non si possano fare prenotazioni in orari in cui il ristorante è chiuso
- display dei messaggi di errore tramite <Snackbar>
- migliorare la validazione con Zod quando si crea una prenotazione, Alcuni campi devono essere required, il campo tableId, se presente, deve essere un tavolo esistente
- meteo e ora in alto a destra

Condizioni con cui è possibile aggiornare una prenotazione:
- la prenotazione non deve essere già arrivata
- la prenotazione non può essere di un giorno precedente ad oggi
- è possibile aggiornare una prenotazione di un orario già passato solamente se la prenotazione è di oggi
