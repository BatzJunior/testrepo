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
The configuration can be created, fetched, updated and deleted via the following endpoints. There are no filter parameters to restrict the query.

URL Endpoint | GET | PUT | POST | DELETE
-------------|-----|-----|------|-------
/configuration| Returns the attribute configuration (list of attributes for each entity). | *Not supported* | *Not supported* | Deletes all attribute definitions.
/configuration/*entityType*| *Not supported* | Creates the attribute defintions transfered within the body of the request for the given *entityType* | Updates the attribute defintions transfered within the body of the request for the given *entityType* | *Not supported*
configuration/*entityType*/{*List of attribute definition ids*} | *Not supported* | *Not supported* | *Not supported* | Deletes the attribute definitions identified by the *List of attribute definition ids* for the given *entityType*

## {{ page.sections['add'] }}

To add one or more attributes to the configuration the entity type the attributes belong to as well as the attribute definition(s) need to be transfered. The entity type ist transfered in the uri the attributes within the body of the request.

### Example of adding a part attribute to the configuration

{% highlight http %}
POST /dataServiceRest/configuration/parts HTTP/1.1
{% endhighlight %}

{% highlight json %}
{
  "key":1001,
  "description":"Teilenummer",
  "length":30,
  "type":"AlphaNumeric"
}
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
               "key":1001,
               "queryEfficient":true,
               "description":"Teilenummer",
               "modifiable":false,
               "length":30,
               "type":"AlphaNumeric",
               "definitionType":"AttributeDefinition"
           ],
           [
               "key": 1105,
               "queryEfficient": true,
               "description": "Test",
               "modifiable": false,
               "catalogue": "dad71a03-5cdc-4c50-96bc-ccd80e34a84d",
               "definitionType": "CatalogueAttributeDefinition"
           ],
           ...
          ],
          "characteristicAttributes":
          [
           [
               "key":2001,
               "queryEfficient":true,
               "description":"Merkmalsnummer",
               "modifiable":false,
               "length":20,
               "type":"AlphaNumeric",
               "definitionType":"AttributeDefinition"
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
