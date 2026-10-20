module.exports = {
  contextToAppId: ({ securityContext }) => {
    if (!securityContext || securityContext.tenantId == null) return 'tenant-preview';
    return `tenant-${securityContext.tenantId}`;
  },
  scheduledRefreshContexts: () => [101, 202, 303].map((tenantId) => ({
    securityContext: { tenantId }
  })),
  queryRewrite: (query, { securityContext }) => {
    const tenantId = securityContext && securityContext.tenantId;
    const referencedMembers = [
      ...(query.measures || []),
      ...(query.dimensions || []),
      ...(query.segments || []),
      ...(query.timeDimensions || []).map((item) => item.dimension),
      ...Object.keys(query.order || {})
    ];
    const addFilterMembers = (filters = []) => {
      for (const filter of filters) {
        if (filter.member) referencedMembers.push(filter.member);
        if (filter.and) addFilterMembers(filter.and);
        if (filter.or) addFilterMembers(filter.or);
      }
    };
    addFilterMembers(query.filters);

    const tenantCubes = new Set(['Orders', 'Customers', 'Events', 'CustomerAttributes', 'OrderStatusHistory', 'CashFlows', 'TenantSales']);
    const queriedCubes = new Set(referencedMembers
      .filter((member) => typeof member === 'string' && member.includes('.'))
      .map((member) => member.split('.')[0])
      .filter((cubeName) => tenantCubes.has(cubeName)));

    if (queriedCubes.size) {
      if (tenantId == null || tenantId === '') {
        throw new Error('JWT thiếu tenantId trong security context');
      }
      query.filters = query.filters || [];
      for (const cubeName of queriedCubes) {
        query.filters.push({
          member: `${cubeName}.tenantId`,
          operator: 'equals',
          values: [String(tenantId)]
        });
      }
    }

    return query;
  }
};
