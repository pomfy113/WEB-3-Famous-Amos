// Prepping
$(document).ready(() => {

    let d = new Date($('.date').html());
    $('.date').html(d.toDateString());

    setTimeout(function(){ $('.alert').hide(); }, 3000);

});
