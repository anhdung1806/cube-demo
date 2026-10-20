cube(`Events`, {
  sql: `SELECT * FROM events`,
  joins: {
    Customers: { sql: `${CUBE}.customer_id = ${Customers}.id`, relationship: `belongsTo` }
  },
  measures: {
    count: { type: `count`, title: `Số sự kiện` },
    activeCustomers: { sql: `customer_id`, type: `countDistinct`, title: `Khách hàng hoạt động` },
    sessions: { sql: `session_id`, type: `countDistinct`, title: `Số phiên` }
  },
  dimensions: {
    id: { sql: `id`, type: `number`, primaryKey: true },
    tenantId: { sql: `tenant_id`, type: `number` },
    customerId: { sql: `customer_id`, type: `number` },
    eventName: { sql: `event_name`, type: `string`, title: `Tên sự kiện` },
    sessionId: { sql: `session_id`, type: `string`, title: `Mã phiên` },
    occurredAt: { sql: `occurred_at`, type: `time`, title: `Thời điểm` }
  }
});
