///<reference path='../../lib/puremvc/puremvc-typescript-standard-1.0.d.ts'/>

///<reference path='../abc/NotificationNames.ts'/>
///<reference path='../abc/ProxyNames.ts'/>
///<reference path='../model/vo/RoleVO.ts'/>
///<reference path='../model/enum/RoleEnum.ts'/>
///<reference path='../model/UserProxy.ts'/>
///<reference path='components/UserForm.ts'/>

/**
 * User form component <code>Mediator</code>.
 */
module EmployeeAdmin
{
	"use strict";

	export class UserFormMediator
		extends puremvc.Mediator
	{
		/**
		 * A shortcut to the application <code>UserProxy</code> instance.
		 */
		private userProxy:UserProxy = null;

		/**
		 * Constructs a <code>UserFormMediator</code> instance.
		 *
		 * @param name
		 * 		Name for this <code>Mediator</code>.
		 *
		 * @param viewComponent
		 * 		The <code>UserForm</code> view Component this <code>Mediator</code>	manage.
		 */
		constructor( name:string, viewComponent:UserForm )
		{
			super( name, viewComponent );

			this.registerListeners();
			this.userProxy = <UserProxy> /*</>*/ this.facade.retrieveProxy( ProxyNames.USER_PROXY );
		}

		/**
		 * Return the <code>UserForm</code> view component this <code>Mediator</code> manage.
		 *
		 * @return
		 * 		The <code>UserForm</code> view component this <code>Mediator</code> manage.
		 */
		private getUserForm():UserForm
		{
			return <UserForm>/*</>*/ this.viewComponent;
		}

		/**
		 * Register event listeners for the UserForm component.
		 */
		private registerListeners():void
		{
			var userForm:UserForm = this.getUserForm();
			userForm.addEventListener( UserForm.ADD, this.onAdd, this );
			userForm.addEventListener( UserForm.UPDATE, this.onUpdate, this );
			userForm.addEventListener( UserForm.CANCEL, this.onCancel, this );
		}

		/**
		 * Unregister event listeners for the UserForm component.
		 */
		private unregisterListeners():void
		{
			var userForm:UserForm = this.getUserForm();
			userForm.addEventListener( UserForm.ADD, this.onAdd, this );
			userForm.addEventListener( UserForm.UPDATE, this.onUpdate, this );
			userForm.addEventListener( UserForm.CANCEL, this.onCancel, this );
		}

		/**
		 * Called when a user is added using the form.
		 *
		 * @param type
		 * 		Type of the event dispatched.
		 *
		 * @param properties
		 * 		An anonymous object associated to the event dispatched.
		 */
		private onAdd( type:string, properties:any ):void
		{
			var user:UserVO = this.getUserForm().getUser();
			this.userProxy.addItem( user );
			this.sendNotification( NotificationNames.USER_ADDED, user );

			var userForm:UserForm = this.getUserForm();
			userForm.clearForm();
			userForm.setEnabled(false);
			userForm.setMode(UserForm.MODE_ADD);
		}

		/**
		 * Called when a user is updated using the form.
		 *
		 * @param type
		 * 		Type of the event dispatched.
		 *
		 * @param properties
		 * 		An anonymous object associated to the event dispatched.
		 */
		private onUpdate( type:string, properties:any ):void
		{
			var user:UserVO = this.getUserForm().getUser();
			this.userProxy.updateItem( user );
			this.sendNotification(  NotificationNames.USER_UPDATED, user );

			var userForm:UserForm = this.getUserForm();
			userForm.clearForm();
			userForm.setEnabled(false);
			userForm.setMode(UserForm.MODE_ADD);
		}

		/**
		 * Called when modifications made to a user in the form are canceled.
		 *
		 * @param type
		 * 		Type of the event dispatched.
		 *
		 * @param properties
		 * 		An anonymous object associated to the event dispatched.
		*/
		private onCancel( type:string, properties:any ):void
		{
			this.sendNotification(  NotificationNames.CANCEL_SELECTED );
			var userForm:UserForm = this.getUserForm();
			userForm.clearForm();
			userForm.setEnabled(false);
			userForm.setMode(UserForm.MODE_ADD);
		}

		/**
		 * @override
		 */
		listNotificationInterests():string[]
		{
			return [
				NotificationNames.NEW_USER,
				NotificationNames.USER_DELETED,
				NotificationNames.USER_SELECTED
			];
		}

		/**
		 * @override
		 */
		handleNotification( note:puremvc.INotification ):void
		{
			var userForm:UserForm = this.getUserForm();

			var user:UserVO;
			switch ( note.getName() )
			{
				case NotificationNames.NEW_USER:
					userForm.setUser( note.getBody() );
					userForm.setMode( UserForm.MODE_ADD );
					userForm.setEnabled(true);
					userForm.setFocus();
				break;

				case NotificationNames.USER_DELETED:
					userForm.clearForm();
					userForm.setEnabled(false);
				break;

				case NotificationNames.USER_SELECTED:
					user =  <UserVO> /*</>*/ note.getBody();

					userForm.clearForm();
					userForm.setUser( user );

					userForm.setMode( UserForm.MODE_EDIT );
					userForm.setEnabled(true);
					userForm.setFocus();
				break;
			}
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
			this.getUserForm().destroy();
		}

		/*
		 * Add event name.
		 *
		 * @constant
		 */
		static ADD:string		= "add";

		/*
		 * Update event name.
		 *
		 * @constant
		 */
		static UPDATE:string	= "update";

		/*
		 * Cancel event name.
		 *
		 * @constant
		 */
		static CANCEL:string	= "cancel";

		/*
		 * Add mode name.
		 *
		 * @constant
		 */
		static MODE_ADD:string	= "modeAdd";

		/*
		 * Edit mode name.
		 *
		 * @constant
		 */
		static MODE_EDIT:string	= "modeEdit";
	}
}