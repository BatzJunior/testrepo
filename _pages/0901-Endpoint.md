---
category: rawdata
title: Endpoint Information
isContent: true
permalink: /rawdata#endpoint
---

##Endpoint information

Raw data as well as information about the raw data can be fetched, added, updated and deleted via the following endpoints. Filter can be set as described in the [URL-Parameter section](General-Information#raw-data).

URL Endpoint | GET | PUT | POST | DELETE
-------------|-----|-----|------|-------
rawData/*entity*/ *uuid*/*key* | Returns rawData file for the specified *entity* with the committed *uuid* and *key* | Updates the committed  rawData file for the *entity* with the *uuid* and *key* | Creates the committed rawData file(s) for the *entity* with the *uuid* | Deletes rawData file for the specified *entity* with the comitted *uuid* and *key* or all raw data if no *key* is given
rawData/*entity*/ *uuid*/*key*/ thumbnail | Returns a preview image of the raw data object for the specified *entity* with the committed *uuid* and *key* | *Not supported* | *Not supported* | *Not supported*
/rawData/*entity* | Returns a list of raw data information for the *entity* with the uuids commited within the url parameter section | *Not supported* | *Not supported* | *Not supported*
