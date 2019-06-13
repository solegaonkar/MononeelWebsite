var idToken = "";
var enquiries = {};
var ajaxRequestData = {'cred':'password'};

function prefixZero(x){
    return x<10 ? "0" + x : x;
}

function timeNow() {
    var d = new Date();
    return d.getFullYear() + "-" + prefixZero(d.getMonth()+1) + "-" + prefixZero(d.getDate()) + " " + prefixZero(d.getHours()) + ":" + prefixZero(d.getMinutes());
}

function sanitize(s) {
    return s ? s.replace(/\&/g,"&amp;").replace(/\>/g,"&gt;").replace(/\</g,"&lt;").replace(/\n/g,"<br/>") : "";
}

function removeEnquiry(id) {
    var i = enquiries.length;
    while(i-- > 0) {
        if (enquiries[i].id == id)
            enquiries.splice(i, 1);
    }
}

function getWorkLogWidget(i) {
    response = '<div class="row" id="row' + i + '">'
        + '<div class="col-sm-12"><textarea class="form-control" rows="3" id="update' + i + '"></textarea></div>'
        + '<div class="col-sm-12"><button type="button" class="btn btn-danger" onclick="updateEnquiry(\'' 
        + i 
        + '\')">Log</button></div>';
    for(var j = enquiries[i].work_log.length-1; j>=0; j--) {
        response += '<div class="col-sm-12">' + sanitize(enquiries[i].work_log[j]) + '</div>'
    }
    response += '</div>';
    return response;
}

function getEnquiryRow(i) {
    enquiry = enquiries[i].enquiry;
    return '<hr/><div class="red-border" id="' 
        + i
        + '"><div class="row" ><div class="col-sm-12">&nbsp;</div></div><div class="row" ><div class="col-xs-10">'
        + enquiries[i].timestamp.substr(0,16)
        + '</div><div class="col-xs-2 text-right"><button type="button" class="btn btn-danger" onclick="closeEnquiry(\'' + i + '\')">X</button>&nbsp;'
        + '</div></div><div class="row" ><div class="col-sm-12">&nbsp;</div><div class="col-sm-4">Name: '
        + enquiry.name
        + '</div><div class="col-sm-3">Phone: '
        + enquiry.phone
        + '</div><div class="col-sm-5">Email: '
        + enquiry.email
        + '</div></div><div class="row" ><div class="col-lg-12">&nbsp;</div><div class="col-lg-12 strong">Message: </div><div class="col-lg-12">&nbsp;'
        + sanitize(enquiry.message)
        + '</div></div><div class="row" ><div class="col-sm-12">&nbsp;</div></div>'
        + getWorkLogWidget(i);
        + '</div>';
}

function getEnquiryContainer() {
    var h = '<div class="container"><h1>Enquiries</h1>';
    for (var i=0; i<enquiries.length; i++) {
        h += getEnquiryRow(i);
        h += '<div class="row"></div>';
    }
    if (enquiries.length == 0) {
       h = '<div class="container"><div class="row"><div class="col-xs-12"><h1>All Caught up</h1></div></div></div>';
    }
    h += '</div>';
    return h;
}

function loadData() {
    $.ajax({
        type: "POST",
        crossDomail: true,
        url: "https://api.candidclicks.net/view",
        contentType: "application/json",
        data: JSON.stringify(ajaxRequestData),
        success: function(object) {
            enquiries = JSON.parse(object.body).Items;
            enquiries.sort((a, b) => (b.timestamp > a.timestamp) ? 1 : -1);
            for (i = 0; i< enquiries.length; i++) {
                enquiries[i].enquiry = JSON.parse(enquiries[i].enquiry);
            }
            $("#data").html(getEnquiryContainer());
        }
    });
}

function closeEnquiry(iid) {
    ajaxRequestData['id'] = enquiries[i].id;
    ajaxRequestData['update'] = "";
    $.ajax({
        type: "POST",
        crossDomail: true,
        url: "https://api.candidclicks.net/close",
        contentType: "application/json",
        data: JSON.stringify(ajaxRequestData),
        success: function(object) {
            removeEnquiry(i);
            $("#data").html(getEnquiryContainer());
        }
    });
}

function updateEnquiry(i) {
    ajaxRequestData['update'] = timeNow() + "\n" + $("#update" + i).val();
    ajaxRequestData['id'] = enquiries[i].id;
    enquiries[i].work_log.push(sanitize(ajaxRequestData['update']));
    $("#update" + i).val("");
    $.ajax({
        type: "POST",
        crossDomail: true,
        url: "https://api.candidclicks.net/update",
        contentType: "application/json",
        data: JSON.stringify(ajaxRequestData),
        success: function(object) {
            $("#data").html(getEnquiryContainer());
        }
    });
}

$("#data").hide();
$("#login").show();

function login() {
    if ($("#name").val() === "" || $("#password").val() === "") {
        alert("Please enter a valid User Name & Password");
        return;
    }
    $("#login").hide();
    $("#data").show();
    $("#data").html('<div class="container"><div class="row"><div class="col-xs-12"><h1>Loading...</h1></div></div></div>');
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
            ajaxRequestData['token'] = result.idToken.jwtToken;
            loadData();
        },
        onFailure: function(err) {
            alert("Invalid Password.");
            $("#data").hide();
            $("#login").show();
            $("#myModal").modal('show');
        }
    });
}

$("#name").keyup(function(e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        login();
    }
});

$("#password").keyup(function(e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        login();
    }
});
