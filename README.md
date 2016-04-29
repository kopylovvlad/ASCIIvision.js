# ASCIIvision.js
identifying rectangular two-dimensional shapes in ASCII diagram

The script takes ASCII diagram in an array and returns an array with separate shapes, like this:
<pre>
var shape = 
       ["+------------+",
        "|            |",
        "|            |",
        "|            |",
        "+------+-----+",
        "|      |     |",
        "|      |     |",
        "+------+-----+"];

vision.breakPieces( shape );
/*
it's return 
  [["+------------+",
    "|            |",
    "|            |",
    "|            |",
    "+------------+"],
   ["+------+",
    "|      |",
    "|      |",
    "+------+"],
   ["+-----+",
    "|     |",
    "|     |",
    "+-----+"],
  ];
*/
</pre>

For run script use:
<pre>
cd ASCIIvision.js
node runme.js
</pre>

