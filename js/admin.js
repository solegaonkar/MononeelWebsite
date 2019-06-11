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



$("#login").show();
$("#data").hide();

function login() {
var authenticationData = {
    Username : $("#name").val(),
    Password : $("#password").val()
};
var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
var poolData = { UserPoolId : 'us-east-1_DcZHCaO1F',
    ClientId : '27dn7msgi3bcp74chumq7kg5m4'
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
var userData = {
    Username : 'vikas',
    Pool : userPool
};
var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
        var accessToken = result.getAccessToken().getJwtToken();

        /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer */
        var idToken = result.idToken.jwtToken;
        alert("Token: " + idToken)
        $("#login").hide();
        $("#data").show();

        

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



    },

    onFailure: function(err) {
        alert(JSON.stringify(err));
        $("#login").show();
    },

});
}
