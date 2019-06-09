function getEnquiryRow(object) {
    enquiry = JSON.parse(object.enquiry);
    return '<hr/><div class="row"><div class="col-sm-12">'
        + object.timestamp
        + '</div><div class="col-sm-12">&nbsp;</div><div class="col-sm-4">Name: '
        + enquiry.name
        + '</div><div class="col-sm-4">Phone: '
        + enquiry.phone
        + '</div><div class="col-sm-4">Email: '
        + enquiry.email
        + '</div><div class="col-sm-12">&nbsp;</div><div class="col-sm-12">Message: '
        + (enquiry.message ? enquiry.message.replace(/\n/g, "<br/>") : "");
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
    h += '</div>';
    return h;
}

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
