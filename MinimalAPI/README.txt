
+----------------------------------------------------------------------------------------------------------------------+
|   ENTITY FRAMEWORK                                                                                                   |
+----------------------------------------------------------------------------------------------------------------------+
Command to create a migration: add-migration {migration name}
Command to update database with last migration: update-database

+----------------------------------------------------------------------------------------------------------------------+
|   NEXT STEPS                                                                                                         |
+----------------------------------------------------------------------------------------------------------------------+
- testare caricamento, create/update dei menu item tramite il nuovo endpoint
- una volta che abbiamo tutte le voci del menu, possiamo generarlo nel frontend
- chiamata alle API a cui viene passato l'html + generazione dei pdf
- custom valueGetter per la colonna "Categoria". Non si deve vedere 1 o 0 ma "Classiche"/"Specialità"
- l'utente deve poter modificare la colonna "Categoria" scegliendo da un dropdown
- creazione di una pizza
- delete di una pizza
- rimuovere la dipendenza da @mui/joy
- display dei messaggi di errore tramite <Snackbar>
- update di una prenotazione (il componente <DataGrid> non funziona bene)
- implementare le rotte con react-router
- creare i .pdf del menù partendo dall'html tramite il pacchetto nuget itext
- controllare di usare gli Effect nel modo corretto
- eliminazione di una prenotazione anche per giorni futuri
- impedire di aggiungere e modificare prenotazioni in giorni passati 
- fare altri test per salvataggio, modifica, e messaggi di errore
- timeout che reimposta la data di oggi dopo un intervallo di tempo
- alert (vedi notion)
- tradurre "No rows" in "Nessun prenotazione per questo giorno"
- messaggi di errore in italiano
- il campo 'Table' dovrebbe suggerire la lista di tavoli liberi o dovrebbe controllare che vengano inseriti solamente dei valori validi (magari basandosi sulla mappa?)>

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

+----------------------------------------------------------------------------------------------------------------------+
|   RESOURCES                                                                                                          |
+----------------------------------------------------------------------------------------------------------------------+
1. CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
2. Icons: https://mui.com/material-ui/material-icons/
3. Pluralsight: https://app.pluralsight.com/library/courses/asp-dot-net-core-6-web-api-react-building-end-to-end-spa/table-of-contents

