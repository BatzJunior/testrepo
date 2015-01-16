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
-----|-------------
uuid | Identifies the catalogue uniquely
name | Name of the catalogue
validAttribues | A list of attribute keys that are valid for the respective catalogue
catalogueEntries | Contains a list of catalogue entries. A catalogue entry consits of a unique index based key which specifies the order within the catalogue and a list of attributes which consits of key value pairs. 

{% comment %}----------------------------------------------------------------------------------------------- {% endcomment %}

## {{ page.sections['endpoint'] }}

Catalogues and catalogue entries can be fetched, created, updated and deleted via the following endpoints. Filter can be set as described in the [URL-Parameter section]({{site.baseurl }}/general/#{{ page.subCategory }}).

URL Endpoint | GET | PUT | POST | DELETE
-------------|-----|-----|------|-------
/catalogues | Returns all catalogues | Updates the committed catalogues and their entries | Creates the committed catalogue(s) which is/are transferred in the body of the request | Deletes all catalogues and the catalogue entries
/catalogues/{catUuid1, catUuid2,...} | Returns the catalogues that uuids are within the catUuid list | *not supported* | *not supported* | Deletes the catalogue(s) which has/have the given catUuid(s)

## {{ page.sections['add'] }}

To create a catalogue it is necessary to transfer the catalogue object within the request's body. Beneath a unique identifier and the catalog name the valid attributes need  to be transfered, catalogue entries are optional. The attribute keys which are used for the valid attributes must come from the catalogue attribute range (specified in the [configuration]({{site.baseurl }}/{{page.category}}/configuration/)

{{ site.images['info'] }} If no catalogue entries are transfered an empty catalogue entry with the key 0 and attribute values 'not defined' ( in case of alphanumeric attributes ) is created by default.

### {{ site.headers['example'] }} Adding a catalogue with the uuid 8c376bee-ffe3-4ee4-abb9-a55b492e69ad

{{ site.sections['beginExampleWebService'] }}

{{ site.headers['request']  | markdownify }}

{% highlight http %}
POST /dataServiceRest/catalogues HTTP/1.1
{% endhighlight %}

{% highlight json %}
[
  {
           "uuid": "8c376bee-ffe3-4ee4-abb9-a55b492e69ad",
           "name": "InspectorCatalogue",
           "validAttributes":
           [
               4092,
               4093
           ],
           "catalogueEntries":
           [
               {
                   "key": 0,
                   "attributes":
                   {
                       "4092": "n.def.",
                       "4093": "n.def."
                   }
               },
               {
                   "key": 1,
                   "attributes":
                   {
                       "4092": "21",
                       "4093": "Smith"
                   }
               },
               {
                   "key": 2,
                   "attributes":
                   {
                       "4092": "20",
                       "4093": "Miller"
                   }
               },
               {
                   "key": 3,
                   "attributes":
                   {
                       "4092": "23",
                       "4093": "Williams"
                   }
               }
            ]
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

{% endhighlight %}

{{ site.sections['endExample'] }}

{% comment %}----------------------------------------------------------------------------------------------- {% endcomment %}

## {{ page.sections['get'] }}

Fetching the catalogues returns the catalogue an depending on the filter specified or not the catalogue entries. If no filter is specified the entries are returned by default.

### {{ site.headers['example'] }}  Fetching the catalogue with the uuid 8c376bee-ffe3-4ee4-abb9-a55b492e69ad and its entries

{{ site.sections['beginExampleWebService'] }}
{{ site.headers['request'] | markdownify }}

{% highlight http %}
GET /dataServiceRest/catalogues/{8c376bee-ffe3-4ee4-abb9-a55b492e69ad}?filter=withCatalogueEntries:true HTTP/1.1
{% endhighlight %}

{{ site.headers['response'] | markdownify }}
{% highlight json %}
{
   ...
   "data":
   [
       {
           "uuid": "8c376bee-ffe3-4ee4-abb9-a55b492e69ad",
           "name": "InspectorCatalogue",
           "validAttributes":
           [
               4092,
               4093
           ],
           "catalogueEntries":
           [
               {
                   "key": 0,
                   "attributes":
                   {
                       "4092": "n.def.",
                       "4093": "n.def."
                   }
               },
               {
                   "key": 1,
                   "attributes":
                   {
                       "4092": "21",
                       "4093": "Smith"
                   }
               },
               {
                   "key": 2,
                   "attributes":
                   {
                       "4092": "20",
                       "4093": "Miller"
                   }
               },
               {
                   "key": 3,
                   "attributes":
                   {
                       "4092": "23",
                       "4093": "Williams"
                   }
               }
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
var catalogues = client.GetCatalogues(new Guid[]{new Guid(
        "8c376bee-ffe3-4ee4-abb9-a55b492e69ad")}, new CatalogueFilterAttributes());
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

