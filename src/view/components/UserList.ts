///<reference path='../../../lib/puremvc/puremvc-typescript-standard-1.0.d.ts'/>
///<reference path='../../../lib/jquery/jquery-1.7.x.d.ts'/>

///<reference path='UiComponent.ts'/>

/**
 * The UI component in charge of the <em>User List</em>.
 */
module EmployeeAdmin
{
	"use strict";

	import puremvc = module("puremvc");

	export class UserList
		extends UiComponent
	{

		/**
		 * The user list panel HTML element.
		 */
		private userListPanel:HTMLElement = null;

		/**
		 * The user list HTML element.
		 */
		private userList:HTMLElement = null;

		/**
		 * The "new" button HTML element.
		 */
		private newButton:HTMLElement = null;

		/**
		 * The current selected user.
		 */
		private selectedUser:string = null;

		/**
		 * The user list of the application.
		 */
		private users:UserVO = null;

		/**
		 * Constructs a <code>UserList</code> instance.
		 */
		constructor()
		{
			super();

			this.initializeChildren();
			this.bindListeners();
		}

		/**
		 * Initialize references to DOM elements.
		 */
		private initializeChildren()
		{
			 //We use JQuery to initialize reference to UI components.
			//FIXME Have to be initialized in the view startup command
			this.userListPanel = jQuery(".user-list-panel");

			this.userList = this.userListPanel.find("#user-list");
			this.userList.jqGrid
			(
				{
					datatype: "local",
					width: 630,
					height: 160,
					colNames:["User Name", "First Name", "Last Name", "Email", "Department"],
					colModel:
					[
						{name:"uname", index:"uname", width:125 },
						{name:"fname", index:"fname", width:125 },
						{name:"lname", index:"lname", width:125 },
						{name:"email", index:"email", width:130 },
						{name:"department", index:"department", width:125}
					]
				}
			);

			this.newButton = this.userListPanel.find(".new-button").button();
			this.deleteButton = this.userListPanel.find(".delete-button").button();
			this.deleteButton.button("disable");
		}

		/**
		 * Bind events to their listeners.
		 */
		private bindListeners()
		{
			//jQuery will be able to only remove events attached under this namespace
			var namespace:string = ".UserList";
			this.userList.jqGrid( "setGridParam", { onSelectRow: jQuery.proxy( this, "userList_selectHandler" ) } );
			this.newButton.on( "click"+namespace, jQuery.proxy( this, "newButton_clickHandler" ) );
			this.deleteButton.on( "click"+namespace, jQuery.proxy( this, "deleteButton_clickHandler" ) );
		}

		/**
		 * Unbind events from their listeners.
		 */
		private unbindListeners()
		{
			//jQuery will only remove events attached under this namespace
			var namespace:string = ".UserList";
			this.userList.jqGrid( "setGridParam", { onSelectRow: null } );
			this.newButton.off( "click"+namespace );
			this.deleteButton.off( "click"+namespace );
		}

		/**
		 * Add users from a list to the <SELECT> component.
		 *
		 * @param {Array} userList
		 * 		The user list to set.
		 */
		setUsers( userList )
		{
			this.users = userList;

			// First clear all
			this.userList.jqGrid( "clearGridData" );

			// Fill the data-grid
			for(var i:number=0; i<userList.length; i++)
			{
				var user:UserVO = userList[i];
				var rowData:Object =
				{
					uname: user.uname,
					fname: user.fname,
					lname: user.lname,
					email: user.email,
					department: user.department.value
				}

				this.userList.jqGrid( "addRowData", i+1, rowData );
			}
		}

		/**
		 * Return current selected user in user list.
		 *
		 * Note that <code>jQgrid v3.6</code> cannot embed any external data to transport the
		 * <code>UserVo</code>. So it is best to return <code>uname</code>.
		 *
		 * @return
		 * 		The user name selected in the user list.
		 */
		getSelectedUser():string
		{
			return this.selectedUser;
		}

		/**
		 * Remove selection in the user list.
		 */
		deSelect()
		{
			this.userList.jqGrid( "resetSelection" );
			this.selectedUser = null;

			this.deleteButton.button("disable");
		}

		/**
		 * List row selection event listener.
		 *
		 * @param id
		 * 		The id of the selected row.
		 */
		private userList_selectHandler( id:string )
		{
			var rowData:Object = this.userList.jqGrid( "getRowData", id );

			var uname:string;
			for( var i:number=0; i<this.users.length; i++ )
			{
				if( this.users[i].uname == rowData.uname )
				{
					uname = rowData.uname;
					break;
				}
			}

			this.selectedUser = uname;
			this.dispatchEvent( UserList.SELECT );

			this.deleteButton.button("enable");
		}

		/**
		 * New button click event listener.
		 */
		private newButton_clickHandler()
		{
			this.deSelect();
			this.dispatchEvent( UserList.NEW );
		}

		/**
		 * New button click event listener.
		 */
		private deleteButton_clickHandler()
		{
			this.dispatchEvent( UserList.DELETE );
		}

		/*
		 * New event name.
		 *
		 * @constant
		 */
		static NEW:string 		= "new";

		/*
		 * Delete event name.
		 *
		 * @constant
		 */
		static DELETE:string 	= "delete";

		/*
		 * Select event name.
		 *
		 * @constant
		 */
		static SELECT:string 	= "select";
	}
}