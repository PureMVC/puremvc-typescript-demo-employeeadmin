///<reference path='../../lib/puremvc/puremvc-typescript-standard-1.0.d.ts'/>

///<reference path='../abc/MediatorNames.ts'/>

///<reference path='../view/UserListMediator.ts'/>
///<reference path='../view/UserFormMediator.ts'/>
///<reference path='../view/RolePanelMediator.ts'/>

///<reference path='../view/components/RolePanel.ts'/>
///<reference path='../view/components/UserForm.ts'/>
///<reference path='../view/components/UserList.ts'/>

/**
 * Configure and initialize view for the application.
 */
module EmployeeAdmin
{
	"use strict";

	export class PrepViewCommand
		extends puremvc.SimpleCommand
	{
		/**
		 * @override
		 */
		execute( note:puremvc.INotification )
		{
			/*
			 * View Components initialization
			 */
			var userForm:UserForm = new UserForm(".user-form-panel");
			var userList:UserList = new UserList(".user-list-panel");
			var rolePanel:RolePanel = new RolePanel(".role-panel");

			/*
			 * Mediators initialization
			 */
			var userListMediator:puremvc.IMediator = new UserListMediator( MediatorNames.USER_LIST_MEDIATOR, userList );
			var userFormMediator:puremvc.IMediator = new UserFormMediator( MediatorNames.USER_FORM_MEDIATOR, userForm );
			var rolePanelMediator:puremvc.IMediator = new RolePanelMediator( MediatorNames.ROLE_PANEL_MEDIATOR, rolePanel );

			/*
			 * PureMVC mediators registration
			 */
			this.facade.registerMediator( userFormMediator );
			this.facade.registerMediator( userListMediator );
			this.facade.registerMediator( rolePanelMediator );
		}
	}
}