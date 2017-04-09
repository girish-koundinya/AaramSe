var request = loadDependency('request');
//var requestData = loadLib('req-data');

exports = {
  getSentitmentScore: function(args) {

    //Debug logs
    console.log("*********" + args + "*********");

    var reqData = {
      method: 'POST',
      url: 'https://language.googleapis.com/v1beta1/documents:analyzeSentiment?key=xxx',
      body: JSON.stringify({
              document: {
                type: 'PLAIN_TEXT',
                content: 'This tastes really bad.' || args.note_data
              }
            }),
      headers: {
        content_type: 'application/json'
      }
    };

    request(reqData, function(err, resp, body) {
      //Debug logs
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