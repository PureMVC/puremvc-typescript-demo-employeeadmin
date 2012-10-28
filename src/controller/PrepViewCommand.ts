///<reference path='../../lib/puremvc/puremvc-typescript-standard-1.0.d.ts'/>

/**
 * Configure and initialize view for the application.
 */
module EmployeeAdmin
{
	"use strict";

	import puremvc = module("puremvc");

	export class PrepViewCommand
		extends SimpleCommand,
	{
		/**
		 * @override
		 */
		execute( note )
		{
			/*
			 * View Components initialization
			 */
			var userForm:UserForm = new UserForm();
			var userList:UserList = new UserList();
			var rolePanel:RolePanel = new RolePanel();

			/*
			 * Mediators initialization
			 */
			var userListMediator:UserListMediator = new UserListMediator( MediatorNames.USER_LIST_MEDIATOR, userList );
			var userFormMediator:UserFormMediator = new UserFormMediator( MediatorNames.USER_FORM_MEDIATOR, userForm );
			var rolePanelMediator:RolePanelMediator = new RolePanelMediator( MediatorNames.ROLE_PANEL_MEDIATOR, rolePanel );

			/*
			 * PureMVC mediators registration
			 */
			this.facade.registerMediator( userFormMediator );
			this.facade.registerMediator( userListMediator );
			this.facade.registerMediator( rolePanelMediator );
		}
	}
}