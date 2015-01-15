---
category: dataservice
subCategory: catalogues
title: Data Service
subTitle: Catalogues
isSubPage: true
permalink: /dataservice/catalogues/
sections:
  general: General Information
  endpoint: Endpoint Information
  add: Add Catalogues
  get: Get Catalogues
  update: Update Catalogues
  delete: Delete Catalogues
---

## {{ page.sections['general'] }}

A catalogue consists of the following properties:

Name | Description
-------------------
uuid | Identifies the catalogue uniquely
name | Name of the catalogue
validAttribues | A list of attribute keys that are valid for the respective catalogue
catalogueEntries | Contains a list of catalogue entries. A catalogue entry consits of a unique key which specifies the order within the catalogue and a list of attributes which consits of key value pairs. 

{% comment %}----------------------------------------------------------------------------------------------- {% endcomment %}

## {{ page.sections['endpoint'] }}

Catalogues and catalogue entries can be fetched, created, updated and deleted via the following endpoints. Filter can be set as described in the [URL-Parameter section]({{site.baseurl }}/general/#{{ page.subCategory }}).

URL Endpoint | GET | PUT | POST | DELETE
-------------|-----|-----|------|-------
/catalogues | Returns all catalogues | Creates the committed catalogue(s) which is/are transferred in the body of the request | Updates the committed catalogues and their entries | Deletes all catalogues and the catalogue entries
/catalogues/{catUuid1, catUuid2,...} | Returns the catalogues that uuids are within the catUuid list | *not supported* | *not supported* | Deletes the catalogue(s) which has/have the given catUuid(s)

## {{ page.sections['add'] }}

To add one or more attributes to the configuration the entity type the attributes belong to as well as the attribute definition(s) need to be transfered. The entity type ist transfered in the uri the attributes within the body of the request.

### {{ site.headers['example'] }} Adding a part attribute with the key 1001 to the configuration

{{ site.sections['beginExampleWebService'] }}

{{ site.headers['request']  | markdownify }}

{% highlight http %}
POST /dataServiceRest/configuration/parts HTTP/1.1
{% endhighlight %}

{% highlight json %}
[
  {
    "key":1001,
    "description":"partNumber",
    "length":30,
    "type":"AlphaNumeric",
    "definitionType":"AttributeDefinition"
  }
]
{% endhighlight %}

{{ site.headers['response']  | markdownify }}

{% highlight http %}
HTTP/1.1 201 Created
{% endhighlight %}

{{ site.sections['endExample'] }}
{{ site.sections['beginExampleAPI'] }}

{{ site.headers['request'] | markdownify }}

{% highlight csharp %}
var client = new DataServiceRestClient( serviceUri );
var attributeDefinition = 
      new AttributeDefinition( 1001, "partNumber", AttributeType.AlphaNumeric, 30 );
client.CreateAttributeDefinition( Entity.Part, attributeDefinition );
{% endhighlight %}

{{ site.sections['endExample'] }}

{% comment %}----------------------------------------------------------------------------------------------- {% endcomment %}

## {{ page.sections['get'] }}

Fetching the whole configuration returns the attribute definitions for all kind of entities.

### {{ site.headers['example'] }}  Fetching the configuration including all attriutes

{{ site.sections['beginExampleWebService'] }}
{{ site.headers['request'] | markdownify }}

{% highlight http %}
GET /dataServiceRest/configuration HTTP/1.1
{% endhighlight %}

{{ site.headers['response'] | markdownify }}
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
               "description":"partNumber",
               "length":30,
               "type":"AlphaNumeric",
               "definitionType":"AttributeDefinition"
           ],
           ...
          ],
          "characteristicAttributes":
          [
           [
               "key":2001,
               "description":"characteristicNumber",
               "length":20,
               "type":"AlphaNumeric",
               "definitionType":"AttributeDefinition"
           ],
           ...
          ],
          "measurementAttributes":
          [
                "key": 8,
                "description": "inspector",
                "catalogue": "8c376bee-ffe3-4ee4-abb9-a55b492e69ad",
                "definitionType": "CatalogueAttributeDefinition"
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

{{ site.sections['endExample'] }}

{{ site.sections['beginExampleAPI'] }}
{{ site.headers['request'] | markdownify }}

{% highlight csharp %}
var client = new DataServiceRestClient( serviceUri );
Configuration information = client.GetConfiguration();
{% endhighlight %}

{{ site.sections['endExample'] }}

{% comment %}----------------------------------------------------------------------------------------------- {% endcomment %}

## {{ page.sections['update'] }}

To update one or more attributes to the configuration the entity type the attributes belong to as well as the attribute definition(s) need to be transfered. The entity type ist transfered in the uri the attributes within the body of the request.

### {{ site.headers['example'] }}  Updating the part attribute with key 1001 - change length from 30 to 50

{{ site.sections['beginExampleWebService'] }}

{{ site.headers['request']  | markdownify }}

{% highlight http %}
PUT /dataServiceRest/configuration/parts HTTP/1.1
{% endhighlight %}

{% highlight json %}
[
  {
    "key":1001,
    "description":"partNumber",
    "length":50,
    "type":"AlphaNumeric",
    "definitionType":"AttributeDefinition"
  }
]
{% endhighlight %}

{{ site.headers['response']  | markdownify }}

{% highlight http %}
HTTP/1.1 200 Ok
{% endhighlight %}

{{ site.sections['endExample'] }}
{{ site.sections['beginExampleAPI'] }}

{{ site.headers['request'] | markdownify }}

{% highlight csharp %}
var client = new DataServiceRestClient( serviceUri );

//Get the attribute
...

attributeDefinition.Length = 50;
client.UpdateAttributeDefinition( Entity.Part, attributeDefinition );
{% endhighlight %}

{{ site.sections['endExample'] }}

{% comment %}----------------------------------------------------------------------------------------------- {% endcomment %}

## {{ page.sections['delete'] }}

There are three different options of deleting attributes: 

* Delete all attributes of the configuration, 
* Delete all attributes of a certain entity or 
* Delete one or more certain attributes of a certain entity
 
The following examples illustrate these options.

### {{ site.headers['example'] }}  Delete all attributes of the current configuration

{{ site.sections['beginExampleWebService'] }}
{{ site.headers['request'] | markdownify }}

{% highlight http %}
DELETE /dataServiceRest/configuration HTTP/1.1
{% endhighlight %}

{{ site.sections['endExample'] }}

{{ site.sections['beginExampleAPI'] }}
{{ site.headers['request'] | markdownify }}

{% highlight csharp %}
var client = new DataServiceRestClient( serviceUri );
client.DeleteAllAttributeDefinitions();
{% endhighlight %}

{{ site.sections['endExample'] }}

### {{ site.headers['example'] }}  Delete all part attributes

{{ site.sections['beginExampleWebService'] }}
{{ site.headers['request'] | markdownify }}

{% highlight http %}
DELETE /dataServiceRest/configuration/part HTTP/1.1
{% endhighlight %}

{{ site.sections['endExample'] }}

{{ site.sections['beginExampleAPI'] }}
{{ site.headers['request'] | markdownify }}

{% highlight csharp %}
var client = new DataServiceRestClient( serviceUri );
client.DeleteAttributeDefinitions( Entity.Part );
{% endhighlight %}

{{ site.sections['endExample'] }}

### {{ site.headers['example'] }}  Delete the part attribute with the key 1001

{{ site.sections['beginExampleWebService'] }}
{{ site.headers['request'] | markdownify }}

{% highlight http %}
DELETE /dataServiceRest/configuration/part/{1001} HTTP/1.1
{% endhighlight %}

{{ site.sections['endExample'] }}

{{ site.sections['beginExampleAPI'] }}
{{ site.headers['request'] | markdownify }}

{% highlight csharp %}
var client = new DataServiceRestClient( serviceUri );
client.DeleteAttributeDefinitions( Entity.Part, new ushort[]{ (ushort)1001 } );
{% endhighlight %}

{{ site.sections['endExample'] }}

