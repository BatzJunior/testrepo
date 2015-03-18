---
area: restApi
level: 2
category: dataService
subCategory: catalogs
title: REST API
subTitle: Data Service
pageTitle: Catalogs
permalink: /restapi/dataservice/catalogs/
---

## {{ page.pageTitle }}

### Endpoints

Catalogs and catalog entries can be fetched, created, updated and deleted using the following endpoints. These endpoints don't provide filter parameters.
//catalogUuids
URL Endpoint | GET | POST | PUT | DELETE
-------------|-----|------|-----|-------
/catalogues | Returns all catalogs without their entries | Creates the committed catalog(s) which is/are transfered in the body of the request | Updates the committed catalogs and their entries | Deletes all catalogs and the catalog entries
/catalogues/entries | Returns all catalogs *with entries* | *--* | *--* | *--*
/catalogues/(:catUuid1, :catUuid2,...) | Returns all catalogs from the catUuid list *without entries* | *--* | *--* | Deletes the catalogs with the provided catUuids
/catalogues/(:catUuid1, :catUuid2,...)/entries | Returns the catalogs of which the uuid is within the catUuid list including their entries | *--* | *--* | *--*
catalogues/:catalogueUuid/entries | *--*| Creates the entries in the request body for the catalog specified by the *:catalogueUuid* | *--* | Deletes all entries from the catalogue specified by the *:catalogueUuid*
catalogues/:catalogueUuid/entries/{key1, key2...} | *--* | *--* | *--* | Deletes the entries specified by their particular key from the catalog specified by the *:catalogueUuid* 

{% assign linkId="catalogEndpointGetAll" %}
{% assign method="GET" %}
{% assign endpoint="/catalogs" %}
{% assign summary="Returns all catalogs" %}
{% assign description="" %}
{% assign exampleCaption="Fetching all catalogs" %}

{% capture jsonrequest %}
{% highlight http %}
GET /dataServiceRest/catalogs HTTP/1.1
{% endhighlight %}
{% endcapture %}

{% capture jsonresponse %}
{% highlight json %}
{
   ...
   "data":
   [
      {
         "uuid": "d7291afb-0a67-4c1e-8bcc-6fc455bcc0e5",
         "name": "direction catalog",
         "validAttributes": [ 2009 ],
         "catalogueEntries":
         [
            {
               "key": 0,
               "attributes": { "2009": "undefined" }
            },
            {
               "key": 1,
               "attributes": { "2009": "right" }
            },
            {
               "key": 2,
               "attributes": { "2009": "left" }
            }
         ]
      },
      {
         "uuid": "8c376bee-ffe3-4ee4-abb9-a55b492e69ad",
         "name": "InspectorCatalogue",
         "validAttributes": [ 4092, 4093 ],
         "catalogueEntries":
         [
            {
               "key": 0,
               "attributes": { "4092": "n.def.", "4093": "n.def." }
            },
            {
               "key": 1,
               "attributes": { "4092": "21", "4093": "Smith" }
            },
            {
               "key": 2,
               "attributes": { "4092": "20", "4093": "Miller" }
            },
            {
               "key": 3,
               "attributes": { "4092": "23", "4093": "Williams" }
            }
         ]
      },
      ...
   ]
}
{% endhighlight %}
{% endcapture %}

{% include endpointTab.html %}

{% assign linkId="catalogEndpointCreate" %}
{% assign method="POST" %}
{% assign endpoint="/catalogs" %}
{% assign summary="Creates catalogs" %}
{% capture description %}
To create a new catalog the catalog object must be transmitted the request's body. A valid add request must contain a unique identifier, the catalog name and the valid attributes. Catalog entries are optional. All valid attributes must be added as catalog attributes beforehand (see {{ site.links['configuration'] }}).

{{ site.images['info'] }} If no catalog entries are specified an empty catalog entry with key '0' and attribute value(s) 'not defined' ( in case of alphanumeric attributes ) is created by default.
{% endcapture %}
{% assign exampleCaption="Adding the catalog InspectorCatalog" %}

{% capture jsonrequest %}
{% highlight http %}
POST /dataServiceRest/catalogues HTTP/1.1
{% endhighlight %}

{% highlight json %}
[
  {
           "uuid": "8c376bee-ffe3-4ee4-abb9-a55b492e69ad",
           "name": "InspectorCatalog",
           "validAttributes": [ 4092, 4093 ],
           "catalogueEntries":
           [
               {
                   "key": 0,
                   "attributes": { "4092": "n.def.", "4093": "n.def." }
               },
               {
                   "key": 1,
                   "attributes": { "4092": "21", "4093": "Smith" }
               },
               {
                   "key": 2,
                   "attributes": { "4092": "20", "4093": "Miller" }
               },
               {
                   "key": 3,
                   "attributes": { "4092": "23", "4093": "Williams" }
               }
            ]
        }
]
{% endhighlight %}
{% endcapture %}

{% capture jsonresponse %}
{% highlight http %}
HTTP/1.1 201 Created
{% endhighlight %}
{% endcapture %}

{% include endpointTab.html %}

{% assign linkId="catalogEndpointUpdate" %}
{% assign method="PUT" %}
{% assign endpoint="/catalogs" %}
{% assign summary="Updates catalogs" %}
{% capture description %}
Update a catalog if you want to:

* rename the catalog or
* add, update or delete catalog entries.

To update a catalog, the whole object excluding the valid attributes needs to be transmitted in the body of the HTTP request. Updating a catalog essentially replaces the current catalog with the new one (delete followed by an add) in a single transaction.

{{site.images['info']}} To change the valid attributes the catalog needs to be deleted an re-created again.
{% endcapture %}
{% assign exampleCaption="Rename the catalog from 'InspectorCatalog' to 'Inspectors' and add the inspector 'Clarks'" %}

{% capture jsonrequest %}
{% highlight http %}
PUT /dataServiceRest/catalogues HTTP/1.1
{% endhighlight %}

{% highlight json %}
[
  {
           "uuid": "8c376bee-ffe3-4ee4-abb9-a55b492e69ad",
           "name": "Inspectors",
           "catalogueEntries":
           [
               {
                   "key": 0,
                   "attributes": { "4092": "n.def.", "4093": "n.def." }
               },
               {
                   "key": 1,
                   "attributes": { "4092": "21", "4093": "Smith" }
               },
               {
                   "key": 2,
                   "attributes": { "4092": "20", "4093": "Miller" }
               },
               {
                   "key": 3,
                   "attributes": { "4092": "23", "4093": "Williams" }
               },
               {
                   "key": 4,
                   "attributes": { "4092": "22", "4093": "Clarks" }
               }
            ]
        }
]
{% endhighlight %}
{% endcapture %}

{% capture jsonresponse %}
{% highlight http %}
HTTP/1.1 200 Ok
{% endhighlight %}
{% endcapture %}

{% include endpointTab.html %}


{% assign linkId="catalogEndpointGetSingle" %}
{% assign method="GET" %}
{% assign endpoint="/catalogs/:catalogUuid" %}
{% assign summary="Returns the catalog specified by the :catalogUuid" %}
{% assign description="" %}
{% assign exampleCaption="Fetching the catalog with the uuid 8c376bee-ffe3-4ee4-abb9-a55b492e69ad" %}

{% capture jsonrequest %}
{% highlight http %}
GET /dataServiceRest/catalogs/8c376bee-ffe3-4ee4-abb9-a55b492e69ad HTTP/1.1
{% endhighlight %}
{% endcapture %}

{% capture jsonresponse %}
{% highlight json %}
{
   ...
   "data":
   [
       {
           "uuid": "8c376bee-ffe3-4ee4-abb9-a55b492e69ad",
           "name": "InspectorCatalogue",
           "validAttributes": [ 4092, 4093 ],
           "catalogueEntries":
           [
               {
                   "key": 0,
                   "attributes": { "4092": "n.def.", "4093": "n.def." }
               },
               {
                   "key": 1,
                   "attributes": { "4092": "21", "4093": "Smith" }
               },
               {
                   "key": 2,
                   "attributes": { "4092": "20", "4093": "Miller" }
               },
               {
                   "key": 3,
                   "attributes": { "4092": "23", "4093": "Williams" }
               }
            ]
        }
   ]
}
{% endhighlight %}
{% endcapture %}

{% include endpointTab.html %}

### Add Catalog Entries (POST)

To add new entries to an existing catalog you must specify all new entries in the request body. Each new entry must contain a unique key.
Each entry attribute must be listed as a valid attributes in the catalog definition.

{% assign exampleCaption="Adding a catalog entry - add the inspector ‘Clarks’" %}

{% capture jsonrequest %}
{% highlight http %}
POST /dataServiceRest/catalogues/8c376bee-ffe3-4ee4-abb9-a55b492e69ad/entries
{% endhighlight %}

{% highlight json %}
 [
   {
       "key": 4,
       "attributes": { "4092": "22", "4093": "Clarks" }
   }
 ]
{% endhighlight %}
{% endcapture %}

{% capture jsonresponse %}
{% highlight http %}
HTTP/1.1 201 Created
{% endhighlight %}
{% endcapture %}

{% include exampleFieldset.html %}


### Update Catalogs (PUT)



### Delete Catalogs (DELETE)

There are two different options for deleting catalogs: 

* delete all catalogs or
* delete one or more certain catalogs identified by their uuid.

The following examples demonstrates these options.

{% assign exampleCaption="Delete all catalogs and their entries" %}

{% capture jsonrequest %}
{% highlight http %}
DELETE /dataServiceRest/catalogues HTTP/1.1
{% endhighlight %}
{% endcapture %}

{% capture jsonresponse %}
{% highlight http %}
HTTP/1.1 200 Ok
{% endhighlight %}
{% endcapture %}

{% include exampleFieldset.html %}

{% assign exampleCaption="Delete the catalog with uuid 8c376bee-ffe3-4ee4-abb9-a55b492e69ad and its entries" %}

{% capture jsonrequest %}
{% highlight http %}
DELETE /dataServiceRest/catalogues/(8c376bee-ffe3-4ee4-abb9-a55b492e69ad) HTTP/1.1
{% endhighlight %}
{% endcapture %}

{% capture jsonresponse %}
{% highlight http %}
HTTP/1.1 200 Ok
{% endhighlight %}
{% endcapture %}

{% include exampleFieldset.html %}

### Delete Catalog Entries

There are two different options for deleting catalog entries: 

* delete all entries from a certain catalog identified by its uuid or
* delete one or more specific entries identified by their keys from a certain catalog identified by its uuid
 
The following examples demonstrate these options.

{% assign exampleCaption="Delete all entries from the catalog with the uuid 8c376bee-ffe3-4ee4-abb9-a55b492e69ad" %}

{% capture jsonrequest %}
{% highlight http %}
DELETE /dataServiceRest/catalogues/8c376bee-ffe3-4ee4-abb9-a55b492e69ad/entries HTTP/1.1
{% endhighlight %}
{% endcapture %}

{% capture jsonresponse %}
{% highlight http %}
HTTP/1.1 200 Ok
{% endhighlight %}
{% endcapture %}

{% include exampleFieldset.html %}

{% assign exampleCaption="Delete the entries with key 1 and 3 from the catalog with uuid 8c376bee-ffe3-4ee4-abb9-a55b492e69ad" %}

{% capture jsonrequest %}
{% highlight http %}
DELETE /dataServiceRest/catalogues/8c376bee-ffe3-4ee4-abb9-a55b492e69ad/entries/(1,3) HTTP/1.1
{% endhighlight %}
{% endcapture %}

{% capture jsonresponse %}
{% highlight http %}
HTTP/1.1 200 Ok
{% endhighlight %}
{% endcapture %}

{% include exampleFieldset.html %}

###General Information
