///<reference path='../../lib/puremvc/puremvc-typescript-standard-1.0.d.ts'/>

///<reference path='PrepModelCommand.ts'/>
///<reference path='PrepViewCommand.ts'/>

/**
 * Start the application.
 */
module EmployeeAdmin
{
	"use strict";

	export class StartupCommand
		extends puremvc.MacroCommand
	{
		/**
		 * @override
		 *
		 * Add the Subcommands to startup the PureMVC apparatus.
		 *
		 * Generally, it is best to prep the Model (mostly registering  proxies)followed by
		 * preparation of the View (mostly registering Mediators).
		 */
		initializeMacroCommand()
		{
			this.addSubCommand( PrepModelCommand );
			this.addSubCommand( PrepViewCommand );
		}
	}
}