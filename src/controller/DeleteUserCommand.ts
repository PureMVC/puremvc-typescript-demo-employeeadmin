///<reference path='../../lib/puremvc/puremvc-typescript-standard-1.0.d.ts'/>

///<reference path='../abc/NotificationNames.ts'/>
///<reference path='../abc/ProxyNames.ts'/>

///<reference path='../model/vo/UserVO.ts'/>
///<reference path='../model/vo/RoleVO.ts'/>
///<reference path='../model/UserProxy.ts'/>
///<reference path='../model/RoleProxy.ts'/>

/**
 * Command used to delete a user from the main users list.
 */
module EmployeeAdmin
{
	"use strict";

	export class DeleteUserCommand
		extends puremvc.SimpleCommand
	{
		/**
		 * @override
		 */
		execute( note:puremvc.INotification ):void
		{
			var user:UserVO = note.getBody();
			var userProxy:UserProxy = <UserProxy> /*</>*/ this.facade.retrieveProxy( ProxyNames.USER_PROXY );
			var roleProxy:RoleProxy = <RoleProxy> /*</>*/ this.facade.retrieveProxy( ProxyNames.ROLE_PROXY );

			userProxy.deleteItem( user.uname );
			roleProxy.deleteItem( user.uname );

			this.sendNotification( NotificationNames.USER_DELETED );
		}
	}
}