///<reference path='../../lib/puremvc/puremvc-typescript-standard-1.0.d.ts'/>
///<reference path='../../lib/jquery/jquery-1.7.x-jqueryui-1.8.x.d.ts'/>

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
			var mainView:JQuery = note.getBody();

			/*
			 * View Components are initialized using the application main view selector
			 */
			var userForm:UserForm = new UserForm( mainView.find(".user-form-panel") );
			var userList:UserList = new UserList( mainView.find(".user-list-panel") );
			var rolePanel:RolePanel = new RolePanel( mainView.find(".role-panel") );

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