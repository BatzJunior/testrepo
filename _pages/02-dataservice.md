---
category: dataservice
title: Data Service
permalink: /dataservice/
sections:
  serviceInformation: Service Information
  configuration: Configuration
  catalogues: Catalogues
  parts: Parts
  characteristics: Characteristics
  measurements: Measurements
  values: Measured Values
---

## {{page.sections['serviceInformation']}}
{% for sec in page.sections %}
  {{sec}}
{% endfor %}
{% include_relative 021-serviceinformation.md %}
