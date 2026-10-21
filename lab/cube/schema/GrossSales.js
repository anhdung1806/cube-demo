const windows = [3, 6, 9, 12];
const monthlyAmounts = Array.from({ length: 24 }, (_, index) => {
  const date = new Date(Date.UTC(2023, index, 1)).toISOString().slice(0, 10);
  return `('${date}'::timestamp, ${100 + index * 10})`;
});

cube(`GrossSales`, {
  sql: `
    SELECT month, amount
    FROM (VALUES ${monthlyAmounts.join(',')}) AS sales(month, amount)
  `,
  dimensions: {
    month: { sql: `month`, type: `time`, primaryKey: true },
    growthWindow: { type: `switch`, values: windows.map((months) => `${months}m`) }
  },
  measures: {
    grossSales: { sql: `amount`, type: `sum` },
    ...windows.reduce((members, months) => ({
      ...members,
      [`r${months}GrossSales`]: {
        sql: `amount`, type: `sum`, rollingWindow: { trailing: `${months} month` }
      },
      [`priorR${months}GrossSales`]: {
        multiStage: true,
        sql: `${CUBE[`r${months}GrossSales`]}`,
        type: `number`,
        timeShift: [{ interval: `${months} month`, type: `prior` }]
      }
    }), {}),
    grossSalesCurrent: {
      multiStage: true,
      case: {
        switch: `${CUBE.growthWindow}`,
        when: windows.map((months) => ({
          value: `${months}m`, sql: `${CUBE[`r${months}GrossSales`]}`
        })),
        else: { sql: `${CUBE.r3GrossSales}` }
      },
      type: `number`
    },
    grossSalesPrior: {
      multiStage: true,
      case: {
        switch: `${CUBE.growthWindow}`,
        when: windows.map((months) => ({
          value: `${months}m`, sql: `${CUBE[`priorR${months}GrossSales`]}`
        })),
        else: { sql: `${CUBE.priorR3GrossSales}` }
      },
      type: `number`
    },
    grossSalesChange: {
      multiStage: true,
      sql: `${CUBE.grossSalesCurrent} - ${CUBE.grossSalesPrior}`,
      type: `number`
    },
    grossSalesGrowthPercentage: {
      multiStage: true,
      sql: `100.0 * (${CUBE.grossSalesCurrent} - ${CUBE.grossSalesPrior}) / NULLIF(${CUBE.grossSalesPrior}, 0)`,
      type: `number`
    }
  }
});
