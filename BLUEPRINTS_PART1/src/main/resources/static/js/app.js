var Module=(function (){
    var _author;
    var _open;
    var puntosNuevos = [];
    var _currentblueprint;
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

    function init() {
        var canvas = document.getElementById("canvasBlueprint"),
        context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height)
        if(window.PointerEvent) {
            canvas.addEventListener("pointerdown", draw, false);
        }else {
            //Provide fallback for user agents that do not support Pointer Events
            canvas.addEventListener("mousedown", draw, false);
        }

        //pedir nombre
        //var datos = mapearJson();
        //guardarBlueprint();
        //puntosNuevos = [];
     }

     function mapearJson(){
        var s = "{ author ";
     }

    function guardarBlueprint(datos){
        /*return $.ajax({
            url: "/AddNewBlueprint",
            type: 'POST',
            data: ,
            contentType: "application/json"
        });
        */
    }

    function _draw(blueprints) {
        _currentblueprint=blueprints;
        $("#canvasName").text("Current blueprint: " + blueprints.name);
        redraw(_currentblueprint);
    }

    function redraw(blueprints) {
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

    function draw(event) {
            var canvas = document.getElementById("canvasBlueprint"),
            context = canvas.getContext("2d");
            var offset  = getOffset(canvas);
            var coorX= event.pageX-offset.left;
            var coorY= event.pageY-offset.top;
            _currentblueprint.points.push({x:coorX,y:coorY});
            console.log(_currentblueprint);
            redraw(_currentblueprint);
            var punto = [event.pageX-offset.left,event.pageY-offset.top];
            //puntosNuevos.push(punto);
    }

    //Helper function to get correct page offset for the Pointer coords
    function getOffset(obj) {
              var offsetLeft = 0;
              var offsetTop = 0;
              do {
                if (!isNaN(obj.offsetLeft)) {
                    offsetLeft += obj.offsetLeft;
                }
                if (!isNaN(obj.offsetTop)) {
                    offsetTop += obj.offsetTop;
                }
              } while(obj = obj.offsetParent );
              return {left: offsetLeft, top: offsetTop};
    }



    function getBlueprintsAuthor(author) {
        _setAuthorName(author);
        if (author == "" || author == null) {
            alert("Ingrese un valor");
        } else {
            $("#authorName").text(author + "'s blueprints: ");
            client.getBlueprintsByAuthor(author, _table);
        }
    };

    function getBlueprintsAuthorAndName(author,name) {
        _setAuthorName(author);
        init();
        client.getBlueprintsByNameAndAuthor(name,author,_draw);
    };


    function putBlueprint (){

        var putPromise = $.ajax({
            url: "/blueprints/"+_currentblueprint.author+"/"+_currentblueprint.name,
            type: 'PUT',
            data: JSON.stringify(_currentblueprint),
            contentType: "application/json"
        });

        putPromise.then(
            function () {
                console.info("blueprint created");
            },
            function () {
                console.info("error");
            }
        );

        return putPromise;
    }

    function save() {
        if(_currentblueprint.name != null && _currentblueprint.author != null){
            putBlueprint();
        }
    }

    return {
        getBlueprintsAuthor: getBlueprintsAuthor,
        getBlueprintsAuthorAndName: getBlueprintsAuthorAndName,
        save:save
    };
})();