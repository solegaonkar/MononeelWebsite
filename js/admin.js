function closeEnquiry(id) {
 $.ajax({
    type: "POST",
    crossDomail: true,
    url: "https://api.candidclicks.net/close",
    contentType: "application/json",
    data: '{"cred":"password", "id":"' + id + '"}',
    success: function(object) {
        $("#data").html(getEnquiryContainer(JSON.parse(object.body)));
    }
  });
}

function getEnquiryRow(object) {
    enquiry = JSON.parse(object.enquiry);
    return '<hr/><div class="row"><div class="col-sm-10">'
        + object.timestamp
        + '</div><div class="col-sm-2"><button type="button" class="btn" onclick="closeEnquiry(\'' + object.id + '\')">X</button>'
        + '</div><div class="col-sm-12">&nbsp;</div><div class="col-sm-4">Name: '
        + enquiry.name
        + '</div><div class="col-sm-4">Phone: '
        + enquiry.phone
        + '</div><div class="col-sm-4">Email: '
        + enquiry.email
        + '</div><div class="col-sm-12">&nbsp;</div><div class="col-sm-12">Message: '
        + (enquiry.message ? enquiry.message.replace(/\n/g, "<br/>") : "")
        + '</div></div>';
}


function getEnquiryContainer(object) {
    var h = '<div class="container">';
    items = object.Items;
    items.sort((a, b) => (b.timestamp > a.timestamp) ? 1 : -1)
    for (i=0; i<object.Items.length; i++) {
        h += getEnquiryRow(object.Items[i]);
        h += '<div class="row"></div>';
    }
    if (object.Items.length == 0) {
       h = '<div class="container"><div class="row"><div class="col-xs-12"><h1>All Caught up</h1></div></div></div>';
    }
    h += '</div>';
    return h;
}

var data = {
        UserPoolId : 'us-east-1_DcZHCaO1F',
        ClientId : '27dn7msgi3bcp74chumq7kg5m4'
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(data);
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
        cognitoUser.getSession(function(err, session) {
            if (err) {
               alert(err);
                return;
            }
            console.log('session validity: ' + session.isValid());

            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId : 'us-east-1:63105d6c-892a-4129-a621-b1cb0d03dc8b',
                Logins : {
                    // Change the key below according to the specific region your user pool is in.
                    'cognito-idp.us-east-1.amazonaws.com/us-east-1_DcZHCaO1F' : session.getIdToken().getJwtToken()
                }
            });

         
         
         $.ajax({
    type: "POST",
    crossDomail: true,
    url: "https://api.candidclicks.net/view",
    contentType: "application/json",
    data: '{"cred":"password"}',
    success: function(object) {
        $("#data").html(getEnquiryContainer(JSON.parse(object.body)));
    }
  });

         
         

        });
    } else {
                alert("Cognito User is NULL");
        window.location.replace("https://login.candidclicks.net/login?response_type=code&client_id=27dn7msgi3bcp74chumq7kg5m4&redirect_uri=https://candidclicks.net/admin.html");

    }

