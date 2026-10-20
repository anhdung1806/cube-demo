# Danh mục 48 lab Cube

Các lab theo từng recipe trong `docs-mintlify/recipes`. Tất cả dùng PostgreSQL nghiệp vụ chung; mỗi thư mục có `README.md` tiếng Việt và `query.json` để chạy từ trang lab.

## Data modeling
- [Daily, Weekly, Monthly Active Users (DAU, WAU, MAU)](active-users/README.md) — [tài liệu](/recipes/data-modeling/active-users)
- [Calculating average order value](average-order-value/README.md) — [tài liệu](/recipes/data-modeling/average-order-value)
- [Implementing retention analysis & cohorts](cohort-retention/README.md) — [tài liệu](/recipes/data-modeling/cohort-retention)
- [Querying across data sources](cross-data-source-queries/README.md) — [tài liệu](/recipes/data-modeling/cross-data-source-queries)
- [Implementing custom calendars](custom-calendar/README.md) — [tài liệu](/recipes/data-modeling/custom-calendar)
- [Implementing custom time dimension granularities](custom-granularity/README.md) — [tài liệu](/recipes/data-modeling/custom-granularity)
- [Custom ordering for categorical values](custom-order/README.md) — [tài liệu](/recipes/data-modeling/custom-order)
- [Using Cube with dbt](dbt/README.md) — [tài liệu](/recipes/data-modeling/dbt)
- [Designing metrics](designing-metrics/README.md) — [tài liệu](/recipes/data-modeling/designing-metrics)
- [Configurable rolling windows and time shifts](dynamic-rolling-windows/README.md) — [tài liệu](/recipes/data-modeling/dynamic-rolling-windows)
- [Using dynamic union tables](dynamic-union-tables/README.md) — [tài liệu](/recipes/data-modeling/dynamic-union-tables)
- [Implementing Entity-Attribute-Value Model (EAV)](entity-attribute-value/README.md) — [tài liệu](/recipes/data-modeling/entity-attribute-value)
- [Implementing event analytics](event-analytics/README.md) — [tài liệu](/recipes/data-modeling/event-analytics)
- [Calculating filtered aggregates](filtered-aggregates/README.md) — [tài liệu](/recipes/data-modeling/filtered-aggregates)
- [Implementing funnel analysis](funnels/README.md) — [tài liệu](/recipes/data-modeling/funnels)
- [Calculating nested aggregates](nested-aggregates/README.md) — [tài liệu](/recipes/data-modeling/nested-aggregates)
- [Passing dynamic parameters in a query](passing-dynamic-parameters-in-a-query/README.md) — [tài liệu](/recipes/data-modeling/passing-dynamic-parameters-in-a-query)
- [Calculating averages and percentiles](percentiles/README.md) — [tài liệu](/recipes/data-modeling/percentiles)
- [Calculating period-over-period changes](period-over-period/README.md) — [tài liệu](/recipes/data-modeling/period-over-period)
- [Polymorphic cubes](polymorphic-cubes/README.md) — [tài liệu](/recipes/data-modeling/polymorphic-cubes)
- [Reusing period-to-date logic across measures](reusable-period-to-date/README.md) — [tài liệu](/recipes/data-modeling/reusable-period-to-date)
- [Reusing a view measure across views](reusing-view-measures/README.md) — [tài liệu](/recipes/data-modeling/reusing-view-measures)
- [Calculating share of total](share-of-total/README.md) — [tài liệu](/recipes/data-modeling/share-of-total)
- [Implementing data snapshots](snapshots/README.md) — [tài liệu](/recipes/data-modeling/snapshots)
- [Working around string time dimensions](string-time-dimensions/README.md) — [tài liệu](/recipes/data-modeling/string-time-dimensions)
- [Cube style guide](style-guide/README.md) — [tài liệu](/recipes/data-modeling/style-guide)
- [Generating the data model dynamically](using-dynamic-measures/README.md) — [tài liệu](/recipes/data-modeling/using-dynamic-measures)
- [Calculating the internal rate of return (XIRR)](xirr/README.md) — [tài liệu](/recipes/data-modeling/xirr)

## Pre-aggregations
- [Disabling pre-aggregations](disabling-pre-aggregations/README.md) — [tài liệu](/recipes/pre-aggregations/disabling-pre-aggregations)
- [Incrementally building pre-aggregations for a date range](incrementally-building-pre-aggregations-for-a-date-range/README.md) — [tài liệu](/recipes/pre-aggregations/incrementally-building-pre-aggregations-for-a-date-range)
- [Joining data from multiple data sources](joining-multiple-data-sources/README.md) — [tài liệu](/recipes/pre-aggregations/joining-multiple-data-sources)
- [Joining pre-aggregations with different refresh cadences](mixed-refresh-cadences-rollup-join/README.md) — [tài liệu](/recipes/pre-aggregations/mixed-refresh-cadences-rollup-join)
- [Accelerating non-additive measures](non-additivity/README.md) — [tài liệu](/recipes/pre-aggregations/non-additivity)
- [Refreshing select partitions](refreshing-select-partitions/README.md) — [tài liệu](/recipes/pre-aggregations/refreshing-select-partitions)
- [Using `original_sql` and `rollup` pre-aggregations effectively](using-originalsql-and-rollups-effectively/README.md) — [tài liệu](/recipes/pre-aggregations/using-originalsql-and-rollups-effectively)

## Configuration
- [Providing a custom data model for each tenant](custom-data-model-per-tenant/README.md) — [tài liệu](/recipes/configuration/custom-data-model-per-tenant)
- [Optimizing data source usage](data-store-cost-saving-guide/README.md) — [tài liệu](/recipes/configuration/data-store-cost-saving-guide)
- [Referencing environment variables](environment-variables/README.md) — [tài liệu](/recipes/configuration/environment-variables)
- [Providing a custom data source for each tenant](multiple-sources-same-schema/README.md) — [tài liệu](/recipes/configuration/multiple-sources-same-schema)
- [Using SSL connections to a data source](using-ssl-connections-to-data-source/README.md) — [tài liệu](/recipes/configuration/using-ssl-connections-to-data-source)

## Core Data API
- [Retrieving numeric values on the front-end](cast-numerics/README.md) — [tài liệu](/recipes/core-data-api/cast-numerics)
- [Using cloud groups and user attributes with Core Data APIs](cloud-groups-and-user-attributes/README.md) — [tài liệu](/recipes/core-data-api/cloud-groups-and-user-attributes)
- [Drilldowns](drilldowns/README.md) — [tài liệu](/recipes/core-data-api/drilldowns)
- [Getting unique values for a field](getting-unique-values-for-a-field/README.md) — [tài liệu](/recipes/core-data-api/getting-unique-values-for-a-field)
- [Implementing pagination](pagination/README.md) — [tài liệu](/recipes/core-data-api/pagination)
- [Real-Time data fetch in the REST (JSON) API](real-time-data-fetch/README.md) — [tài liệu](/recipes/core-data-api/real-time-data-fetch)
- [Implementing custom sorting](sorting/README.md) — [tài liệu](/recipes/core-data-api/sorting)

## Ai
- [Agent-to-agent: using the Chat API as a tool](agent-to-agent/README.md) — [tài liệu](/recipes/ai/agent-to-agent)
