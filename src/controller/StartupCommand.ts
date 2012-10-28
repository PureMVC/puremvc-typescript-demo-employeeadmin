///<reference path='../../lib/puremvc/puremvc-typescript-standard-1.0.d.ts'/>

/**
 * Start the application.
 */
var StartupCommand = Objs("org.puremvc.js.demos.objs.employeeadmin.controller.StartupCommand",
	MacroCommand,
{
	/**
	 * @override
	 * 
	 * Add the Subcommands to startup the PureMVC apparatus.
	 * 
	 * Generally, it is best to prep the Model (mostly registering 
	 * proxies)followed by preparation of the View (mostly registering 
	 * Mediators).
	 * 
	 * @param {Notification} note
	 * 		The <code>Notification</code> object to be passed to each entry
	 * 		of <i>subCommands</i> list.
	 */
	initializeMacroCommand( note )
	{
		this.addSubCommand( PrepModelCommand );
		this.addSubCommand( PrepViewCommand );
	}
});