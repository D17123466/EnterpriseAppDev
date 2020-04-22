$(document).ready(function() {
    var path_url = document.referrer.substring(19);
    if (path_url == '/' || path_url == '/dashboard') {
        $('#path').attr('href', path_url)
    }
    else {
        $('#path').attr('href', '/')
    }
})