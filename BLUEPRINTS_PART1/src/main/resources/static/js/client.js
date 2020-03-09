var client = (function() {
    function getBlueprintsByAuthor(author, callback) {
        $.ajax({
            dataType: "json",
            url: "http://localhost:8080/blueprints/"+author,
            success: function (data) {
                callback(data)
            }
        });
    }
    function getBlueprintsByNameAndAuthor(name, author, callback) {
        $.ajax({
            dataType: "json",
            url: "http://localhost:8080/blueprints/"+author+"/"+name,
            success: function (data) {
                callback(data)
            }
        });
    }

    function deleteBlueprint(name, author,callback) {
        $.ajax({
            url: "http://localhost:8080/blueprints/"+author+"/"+name,
            type: 'DELETE',
            success: function(result) {
                console.log(result);
                callback();
            }
        });
    }

    return {
        getBlueprintsByAuthor: getBlueprintsByAuthor,
        getBlueprintsByNameAndAuthor: getBlueprintsByNameAndAuthor,
        deleteBlueprint:deleteBlueprint
    };
})();