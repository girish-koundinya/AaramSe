var request = loadDependency('request');
var requestData = loadLib('req-data');

exports = {
  getSentitmentScore: function(args) {
    var reqData = requestData(args);
    request(reqData, function(err, resp, body) {
      if (err) { return renderData(err); }
      if (resp.statusCode == 201) {
        return renderData(null, body);
      } else {
        var err = {
          status: resp.statusCode, 
          message: body
        };
        return renderData(err);
      }
    });
  }
};