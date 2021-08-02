module.exports =  function (requestedData) {
  return requestedData.resource != '' && requestedData.concertId === undefined;
};
