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

The PiWeb configuration consists of a list of all entities' attributes. This list can be created, fetched, updated and deleted via the following endpoint. There are no filter parameters to restrict the query.

URL Endpoint | GET | PUT | POST | DELETE
-------------|-----|-----|------|-------
/configuration| Returns the attribute configuration (list of attributes for each entity). | not supported | not supported | Deletes all attribute definitions.
/configuration/*entityType*| *Not supported* | Creates the attribute defintions transfered within the body of the request for the given *entityType* | Updates the attribute defintions transfered within the body of the request for the given *entityType* | *Not supported*
configuration/*entityType*/{*List of attribute definition ids*} | *Not supported* | *Not supported* | *Not supported* | Deletes the attribute definitions identified by the *List of attribute definition ids* for the given *entityType*

## {{ page.sections['get'] }}

####Example for direct webservice call

Request:

{% highlight http %}
GET /dataServiceRest/configuration HTTP/1.1
{% endhighlight %}

Response:
{% highlight json linenos %}
{
   ...
   "data":
   [
       {
          "partAttributes":
          [
           [
               1001,
               "true",
               "Teilenummer",
               "false",
               30,
               "AlphaNumeric",
               "AttributeDefinition"
           ],
           [
               1003,
               "true",
               "Teilekurzbezeichnung",
               "false",
               20,
               "AlphaNumeric",
               "AttributeDefinition"
           ],
           ...
          ],
          "characteristicAttributes":
          [
           [
               2001,
               "true",
               "Merkmalsnummer",
               "false",
               20,
               "AlphaNumeric",
               "AttributeDefinition"
           ],
           ...
          ],
          "measurementAttributes":
          [
          ...
          ],
          "valueAttributes":
          [
          ...
          ],
          "catalogueAttributes":
          [
          ...
          ]
       }
   ]
}
{% endhighlight %}

####Example for webservice call via API.dll

{% highlight csharp %}
var client = new DataServiceRestClient( serviceUri );
Configuration information = client.GetConfiguration();
{% endhighlight %}
