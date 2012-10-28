/**
 * @class
 * PureMVC <code>Facade</code> for this application.
 * 
 * @requires org.puremvc.js.patterns.facade.Facade Facade
 * @requires org.puremvc.js.patterns.observer.Notification Notification
 * @requires org.puremvc.js.demos.objs.employeeadmin.controller.StartupCommand StartupCommand
 * @requires org.puremvc.js.demos.objs.employeeadmin.controller.DeleteUserCommand DeleteUserCommand
 * @requires org.puremvc.js.demos.objs.employeeadmin.controller.AddRoleResultCommand AddRoleResultCommand
 * 
 * @extends org.puremvc.js.patterns.facade.Facade Facade
 */
var ApplicationFacade = Objs("org.puremvc.js.demos.objs.employeeadmin.ApplicationFacade",
	Facade,
{
	/**
	 * Start the application
	 * 
	 * @param {HTMLElement} app
	 * 		The HTML root node element of the application.
	 */
	startup: function( app )
	{
		this.sendNotification( NotificationNames.STARTUP, app );
	},

	/**
	 * The <code>Model</code> <code>View</code> and
	 * <code>Controller</code> are initialized in a deliberate
	 * order to ensure internal dependencies are satisfied before
	 * operations are performed.
	 * 
	 * <P>
	 * <code>initializeController()</code> should be overridden
	 * for the specific purpose of registering your commands. Any attempt to
	 * register <code>Mediator</code>s here will result in an error.
	 * being thrown because the View has not yet been initialized.</p>
	 * <p>calling <code>this.parent()</code> is also required.
	 * 
	 * @override
	 */
	initializeController: function()
	{
		ApplicationFacade.$super.initializeController.call( this );
		
		this.registerCommand( NotificationNames.STARTUP, StartupCommand );
		this.registerCommand( NotificationNames.DELETE_USER, DeleteUserCommand );
	}
});

/**
 * Singleton implementation for the <code>ApplicationFacade</code>.
 *
 * @return {ApplicationFacade}
 * 		The <code>Facade</code> subclass instance used throughout the
 * 		application.
 */
ApplicationFacade.getInstance = function()
{
	if( !Facade.instance ) 
		Facade.instance = new ApplicationFacade();
	
	return Facade.instance;
};