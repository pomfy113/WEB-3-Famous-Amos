// Prepping
$(document).ready(() => {
    console.log("Loading!");
    setTimeout(function(){ $('.alert').hide(); }, 3000);
    let d = new Date($('.date').html());
    $('.date').html(d.toDateString());


    $('.pageBtn').click(() => {
    });

});
