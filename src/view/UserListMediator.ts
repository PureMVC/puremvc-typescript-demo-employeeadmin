///<reference path='../../lib/puremvc/puremvc-typescript-standard-1.0.d.ts'/>

/**
 * User list component <code>Mediator</code>.
 */
module EmployeeAdmin
{
	"use strict";

	import puremvc = module("puremvc");

	export class UserListMediator
		extends Mediator
	{
		/**
		 * The <code>UserList</code> UI component this <code>Mediator</code> manage.
		 */
		private userList:UserList = null;

		/**
		 * Constructs a <code>UserListMediator</code> instance.
		 *
		 * @param name
		 * 		Name for this <code>Mediator</code>.
		 *
		 * @param viewComponent
		 * 		The <code>UserList</code> UI Component this <code>Mediator</code> manage.
		 */
		constructor( name:string, viewComponent:UserList )
		{
			super( name, viewComponent );

			this.registerListeners();

			var userProxy:UserProxy = this.facade.retrieveProxy( ProxyNames.USER_PROXY );
			viewComponent.setUsers(userProxy.getUsers());
		}

		/**
		 * Register event listeners for the UserForm component.
		 */
		private registerListeners():void
		{
			var userList:UserList = this.getUserList();
			userList.addEventListener( UserList.NEW, this.onNew, this );
			userList.addEventListener( UserList.DELETE, this.onDelete, this );
			userList.addEventListener( UserList.SELECT, this.onSelect, this );
		}

		/**
		 * Unregister event listeners for the UserForm component.
		 */
		private unregisterListeners():void
		{
			var userList:UserList = this.getUserList();
			userList.removeEventListener( UserList.NEW, this.onNew, this );
			userList.removeEventListener( UserList.DELETE, this.onDelete, this );
			userList.removeEventListener( UserList.SELECT, this.onSelect, this );
		}

		/**
		 * Return the <code>UserList</code> UI component this <code>Mediator</code> manage.
		 *
		 * @return
		 * 		The <code>UserList</code> UI component this	<code>Mediator</code> manage.
		 */
		private getUserList():UserList
		{
			return this.viewComponent;
		}

		/**
		 * @override
		 */
		listNotificationInterests():string[]
		{
			return [
				NotificationNames.CANCEL_SELECTED,
				NotificationNames.USER_UPDATED,
				NotificationNames.USER_ADDED,
				NotificationNames.USER_DELETED
			];
		}

		/**
		 * @override
		 */
		handleNotification( note:INotification ):void
		{
			var userList:UserList = this.getUserList();
			var userProxy:UserProxy = this.facade.retrieveProxy( ProxyNames.USER_PROXY );

			switch( note.getName() )
			{
				case NotificationNames.CANCEL_SELECTED:
					userList.deSelect();
				break;

				case NotificationNames.USER_UPDATED:
					userList.setUsers( userProxy.getUsers() );
					userList.deSelect();
				break;

				case NotificationNames.USER_ADDED:
					userList.setUsers( userProxy.getUsers() );
					userList.deSelect();
				break;

				case NotificationNames.USER_DELETED:
					userList.setUsers( userProxy.getUsers() );
					userList.deSelect();
				break;
			}
		}

		/**
		 * Called when to add a new user to the list.
		 */
		private onNew():void
		{
			var user:UserVO = new UserVO();
			this.sendNotification( NotificationNames.NEW_USER, user );
		}

		/**
		 * Called when to delete an user from the list.
		 */
		private onDelete():void
		{
			var userList:UserList = this.getUserList();
			var uname:string = userList.getSelectedUser();
			var userProxy:UserProxy = this.facade.retrieveProxy( ProxyNames.USER_PROXY );
			var selectedUser:UserVO = userProxy.getUser( uname );

			this.sendNotification( NotificationNames.DELETE_USER, selectedUser );
		}

		/**
		 * Called when a user is selected in the user list.
		 */
		private onSelect():void
		{
			var userList:UserList = this.getUserList();
			var uname:string = userList.getSelectedUser();
			var userProxy:UserProxy = this.facade.retrieveProxy( ProxyNames.USER_PROXY );
			var selectedUser:UserVO = userProxy.getUser( uname );

			this.sendNotification( NotificationNames.USER_SELECTED, selectedUser );
		}

		/**
		 * @override
		 *
		 * This will never be called during the demo but note that we well made the job of removing
		 * any listeners from the mediator and the component to make those instances ready for
		 * garbage collection.
		 */
		onRemove():void
		{
			this.unregisterListeners();
			this.getUserList().unbindListeners();
		}
	}
}