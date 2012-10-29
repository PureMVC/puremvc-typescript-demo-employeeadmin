///<reference path='../../lib/puremvc/puremvc-typescript-standard-1.0.d.ts'/>

/**
 * Role panel component <code>Mediator</code>.
 */
var RolePanelMediator = Objs("org.puremvc.js.demos.objs.employeeadmin.view.components.RolePaneMediator",
	Mediator,
{
	/**
	 * A shortcut reference to the <code>RoleProxy</code>.
	 *
	 * @private
	 * @type {RoleProxy}
	 */
	roleProxy: null,

	/**
	 * @constructs
	 * @override
	 * 
	 * Initialize a <code>RolePanelMediator</code> instance.
	 * 
	 * @param {string} name
	 * 		Name for this <code>Mediator</code>.
	 *
	 * @param {RolePanel} viewComponent
	 * 		The <code>UserForm</code> view Component this <code>Mediator</code>
	 * 		manage.
	 */
	constructor( name, viewComponent )
	{
		RolePanelMediator.$super.initialize.call( this, RolePanelMediator.NAME, viewComponent );

		this.registerListeners();
		this.roleProxy = this.facade.retrieveProxy( ProxyNames.ROLE_PROXY );
	}

	/**
	 * @private
	 * 
	 * The <code>RolePanel</code> view component this <code>Mediator</code> manage.
	 * 
	 * @return {RolePanel}
	 */
	getRolePanel()
	{
		return this.viewComponent;
	}

	/**
	 * Register event listeners for the UserForm component.
	 */
	registerListeners()
	{
		var rolePanel:RolePanel = this.getRolePanel();
		rolePanel.addEventListener( RolePanel.ADD, this.onAddRole, this );
		rolePanel.addEventListener( RolePanel.REMOVE, this.onRemoveRole, this );
	}

	/**
	 * Unregister event listeners for the UserForm component.
	 */
	unregisterListeners()
	{
		var rolePanel:RolePanel = this.getRolePanel();
		rolePanel.removeEventListener( RolePanel.ADD, this.onAddRole, this );
		rolePanel.removeEventListener( RolePanel.REMOVE, this.onRemoveRole, this );
	}

	/**
	 * Called when a role is added to the selected user's role list.
	 * 
	 * @param {UiComponent.Event} event
	 * 		The dispatched event object.
	 */
	onAddRole( event )
	{
		this.roleProxy.addRoleToUser( this.getRolePanel().getUser(), this.getRolePanel().getSelectedRole() );

		this.updateUserRoleList();
		this.getRolePanel().setMode(null);
	}

	/**
	 * Called when a role is removed from the selected user's role list.
	 * 
	 * @param {UiComponent.Event} event
	 * 		The dispatched event object.
	 */
	onRemoveRole( event )
	{
		this.roleProxy.removeRoleFromUser( this.getRolePanel().getUser(), this.getRolePanel().getSelectedRole() );
	
		this.updateUserRoleList();
		this.getRolePanel().setMode(null);
	}

	/**
	 * Force the user role list to update its display.
	 */
	updateUserRoleList()
	{
		var userName:string = this.getRolePanel().user.uname;
		var userRoles:Array = this.roleProxy.getUserRoles( userName );
		this.getRolePanel().setUserRoles( userRoles );
	}

	/**
	 * @override
	 */
	listNotificationInterests()
	{
		return [
			NotificationNames.NEW_USER,
			NotificationNames.USER_ADDED,
			NotificationNames.USER_UPDATED,
			NotificationNames.USER_DELETED,
			NotificationNames.CANCEL_SELECTED,
			NotificationNames.USER_SELECTED,
			NotificationNames.ADD_ROLE_RESULT
		];
	}

	/**
	 * @override
	 */
	handleNotification( note )
	{
		var rolePanel:RolePanel = this.getRolePanel();

		switch( note.getName() )
		{
			case NotificationNames.NEW_USER:
				rolePanel.clearForm();
				rolePanel.setEnabled(false);
			break;

			case NotificationNames.USER_ADDED:
				rolePanel.user = note.getBody();
				
				var roleVO:RoleVO = new RoleVO ();
				roleVO.uname = rolePanel.user.uname;
				
				this.roleProxy.addItem( roleVO );
				rolePanel.clearForm();
				rolePanel.setEnabled(false);
			break;

			case NotificationNames.USER_UPDATED:
				rolePanel.clearForm();
				rolePanel.setEnabled(false);
			break;

			case NotificationNames.USER_DELETED:
				rolePanel.clearForm();
				rolePanel.setEnabled(false);
			break;

			case NotificationNames.CANCEL_SELECTED:
				rolePanel.clearForm();
				rolePanel.setEnabled(false);
			break;

			case NotificationNames.USER_SELECTED:
				rolePanel.clearForm();
				rolePanel.setEnabled(true);
				rolePanel.setMode(null);

				rolePanel.user = note.getBody();
				this.updateUserRoleList();
			break;

			case NotificationNames.ADD_ROLE_RESULT:
				this.updateUserRoleList();
			break;
		}
	}

	/**
	 * @override
	 *
	 * This will never be called during the demo but note that we well made the
	 * job of removing any listeners from the mediator and the component to
	 * make those instances ready for garbage collection.
	 */
	onRemove()
	{
		this.unregisterListeners();
		this.getRolePanel().unbindListeners();
	}
});