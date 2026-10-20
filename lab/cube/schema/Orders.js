cube(`Orders`, {
  sql: `SELECT * FROM orders`,
  joins: {
    Customers: { sql: `${CUBE}.customer_id = ${Customers}.id`, relationship: `belongsTo` },
    Products: { sql: `${CUBE}.product_id = ${Products}.id`, relationship: `belongsTo` }
  },
  measures: {
    count: { type: `count`, title: `Số đơn hàng` },
    revenue: { sql: `amount`, type: `sum`, title: `Doanh thu` },
    averageOrderValue: { sql: `amount`, type: `avg`, title: `Giá trị đơn trung bình` },
    uniqueCustomers: { sql: `customer_id`, type: `countDistinct`, title: `Khách hàng duy nhất` },
    medianOrderValue: { sql: `PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY amount)`, type: `number`, title: `Trung vị giá trị đơn` },
    p95OrderValue: { sql: `PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY amount)`, type: `number`, title: `P95 giá trị đơn` }
  },
  dimensions: {
    id: { sql: `id`, type: `number`, primaryKey: true },
    tenantId: { sql: `tenant_id`, type: `number`, title: `Mã doanh nghiệp` },
    status: { sql: `status`, type: `string`, title: `Trạng thái` },
    amount: { sql: `amount`, type: `number`, title: `Giá trị` },
    orderedAt: { sql: `ordered_at`, type: `time`, title: `Thời điểm đặt` }
  },
  preAggregations: {
    monthlyRevenue: {
      measures: [revenue, count],
      dimensions: [tenantId, status],
      timeDimension: orderedAt,
      granularity: `month`,
      partitionGranularity: `year`,
      refreshKey: { every: `1 hour` }
    }
  }
});
