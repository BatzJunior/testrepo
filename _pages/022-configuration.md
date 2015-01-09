---
category: dataservice
subCategory: configuration
title: Data Service
subTitle: Configuration
isSubPage: true
permalink: /dataservice/configuration/
sections:
  endpoint: Endpoint Information
  get: Get Configuration
---

## {{ page.sections['endpoint'] }}

The PiWeb configuration consists of a list of all entities' attributes and can be fetched via the following endpoint. There are no filter parameter to restrict the query.

URL Endpoint | GET | PUT | POST | DELETE
-------------|-----|-----|------|-------
/configuration| Returns the attribute configuration (list of attributes for each entity). | not supported | not supported | not supported
