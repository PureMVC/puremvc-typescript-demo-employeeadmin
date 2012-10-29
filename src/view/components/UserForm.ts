///<reference path='../../../lib/puremvc/puremvc-typescript-standard-1.0.d.ts'/>

///<reference path='UiComponent.ts'/>

/**
 * The UI component in charge of the <em>user form</em>.
 */
module EmployeeAdmin
{
	"use strict";

	import puremvc = module("puremvc");

	export class UserForm
		extends UiComponent
	{
		/**
		 * The user form panel HTML element.
		 */
		private userFormPanel:HTMLElement = null;

		/**
		 * The unique name field HTML element.
		 */
		private uname:HTMLElement = null;

		/**
		 * The first name field HTML element.
		 */
		private fname:HTMLElement = null;

		/**
		 * The long name field HTML element.
		 */
		private lname:HTMLElement = null;

		/**
		 * The email field HTML element.
		 */
		private email:HTMLElement = null;

		/**
		 * The password field HTML element.
		 */
		private password:HTMLElement = null;

		/**
		 * The confirm password field HTML element.
		 */
		private confirm:HTMLElement = null;

		/**
		 * The department field HTML element.
		 */
		private department:HTMLElement = null;

		/**
		 * The submit button HTML element.
		 */
		private submitButton:HTMLElement = null;

		/**
		 * The selected user.
		 */
		private user:UserVO = null;

		/**
		 * The roles list for the selected user.
		 */
		private userRoles:RoleVO[] = null;

		/**
		 * The MODE_ADD or MODE_EDIT user mode.
		 */
		private mode:string = null;

		/**
		 * Constructs a <code>UserForm</code> instance.
		 */
		constructor()
		{
			super();

			this.initializeChildren();
			this.bindListeners();

			//Needed to erase prefilled form informations.
			this.clearForm();
			this.setEnabled(false);
		}

		/**
		 * Initialize references to DOM elements.
		 */
		initializeChildren():void
		{
			/*
			 * We use JQuery to initialize reference to UI components
			 */
			this.userFormPanel = jQuery(".user-form-panel");

			this.uname = this.userFormPanel.find("#uname");
			this.fname = this.userFormPanel.find("#fname");
			this.lname = this.userFormPanel.find("#lname");
			this.email = this.userFormPanel.find("#email");
			this.password = this.userFormPanel.find("#password");
			this.confirm = this.userFormPanel.find("#confirm");
			this.department = this.userFormPanel.find(".department");

			this.submitButton = this.userFormPanel.find("#submit-button").button();
			this.cancelButton = this.userFormPanel.find("#cancel-button").button();
		}

		/**
		 * Bind events to their listeners.
		 */
		bindListeners():void
		{
			//jQuery will be able to only remove events attached under this namespace
			var namespace:string = ".UserForm";

			var focusEventProxy:jQueryProxy = jQuery.proxy( this, "field_focusHandler" );
			this.uname.on("focus" + namespace, focusEventProxy );
			this.password.on("focus" + namespace, focusEventProxy );
			this.confirm.on("focus" + namespace, focusEventProxy );
			this.department.on("focus" + namespace, focusEventProxy );
			this.submitButton.on( "click" + namespace, jQuery.proxy( this, "submitButton_clickHandler" ) );
			this.cancelButton.on( "click" + namespace, jQuery.proxy( this, "cancelButton_clickHandler" ) );
		}

		/**
		 * Unbind events from their listeners.
		 */
		unbindListeners():void
		{
			//jQuery will only remove events attached under this namespace
			var namespace:string = ".UserForm";

			this.uname.off("focus" + namespace );
			this.password.off("focus" + namespace );
			this.confirm.off("focus" + namespace );
			this.department.off("focus" + namespace );
			this.roles.off("focus" + namespace );

			this.submitButton.off( "click" + namespace );
			this.cancelButton.off( "click" + namespace );
		}

		/**
		 * Add items from <code>DeptEnum</code> to the corresponding list UI
		 * component.
		 *
		 * @param deptEnumList
		 *		List of <code>DeptEnum</code> items or an empty array to empty
		 *		the list UI component content.
		 */
		fillList( deptEnumList:DeptEnum[] ):void
		{
			var htmlList:string = "";
			for( var i:number=0; i<deptEnumList.length; i++ )
			{
				var deptEnum:DeptEnum = deptEnumList[i];

				 //An item not having a value in jQuery will be excluded from the pop-up menu.
				var valueAttr:string = 'value="' + deptEnum.ordinal + '"';

				var selectedAttr:string = "";
				if( this.user && deptEnum.equals(this.user.department) )
					selectedAttr = "selected";

				if( !this.user && deptEnum.equals(DeptEnum.NONE_SELECTED) )
					selectedAttr = "selected";

				htmlList += "<option " + valueAttr + " " + selectedAttr + " >" + deptEnum.value + "</option>";
			}

			this.department.html(htmlList);
		}

		/**
		 * Give focus to the form component.
		 */
		setFocus():void
		{
			this.fname.focus();
		}

		/**
		 * Set the user used to populate the form.
		 *
		 * @param user
		 * 		The currently selected user.
		 */
		setUser( user:UserVO ):void
		{
			this.user = user;

			if( !user )
				this.clearForm();
			else
			{
				this.uname.val(user.uname);
				this.fname.val(user.fname);
				this.lname.val(user.lname);
				this.email.val(user.email);
				this.password.val(user.password);
				this.confirm.val(user.password);

				this.fillList( DeptEnum.getComboList() );
			}
		}

		getUser():UserVO
		{
			this.updateUser();
			return this.user;
		}

		/**
		 * Update user attributes with form fields value.
		 */
		updateUser():void
		{
			this.user.uname = this.uname.val();
			this.user.fname = this.fname.val();
			this.user.lname = this.lname.val();
			this.user.email = this.email.val();
			this.user.password = this.password.val();

			var selected:number = parseInt(this.department.val())+1;
			var deptEnumList:Array = DeptEnum.getComboList();
			this.user.department = deptEnumList[selected];
		}

		/**
		 * Clear the whole form.
		 */
		clearForm():void
		{
			this.uname.val("");
			this.fname.val("");
			this.lname.val("");
			this.email.val("");
			this.password.val("");
			this.confirm.val("");
			this.fillList([]);
			this.setFieldError( "uname", false );
			this.setFieldError( "password", false );
			this.setFieldError( "confirm", false );
			this.setFieldError( "department", false );
		}

		/**
		 * Enable or disable the form.
		 *
		 * @param isEnabled
		 * 		The form must be enabled.
		 */
		setEnabled( isEnabled:bool ):void
		{
			if( isEnabled )
			{
				this.fname.removeAttr("disabled");
				this.lname.removeAttr("disabled");
				this.email.removeAttr("disabled");
				this.password.removeAttr("disabled");
				this.confirm.removeAttr("disabled");
				this.department.removeAttr("disabled");
				this.submitButton.button("enable");
				this.cancelButton.button("enable");

				if( this.mode == UserForm.MODE_EDIT )
					this.uname.attr( "disabled", "disabled" );
				else
					this.uname.removeAttr("disabled");
			}
			else
			{
				this.uname.attr( "disabled", "disabled" );
				this.fname.attr( "disabled", "disabled" );
				this.lname.attr( "disabled", "disabled" );
				this.email.attr( "disabled", "disabled" );
				this.password.attr( "disabled", "disabled" );
				this.confirm.attr( "disabled", "disabled" );
				this.department.attr( "disabled", "disabled" );
				this.submitButton.button( "disable" );
				this.cancelButton.button( "disable" );
			}
		}

		/**
		 * Set the form mode to ADD or EDIT.
		 *
		 * @param mode
		 * 		<code>UserForm.MODE_ADD</code> or <code>UserForm.MODE_EDIT</code>
		 */
		setMode( mode:string ):void
		{
			this.mode = mode;

			switch(mode)
			{
				case UserForm.MODE_ADD:
					this.submitButton.find(".ui-button-text").text("Add");
				break;

				case UserForm.MODE_EDIT:
					this.submitButton.find(".ui-button-text").text("Save");
				break;
			}
		}

		/**
		 * Submit the add or update.
		 */
		submitButton_clickHandler():void
		{
			this.updateUser();

			if( this.getErrors() )
				return;

			var user:UserVO = this.getUser();
			if( user.getIsValid() )
			{
				if( this.mode == UserForm.MODE_ADD )
					this.dispatchEvent( UserForm.ADD );
				else
					this.dispatchEvent( UserForm.UPDATE );
			}
		}

		/**
		 * Cancel the add or update
		 */
		cancelButton_clickHandler():void
		{
			this.dispatchEvent( UserForm.CANCEL );
		}

		/**
		 * Handle focus event on all the required form fields.
		 */
		field_focusHandler( evt ):void
		{
			//Remove error on the selected field.
			this.setFieldError( evt.target.id, false );
		}

		/**
		 * Display errors associated with form fields and return if at least one
		 * field is in error.
		 *
		 * @return {bool}
		 * 		The form contains errors.
		 */
		getErrors():bool
		{
			var error:bool = false;

			if( this.uname.val() == "" )
				this.setFieldError( "uname", error = true );
			else
				this.setFieldError( "uname", false );

			if( this.password.val() == "" )
				this.setFieldError( "password", error = true );
			else
				this.setFieldError( "password", false );

			if( this.password.val() != "" && this.confirm.val() != this.password.val() )
				this.setFieldError( "confirm", error = true );
			else
				this.setFieldError( "confirm", false );

			var selected:number = parseInt(this.department.val())+1;
			var deptEnumList:DeptEnum[] = DeptEnum.getComboList();
			var department:DeptEnum = deptEnumList[selected];

			if( department.equals(DeptEnum.NONE_SELECTED) )
				this.setFieldError( "department", error = true );
			else
				this.setFieldError( "department", false );

			return error;
		}

		/**
		 * Set or unset the error state on the uname field.
		 *
		 * @param {string} fieldName
		 * 		Name of the field to mark as (or not mark as) containing an error.
		 *
		 * @param {bool} error
		 * 		The field must be marked as containing an error.
		 */
		setFieldError( fieldName, error ):void
		{
			var label:HTMLElement = this.userFormPanel.find( 'label[for="' + fieldName + '"]' );
			var field:HTMLElement = this.userFormPanel.find( "#" + fieldName );

			if( error )
				field.addClass( "fieldError" );
			else
				field.removeClass( "fieldError" );
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
		 * Edit event name.
		 *
		 * @constant
		 */
		static MODE_EDIT:string	= "modeEdit";
	}
}