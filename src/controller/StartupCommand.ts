///<reference path='../../lib/puremvc/puremvc-typescript-standard-1.0.d.ts'/>

/**
 * Start the application.
 */
module EmployeeAdmin
{
	"use strict";

	import puremvc = module("puremvc");

	export class StartupCommand
		extends SimpleCommand
	{
		/**
		 * @override
		 *
		 * Add the Subcommands to startup the PureMVC apparatus.
		 *
		 * Generally, it is best to prep the Model (mostly registering  proxies)followed by
		 * preparation of the View (mostly registering Mediators).
		 *
		 * @param {Notification} note
		 * 		The <code>Notification</code> object to be passed to each entry	of
		 * 		<i>subCommands</i> list.
		 */
		initializeMacroCommand( note:INotification )
		{
			this.addSubCommand( PrepModelCommand );
			this.addSubCommand( PrepViewCommand );
		}
	}
}