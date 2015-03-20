---
area: restApi
level: 1
category: rawDataService
title: REST API
subTitle: Rawdata Service
permalink: /restapi/rawdataservice/
sections:
  endpoint: Endpoint Information
  general: General Information
---

## {{page.sections['endpoint'] }}

Catalogs and catalog entries can be fetched, created, updated and deleted using the following endpoints. These endpoints provide the following filter parameters:

{% capture table %}
Parameter name | Description  <br> *Example* | Accepted by endpoint | Accepted by HTTP methods
---------------|------------------  ---------|----------------------|--------------------------
``uuids```     | Restricts the query to the entities identified by the given uuids. <br> {{site.images['warning']}} Entites of type 'Value' are identified by a compound key, which consists of the uuid of the measurement, '&#124;' and the characteristics uuid <br> *uuids:{652ae7a0-d1e1-4ee2-b3a5-d4526f6ba822&#124; 78bd15c6-dc70-4ab4-bd3c-8ab2b5780b52}* | /rawData/:entity | GET
{% endcapture %}
{{ table | markdownify | replace: '<table>', '<table class="table table-hover">' }}

{% assign linkId="rawDataEndpointGetFile" %}
{% assign method="GET" %}
{% assign endpoint="/rawData/:entity/:uuid/:key" %}
{% assign summary="Returns the one specific file identified by :entity, :uuid and :key" %}
{% capture description %}

The server caches raw data fetch requests. When you request a raw data file for the first time the response will contain the file itself and several HTTP headers. One of these headers is the *ETag* header. An ETag is a unique hash value to identify the file. It is a combination of the file's MD5 checksum and the last modification date. If you send the ETag value in the *If-None-Match* header, the server can respond two different ways, depending in whether the file has been modified since the last request:

1. *Not modified*: The server will return a *304 - Not modified* HTTP status code and the response body will be emtpy.
2. *Modified*: The server will return the file.

{% endcapture %}
{% assign exampleCaption="Fetch raw data with key 0 for a part with the uuid b8f5d3fe-5bd5-406b-8053-67f647f09dc7" %}

{% capture jsonrequest %}
###### Without Caching
{% highlight http %}
GET /rawDataServiceRest/rawData/part/b8f5d3fe-5bd5-406b-8053-67f647f09dc7/0 HTTP/1.1
{% endhighlight %}
###### With caching
{% highlight http %}
GET /rawDataServiceRest/rawData/part/b8f5d3fe-5bd5-406b-8053-67f647f09dc7/0 HTTP/1.1
If-None-Match: "6ab0f6bd01b30aa8e55021085b820393635437006830400000"
{% endhighlight %}
{% endcapture %}

{% capture jsonresponse %}
###### Modified
{% highlight http %}
HTTP/1.1 200 OK
Etag: "6ab0f6bd01b30aa8e55021085b820393635437006830400000"
Last-Modified: Fri, 15 Aug 2014 11:58:03 GMT
...
{% endhighlight %}
<pre>
The requested raw data file
</pre>

###### Not modified
{% highlight http %}
HTTP/1.1 304 Not modified
{% endhighlight %}
{% endcapture %}

{% include endpointTab.html %}



{% assign linkId="rawDataEndpointAddFile" %}
{% assign method="POST" %}
{% assign endpoint="/rawData/:entity/:uuid/:key" %}
{% assign summary="Adds the transmitted file to the entity with type :entity and id :uuid" %}
{% capture description %}

You can attach files to all entity types: parts, characteristics, measurements and measured values.

An add request consists of 3 mandatory parts:

1. The *URL* specifies which entity the file will be added to.
2. The *request body* contains the file itself.
3. The *HTTP headers* must provide meta information about the file, see below for details.

{% capture table %}
HTTP header variable | Description                  | Example Value
---------------------|------------------------------|--------------------------------------
Content-Disposition  | Includes the file name       | "MetalPart.meshModel"
Content-Length       | Includes the length in bytes | 2090682
Content-MD5          | Includes file's MD5 hash sum | "bdf6b06ab301a<wbr>80ae55021085b820393"
Content-Type         | Includes file's MIME type    | "application/x-zeiss-piweb-meshmodel"
{% endcapture %}
{{ table | markdownify | replace: '<table>', '<table class="table table-hover">' }}

When adding a file, you can pass the desired file key as part of the uri. If you pass -1 or no key, the next available key will automatically assigned by the server. (recommended)

{{site.images['warning']}} If you pass a key which is already assigned to another file, this file will be replaced.
{% endcapture %}

{% assign exampleCaption="Add a raw data object to a part with the uuid b8f5d3fe-5bd5-406b-8053-67f647f09dc7" %}
{% capture jsonrequest %}
{% highlight http %}
POST /rawDataServiceRest/rawData/part/b8f5d3fe-5bd5-406b-8053-67f647f09dc7 HTTP/1.1
Content-Disposition: "MetalPart.meshModel"
Content-Length: 2090682
Content-MD5: "bdf6b06ab301a80ae55021085b820393"
Content-Type: "application/x-zeiss-piweb-meshmodel"
{% endhighlight %}
{% endcapture %}

{% capture jsonresponse %}
{% highlight http %}
HTTP/1.1 201 Created
{% endhighlight %}
{% endcapture %}

{% include endpointTab.html %}



{% assign linkId="rawDataEndpointUpdateFile" %}
{% assign method="PUT" %}
{% assign endpoint="/rawData/:entity/:uuid/:key" %}
{% assign summary="Replaces the file identified by :entity, :uuid and :key with the transmitted one" %}
{% capture description %}

An update request consists of 3 mandatory parts:

1. The *URL* specifies the file to be replaced identified by :entity, :uuid and :key.
2. The *request body* contains the file itself.
3. The *HTTP headers* must provide meta information about the file, see below for details.

{% capture table %}
HTTP header variable | Description                  | Example Value
---------------------|------------------------------|--------------------------------------
Content-Disposition  | Includes the file name       | "MetalPart.meshModel"
Content-Length       | Includes the length in bytes | 2090682
Content-MD5          | Includes file's MD5 hash sum | "bdf6b06ab301a<wbr>80ae55021085b820393"
Content-Type         | Includes file's MIME type    | "application/x-zeiss-piweb-meshmodel"
{% endcapture %}
{{ table | markdownify | replace: '<table>', '<table class="table table-hover">' }}

{% endcapture %}

{% assign exampleCaption="Replace the raw data object with key 1 of the part with the uuid b8f5d3fe-5bd5-406b-8053-67f647f09dc7" %}
{% capture jsonrequest %}
{% highlight http %}
PUT /rawDataServiceRest/rawData/part/b8f5d3fe-5bd5-406b-8053-67f647f09dc7/1 HTTP/1.1
Content-Disposition: "MetalPart.meshModel"
Content-Length: 2090682
Content-MD5: "bdf6b06ab301a80ae55021085b820393"
Content-Type: "application/x-zeiss-piweb-meshmodel"
{% endhighlight %}
{% endcapture %}

{% capture jsonresponse %}
{% highlight http %}
HTTP/1.1 200 Ok
{% endhighlight %}
{% endcapture %}

{% include endpointTab.html %}



{% assign linkId="rawDataEndpointDeleteFile" %}
{% assign method="DELETE" %}
{% assign endpoint="/rawData/:entity/:uuid/:key" %}
{% assign summary="Deletes the file identified by :entity, :uuid and :key. " %}

{% capture description %}
If you provide a key in the URI, the server will only delete the file identified by the key. Otherwise the server will delete all files attached to the entity.
{% endcapture %}

{% assign exampleCaption="Delete the raw data object with key 1 from the part with the uuid b8f5d3fe-5bd5-406b-8053-67f647f09dc7" %}

{% capture jsonrequest %}
{% highlight http %}
DELETE /rawDataServiceRest/rawData/part/b8f5d3fe-5bd5-406b-8053-67f647f09dc7/0 HTTP/1.1
{% endhighlight %}
{% endcapture %}

{% capture jsonresponse %}
{% highlight http %}
HTTP/1.1 200 OK
{% endhighlight %}
{% endcapture %}

{% include endpointTab.html %}
<p></p>


{% assign linkId="rawDataEndpointGetThumbnail" %}
{% assign method="GET" %}
{% assign endpoint="/rawData/:entity/:uuid/:key/thumbnail" %}
{% assign summary="Returns a preview image for the file identified by :entity, :uuid and :key. " %}
{% assign description="" %}
{% assign exampleCaption="Fetch the thumbnail for the raw data object with key 1 which is attached to the part with the uuid b8f5d3fe-5bd5-406b-8053-67f647f09dc7" %}

{% capture jsonrequest %}
{% highlight http %}
DELETE /rawDataServiceRest/rawData/part/b8f5d3fe-5bd5-406b-8053-67f647f09dc7/1/thumbnail HTTP/1.1
{% endhighlight %}
{% endcapture %}

{% capture jsonresponse %}
{% highlight http %}
HTTP/1.1 200 OK
{% endhighlight %}
<pre>
The requested thumbnail
</pre>
{% endcapture %}

{% include endpointTab.html %}
<p></p>

{% assign linkId="rawDataEndpointGetListSingle" %}
{% assign method="GET" %}
{% assign endpoint="/rawData/:entity/:uuid" %}
{% assign summary="Returns a list of information entries for the entity with type :entity and guid :uuid " %}
{% assign description="" %}
{% assign exampleCaption="Get the information entries for a certain part" %}

{% capture jsonrequest %}
{% highlight http %}
GET /rawDataServiceRest/rawData/part/05040c4c-f0af-46b8-810e-30c0c00a379e HTTP/1.1
{% endhighlight %}
{% endcapture %}

{% capture jsonresponse %}
 ...
   "data":
   [
    {
         "target":
         {
             "entity": "Part",
             "uuid": " 05040c4c-f0af-46b8-810e-30c0c00a379e"
         },
         "key": 0,
         "fileName": "section view.meshModel",
         "mimeType": "application/x-zip-compressed",
         "lastModified": "2012-11-19T10:48:34.327Z",
         "created": "2012-11-19T10:48:34.327Z",
         "size": 147376,
         "md5": "02f9c86143ea176c06e24524385b5907"
     }
    ]
{% endcapture %}

{% include endpointTab.html %}
<p></p>

{% assign linkId="rawDataEndpointGetListMulti" %}
{% assign method="GET" %}
{% assign endpoint="/rawData/:entity" %}
{% assign summary="Returns a list of information entries for entities with type :entity" %}
{% assign description="Returns a list of raw data file information entries for all entities with type entity and a matching id in the uuids parameter which has to be set." %}
{% assign exampleCaption="Get the information entries for several parts" %}

{% capture jsonrequest %}
{% highlight http %}
GET /rawDataServiceRest/rawData/part?uuids=(05040c4c-f0af-46b8-810e-30c0c00a379e", 5441c003-b6db-4217-ac6a-45cdbb805bb3) HTTP/1.1
{% endhighlight %}
{% endcapture %}

{% capture jsonresponse %}
 ...
   "data":
   [
    {
         "target":
         {
             "entity": "Part",
             "uuid": " 05040c4c-f0af-46b8-810e-30c0c00a379e"
         },
         "key": 0,
         "fileName": "section view.meshModel",
         "mimeType": "application/x-zip-compressed",
         "lastModified": "2012-11-19T10:48:34.327Z",
         "created": "2012-11-19T10:48:34.327Z",
         "size": 147376,
         "md5": "02f9c86143ea176c06e24524385b5907"
     },
     {
         "target":
         {
             "entity": "Part",
             "uuid": "5441c003-b6db-4217-ac6a-45cdbb805bb3"
         },
         "key": 0,
         "fileName": "cad_22.meshModel",
         "mimeType": "application/x-zeiss-piweb-meshmodel",
         "lastModified": "2015-03-20T14:37:02.943Z",
         "created": "2015-03-20T14:37:02.943Z",
         "size": 837245,
         "md5": "cbde88e2ed754c70860b3e6d4313551a"
     }
    ]
{% endcapture %}

{% include endpointTab.html %}
