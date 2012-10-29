///<reference path='../../../lib/puremvc/puremvc-typescript-standard-1.0.d.ts'/>

/**
 * PureMVC <code>Proxy</code> class object used to control the user list of the application.
 */
module EmployeeAdmin
{
	"use strict";

	import puremvc = module("puremvc");

	export class UserProxy = Objs("org.puremvc.js.demos.objs.employeeadmin.model.UserProxy",
	Proxy,
	{
		/**
		 * @constructs
		 * @override
		 *
		 * Initialize a <code>UserProxy</code> instance.
		 * 
		 * @param {string} name
		 * 		Identifier of the <code>Proxy</code> object in the PureMVC framework.
		 * 
		 * @param {Array} users	
		 * 		The list of users controlled by the <code>Proxy</code>.
		 */
		constructor( name, users )
		{
			UserProxy.$super.initialize.call( this, name, users );
		}
		
		/**
		 * Return the users list controlled by the <code>Proxy</code>.
		 */
		getUsers()
		{
			return this.data;
		}
		
		/**
		 * Add a user to the list.
		 * 
		 * @param {UserVO} user
		 */ 
		addItem( user )
		{
			this.getUsers().push( user );
		}
		
		/**
		 * Return a user given its user name.
		 * 
		 * @param {string} uname
		 * 		The user name of the user to find.
		 * 
		 * @return {UserVO}
		 * 		The user with the given user name or null if none exists with
		 * 		this user name.
		 */
		getUser( uname )
		{
			var users:Array = this.getUsers();
			for( var i:number=0; i<users.length; i++ )
				if( users[i].uname == uname )
					return users[i];
					
			return null; 
		}
		
		/**
		 * Update a user informations.
		 * 
		 * @param {UserVO} user
		 * 		The user to update.
		 */ 
		updateItem( user )
		{
			var users:Array = this.getUsers();
			for( var i:number=0; i<users.length; i++ )
				if( users[i].uname == user.uname )
					users[i] = user;
		}
		
		/**
		 * Remove a user from the list.
		 * 
		 * @param {UserVO} user
		 * 		The user to remove.
		 */ 
		deleteItem( user )
		{
			var users:Array = this.getUsers();
			for( var i:number=0; i<users.length; i++ )
				if( users[i].uname == user.uname )
					users.splice(i,1);
		}
	}
);