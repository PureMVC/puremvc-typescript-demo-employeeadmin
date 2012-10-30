///<reference path='../lib/puremvc/puremvc-typescript-standard-1.0.d.ts'/>

/**
 * PureMVC <code>Facade</code> for this application.
 */
module EmployeeAdmin
{
	"use strict";

	export class ApplicationFacade
		extends puremvc.Facade
	{
		/**
		 * Start the application.
		 *
		 * @param app
		 * 		The HTML root node element of the application.
		 */
		startup( app:JQuery )
		{
			this.sendNotification( NotificationNames.STARTUP, app );
		}

		/**
		 * @override
		 *
		 * The <code>Model</code> <code>View</code> and <code>Controller</code> are initialized in a
		 * deliberate order to ensure internal dependencies are satisfied before operations are
		 * performed.
		 *
		 * <code>initializeController()</code> should be overridden for the specific purpose of
		 * registering your commands. Any attempt to register <code>Mediator</code>s here will
		 * result in an error being thrown because the View has not yet been initialized calling
		 * <code>this.parent()</code> is also required.
		 */
		initializeController():void
		{
			super.initializeController();

			this.registerCommand( NotificationNames.STARTUP, StartupCommand );
			this.registerCommand( NotificationNames.DELETE_USER, DeleteUserCommand );
		}

		/**
		 * Singleton implementation for the <code>ApplicationFacade</code>.
		 *
		 * @return
		 * 		The <code>Facade</code> subclass instance used throughout the application.
		 */
		static getInstance():ApplicationFacade
		{
			if( !puremvc.Facade.instance )
				puremvc.Facade.instance = new ApplicationFacade();

			return <ApplicationFacade> /*</>*/puremvc.Facade.instance;
		}
	}
}