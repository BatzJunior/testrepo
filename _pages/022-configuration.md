---
category: dataservice
subCategory: configuration
title: Data Service
subTitle: Configuration
isSubPage: true
permalink: /dataservice/configuration/
sections:
  endpoint: Endpoint Information
  add: Add Attributes
  get: Get Configuration
  update: Update Attributes
  delete: Delete Attributes
---

## {{ page.sections['endpoint'] }}

The PiWeb configuration consists of a list of attributes for all types of entities. In PiWeb there are different kinds of entites: parts, characteristics, measurements, values and catalogues. 
The configuration can be created, fetched, updated and deleted via the following endpoint. There are no filter parameters to restrict the query.

URL Endpoint | GET | PUT | POST | DELETE
-------------|-----|-----|------|-------
/configuration| Returns the attribute configuration (list of attributes for each entity). | *Not supported* | *Not supported* | Deletes all attribute definitions.
/configuration/*entityType*| *Not supported* | Creates the attribute defintions transfered within the body of the request for the given *entityType* | Updates the attribute defintions transfered within the body of the request for the given *entityType* | *Not supported*
configuration/*entityType*/{*List of attribute definition ids*} | *Not supported* | *Not supported* | *Not supported* | Deletes the attribute definitions identified by the *List of attribute definition ids* for the given *entityType*

## {{ page.sections['add'] }}

To add one or more attributes to the configuration the entity type the attributes belong to as well as the attribute definition(s) need to be transfered. The entity type ist transfered in the uri the attributes within the body of the request.

### Example of adding an part attribute to the configuration

{% highlight http %}
POST /dataServiceRest/configuration/parts HTTP/1.1
{% endhighlight %}

## {{ page.sections['get'] }}

Fetching the whole configuration returns the attribute definitions for all kind of entities.

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
