---
category: dataservice
subCategory: catalogues
title: Data Service
subTitle: Catalogues
isSubPage: true
permalink: /dataservice/catalogues/
sections:
  endpoint: Endpoint Information
  add: Add Catalogues
  get: Get Catalogues
  update: Update Catalogues
  delete: Delete Catalogues
---

## {{ page.sections['endpoint'] }}

Catalogues and catalogue entries can be fetched, created, updated and deleted via the following endpoints. Filter can be set as described in the [URL-Parameter section](https://github.com/BatzJunior/testrepo/wiki/General-Information#catalogues).

URL Endpoint | GET | PUT | POST | DELETE
-------------|-----|-----|------|-------
/catalogues | Returns all catalogues | Creates the committed catalogue(s) which is/are transferred in the body of the request | Updates the committed catalogues and their entries | Deletes all catalogues and the catalogue entries
/catalogues/{catUuid1, catUuid2,...} | Returns the catalogues that uuids are within the catUuid list | *not supported* | *not supported* | Deletes the catalogue(s) which has/have the given catUuid(s)
