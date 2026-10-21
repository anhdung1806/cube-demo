cube(`ProvinceShare`, {
  sql: `
    WITH selected_province AS (
      SELECT DISTINCT province AS province_filter
      FROM customers
      WHERE ${FILTER_PARAMS.ProvinceShare.provinceFilter.filter(`province`)}
    )
    SELECT
      selected_province.province_filter,
      customers.id,
      customers.province
    FROM selected_province
    CROSS JOIN customers
  `,
  dimensions: {
    provinceFilter: { sql: `province_filter`, type: `string`, title: `Tỉnh được chọn` },
    province: { sql: `province`, type: `string`, title: `Tỉnh của doanh nghiệp` },
    id: { sql: `id`, type: `number`, primaryKey: true }
  },
  measures: {
    totalBusinesses: { sql: `id`, type: `count`, title: `Tổng số doanh nghiệp` },
    businessesInSelectedProvince: {
      sql: `id`,
      type: `count`,
      title: `Doanh nghiệp tại tỉnh được chọn`,
      filters: [{ sql: `${CUBE.province} = ${CUBE.provinceFilter}` }]
    },
    provinceShare: {
      multiStage: true,
      sql: `100.0 * ${CUBE.businessesInSelectedProvince} / NULLIF(${CUBE.totalBusinesses}, 0)`,
      type: `number`,
      title: `Tỷ trọng doanh nghiệp tại tỉnh được chọn (%)`
    }
  }
});
