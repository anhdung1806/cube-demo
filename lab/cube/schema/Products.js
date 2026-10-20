cube(`Products`, {
  sql: `SELECT * FROM products`,
  measures: { count: { type: `count`, title: `Số sản phẩm` } },
  dimensions: {
    id: { sql: `id`, type: `number`, primaryKey: true },
    name: { sql: `name`, type: `string`, title: `Sản phẩm` },
    category: { sql: `category`, type: `string`, title: `Danh mục` }
  }
});
