var vision = require('./ASCIIvision');

var shape = 
[ "+--+      +----+--+",
  "|  |      |    |  |",
  "|  +-+----+----+  |",
  "|    |    |    |  |",
  "|  +-+----+    |  |",
  "|  |           |  |",
  "+--+-----------+--+"];

console.log( "before:" );
vision.show_figure( shape );
tmp = vision.breakPieces( shape );
console.log( "after:" );
vision.show_figure( tmp );