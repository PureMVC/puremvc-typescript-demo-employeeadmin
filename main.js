/**
 * Standard main.js file used by Require.js to load each module in a parallel process but
 * respecting dependencies declaration precedence order before initializing each.
 *
 * Here, as loading jQuery and its dependencies would have required each of the library to be
 * modified and loaded using Require-jQuery https://github.com/jrburke/require-jquery it has been
 * decided to only load the Employee Admin module and the PureMVC library as a proof of concept
 * for PureMVC TypeScript applications to be loaded asynchronously as AMD modules by Require.js.
 *
 * Employee Admin module has been compiled with the standard AMD wrapper :
 *
 * if( typeof define === "function" )
 * {
 * 		define( "EmployeeAdmin", ['puremvc'], function(puremvc)
 *		{
 *			//TypeScript generated JavaScript code here
 *		}
 * }
 *
 * Have a look at : http://www.tekool.net/blog//2012/11/07/puremvc-typescript/ for more explanations
 * on how the Ant task bundled in the project create the appropriate AMD module file using multiple
 * module files as TypeScript still has some problem with that.
 */

/***************************************************************************************************
 * Define the Require.js config for the Employee Admin demo.
 *
 * @url http://requirejs.org/
 */
require.config
(
	{
		baseUrl: '.',

		paths:
		{
			puremvc: 'lib/puremvc/puremvc-typescript-standard-1.0-min',
			EmployeeAdmin: 'bin/puremvc-typescript-employeeadmin-1.0'
		},

		shims:
		{
			"EmployeeAdmin":
			{
				deps: ["puremvc"]
			}

		}
	}
);

/***************************************************************************************************
 * Start loading each module and its dependencies.
 */
require
(

	[
		'EmployeeAdmin'
	],

	function
	(
		EmployeeAdmin
	)
	{
		//Wait for the DOM to be ready before setting up the application.
		jQuery( function ()
		{
			var applicationFacade/*ApplicationFacade*/ = EmployeeAdmin.ApplicationFacade.getInstance();
			applicationFacade.startup( jQuery("body") );
		})
	}
);