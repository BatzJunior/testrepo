---
category: dataService
subCategory: serviceInformation
title: Data Service
subTitle: Service Information
isSubPage: true
permalink: /serviceinformation/
sections:
  endpoint: Endpoint Information
---

## {{ page.sections['endpoint'] }}

Fetching service information is guaranteed to be very fast and is therefore well suited for checking the connection. This method can always be invoked without having to specify credentials. There are no filter parameter to restrict the query.

URL Endpoint | GET | PUT | POST | DELETE
-------------|-----|-----|------|-------
/serviceInformation | Returns general information about the PiWeb-Server | not supported | not supported | not supported
