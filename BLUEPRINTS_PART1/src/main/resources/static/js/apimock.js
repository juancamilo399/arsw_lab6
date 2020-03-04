var apimock = (function () {

    mockdata = [];

    mockdata["JhonConnor"] = [
        {
            author: "JhonConnor",
            name: "house",
            points: [
                {
                    x: 250,
                    y: 100
                },
                {
                    x: 250,
                    y: 200
                },
                {
                    x: 350,
                    y: 200
                },
                {
                    x: 350,
                    y: 100
                },
                {
                    x: 250,
                    y: 100
                },
                {
                    x: 300,
                    y: 50
                },
                {
                    x: 350,
                    y: 100
                }
            ]
        },
        {
            author: "JhonConnor",
            name: "bike",
            points: [
                {
                    x: 30,
                    y: 35
                },
                {
                    x: 40,
                    y: 45
                }
            ]
        }
    ];

    mockdata['LexLuthor'] = [
        {
            author: 'LexLuthor',
            name: 'kryptonite',
            points: [
                {
                    x: 60,
                    y: 65
                },
                {
                    x: 70,
                    y: 75
                }
            ]
        }
    ];

    mockdata['Odette'] = [
{
            author: "Odette",
            name: "forest",
            points: [
                {
                    x: 82,
                    y: 95
                },
                {
                    x: 74,
                    y: 13
                },
                {
                    x: 77,
                    y: 3
                }
            ]
        },
{
            author: "Odette",
            name: "hooker",
            points: [
                {
                    x: 71,
                    y: 26
                },
                {
                    x: 58,
                    y: 16
                }
            ]
        }
    ];

    return {
        getBlueprintsByAuthor: function(author, callback) {
            callback(mockdata[author]);
        },

        getBlueprintsByNameAndAuthor: function(name, author, callback) {
            blueprint = mockdata[author].find(function(blueprint) {
                return blueprint.name == name
            });
            return callback( blueprint)
        }
    }

})();