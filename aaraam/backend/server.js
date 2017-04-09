var request = loadDependency('request');

exports = {
  getSentitmentScore: function(args) {

    var reqData = {
      method: 'POST',
      url: 'https://language.googleapis.com/v1beta1/documents:analyzeSentiment?key=' + args.iparams.api_key,
      body: {
        document: {
          type: 'PLAIN_TEXT',
          content: args.text
        }
      },
      json: true,
      headers: {
        content_type: 'application/json'
      }
    };

    request(reqData, function(err, resp, body) {
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