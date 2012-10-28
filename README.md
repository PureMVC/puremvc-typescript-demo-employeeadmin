## PureMVC Port to Javascript / Objs / jQuery EmployeeAdmin Demo




## Releases

### Version 1.1

This demo is inspired originally from PureMVC Employee Admin for AS3 standard
port and PureMVC Employee Admin demo for Mootools I made.

Unit Tests follow the PureMVC for AS3 standard port with some specific
additions for the JavaScript language.

## Build

To build the project you'll need "Ant":http://ant.apache.org/ to run the
/build/build.xml file located in the build YUICompressor. The task concat all
the JavaScript files in one, next compress and minify it. The YUICompressor
munge option is activated.

The Ant task need both
"YUICompressor":http://yuilibrary.com/downloads/#yuicompressor and 
"YUIant":http://www.ubik-ingenierie.com/miscellanous/YUIAnt/. Respective jar
file for both library need to be copied in the /build/lib/ folder for the task
to run correctly.