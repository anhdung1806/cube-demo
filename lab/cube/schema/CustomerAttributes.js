cube(`CustomerAttributes`, {
  sql: `SELECT * FROM customer_attributes`,
  joins: {
    Customers: { sql: `${CUBE}.customer_id = ${Customers}.id`, relationship: `belongsTo` }
  },
  measures: { count: { type: `count`, title: `Số thuộc tính` } },
  dimensions: {
    id: { sql: `id`, type: `number`, primaryKey: true },
    tenantId: { sql: `tenant_id`, type: `number` },
    customerId: { sql: `customer_id`, type: `number` },
    attributeName: { sql: `attribute_name`, type: `string`, title: `Tên thuộc tính` },
    attributeValue: { sql: `attribute_value`, type: `string`, title: `Giá trị thuộc tính` },
    updatedAt: { sql: `updated_at`, type: `time`, title: `Cập nhật lúc` }
  }
});
