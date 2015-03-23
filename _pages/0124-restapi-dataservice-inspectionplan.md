---
area: restApi
level: 2
category: dataService
subCategory: inspectionPlan
title: REST API
subTitle: Data Service
pageTitle: Inspection Plan
permalink: /restapi/dataservice/inspectionplan/
---

## {{ page.pageTitle }}

### Endpoints

You can fetch, create, update and delete parts and characteristics via the following endpoints which provide the followingg filters:

{% capture table %}
Parameter name      | Possible values [**default value**] | Description  <br> ```Example``` | Accepted by endpoint | Accepted by HTTP methods
--------------------|-----------------|-------------|----------------------|--------------------------
depth               | i, i ≥ 0  <br>**1**  | Restricts the query to the specified depth of the inspection plan tree. <br><br>Example:<br>```depth:5``` | parts, characteristics | GET
withHistory         | true, **false**      | Determines whether the version history should be fetched or not. Does only effect the query if versioning is activated on the server side. <br><br>Example:<br>```withHistory:true``` | parts, characteristics | GET
partAttributes      | IDs of the attributes | Restricts the query to the attributes that should be returned for parts. <br><br>Example:<br>```partAttributes:{1001,1008}``` | parts | GET
characteristicAttributes | IDs of the attributes | Restricts the query to the attributes that should be returned for characteristics. <br><br>Example:<br>```characteristicAttributes:{2001,2101}``` | characteristics | GET
{% endcapture %}
{{ table | markdownify | replace: '<table>', '<table class="table table-hover">' }}
