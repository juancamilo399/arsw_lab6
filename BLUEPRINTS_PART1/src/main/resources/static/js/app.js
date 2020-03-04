var Module=(function (){
    var _author;

    function _setAuthorName(author) {
        _author = author;
    };

    function _map(list){
        return  mapList = list.map(function(blueprint){
            return {bpname:blueprint.name, numberPoints:blueprint.points.length};
        })
    }

    function _numberPoints(blueprints) {
        var total = blueprints.reduce(function(total, value) { return total + value.numberPoints; }, 0);
        $("#sumPoints").text("Total user points: " + total);
    };

    function _table(blueprints) {
        blueprints = _map(blueprints);
        _numberPoints(blueprints);
        $("#tableBlueprints > tbody").empty();
        blueprints.map(function(blueprint) {
            $("#tableBlueprints > tbody").append(
                "<tr> <td style=\"border:1px solid #000000;\">" +
                blueprint.bpname +
                "</td>" +
                "<td style=\"border:1px solid #000000;\">" +
                blueprint.numberPoints +
                "</td> " +
                "<td style=\"border:1px solid #000000;\"><form><button type='button' onclick='Module.getBlueprintsAuthorAndName( \"" +
                _author +
                '" , "' +
                blueprint.bpname +
                "\")'>Open</button></form></td>" +
                "</tr>"
            );
        });
    };

    function _draw(blueprints) {
        $("#canvasName").text("Current blueprint: " + blueprints.name);
        var canvasBlueprint = document.getElementById("canvasBlueprint");
        var ctx = canvasBlueprint.getContext("2d");
        ctx.clearRect(0, 0, canvasBlueprint.width, canvasBlueprint.height);
        ctx.beginPath();
        var first = blueprints.points[0];
        ctx.moveTo(first.x,first.y);
        blueprints.points.map(function(point){
            ctx.lineTo(point.x,point.y);
        })
        ctx.stroke();
    }

    function getBlueprintsAuthor(author) {
        _setAuthorName(author);
        if (author == "" || author == null) {
            alert("Ingrese un valor correcto de nombre");
        } else {
            $("#authorName").text(author + "'s blueprints: ");
            client.getBlueprintsByAuthor(author, _table);
        }
    };

    function getBlueprintsAuthorAndName(author,name) {
        _setAuthorName(author);
        client.getBlueprintsByNameAndAuthor(name,author,_draw);
    };

    return {
        getBlueprintsAuthor: getBlueprintsAuthor,
        getBlueprintsAuthorAndName: getBlueprintsAuthorAndName,
    };
})();