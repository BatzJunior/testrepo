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
`partUuids`           | Guids of the parts | Restricts the query to these parts guids | <nobr>{{site.sections['getLabel']}} {{site.sections['deleteLabel']}} /parts</nobr><br> {{site.sections['getLabel']}} /characteristics
`partPath`            | Path of the part | Restricts the query to this part path  | <nobr>{{site.sections['getLabel']}} {{site.sections['deleteLabel']}} /parts</nobr><br> {{site.sections['getLabel']}} /characteristics
`charUuids`           | Guids of the characteristics | Restricts the query to these characteristics guids | <nobr>{{site.sections['getLabel']}} /characteristics</nobr>
`charPath`            | Path of the characteristic | Restricts the query to this characteristic path  | <nobr>{{site.sections['getLabel']}} /characteristics</nobr>
`depth`               | i, i ≥ 0  <br>**1**  | It controls down to which level of the inspection plan the entities should be fetched. Setting *depth:0* means that only the entity itself should be fetched, *depth:1* means the entity and its direct children should be fetched and so on. <br><br>Example:<br>`depth=5` | <nobr>{{site.sections['getLabel']}} /parts</nobr><br> {{site.sections['getLabel']}} /characteristics
`withHistory`         | true, **false**      | Determines whether the version history should be fetched or not. Does only effect the query if versioning is activated on the server side. <br><br>Example:<br>`withHistory=true` | <nobr>{{site.sections['getLabel']}} /parts</nobr><br> {{site.sections['getLabel']}} /characteristics
`partAttributes`      | IDs of the attributes | Restricts the query to the attributes that should be returned for parts. <br><br>Example:<br>`partAttributes=(1001,1008)` | <nobr>{{site.sections['getLabel']}} /parts</nobr>
`characteristicAttributes` | IDs of the attributes | Restricts the query to the attributes that should be returned for characteristics. <br><br>Example:<br>`characteristicAttributes=(2001,2101)` | <nobr>{{site.sections['getLabel']}} /characteristics</nobr>
{% endcapture %}
{{ table | markdownify | replace: '<table>', '<table class="table table-hover">' }}

{% assign linkId="inspectionPlanEndpointGetAllParts" %}
{% assign method="GET" %}
{% assign endpoint="/parts" %}
{% assign summary="Fetches parts" %}
{% assign description="Fetches all parts or the parts restricted by the uri parameters." %}
{% assign exampleCaption="Fetch the part with the path '/metal part'" %}

{% capture jsonrequest %}
{% highlight http %}
GET /dataServiceRest/parts?partPath=/metal%20part HTTP/1.1
{% endhighlight %}
{% endcapture %}

{% capture jsonresponse %}
{% highlight json %}
{
   ...
   "data":
   [
      {
           "path": "P:/metal part/",
           "charChangeDate": "2014-11-19T10:48:32.917Z",
           "attributes": {},
           "uuid": "05040c4c-f0af-46b8-810e-30c0c00a379e",
           "version": 0,
           "timestamp": "2012-11-19T10:48:32.887Z",
           "current": true
       }
   ]
}
{% endhighlight %}
{% endcapture %}

{% include endpointTab.html %}


{% assign linkId="inspectionPlanEndpointAddParts" %}
{% assign method="POST" %}
{% assign endpoint="/parts" %}
{% assign summary="Creates parts" %}
{% capture description %}

To create an inspection plan entity it is necessary to transfer the entity object within the request's body. A unique identifier and the path are mandatory, attributes and a comment are optional. The attribute keys which are used for the attributes must come from the parts/characteristics attribute range (specified in the {{ site.links['configuration'] }})

{{ site.images['info'] }} The comment is only added if versioning is enabled in the server settings.
{% endcapture %}

{% assign exampleCaption="Adding the 'metal part' part with the uuid 05040c4c-f0af-46b8-810e-30c0c00a379e" %}

{% capture jsonrequest %}
{% highlight http %}
POST /dataServiceRest/parts HTTP/1.1
{% endhighlight %}

{% highlight json %}
[
  {
    "uuid": "05040c4c-f0af-46b8-810e-30c0c00a379e",
    "path": "/metal part",
    "attributes": { "1001": "4466", "1003": "mp" }       
  }
]
{% endhighlight %}
{% endcapture %}

{% capture jsonresponse %}
{% highlight http %}
HTTP/1.1 201 Created
{% endhighlight %}

{% highlight json %}
{
   "status":
   {
       "statusCode": 201,
       "statusDescription": "Created"
   },
   "category": "Success"
}
{% endhighlight %}
{% endcapture %}

{% include endpointTab.html %}


{% assign linkId="inspectionPlanEndpointUpdateParts" %}
{% assign method="PUT" %}
{% assign endpoint="/parts" %}
{% assign summary="Updates parts" %}
{% capture description %}

Updating inspection plan entities might regard the following aspects: 

* Rename/move parts
* Change part's attributes

{{site.images['info']}} If versioning is activated on server side, every update of one or more parts creates a new version entry.
{% endcapture %}

{% assign exampleCaption="Change the "metal part"*s attributes" %}
{% capture jsonrequest %}
{% highlight http %}
PUT /dataServiceRest/parts HTTP/1.1
{% endhighlight %}

{% highlight json %}
[
  {
     "path": "/metal part",
     "attributes": { "1001": "4469", "1003": "metalpart" }       
     "uuid": "05040c4c-f0af-46b8-810e-30c0c00a379e",
  }
]
{% endhighlight %}
{% endcapture %}

{% capture jsonresponse %}
{% highlight http %}
HTTP/1.1 200 Ok
{% endhighlight %}

{% highlight json %}
{
   "status":
   {
       "statusCode": 200,
       "statusDescription": "Ok"
   },
   "category": "Success"
}
{% endhighlight %}
{% endcapture %}

{% include endpointTab.html %}

{% assign linkId="inspectionPlanEndpointDeleteParts" %}
{% assign method="DELETE" %}
{% assign endpoint="/parts" %}
{% assign summary="Deletes parts" %}
{% capture description %}
There are two possibilities you can delete parts, either by their path or by their uuids. This means that one of the filter parameters `partPath` or `partUuids` has to be set. In both cases the entity itself as well as all children are deleted.
{% endcapture %}

{% assign exampleCaption="Delete the part 'metal part'  and all entities beneath it" %}
{% capture jsonrequest %}
{% highlight http %}
DELETE /dataServiceRest/parts?partPath=/metal%20part HTTP/1.1
{% endhighlight %}
{% endcapture %}

{% capture jsonresponse %}
{% highlight http %}
HTTP/1.1 200 Ok
{% endhighlight %}

{% highlight json %}
{
   "status":
   {
       "statusCode": 200,
       "statusDescription": "Ok"
   },
   "category": "Success"
}
{% endhighlight %}
{% endcapture %}

{% include endpointTab.html %}



{% assign linkId="inspectionPlanEndpointGetPart" %}
{% assign method="GET" %}
{% assign endpoint="/parts/:partUuid" %}
{% assign summary="Fetches a certain part by its :partUuid" %}
{% assign description="" %}
{% assign exampleCaption="Fetch the part '/metal part' by its guid" %}

{% capture jsonrequest %}
{% highlight http %}
GET /dataServiceRest/parts/05040c4c-f0af-46b8-810e-30c0c00a379e HTTP/1.1
{% endhighlight %}
{% endcapture %}

{% capture jsonresponse %}
{% highlight json %}
{
   ...
   "data":
   [
      {
           "path": "P:/metal part/",
           "charChangeDate": "2014-11-19T10:48:32.917Z",
           "attributes": {},
           "uuid": "05040c4c-f0af-46b8-810e-30c0c00a379e",
           "version": 0,
           "timestamp": "2012-11-19T10:48:32.887Z",
           "current": true
       }
   ]
}
{% endhighlight %}
{% endcapture %}

{% include endpointTab.html %}



{% assign linkId="inspectionPlanEndpointDeletePart" %}
{% assign method="DELETE" %}
{% assign endpoint="/parts/:partUuid" %}
{% assign summary="Delete a part by its :partUuid" %}
{% capture description %}
If you delete a part the entity itself as well as all children are deleted.
{% endcapture %}

{% assign exampleCaption="Delete the part 'metal part' and all entities beneath it by its guid" %}
{% capture jsonrequest %}
{% highlight http %}
DELETE /dataServiceRest/parts/05040c4c-f0af-46b8-810e-30c0c00a379e HTTP/1.1
{% endhighlight %}
{% endcapture %}

{% capture jsonresponse %}
{% highlight http %}
HTTP/1.1 200 Ok
{% endhighlight %}

{% highlight json %}
{
   "status":
   {
       "statusCode": 200,
       "statusDescription": "Ok"
   },
   "category": "Success"
}
{% endhighlight %}
{% endcapture %}

{% include endpointTab.html %}
