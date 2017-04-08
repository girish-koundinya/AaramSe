(function() {
  "use strict";
  return {
    initialize: function() {
      if(page_type == "ticket") {
        domHelper.ticket.onSubmitClick(this.submitClicked.bind(this), ['reply','forward','note']);
      }
    },
    submitClicked: function(e) {
      //TODO : fetch content of note/reply/forward 
      //TODO : make network request 
      //TODO : get score and check rating
      e.preventDefault();
      e.stopPropagation();
      var options = {}; 
      this.$request.invoke('getSentitmentScore', options)
      .done (function(data){
        console.log(data);
        var retVal = confirm("Do you want to continue ?");
        if(retVal > 0){

        }
      })
      .fail (function(err){
        console.log(err)
      });
    }

  };
})();

/*
{%comment%}

## Help: Using iparam (​installation parameters) in code

iparam: The ​settings that you want your users to configure when installing the
app.

iparam definition is made in config/iparam_en.yml file. To use the defined
iparam in code, use Liquid notation like:

- {{iparam.username}}
- {{iparam.country}}

{%endcomment%}
*/
