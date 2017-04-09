var request = loadDependency('request');
//var requestData = loadLib('req-data');

exports = {
  getSentitmentScore: function(args) {

    var reqData = {
      method: 'POST',
      url: 'https://language.googleapis.com/v1beta1/documents:analyzeSentiment?key=xxx',
      body: {
        document: {
          type: 'PLAIN_TEXT',
          content: 'This tastes really bad.' || args.note_data
        }
      },
      json: true,
      headers: {
        content_type: 'application/json'
      }
    };

    request(reqData, function(err, resp, body) {
      console.log(resp);
      console.log(body);

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