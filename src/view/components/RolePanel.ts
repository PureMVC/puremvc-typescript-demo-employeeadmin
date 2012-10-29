///<reference path='../../../lib/puremvc/puremvc-typescript-standard-1.0.d.ts'/>

///<reference path='UiComponent.ts'/>

/**
 * The UI component in charge of the <em>role panel</em>.
 */
var RolePanel = Objs("org.puremvc.js.demos.objs.employeeadmin.view.components.RolePanel",
	UiComponent,
{
	/** 
	 * Currently selected user.
	 * 
	 * @private
	 * @type {UserVO}
	 */
	user: null,
	
	/**
	 * The user roles list.
	 * 
	 * @private
	 * @type {Array}
	 */
	userRoles: null,

	/**
	 * Currently selected role.
	 * 
	 * @private
	 * @type {UserRole}
	 */
	selectedRole: null,

	/**
	 * The add or remove role mode.
	 */
	mode: null,
			
	/**
	 * The role panel HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	rolePanel: null,
			
	/**
	 * The full role list HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	roleList: null,
	
	/**
	 * The user role datagrid HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	userRoleList: null,
	
	/**
	 * The add role button HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	addRoleButton: null,
	
	/**
	 * The remove role button HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	removeRoleButton: null,

	/**
	 * @constructs
	 * @override
	 * 
	 * Initialize a <code>UserList</code> instance.
	 */
	initialize()
	{
		RolePanel.$super.initialize.call( this );
		
		this.initializeChildren();
		this.bindListeners();
		
		this.fillRoleList();
		this.setEnabled(false);
	}

    /**
     * Initialize references to DOM elements.
     */
    initializeChildren()
    {
		this.rolePanel = jQuery(".role-panel");
		
		this.userRoleList = this.rolePanel.find("#user-role-list");
		this.userRoleList.jqGrid
		(
			{
				datatype: "local",
				width: 280,
				height: 170,
				colNames:['Roles'],
			   	colModel:
				[
			   		{name:'value', index:'value' }					
			   	]
			}
		);

		this.roleList = this.rolePanel.find(".role-list");
		this.addRoleButton = this.rolePanel.find(".add-role-button").button();
		this.removeRoleButton = this.rolePanel.find(".remove-role-button").button();
    }

	/**
	 * Configure event listeners registration.
	 */
	bindListeners()
	{
		//jQuery will be able to only remove events attached under this namespace
		var namespace:string = ".UserRoleList";
		this.addRoleButton.on( "click"+namespace, jQuery.proxy( this, "addRoleButton_clickHandler") );
		this.removeRoleButton.on( "click"+namespace, jQuery.proxy( this, "removeRoleButton_clickHandler") );
		this.roleList.on( "change"+namespace, jQuery.proxy( this, "roleList_changeHandler") );
		this.userRoleList.jqGrid( "setGridParam", { onSelectRow: jQuery.proxy( this, "userRoleList_changeHandler") } );
	}

	/**
	 * Configure event listeners registration.
	 */
	unbindListeners()
	{
		//jQuery will be able to only remove events attached under this namespace
		var namespace:string = ".UserRoleList";
		this.addRoleButton.off( "click"+namespace );
		this.removeRoleButton.off( "click"+namespace );
		this.roleList.off( "change"+namespace );
		this.userRoleList.jqGrid( "setGridParam", { onSelectRow: null } );
	}

	/**
	 * Add items from <code>RoleEnum</code> to the <code>roleList</code>
	 * component.
	 */
	fillRoleList()
	{
		var roleEnumList:Array = RoleEnum.getComboList();

		/*First clear all*/
		this.roleList.empty();

		var htmlList:string = "";
		for(var i:number=0; i<roleEnumList.length; i++)
		{		
			var role:RoleVO = roleEnumList[i];
			
			/*
			 * An item not having a value in jQuery will be excluded from the
			 * pop-up menu.
			 */ 
			var valueAttr:string = 'value="' + role.ordinal + '"';
			var selectedAttr:string = i == 0 ? "selected" : "";
			htmlList += '<option ' + valueAttr + ' ' + selectedAttr + ' >' + role.value + '</option>';
		}
	
		this.roleList.html(htmlList);
	}

	/**
	 * Set the displayed user roles list.
	 * 
	 * @param {Array} userRoles
	 * 		The role list associated to the currently selected user.
	 */
	setUserRoles( userRoles )
	{
		// First clear all
		this.userRoleList.jqGrid( 'clearGridData' );

		if( !userRoles )
			return;
			
		this.userRoles = userRoles;

		// Fill the data-grid
		for(var i:number=0; i<userRoles.length; i++)
		{
			var role:RoleVO = userRoles[i];
			var rowData:Object = role;

			this.userRoleList.jqGrid( 'addRowData', i+1, rowData );
		}	
	}
	
	/**
	 * Get the selected user for whom roles list is displayed.
	 * 
	 * @return {User}
	 * 		The selected user for whom roles list is displayed.
	 */
	getUser()
	{
		return this.user;
	}
	
	/**
	 * Get the selected role in the remove/add combobox if any.
	 * 
	 * @return {UserRole}
	 * 		The selected role in the remove/add combobox if any.
	 */
	getSelectedRole()
	{
		return this.selectedRole;
	}

	/**
	 * Enable or disable the form.
	 * 
	 * @param {Boolean} isEnabled
	 * 		When true enable the form and when false disable it. 
	 */
	setEnabled( isEnabled )
	{
		if( isEnabled )
		{
			this.userRoleList.removeAttr("disabled");
			this.roleList.removeAttr("disabled");
			this.addRoleButton.button( "enable" );
			this.removeRoleButton.button( "enable" );
		}
		else
		{
			this.userRoleList.attr("disabled", "disabled");
			this.roleList.attr("disabled", "disabled");
			this.addRoleButton.button( "disable" );
			this.removeRoleButton.button( "disable" );
		}

		if( !isEnabled )
			this.roleList.prop("selectedIndex",0);
	}

	/**
	 * Enable or disable the form.
	 *
	 * @param {string} mode
	 *		The Add/Remove role mode of the form.
	 */
	setMode( mode )
	{
		switch( mode )
		{
			case RolePanel.ADD_MODE:
				this.addRoleButton.button("enable");
				this.removeRoleButton.button("disable");
			break;
			
			case RolePanel.REMOVE_MODE:
				this.addRoleButton.button("disable");
				this.removeRoleButton.button("enable");
				this.roleList.selectedIndex = 0;
			break;

			default:
				this.addRoleButton.button("disable");
				this.removeRoleButton.button("disable");
		}
	}

	/**
	 * Clear the panel from all its displayed data.
	 */
	clearForm()
	{
		this.user = null;
		this.setUserRoles(null);
		this.roleList.prop("selectedIndex",0);
		this.userRoleList.jqGrid('resetSelection');
	}

	/**
	 * Add button onclick event listener.
	 */
	addRoleButton_clickHandler()
	{
		this.dispatchEvent( RolePanel.ADD );
	}

	/**
	 * Remove button onclick event listener.
	 */
	removeRoleButton_clickHandler()
	{
		this.dispatchEvent( RolePanel.REMOVE );
	}

	/**
	 * Select role to remove.
	 * 
	 * @param {string} id
	 * 		The id of the selected row.
	 */
	userRoleList_changeHandler( id )
	{
		var index:number = this.userRoleList.jqGrid( 'getInd', id );
		this.selectedRole = this.userRoles[index-1];
		this.setMode( RolePanel.REMOVE_MODE );
	}

	/**
	 * Select role to add.
	 */
	roleList_changeHandler()
	{
		this.userRoleList.jqGrid( 'resetSelection' );

		var roleEnumList:Array = RoleEnum.getComboList();
		this.selectedRole = roleEnumList[this.roleList.prop("selectedIndex")];
		
		var alreadyInList:Boolean = false;
		for(var i:number=0; i<this.userRoles.length; i++)
		{
			var role:RoleVO = this.userRoles[i];
			if( role.equals(this.selectedRole) )
			{
				alreadyInList = true;
				break;
			}
		}	
		
		if( this.selectedRole == RoleEnum.NONE_SELECTED || alreadyInList )
			this.setMode( null );
		else
			this.setMode( RolePanel.ADD_MODE );
	}
});

/*
 * Event names
 */
RolePanel.ADD:string 			= "add";
RolePanel.REMOVE:string 			= "remove";

/*
 * View states
 */
RolePanel.ADD_MODE:string 		= "addMode";
RolePanel.REMOVE_MODE:string 	= "removeMode";