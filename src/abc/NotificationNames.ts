/**
 * Defines <code>Notification</code> names for the application.
 */
module EmployeeAdmin
{
	"use strict";

	export class NotificationNames
	{
		static STARTUP:string = "startup";
		static NEW_USER:string = "newUser";
		static DELETE_USER:string = "deleteUser";
		static CANCEL_SELECTED:string = "cancelSelected";
		static USER_SELECTED:string = "userSelected";
		static USER_ADDED:string = "userAdded";
		static USER_UPDATED:string = "userUpdated";
		static USER_DELETED:string = "userDeleted";
		static ADD_ROLE:string = "addRole";
		static ADD_ROLE_RESULT:string = "addRoleResult";
	}
}