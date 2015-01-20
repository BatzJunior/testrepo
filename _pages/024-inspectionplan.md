---
category: dataservice
subCategory: inspection-plan
title: Data Service
subTitle: Inspection Plan
isSubPage: true
permalink: /dataservice/inspection-plan/
sections:
  general: General Information
  endpoint: Endpoint Information
  add: Add Entities
  get: Get Entities
  update: Update Entities
  delete: Delete Entities
---

## {{ page.sections['general'] }}

Both parts and characteristics are PiWeb inspeaction plan entities. Each entity consits of the following properties:

Name | Description
-----|-------------
uuid | Identifies this inspection plan entity uniquely.
path | The path of this entity.
attribues | A set of attributes which specifies this entity.
comment | Contains all attributes a value exists for
version | Contains the revision number of the entity. The revision number starts with zero and is incremented by one each time when changes are applied to an entity. The version is only returned if versioning is enabled in server settings.
current | Indicates wheter the entity is the current version.
timeStamp | Contains the date and time of the last update applied to this entity.
charChangeDate (only for parts) | The timestamp for the most recent characteristic change on any characteristic that belongs to this part

{% comment %}----------------------------------------------------------------------------------------------- {% endcomment %}

## {{ page.sections['endpoint'] }}

Parts and characteristics can be fetched, created, updated and deleted via the following endpoints. Filter can be set as described in the [URL-Parameter section]({{site.baseurl }}/general/#{{ page.subCategory }}).

###Parts
<br>
URL Endpoint | GET | POST | PUT | DELETE
-------------|-----|-----|------|-------
/parts | Returns all parts | Creates the committed part(s) which is/are transfered in the body of the request | Updates the committed parts | Deletes all parts
/parts/:partsPath | Returns the part specified by *:partsPath* as well as the parts beneath this part | *Not supported* | *Not supported* | Deletes the part specified by *:partsPath* as well as the parts and characteristics beneath this part
parts/{:uuidList} | Returns all parts that uuid are within the *:uuidList* | *Not supported* | *Not supported* | *Not supported*

### Characteristics

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
var catalogue = new Catalogue(){ 
  Uuid = new Guid( "8c376bee-ffe3-4ee4-abb9-a55b492e69ad" ),
  Name = "InspectorCatalogue",
  ValidAttributes = new ushort[]{ 4092, 4093 },
  CatalogueEntries = new[]{
    new CatalogueEntry(){ Key = 0, 
    Attributes = new[]{ new Attribute( 4092, "n.def." ), new Attribute( 4093, "n.def." ) },
    new CatalogueEntry(){ Key = 1, 
    Attributes = new[]{ new Attribute( 4092, "21" ), new Attribute( 4093, "Smith" ) },
    new CatalogueEntry(){ Key = 2, 
    Attributes = new[]{ new Attribute( 4092, "20" ), new Attribute( 4093, "Miller" ) },
    new CatalogueEntry(){ Key = 3, 
    Attributes = new[]{ new Attribute( 4092, "23" ), new Attribute( 4093, "Williams" ) }
  }
};
var client = new DataServiceRestClient( serviceUri );
client.CreateCatalogues( new[]{ catalogue } );
{% endhighlight %}

{{ site.sections['endExample'] }}

{% comment %}----------------------------------------------------------------------------------------------- {% endcomment %}

## {{ page.sections['addEntries'] }}

Beneath adding catalogue entries to a catalogue while creating a catalogue there is also the possibility to add entries to an already existing catalogue.

### {{ site.headers['example'] }}  Adding a catalogue entry - add the inspector ‘Clarks’

{{ site.sections['beginExampleWebService'] }}
{{ site.headers['request'] | markdownify }}

{% highlight http %}
POST /dataServiceRest/catalogues/{8c376bee-ffe3-4ee4-abb9-a55b492e69ad}/entries
{% endhighlight %}

{% highlight json %}
 [
   {
       "key": 4,
       "attributes":
       {
           "4092": "22",
           "4093": "Clarks"
       }
   }
 ]
{% endhighlight %}

{{ site.headers['response'] | markdownify }}

{% highlight http %}
HTTP/1.1 201 Created
{% endhighlight %}

{{ site.sections['endExample'] }}
{{ site.sections['beginExampleAPI'] }}

{{ site.headers['request'] | markdownify }}

{% highlight csharp %}
var entry = new CatalogueEntry(){ Key = 4, 
        Attributes = new[]{ new Attribute( 4092, "22" ), new Attribute( 4093, "Clarks" ) };
var client = new DataServiceRestClient( serviceUri );
client.CreateCatalogueEntry( new Guid("8c376bee-ffe3-4ee4-abb9-a55b492e69ad"), entry);
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

Updating a catalogue might regard the following aspects: 

* Rename the catalogue 
* Add, update or delete catalogue entries

{{site.images['info']}} To change the valid attributes of a catalogue it needs to be deleted an re-created again.

### {{ site.headers['example'] }}  Updating the catalogue with the uuid 8c376bee-ffe3-4ee4-abb9-a55b492e69ad - rename it from 'InspectorCatalogue' to 'Inspectors' and add the inspector 'Clarks'

{{ site.sections['beginExampleWebService'] }}

{{ site.headers['request']  | markdownify }}

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
               },
               {
                   "key": 4,
                   "attributes":
                   {
                       "4092": "22",
                       "4093": "Clarks"
                   }
               }
            ]
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

//Get the catalogue
...

catalogue.Name = "Inspectors";
var entries = new List< CatalogueEntry >();
entries = catalogue.CatalogueEntries;
entries.Add( new CatalogueEntry()
      { Key = 4, 
        Attributes = new[]{ new Attribute( 4092, "22" ), new Attribute( 4093, "Clarks" ) };
cataloge.CatalogueEntries = entries.ToArray();
client.UpdateCatalogues( catalogue );
{% endhighlight %}

{{ site.sections['endExample'] }}

{% comment %}----------------------------------------------------------------------------------------------- {% endcomment %}

## {{ page.sections['delete'] }}

There are two different options of deleting catalogues: 

* Delete all catalogues or
* Delete one or more certain catalogues identified by its uuid
 
The following examples illustrate these options.

### {{ site.headers['example'] }}  Delete all catalogues

{{ site.sections['beginExampleWebService'] }}
{{ site.headers['request'] | markdownify }}

{% highlight http %}
DELETE /dataServiceRest/catalogues HTTP/1.1
{% endhighlight %}

{{ site.headers['response'] | markdownify }}
{% highlight http %}
HTTP/1.1 200 Ok
{% endhighlight %}

{{ site.sections['endExample'] }}

{{ site.sections['beginExampleAPI'] }}
{{ site.headers['request'] | markdownify }}

{% highlight csharp %}
var client = new DataServiceRestClient( serviceUri );
client.DeleteCatalogues();
{% endhighlight %}

{{ site.sections['endExample'] }}

### {{ site.headers['example'] }}  Delete the catalogues with the uuid "8c376bee-ffe3-4ee4-abb9-a55b492e69ad"

{{ site.sections['beginExampleWebService'] }}
{{ site.headers['request'] | markdownify }}

{% highlight http %}
DELETE /dataServiceRest/catalogues/{8c376bee-ffe3-4ee4-abb9-a55b492e69ad} HTTP/1.1
{% endhighlight %}

{{ site.headers['response'] | markdownify }}

{% highlight http %}
HTTP/1.1 200 Ok
{% endhighlight %}

{{ site.sections['endExample'] }}

{{ site.sections['beginExampleAPI'] }}
{{ site.headers['request'] | markdownify }}

{% highlight csharp %}
var client = new DataServiceRestClient( serviceUri );
client.DeleteCatalogues( new Guid[]{new Guid( "8c376bee-ffe3-4ee4-abb9-a55b492e69ad" ) );
{% endhighlight %}

{{ site.sections['endExample'] }}

{% comment %}----------------------------------------------------------------------------------------------- {% endcomment %}

## {{ page.sections['deleteEntries'] }}

There are two different options of deleting catalogue entries: 

* Delete all entries of a certain catalogue identified by its uuid
* Delete one or more certain entries identified by its keys of a certain catalogue identified by its uuid
 
The following examples illustrate these options.

### {{ site.headers['example'] }}  Delete all entries of the catalogue with the uuid "8c376bee-ffe3-4ee4-abb9-a55b492e69ad"

{{ site.sections['beginExampleWebService'] }}
{{ site.headers['request'] | markdownify }}

{% highlight http %}
DELETE /dataServiceRest/catalogues/{8c376bee-ffe3-4ee4-abb9-a55b492e69ad}/entries HTTP/1.1
{% endhighlight %}

{{ site.headers['response'] | markdownify }}
{% highlight http %}
HTTP/1.1 200 Ok
{% endhighlight %}

{{ site.sections['endExample'] }}

{{ site.sections['beginExampleAPI'] }}
{{ site.headers['request'] | markdownify }}

{% highlight csharp %}
var client = new DataServiceRestClient( serviceUri );
client.DeleteCatalogueEntries( new Guid( "8c376bee-ffe3-4ee4-abb9-a55b492e69ad" ) );
{% endhighlight %}

{{ site.sections['endExample'] }}

### {{ site.headers['example'] }}  Delete the entries with key 1 and 3 of the catalogue with the uuid "8c376bee-ffe3-4ee4-abb9-a55b492e69ad"

{{ site.sections['beginExampleWebService'] }}
{{ site.headers['request'] | markdownify }}

{% highlight http %}
DELETE /dataServiceRest/catalogues/{8c376bee-ffe3-4ee4-abb9-a55b492e69ad}/entries/{1,3} HTTP/1.1
{% endhighlight %}

{{ site.headers['response'] | markdownify }}

{% highlight http %}
HTTP/1.1 200 Ok
{% endhighlight %}

{{ site.sections['endExample'] }}

{{ site.sections['beginExampleAPI'] }}
{{ site.headers['request'] | markdownify }}

{% highlight csharp %}
var client = new DataServiceRestClient( serviceUri );
client.DeleteCatalogueEntries( 
  new Guid( "8c376bee-ffe3-4ee4-abb9-a55b492e69ad", new []{ (ushort)1, (ushort(3) } );
{% endhighlight %}

{{ site.sections['endExample'] }}

