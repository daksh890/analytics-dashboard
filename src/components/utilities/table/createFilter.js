export const filterData = (tableRows, id, min, max) => {
  var [header, index] = id.split(",");
  index = parseInt(index) + 2;
  return tableRows.filter((item) => {
    var val;
    if (header == "revenue") {
      val = item[index].slice(2);
      //   console.log(val);
    } else {
      val = item[index];
    }
    return val >= min && val <= max;
  });
};
