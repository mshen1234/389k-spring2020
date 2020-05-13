var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var pokeDataUtil = require("./poke-data-util");
var _ = require("underscore");
var app = express();
var PORT = 3000;

// Restore original data into poke.json.
// Leave this here if you want to restore the original dataset
// and reverse the edits you made.
// For example, if you add certain weaknesses to Squirtle, this
// will make sure Squirtle is reset back to its original state
// after you restard your server.
pokeDataUtil.restoreOriginalData();

// Load contents of poke.json into global variable.
var _DATA = pokeDataUtil.loadData().pokemon;

/// Setup body-parser. No need to touch this.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res) {
    // HINT:
    var contents = "";
    _.each(_DATA, function(i) {
        //contents += `<tr><td>`+i.id+`</td><td><a href="/pokemon/1">`+i.name+ `</a></td></tr>\n`;
        contents += `<tr><td>`+i.id+`</td><td><a href="/pokemon/`+i.id+`">`+i.name+ `</a></td></tr>\n`;
    })
    var html = `<html>\n<body>\n<table>`+contents+`</table>\n</body>\n</html>`;
    res.send(html);
});

app.get("/pokemon/:pokemon_id", function(req, res) {
  //this is the final version
    // HINT :
    /*  _.each(_DATA, function(i) {
        if (JSON.stringify(i.id)==pokemon_id) {
          result[i];
        }
      })
      */
      //making one row
      //for (var key in result) { }
    //var html= '<tr><td>'+${i}+'</td><td>'+${JSON.stringify(result[i])}+'</td></tr>\n';
    var id = parseInt(req.params.pokemon_id);
    var result = _.findWhere(_DATA, { id: id });
    if (!result)
    throw "Error: Pokemon not found";
    else
var html='<table style="width:100%"><tr><td>id</td><td>'+result.id+
'</td></tr><tr><td>num</td><td>'+JSON.stringify(result.num)+'</td></tr>'+
'</td></tr><tr><td>name</td><td>'+JSON.stringify(result.name)+'</td></tr>'+
'</td></tr><tr><td>img</td><td>'+JSON.stringify(result.img)+'</td></tr>'+
'</td></tr><tr><td>type</td><td>'+JSON.stringify(result.type)+'</td></tr>'+
'</td></tr><tr><td>height</td><td>'+JSON.stringify(result.height)+'</td></tr>'+
'</td></tr><tr><td>weight</td><td>'+JSON.stringify(result.weight)+'</td></tr>'+
'</td></tr><tr><td>candy</td><td>'+JSON.stringify(result.candy)+'</td></tr>'+
'</td></tr><tr><td>candy_count</td><td>'+result.candy_count+'</td></tr>'+
'</td></tr><tr><td>egg</td><td>'+JSON.stringify(result.egg)+'</td></tr>'+
'</td></tr><tr><td>spawn_chance</td><td>'+result.spawn_chance+'</td></tr>'+
'</td></tr><tr><td>avg_spawns</td><td>'+result.avg_spawns+'</td></tr>'+
'</td></tr><tr><td>spawn_time</td><td>'+JSON.stringify(result.spawn_time)+'</td></tr>'+
'</td></tr><tr><td>multipliers</td><td>'+JSON.stringify(result.multipliers)+'</td></tr>'+
'</td></tr><tr><td>weaknesses</td><td>'+JSON.stringify(result.weaknesses)+'</td></tr>'+
'</td></tr><tr><td>prev_evolution</td><td>'+JSON.stringify(result.prev_evolution)+'</td></tr>'+
'</td></tr><tr><td>next_evolution</td><td>'+JSON.stringify(result.next_evolution)+'</td></tr>'+
'</table>';
    res.send(html);
});

app.get("/pokemon/image/:pokemon_id", function(req, res) {
    var id=parseInt(req.params.pokemon_id);
    var result = _.findWhere(_DATA, { id: id });
    if (!result)
    throw "Error: Pokemon not found";
    else
    var imgstr=JSON.stringify(result.img);
    var html = '<img src='+imgstr+'/>';
    res.send(html);
});

app.get("/api/id/:pokemon_id", function(req, res) {
    // This endpoint has been completed for you.
    var id = parseInt(req.params.pokemon_id);
    var result = _.findWhere(_DATA, { id: id })
    if (!result) return res.json({});
    res.json(result);
});

app.get("/api/evochain/:pokemon_name", function(req, res) {
    var name = String(req.params.pokemon_name);
    var empty=[];

    var result = _.findWhere(_DATA, { name: name });
    if (!result) return res.json([]);
    if (result.prev_evolution) {
      var prev=result.prev_evolution;
      for (var key1 of prev) {
        var name11=key1.name;
        name11=name11.replace(/['"]+/g, '');
        empty.push(name11);
      }
    }
    empty.push(name);
      if (!result.next_evolution){
        return res.json(empty);
      }

  var next=result.next_evolution;

   for (var key of next) {
     //key.name or key[name]
     var name1=key.name;
     name1=name1.replace(/['"]+/g, '');
     empty.push(name1);
   }
   return res.json(empty);
//}
});

app.get("/api/type/:type", function(req, res) {
    var t = String(req.params.type);
    var contents = [];
    _.each(_DATA, function(i) {
      if (i.type.includes(t)) {
        var p=JSON.stringify(i.name);
        p = p.replace(/['"]+/g, '');
        contents.push(p);
      }
    })
    res.json(contents);
});

app.get("/api/type/:type/heaviest", function(req, res) {
  var t = String(req.params.type);
  var heavy=0;
  var heavy1;
  var bool=false;
  _.each(_DATA, function(i) {
    if (i.type.includes(t)) {
      bool=true;
      var p=i.name;
      var weightt=String(i.weight);
      weightt=weightt.replace(/[^0-9\.]+/g,"");
      var num=parseInt(weightt);
      if (num>heavy) {
        heavy=num;
        heavy1=p;
      }
    }
  })
  if (!bool) {
    var dict={}
  } else {
    heavy1=heavy1.replace(/'/g,'');
    var dict={
      "name": heavy1,
      "weight": heavy
    };
  }
  res.json(dict);
});

app.post("/api/weakness/:pokemon_name/add/:weakness_name", function(req, res) {
    // HINT:
    // Use `pokeDataUtil.saveData(_DATA);`
    var name = String(req.params.pokemon_name);
    var adding=String(req.params.weakness_name);
    var result = _.findWhere(_DATA, { name: name });
    if (!result) return res.json({});
    var weak=result.weaknesses;
    if (weak.includes(adding)){
      var dict={
        "name": name,
        "weaknesses": weak
      };
      return res.json(dict);
    }
    weak.push(adding);
    var dict={
      "name": name,
      "weaknesses": weak
    };
    for (var i = 0; i < _DATA.length; ++i) {
        if (_DATA[i]['name'] === name) {
            _DATA[i]['weaknesses'] = weak;
        }
    }
    pokeDataUtil.saveData(_DATA);
     return res.send(dict);
});

app.delete("/api/weakness/:pokemon_name/remove/:weakness_name", function(req, res) {
  var name = String(req.params.pokemon_name);
  var removing=String(req.params.weakness_name);
  var result = _.findWhere(_DATA, { name: name });
  if (!result) return res.json({});
  var empty=[];

  var weak=result.weaknesses;
  if (!weak.includes(removing)){
    var dict={
      "name": name,
      "weaknesses": weak
    };
    return res.json(dict);
  }
  for (var key1 of weak) {
    if (key1!=removing) {
      empty.push(key1);
    }
  }
  var dict={
    "name": name,
    "weaknesses": empty
  };
  for (var i = 0; i < _DATA.length; ++i) {
      if (_DATA[i]['name'] === name) {
          _DATA[i]['weaknesses'] = empty;
      }
  }

  pokeDataUtil.saveData(_DATA);
  return res.send(dict);
});


// Start listening on port PORT
app.listen(PORT, function() {
    console.log('Server listening on port:', PORT);
});

// DO NOT REMOVE (for testing purposes)
exports.PORT = PORT
