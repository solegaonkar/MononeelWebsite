var idToken = "";
var enquiries = {};
var ajaxRequestData = {'cred':'password'};

function prefixZero(x){
    return x<10 ? "0" + x : x;
}

function emptyRow(){
    return '<div class="row"><div class="col-sm-12">&nbsp;</div></div>';
}

function timeNow() {
    var d = new Date();
    return d.getFullYear() + "-" + prefixZero(d.getMonth()+1) + "-" + prefixZero(d.getDate()) + " " + prefixZero(d.getHours()) + ":" + prefixZero(d.getMinutes());
}

function sanitize(s) {
    return s ? s.replace(/\&/g,"&amp;").replace(/\>/g,"&gt;").replace(/\</g,"&lt;").replace(/\n/g,"<br/>") : "";
}

function getWorkLogWidget(i) {
    var response = '<hr/><div class="row"><div class="col-sm-12 strong">Updates</div></div>'
        + '<div class="row">'
        + '<div class="col-sm-12"><textarea class="form-control" rows="3" id="update' + i + '"></textarea></div>'
        + emptyRow()
        + '<div class="col-sm-12"><button type="button" class="btn btn-danger" onclick="updateEnquiry(\'' 
        + i 
        + '\')">Add</button></div></div>';
    for(var j = enquiries[i].work_log.length-1; j>=0; j--) {
        response += '<div class="row"><div class="col-sm-12"><hr/></div></div>';
        response += '<div class="row"><div class="col-sm-12">' + sanitize(enquiries[i].work_log[j]) + '</div></div>'
    }
    return response;
}

function getEnquiryRow(i) {
    var enquiry = enquiries[i].enquiry;
    var response = '<hr/><div class="red-border" id="' + i + '">'
        + '<div class="row" >'
            + '<div class="col-xs-10 strong">' + enquiries[i].timestamp.substr(0,16) + '</div>'
            + '<div class="col-xs-2 text-right"><button type="button" class="btn btn-danger" onclick="closeEnquiry(\'' + i + '\')">X</button>&nbsp;</div>'
        + '</div><hr/>'
        + '<div class="row" >'
            + '<div class="col-sm-4"><span class="strong">Name:</span> ' + enquiry.name + '</div>'
            + '<div class="col-sm-3"><span class="strong">Phone:</span> ' + enquiry.phone + '</div>'
            + '<div class="col-sm-5"><span class="strong">Email:</span> ' + enquiry.email + '</div>'
        + '</div>'
        + emptyRow()
        + '<div class="row" ><div class="col-sm-12 strong">Message: </div></div>'
        + emptyRow()
        + '<div class="row" ><div class="col-sm-12">' + sanitize(enquiry.message) + '</div></div>'
        + emptyRow()
        + getWorkLogWidget(i)
        + '</div>';
    return response;
}

function getEnquiryContainer() {
    var h = '<div class="container"><div class="row"><div class="col-xs-9"><h1>Enquiries</h1></div>'
    + '<div class="col-xs-3"><button type="button" class="btn btn-danger" onclick="loadData()">Refresh</button></div></div>';
    for (var i=0; i<enquiries.length; i++) {
        h += getEnquiryRow(i);
    }
    if (enquiries.length == 0) {
       h = '<div class="container"><div class="row"><div class="col-sm-12"><h1>All Caught up</h1></div></div></div>';
    }
    h += '</div>';
    return h;
}

function loadData() {
    $('html, body').css("cursor", "wait");
    $.ajax({
        type: "POST",
        crossDomail: true,
        url: "https://api.mononeel.com/view",
        contentType: "application/json",
        data: JSON.stringify(ajaxRequestData),
        success: function(object) {
            enquiries = JSON.parse(object.body).Items;
            enquiries.sort((a, b) => (b.timestamp > a.timestamp) ? 1 : -1);
            for (i = 0; i< enquiries.length; i++) {
                enquiries[i].enquiry = JSON.parse(enquiries[i].enquiry);
            }
            $("#data").html(getEnquiryContainer());
            $('html, body').css("cursor", "auto");
        },
        error: function (){
            $('html, body').css("cursor", "auto");
        }
    });
}

function closeEnquiry(i) {
    ajaxRequestData['id'] = enquiries[i].id;
    ajaxRequestData['update'] = "";
    enquiries.splice(i, 1);
    $('html, body').css("cursor", "wait");
    $.ajax({
        type: "POST",
        crossDomail: true,
        url: "https://api.mononeel.com/close",
        contentType: "application/json",
        data: JSON.stringify(ajaxRequestData),
        success: function(object) {
            $("#data").html(getEnquiryContainer());
            $('html, body').css("cursor", "auto");
        },
        error: function (){
            $('html, body').css("cursor", "auto");
        }
    });
}

function updateEnquiry(i) {
    ajaxRequestData['update'] = timeNow() + "\n\n" + $("#update" + i).val();
    ajaxRequestData['id'] = enquiries[i].id;
    enquiries[i].work_log.push(ajaxRequestData['update']);
    $("#update" + i).val("");
    $('html, body').css("cursor", "wait");
    $.ajax({
        type: "POST",
        crossDomail: true,
        url: "https://api.mononeel.com/update",
        contentType: "application/json",
        data: JSON.stringify(ajaxRequestData),
        success: function(object) {
            $("#data").html(getEnquiryContainer());
            $('html, body').css("cursor", "auto");
        },
        error: function (){
            $('html, body').css("cursor", "auto");
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
    var poolData = { UserPoolId : 'ap-south-1_yBJo9e7Ir',
        ClientId : '1bmhvcs9a903n3h25qjcgmdiq3'
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
        Username : 'vikas',
        Pool : userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    $('html, body').css("cursor", "wait");
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            $('html, body').css("cursor", "auto");
            var accessToken = result.getAccessToken().getJwtToken();
            ajaxRequestData['token'] = result.idToken.jwtToken;
            loadData();
        },
        onFailure: function(err) {
            $('html, body').css("cursor", "auto");
            alert("Invalid Password.");
            $("#data").hide();
            $("#login").show();
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
