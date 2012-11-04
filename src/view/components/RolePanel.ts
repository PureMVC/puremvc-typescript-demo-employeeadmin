///<reference path='../../../lib/puremvc/puremvc-typescript-standard-1.0.d.ts'/>
///<reference path='../../../lib/jquery/jquery-1.7.x-jqueryui-1.8.x.d.ts'/>

///<reference path='UiComponent.ts'/>
///<reference path='../../model/vo/RoleVO.ts'/>
///<reference path='../../model/vo/UserVO.ts'/>
///<reference path='../..//model/enum/RoleEnum.ts'/>

/**
 * The UI component in charge of the <em>role panel</em>.
 */
module EmployeeAdmin
{
	"use strict";

	export class RolePanel
		extends UiComponent
	{
		/**
		 * Currently selected user.
		 */
		private user:UserVO = null;

		/**
		 * The user roles list.
		 */
		private userRoles:RoleEnum[] = null;

		/**
		 * Currently selected role.
		 */
		private selectedRole:RoleEnum = null;

		/**
		 * The ADD_MODE or REMOVE_MODE role mode.
		 */
		private mode:string = null;

		/**
		 * The role panel HTML element.
		 */
		private rolePanel:JQuery = null;

		/**
		 * The full role list HTML element.
		 */
		private roleList:JQuery = null;

		/**
		 * The user role datagrid HTML element.
		 */
		private userRoleList:JQuery = null;

		/**
		 * The add role button HTML element.
		 */
		private addRoleButton:JQuery = null;

		/**
		 * The remove role button HTML element.
		 */
		private removeRoleButton:JQuery = null;

		/**
		 * The selected fullname HTML element.
		 */
		private selectedFullname:JQuery = null;

		/**
		 * Constructs a <code>RolePanel</code> instance.
		 *
		 * @param view
		 * 		The jQuery element giving access to the corresponding UI HTML element in the page.
		 */
		constructor( view:JQuery )
		{
			super();

			this.rolePanel = view;

			this.initializeChildren();
			this.bindListeners();

			this.fillRoleList();
			this.setEnabled(false);
		}

		/**
		 * Initialize references to DOM elements using jQuery.
		 */
		private initializeChildren():void
		{
			this.userRoleList = this.rolePanel.find(".user-role-list");
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

			this.selectedFullname = this.rolePanel.find(".selected-fullname");
			this.roleList = this.rolePanel.find(".role-list");
			this.addRoleButton = this.rolePanel.find(".add-role-button").button();
			this.removeRoleButton = this.rolePanel.find(".remove-role-button").button();
		}

		/**
		 * Configure event listeners registration.
		 */
		private bindListeners():void
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
		private unbindListeners():void
		{
			//jQuery will be able to only remove events attached under this namespace
			var namespace:string = ".UserRoleList";
			this.addRoleButton.off( "click"+namespace );
			this.removeRoleButton.off( "click"+namespace );
			this.roleList.off( "change"+namespace );
			this.userRoleList.jqGrid( "setGridParam", { onSelectRow: null } );
		}

		/**
		 * Add items from <code>RoleEnum</code> to the <code>roleList</code> component.
		 */
		private fillRoleList():void
		{
			var roleEnumList:RoleEnum[] = RoleEnum.getComboList();

			/*First clear all*/
			this.roleList.empty();

			var htmlList:string = "";
			for(var i:number=0; i<roleEnumList.length; i++)
			{
				var role:RoleEnum = roleEnumList[i];

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
		 * @param userRoles
		 * 		The role list associated to the currently selected user.
		 */
		setUserRoles( userRoles:RoleEnum[] ):void
		{
			// First clear all
			this.userRoleList.jqGrid( 'clearGridData' );

			if( !userRoles )
				return;

			this.userRoles = userRoles;

			// Fill the data-grid
			for( var i:number=0; i<userRoles.length; i++ )
			{
				var role:RoleEnum = userRoles[i];
				this.userRoleList.jqGrid('addRowData', i+1, role );
			}
		}

		/**
		 * Get the selected user for whom roles list is displayed.
		 *
		 * @return
		 * 		The selected user for whom roles list is displayed.
		 */
		getUser():UserVO
		{
			return this.user;
		}

		/**
		 * Set the selected user for whom roles list is displayed.
		 *
		 * @param user
		 * 		The selected user for whom to display the roles.
		 */
		setUser( user:UserVO ):void
		{
			this.user = user;

			this.selectedFullname.text( user.lname + ", " + user.fname );
		}

		/**
		 * Get the selected role in the remove/add combobox if any.
		 *
		 * @return
		 * 		The selected role in the remove/add combobox if any.
		 */
		getSelectedRole():RoleEnum
		{
			return this.selectedRole;
		}

		/**
		 * Enable or disable the form.
		 *
		 * @param isEnabled
		 * 		When true enable the form and when false disable it.
		 */
		setEnabled( isEnabled:bool ):void
		{
			if( isEnabled )
			{
				this.userRoleList.removeAttr( "disabled" );
				this.roleList.removeAttr( "disabled" );
				this.addRoleButton.button( "enable" );
				this.removeRoleButton.button( "enable" );
			}
			else
			{
				this.userRoleList.attr( "disabled", "disabled" );
				this.roleList.attr( "disabled", "disabled" );
				this.roleList.prop( "selectedIndex", 0 );
				this.addRoleButton.button( "disable" );
				this.removeRoleButton.button( "disable" );
			}
		}

		/**
		 * Set the panel mode to <code>ADD_MODE</code> or <code>REMOVE_MODE</code>.
		 *
		 * @param mode
		 *		The panel <code>ADD_MODE</code> or <code>REMOVE_MODE</code> mode.
		 */
		setMode( mode:string ):void
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
					this.roleList.prop("selectedIndex", 0);
				break;

				default:
					this.addRoleButton.button("disable");
					this.removeRoleButton.button("disable");
			}
		}

		/**
		 * Clear the panel from all its displayed data.
		 */
		clearForm():void
		{
			this.user = null;
			this.setUserRoles(null);
			this.selectedFullname.text("");
			this.roleList.prop("selectedIndex",0);
			this.userRoleList.jqGrid('resetSelection');
		}

		/**
		 * Remove any references used by the component to help garbage collection.
		 */
		destroy():void
		{
			super.destroy();

			this.unbindListeners();
		}

		/**
		 * Add button onclick event listener.
		 */
		private addRoleButton_clickHandler():void
		{
			this.dispatchEvent( RolePanel.ADD );
		}

		/**
		 * Remove button onclick event listener.
		 */
		private removeRoleButton_clickHandler():void
		{
			this.dispatchEvent( RolePanel.REMOVE );
		}

		/**
		 * Select role to remove.
		 *
		 * @param id
		 * 		The id of the selected row.
		 */
		private userRoleList_changeHandler( id:string ):void
		{
			var index:number = this.userRoleList.jqGrid( 'getInd', id );
			this.selectedRole = this.userRoles[index-1];
			this.setMode( RolePanel.REMOVE_MODE );
		}

		/**
		 * Select role to add.
		 */
		private roleList_changeHandler():void
		{
			this.userRoleList.jqGrid( 'resetSelection' );

			var roleEnumList:RoleEnum[] = RoleEnum.getComboList();
			this.selectedRole = roleEnumList[this.roleList.prop("selectedIndex")];

			var alreadyInList:bool = false;
			for(var i:number=0; i<this.userRoles.length; i++)
			{
				var role:RoleEnum = this.userRoles[i];
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

		/**
		 * Add event name.
		 *
		 * @constant
		 */
		static ADD:string 			= "add";

		/**
		 * Remove event name.
		 *
		 * @constant
		 */
		static REMOVE:string 		= "remove";

		/**
		 * Add mode name.
		 *
		 * @constant
		 */
		static ADD_MODE:string 		= "addMode";

		/**
		 * Remove mode name.
		 *
		 * @constant
		 */
		static REMOVE_MODE:string 	= "removeMode";
	}
}