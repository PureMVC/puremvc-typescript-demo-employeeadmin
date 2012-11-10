## [PureMVC](http://puremvc.github.com/) [TypeScript](https://github.com/puremvc/puremvc-typescript-standard-framework/wiki) Demo: Employee Admin
This demo illustrates techniques for performing routine client-side maintenance operations in a PureMVC-based TypeScript application.

PureMVC framework and Employee Admin demo library files are loaded using Require.js. UI components are displayed using jQuery, jQuery UI and jQgrid.

The demo is compiled as an AMD module using an Ant script that palliate TypeScript compiler 
issues building a single module using multiple TypeScript files. TypeScript will probably evolve on
this point in a near future. The demo will be tested and updated on each new TypeScript compiler
release. If it's not sufficiently up to date for you, please open an issue on Github or just send a
pull request by your own, this will be more than welcome.

* [Live Demo](http://darkstar.puremvc.org/content_header.html?url=http://puremvc.org/pages/demos/TS/PureMVC_TS_Demo_EmployeeAdmin&desc=PureMVC%20TypeScript%20Demo:%20Employee%20Admin)
* [Discussion](http://forums.puremvc.org/index.php?topic=2070.0)

## Screenshot
![PureMVC TypeScript Demo: Employee Admin](http://puremvc.org/pages/images/screenshots/PureMVC-Shot-TS-EmployeeAdmin.png)

## Status
Development - [Version 1.0](https://github.com/PureMVC/puremvc-typescript-demo-jquery-employeeadmin/blob/master/VERSION)

Will probably stay tagged as development while TypeScript language specification is not finalized,
but remember that any TypeScript PureMVC project will output ready for production JavaScript.

## Platforms / Technologies
* [TypeScript](http://www.typescriptlang.org/)
* [require.js](http://jqueryui.com/)
* [jQuery](http://jquery.com/)
* [jQuery UI](http://jqueryui.com/)
* [jQgrid](http://www.trirand.com/blog/)
* [YUI Compressor](http://developer.yahoo.com/yui/compressor/)
* [Ant](http://ant.apache.org/)

## Build

To build the project you'll need to download and install :
* [TypeScript compiler](http://www.typescriptlang.org/#Download)
* [Ant](http://ant.apache.org/)
* [JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html/) (Ant need a JDK not a JRE, also don't forget to change environment var JAVA_HOME to the JDK path).

1. Rename the file [user.properties.sample](https://github.com/PureMVC/puremvc-typescript-standard-framework/blob/master/user.properties.sample) to **user.properties**
2. Edit the file and replace **MY_TYPESCRIPT_COMPILER_PATH** bt the real TypeScript compiler full
system path. e.g. on windows: <code>typescript.compiler.path = C:/Documents and Settings/{USER NAME HERE}/Application Data/npm/tsc.cmd
3. Use your favorite editor to run Ant or simply type <code>ant puremvc-typescript-standard-framework/build

## License
* PureMVC TypeScript Demo - Employee Admin (jQuery) - Copyright © 2012 Frederic Saunier
* PureMVC AS3 Demo - Flex Employee Admin - Copyright © 2007, 2008 Clifford Hall
* PureMVC - Copyright © 2012 Futurescale, Inc.
* All rights reserved.

* Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
  * Neither the name of Futurescale, Inc., PureMVC.org, nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.