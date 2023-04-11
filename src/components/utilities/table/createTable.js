export const createTableData = (headers, apps, tabledata) => {
  var filter = {
    app_name: { options: [] },
    revenue: {},
    requests: {},
    responses: {},
    clicks: {},
    impressions: {},
    fill_rate: {},
    ctr: {},
  };
  var table = tabledata.map((item) => {
    var name = apps.filter((app) => app.app_id === item.app_id);
    var x = { ...item, app_name: name[0].app_name };
    filter.app_name.options = Array.from(
      new Set([name[0].app_name, ...filter.app_name.options])
    );
    return x;
  });

  // console.log(table);

  var newTable = table.map((item) => {
    var fillRate = ((item.requests / item.responses) * 100).toFixed(2);
    if (filter.fill_rate.min) {
      filter.fill_rate.min = Math.min(fillRate, filter.fill_rate.min);
      filter.fill_rate.max = Math.max(fillRate, filter.fill_rate.max);
    } else {
      filter.fill_rate.min = fillRate;
      filter.fill_rate.max = fillRate;
    }

    var CTR = ((item.clicks / item.responses) * 100).toFixed(2);
    if (filter.ctr.min) {
      filter.ctr.min = Math.min(CTR, filter.ctr.min);
      filter.ctr.max = Math.max(CTR, filter.ctr.max);
    } else {
      filter.ctr.min = CTR;
      filter.ctr.max = CTR;
    }

    var impressions = item.impressions;
    if (filter.impressions.min) {
      filter.impressions.min = Math.min(impressions, filter.impressions.min);
      filter.impressions.max = Math.max(impressions, filter.impressions.max);
    } else {
      filter.impressions.min = impressions;
      filter.impressions.max = impressions;
    }

    var requests = item.requests;
    if (filter.requests.min) {
      filter.requests.min = Math.min(requests, filter.requests.min);
      filter.requests.max = Math.max(requests, filter.requests.max);
    } else {
      filter.requests.min = requests;
      filter.requests.max = requests;
    }

    var clicks = item.clicks;
    if (filter.clicks.min) {
      filter.clicks.min = Math.min(clicks, filter.clicks.min);
      filter.clicks.max = Math.max(clicks, filter.clicks.max);
    } else {
      filter.clicks.min = clicks;
      filter.clicks.max = clicks;
    }

    var responses = item.responses;
    if (filter.responses.min) {
      filter.responses.min = Math.min(responses, filter.responses.min);
      filter.responses.max = Math.max(responses, filter.responses.max);
    } else {
      filter.responses.min = responses;
      filter.responses.max = responses;
    }

    var revenue = item.revenue.toFixed(2);
    if (filter.revenue.min) {
      filter.revenue.min = Math.min(revenue, filter.revenue.min);
      filter.revenue.max = Math.max(revenue, filter.revenue.max);
    } else {
      filter.revenue.min = revenue;
      filter.revenue.max = revenue;
    }

    return {
      ...item,
      fill_rate: fillRate,
      ctr: CTR,
      revenue: `$ ${item.revenue.toFixed(2)}`,
      date: new Date(item.date).toDateString().slice(4),
    };
  });
  // console.log(newTable);
  var finalTable = [];
  //   console.log(headers);
  for (let i = 0; i < newTable.length; i++) {
    const x = [];
    x.push(newTable[i].date);
    x.push(newTable[i].app_name);
    // console.log(headers.length);
    headers.forEach((element) => {
      var y = element.id;
      x.push(newTable[i][y]);
    });
    finalTable.push(x);
  }

  return { data: finalTable, filter: filter };
};
