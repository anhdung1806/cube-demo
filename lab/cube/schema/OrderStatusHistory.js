cube(`OrderStatusHistory`, {
  sql: `SELECT * FROM order_status_history`,
  joins: {
    Orders: { sql: `${CUBE}.order_id = ${Orders}.id`, relationship: `belongsTo` }
  },
  measures: { count: { type: `count`, title: `Số lần đổi trạng thái` } },
  dimensions: {
    id: { sql: `id`, type: `number`, primaryKey: true },
    tenantId: { sql: `tenant_id`, type: `number` },
    orderId: { sql: `order_id`, type: `number` },
    status: { sql: `status`, type: `string`, title: `Trạng thái` },
    changedAt: { sql: `changed_at`, type: `time`, title: `Thời điểm đổi` }
  }
});
