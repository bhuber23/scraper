//Scrape articles
$("#scrape").on("click", function(event){
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then(function(){
        Location.reload();
    });
});

//Save article
$(".save").on("click", function(event){
    
    var id = $(this).data("id");
    console.log(id);
    $.ajax({
        method: "POST",
        url: "/articles/saved/" + id
    }).then(function(){
        window.location = "/"
    });
});

//Add comment
$(".add-comment").on("click", function(event){
    $("#myModal").modal("show");
});

$(document.body).on("click", ".submit-comment", function(event){
    event.preventDefault();
    var id = $(this).data("id");
    $.ajax({
        type: "POST",
        url: "/comments/saved/" + id,
        data: {commentBody: $("#new-comment").val().trim()},
        success: function (response) {
            $("#new-comment").val("");
            window.location = "/saved"
        }
    });
});

//Delete comment
$(".delete-comment").on("click", function(event){
    event.preventDefault();
    var id = $(this).data("id");

    $.ajax({
        method: "DELETE",
        url: "/comments/delete/" + id
    }).then(function(){
        window.location = "/saved"
    });
});

$(".delete-article").on("click", function(event){
    var id = $(this).data("id");
    $.ajax({
        method: "DELETE",
        url: "/articles/saved/delete/" + id
    }).then(function(){
        window.location = "/saved"
    });
});