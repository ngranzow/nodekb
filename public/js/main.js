$(document).ready(function(){
    $('.delete-article').on('click', function(){
        $target = $(e.target);
        console.log($target.attr('data-id'));
    });
});