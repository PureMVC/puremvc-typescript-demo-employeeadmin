///<reference path='../../../lib/puremvc/puremvc-typescript-standard-1.0.d.ts'/>

/**
 * PureMVC <code>Proxy</code> class object used to control the user list of the application.
 */
module EmployeeAdmin
{
	"use strict";

	export class UserProxy
		extends puremvc.Proxy
	{
		/**
		 * Return the users list controlled by the <code>Proxy</code>.
		 */
		getUsers():UserVO[]
		{
			return <UserVO[]>/*</>*/ this.data;
		}
		
		/**
		 * Add a user to the list.
		 * 
		 * @param user
		 */ 
		addItem( user:UserVO ):void
		{
			this.getUsers().push( user );
		}
		
		/**
		 * Return a user given its user name.
		 * 
		 * @param uname
		 * 		The user name of the user to find.
		 * 
		 * @return
		 * 		The user with the given user name or <code>null</code> if none exists with this user
		 * 		name.
		 */
		getUser( uname:string ):UserVO
		{
			var users:UserVO[] = this.getUsers();
			for( var i:number=0; i<users.length; i++ )
				if( users[i].uname === uname )
					return users[i];
					
			return null; 
		}
		
		/**
		 * Update a user informations.
		 * 
		 * @param user
		 * 		The user to update.
		 */
		updateItem( user:UserVO ):void
		{
			var users:UserVO[] = this.getUsers();
			for( var i:number=0; i<users.length; i++ )
				if( users[i].uname === user.uname )
					users[i] = user;
		}
		
		/**
		 * Remove a user from the list.
		 * 
		 * @param user
		 * 		The user to remove.
		 */ 
		deleteItem( user:UserVO ):void
		{
			var users:UserVO[] = this.getUsers();
			for( var i:number=0; i<users.length; i++ )
				if( users[i].uname === user.uname )
					users.splice(i,1);
		}
	}
}