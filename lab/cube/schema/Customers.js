cube(`Customers`, {
  sql: `SELECT * FROM customers`,
  measures: { count: { type: `count`, title: `Số khách hàng` } },
  dimensions: {
    id: { sql: `id`, type: `number`, primaryKey: true },
    tenantId: { sql: `tenant_id`, type: `number` },
    name: { sql: `name`, type: `string`, title: `Tên doanh nghiệp` },
    segment: { sql: `segment`, type: `string`, title: `Phân khúc` },
    province: { sql: `province`, type: `string`, title: `Tỉnh thành` },
    createdAt: { sql: `created_at`, type: `time`, title: `Ngày tạo` }
  }
});
