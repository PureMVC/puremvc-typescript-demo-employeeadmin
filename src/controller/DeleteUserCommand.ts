///<reference path='../../lib/puremvc/puremvc-typescript-standard-1.0.d.ts'/>

/**
 * Command used to delete a user from the main users list.
 */
module EmployeeAdmin
{
	"use strict";

	import puremvc = module("puremvc");

	export class DeleteUserCommand
		extends SimpleCommand
	{
		/**
		 * @override
		 */
		execute( note:INotification ):void
		{
			var user:UserVO = note.getBody();
			var userProxy:UserProxy = this.facade.retrieveProxy( ProxyNames.USER_PROXY );
			var roleProxy:RoleProxy = this.facade.retrieveProxy( ProxyNames.ROLE_PROXY );

			userProxy.deleteItem( user );
			roleProxy.deleteItem( user );

			this.sendNotification( NotificationNames.USER_DELETED );
		}
	}
}