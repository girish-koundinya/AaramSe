(function() {
  "use strict";
  return {
    initialize: function() {
      if(page_type == "ticket") {
        domHelper.ticket.onSubmitClick(this.submitClicked.bind(this), ['reply','forward','note']);
        this.getTicketSentiment();
      }
    },
    submitClicked: function(e) {
      e.preventDefault();
      e.stopPropagation();
      var textContent = jQuery('.redactor_editor').text();
      var options = { text : textContent}; 
      console.log(this.$request);
      this.$request.invoke('getSentitmentScore', options)
      .done (function(data){
        if(data.message.documentSentiment.score < 0){
          console.log("bad response");
          var retVal = confirm("That sounds a bit rude, do you want to continue?");
          if(retVal > 0){
            console.log("bad response - continue anyway");
            e.currentTarget.submit();
          }
        }else{
          console.log("good response");
          e.currentTarget.submit();
        }
      })
      .fail (function(err){
        console.log(err);
        e.currentTarget.submit();
      });
    },
    getTicketSentiment: function(e){
      var avgText = '';
      var textContent = domHelper.ticket.getTicketInfo().helpdesk_ticket.description; 
      avgText = textContent;
      var comment = jQuery('.commentbox-requester');      var options = { text : textContent}; 
      jQuery.each( comment, function( i, val ) {
        avgText = avgText + ' ' + jQuery(val).text().trim();
      });
      var options = { text : avgText}; 
      this.$request.invoke('getSentitmentScore',options)
      .done(function(data){
        console.log(data.message.documentSentiment.score);
       if(data.message.documentSentiment.score < 0){
        jQuery('#avg-cust-senti').attr("class","sentisad");
       }else if(data.message.documentSentiment.score < 0.5){
        jQuery('#avg-cust-senti').attr("class","sentineutral");        
       }else{
        jQuery('#avg-cust-senti').attr("class","sentihappy");                
       }
      })
      .fail(function(err){
       console.log(err); 
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
