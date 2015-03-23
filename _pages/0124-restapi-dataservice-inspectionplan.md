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
Parameter name      | Possible values [**default value**] | Description  <br> ```Example``` | Accepted by endpoint
--------------------|------------------------------       |---------------------------------|--------------------------
`partUuids`           | IDs of the parts | Restricts the query to these parts ids | <nobr>{{site.sections['getLabel']}} {{site.sections['deleteLabel']}} /parts</nobr><br> {{site.sections['getLabel']}} /characteristics
`partPath`            | Path of the part | Restricts the query to this part path  | <nobr>{{site.sections['getLabel']}} {{site.sections['deleteLabel']}} /parts</nobr><br> {{site.sections['getLabel']}} /characteristics
`charUuids`           | IDs of the characteristics | Restricts the query to these characteristics ids | <nobr>{{site.sections['getLabel']}} /characteristics</nobr>
`charPath`            | Path of the characteristic | Restricts the query to this characteristic path  | <nobr>{{site.sections['getLabel']}} /characteristics</nobr>
`depth`               | i, i ≥ 0  <br>**1**  | Restricts the query to the specified depth of the inspection plan tree. <br><br>Example:<br>```depth=5``` | <nobr>{{site.sections['getLabel']}} /parts</nobr><br> {{site.sections['getLabel']}} /characteristics
`withHistory`         | true, **false**      | Determines whether the version history should be fetched or not. Does only effect the query if versioning is activated on the server side. <br><br>Example:<br>```withHistory=true``` | <nobr>{{site.sections['getLabel']}} /parts</nobr><br> {{site.sections['getLabel']}} /characteristics
`partAttributes`      | IDs of the attributes | Restricts the query to the attributes that should be returned for parts. <br><br>Example:<br>```partAttributes=(1001,1008)``` | <nobr>{{site.sections['getLabel']}} /parts</nobr>
`characteristicAttributes` | IDs of the attributes | Restricts the query to the attributes that should be returned for characteristics. <br><br>Example:<br>```characteristicAttributes=(2001,2101)``` | <nobr>{{site.sections['getLabel']}} /characteristics</nobr>
{% endcapture %}
{{ table | markdownify | replace: '<table>', '<table class="table table-hover">' }}
