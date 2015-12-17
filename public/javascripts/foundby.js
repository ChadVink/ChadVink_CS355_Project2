$.ajax({
    method: "GET",
    url: "/foundbyoptions",
})
    .done(function(foundbyOptions) {
        var htmlString = "";
        for(var i = 0; i < foundbyOptions.length; i++){
            htmlString += '<input type="checkbox" name="selectedOptions" value="' +
                foundbyOptions[i].foundbyID +'">' +
                '&nbsp;' + foundbyOptions[i].name +
                '<br />';

            //htmlString += '<option value="' +
            //    foundByOptions[i].foundby_id + '">' +
            //    foundByOptions[i].name + '</option>';
        }
        console.log(htmlString);
        $('#foundbyOptions').html(htmlString);
    });