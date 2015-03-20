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
*site.headers['request']*
{% endhighlight %}
###### Not modified
{% highlight http %}
HTTP/1.1 304 Not modified
{% endhighlight %}
{% endcapture %}

{% include endpointTab.html %}
