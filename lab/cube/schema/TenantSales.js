const tenantId = COMPILE_CONTEXT.securityContext.tenantId;

cube(`TenantSales`, {
  sql: `SELECT * FROM orders`,
  measures: {
    revenue: { sql: `amount`, type: `sum`, title: `Doanh thu` },
    orderCount: { type: `count`, title: `Số đơn hàng` },
    averageOrderValue: {
      sql: `amount`, type: `avg`, title: `Giá trị đơn trung bình`,
      public: tenantId === 101
    },
    distinctOrders: {
      sql: `id`, type: `countDistinct`, title: `Đơn hàng duy nhất`,
      public: tenantId === 202
    }
  },
  dimensions: {
    id: { sql: `id`, type: `number`, primaryKey: true, public: false },
    tenantId: { sql: `tenant_id`, type: `number`, title: `Mã doanh nghiệp`, public: false },
    status: { sql: `status`, type: `string`, title: `Trạng thái` },
    orderedAt: { sql: `ordered_at`, type: `time`, title: `Thời điểm đặt` }
  }
});
