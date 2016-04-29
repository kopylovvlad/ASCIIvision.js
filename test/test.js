var assert = require('chai').assert;
var vision = require('../ASCIIvision');

describe('test case for vivsion', function() {

  describe("run with incorrect data",function(){
    
    it('should return error #1', function () {
      var shape = 
       ["+------+-----",
        "|      |     ",
        "+---+  |     ",
        "|   |  |     ",
        "+---+  |     ",
        "|      |     ",
        "+------+     "];
      var answer = vision.breakPieces( shape );
      
      assert.isObject( answer, 'should return object');
      assert.equal( answer.type, "error",  "should return error");
      assert.equal( answer.msg, "Error: #3 shape is incorrect",  "should return error with message");
    });

    it('should return error #2', function () {
      var shape = 
        [ "              ",
          "|            |",
          "|            |",
          "+------------+"];
      var answer = vision.breakPieces( shape );

      assert.isObject( answer, 'should return object' );
      assert.equal( answer.type, "error",  "should return error" );
      assert.equal( answer.msg, "Error: #3 shape is incorrect",  "should return error with message" );
    });

    it('should return error if run with empty array', function(){
      var shape = [];
      var answer = vision.breakPieces( shape );

      assert.isObject( answer, 'should return object' );
      assert.equal( answer.type, "error",  "should return error" );
      assert.equal( answer.msg, "Error: #4 shape is incorrect",  "should return error with message" );
    });

    var shape = [ [] ];
    it('should return error if run with empty array', function(){
      var shape = [];
      var answer = vision.breakPieces( shape );

      assert.isObject( answer, 'should return object' );
      assert.equal( answer.type, "error",  "should return error" );
      assert.equal( answer.msg, "Error: #4 shape is incorrect",  "should return error with message" );
    });
    
    it('should return error if run with array contain empty array', function(){
      var shape = [ [],[] ];
      var answer = vision.breakPieces( shape );

      assert.isObject( answer, 'should return object' );
      assert.equal( answer.type, "error",  "should return error" );
      assert.equal( answer.msg, "Error: #4 shape is incorrect",  "should return error with message" );
    });

    it('should return error if run array contain number', function(){
      var shape = [ 12 ];
      var answer = vision.breakPieces( shape );

      assert.isObject( answer, 'should return object' );
      assert.equal( answer.type, "error",  "should return error" );
      assert.equal( answer.msg, "Error: #4 shape is incorrect",  "should return error with message" );
    });

    it('should return error if run with number', function(){
      var shape = 13;
      var answer = vision.breakPieces( shape );

      assert.isObject( answer, 'should return object' );
      assert.equal( answer.type, "error",  "should return error" );
      assert.equal( answer.msg, "Error: #4 shape is incorrect",  "should return error with message" );
    });

    it('should return error if run with array contain a string with words', function(){
      var shape = [ "it's a string" ];
      var answer = vision.breakPieces( shape );

      assert.isObject( answer, 'should return object' );
      assert.equal( answer.type, "error",  "should return error" );
      assert.equal( answer.msg, "Error: #4 shape is incorrect",  "should return error with message" );
    });

    it('should return error if run with string', function(){
      var shape = "it's a string";
      var answer = vision.breakPieces( shape );

      assert.isObject( answer, 'should return object' );
      assert.equal( answer.type, "error",  "should return error" );
      assert.equal( answer.msg, "Error: #4 shape is incorrect",  "should return error with message" );
    });

    it('should return error if run with array contain empty object', function(){
      var shape = [ {} ];
      var answer = vision.breakPieces( shape );

      assert.isObject( answer, 'should return object' );
      assert.equal( answer.type, "error",  "should return error" );
      assert.equal( answer.msg, "Error: #4 shape is incorrect",  "should return error with message" );
    });

    it('should return error if run with object', function(){
      var shape = {};
      var answer = vision.breakPieces( shape );

      assert.isObject( answer, 'should return object' );
      assert.equal( answer.type, "error",  "should return error" );
      assert.equal( answer.msg, "Error: #4 shape is incorrect",  "should return error with message" );
    });

    it('should return error if run with bad symbols', function(){
      var shape = 
         ["*-----*",
          "|\   /|",
          "| \ / |",
          "|  x  |",
          "| / \ |",
          "|/   \|",
          "*-----*"];
      var answer = vision.breakPieces( shape );

      assert.isObject( answer, 'should return object' );
      assert.equal( answer.type, "error",  "should return error" );
      assert.equal( answer.msg, "Error: #4 shape is incorrect",  "should return error with message" );
    });

  });

  describe("vision breakPieces", function(){
    it("should correctly identify shapes #1", function(){
      var shape = 
       ["               ",
        "               ",
        "    +--+   +-+ ",
        "    |  |   | | ",
        "+---+  +---+ | ",
        "|            | ",
        "+------+-----+ ",
        "|      |     | ",
        "|      |     | ",
        "+------+-----+ "];
      var correct_answer =
        [[ "    +--+   +-+",
           "    |  |   | |",
           "+---+  +---+ |",
           "|            |",
           "+------------+"].join("\n"),
         [ "+------+",
           "|      |",
           "|      |",
           "+------+"].join("\n"),
         [ "+-----+",
           "|     |",
           "|     |",
           "+-----+"].join("\n")
        ];
      var answer = [];

      vision.breakPieces( shape ).forEach(function(item){
        answer.push( item.join("\n") );
      });

      assert.deepEqual( answer, correct_answer );
    });

    it("should correctly identify shapes #2", function(){
      var shape = 
       ["+------------+",
        "|            |",
        "|            |",
        "|            |",
        "+------+-----+",
        "|      |     |",
        "|      |     |",
        "+------+-----+"];
      var correct_answer =
        [["+------------+",
          "|            |",
          "|            |",
          "|            |",
          "+------------+"].join("\n"),
         ["+------+",
          "|      |",
          "|      |",
          "+------+"].join("\n"),
         ["+-----+",
          "|     |",
          "|     |",
          "+-----+"].join("\n"),
        ];
      var answer = [];

      vision.breakPieces( shape ).forEach(function(item){
        answer.push( item.join("\n") );
      });

      assert.deepEqual( answer, correct_answer );
    });
    it("should correctly identify shapes #3", function(){
      var shape = 
       ["+-------------------+--+",
        "|                   |  |",
        "|                +--+--+",
        "|                |     |",
        "|  +--+   +-+----+     |",
        "|  |  |   | |          |",
        "|  |  +---+ |          |",
        "+--+--------+----------+"];
      var correct_answer =
        [["+-------------------+",
          "|                   |",
          "|                +--+",
          "|                |   ",
          "|  +--+   +------+   ",
          "|  |  |   |          ",
          "|  |  +---+          ",
          "+--+                 "].join("\n"),
         ["+--+",
          "|  |",
          "+--+"].join("\n"),
         ["     +-----+",
          "     |     |",
          "+----+     |",
          "|          |",
          "|          |",
          "+----------+"].join("\n"),
         ["+--+   +-+",
          "|  |   | |",
          "|  +---+ |",
          "+--------+"].join("\n"),
        ];
      var answer = [];

      vision.breakPieces( shape ).forEach(function(item){
        answer.push( item.join("\n") );
      });

      assert.deepEqual( answer, correct_answer );
    });
    it("should correctly identify shapes #4", function(){
      var shape = 
       ["+-------------------+--+",
        "|  +---+            |  |",
        "|  |   |   +---+    |  |",
        "|  |   |   |   |    |  |",
        "|  |   |   |   |    |  |",
        "|  |   |   |   |    |  |",
        "|  |   +---+   +----+  |",
        "+--+-------------------+"];
      var correct_answer =
        [
         ['+-------------------+',
          '|  +---+            |',
          '|  |   |   +---+    |',
          '|  |   |   |   |    |',
          '|  |   |   |   |    |',
          '|  |   |   |   |    |',
          '|  |   +---+   +----+',
          '+--+                 '].join("\n"),
         ['                 +--+',
          '+---+            |  |',
          '|   |   +---+    |  |',
          '|   |   |   |    |  |',
          '|   |   |   |    |  |',
          '|   |   |   |    |  |',
          '|   +---+   +----+  |',
          '+-------------------+'].join("\n"),
        ];
      var answer = [];

      vision.breakPieces( shape ).forEach(function(item){
        answer.push( item.join("\n") );
      });

      assert.deepEqual( answer, correct_answer );
    });
    it("should correctly identify shapes #5", function(){
      var shape = 
       ["+----+     +--------+--+",
        "|    |     |        |  |",
        "|    +---+-+        |  |",
        "|        |          |  |",
        "|  +-----+-----+    |  |",
        "|  |           |    +--+",
        "|  +----+------+    |  |",
        "|  |    |           |  |",
        "|  |    +-----------+  |",
        "+--+-------------------+"];
      var correct_answer =
        [
         ['+----+    ',
          '|    |    ',
          '|    +---+',
          '|        |',
          '|  +-----+',
          '|  |      ',
          '|  |      ',
          '|  |      ',
          '|  |      ',
          '+--+      '].join("\n"),
         ['   +--------+',
          '   |        |',
          ' +-+        |',
          ' |          |',
          ' +-----+    |',
          '       |    |',
          '+------+    |',
          '|           |',
          '+-----------+'].join("\n"),
         ['+--+',
          '|  |',
          '|  |',
          '|  |',
          '|  |',
          '+--+'].join("\n"),
         ['+-----------+',
          '|           |',
          '+-----------+'].join("\n"),
         ['                 +--+',
          '+----+           |  |',
          '|    |           |  |',
          '|    +-----------+  |',
          '+-------------------+'].join("\n"),
        ];
      var answer = [];

      vision.breakPieces( shape ).forEach(function(item){
        answer.push( item.join("\n") );
      });

      assert.deepEqual( answer, correct_answer );
    });
    it("should correctly identify shapes #6", function(){
      var shape = 
       ["       +-----+",
        "       |     |",
        "     +-+     |",
        "     |       |",
        "     +-+     |",
        "       |     |",
        "+--+---+-----+",
        "|  |         |",
        "|  |     +---+",
        "|  |     |    ",
        "+--+-----+    "];
      var correct_answer =
        [
         ['  +-----+',
          '  |     |',
          '+-+     |',
          '|       |',
          '+-+     |',
          '  |     |',
          '  +-----+'].join("\n"),
         ['+--+',
          '|  |',
          '|  |',
          '|  |',
          '+--+'].join("\n"),
         ['+---------+',
          '|         |',
          '|     +---+',
          '|     |    ',
          '+-----+    '].join("\n"),
         
        ];
      var answer = [];

      vision.breakPieces( shape ).forEach(function(item){
        answer.push( item.join("\n") );
      });

      assert.deepEqual( answer, correct_answer );
    });

    it("should correctly identify shapes #7", function(){
      var shape = 
       ["+------+-----+",
        "|      |     |",
        "+---+  |     |",
        "|   |  |     |",
        "+---+  |     |",
        "|      |     |",
        "+------+     |",
        "|            |",
        "|            |",
        "+------------+"];
      var correct_answer =
        [
         ['+------+',
          '|      |',
          '+---+  |',
          '    |  |',
          '+---+  |',
          '|      |',
          '+------+'].join("\n"),
         ['       +-----+',
          '       |     |',
          '       |     |',
          '       |     |',
          '       |     |',
          '       |     |',
          '+------+     |',
          '|            |',
          '|            |',
          '+------------+'].join("\n"),
         ['+---+',
          '|   |',
          '+---+'].join("\n"),
        ];
      var answer = [];

      vision.breakPieces( shape ).forEach(function(item){
        answer.push( item.join("\n") );
      });

      assert.deepEqual( answer, correct_answer );
    });
    
  });

});

