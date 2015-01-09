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
