---
category: dataservice
title: Data Service
permalink: /dataservice/
sections:
  serviceInformation: Service Information
  configuration: Configuration
  catalogues: Catalogues
  parts: Parts
  characteristics: Characteristics
  measurements: Measurements
  values: Measured Values
---

## {{page.sections['serviceInformation']}}

Fetching service information is guaranteed to be very fast and is therefore well suited for checking the connection. This method can always be invoked without specifying credentials. There are no filter parameters to restrict the query.

URL Endpoint | GET | PUT | POST | DELETE
-------------|-----|-----|------|-------
/serviceInformation | Returns general information about the PiWeb-Server | not supported | not supported | not supported
