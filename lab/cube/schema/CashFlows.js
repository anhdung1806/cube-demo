cube(`CashFlows`, {
  sql: `SELECT * FROM cash_flows`,
  joins: {
    Customers: { sql: `${CUBE}.customer_id = ${Customers}.id`, relationship: `belongsTo` }
  },
  measures: {
    netCashFlow: { sql: `amount`, type: `sum`, title: `Dòng tiền ròng` },
    count: { type: `count`, title: `Số dòng tiền` }
  },
  dimensions: {
    id: { sql: `id`, type: `number`, primaryKey: true },
    tenantId: { sql: `tenant_id`, type: `number` },
    customerId: { sql: `customer_id`, type: `number` },
    amount: { sql: `amount`, type: `number`, title: `Số tiền` },
    occurredAt: { sql: `occurred_at`, type: `time`, title: `Ngày phát sinh` }
  }
});
