///<reference path='../../../lib/puremvc/puremvc-typescript-standard-1.0.d.ts'/>

///<reference path='UiComponent.ts'/>

/**
 * The UI component in charge of the <em>user form</em>.
 */
var UserForm = Objs("org.puremvc.js.demos.objs.employeeadmin.view.components.UserForm",
	UiComponent,
{
	
	/**
	 * The user form panel HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	userFormPanel: null,
	
	/**
	 * The unique name field HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	uname: null,
	
	/**
	 * The first name field HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	fname: null,
	
	/**
	 * The long name field HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	lname: null,
	
	/**
	 * The email field HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	email: null,
	
	/**
	 * The password field HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	password: null,
	
	/**
	 * The confirm password field HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	confirm: null,
	
	/**
	 * The department field HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	department: null,
	
	/**
	 * The submit button HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	submitButton: null,
	
	/**
	 * The selected user.
	 * 
	 * @private
	 * @type {UserVO}
	 */
	user: null,
	
	/**
	 * The roles list for the selected user.
	 * 
	 * @private
	 * @type {Array}
	 */
	userRoles: null,
	
	/**
	 * @private
	 * @type {String}
	 */
	mode: null,
	
	/**
	 * @constructs
	 * @override
	 *
	 * Initialize a <code>UserForm</code> instance.
	 */
	initialize()
	{
		UserForm.$super.initialize.call( this );
		
		this.initializeChildren();
		this.bindListeners();

		//Needed to erase prefilled form informations.
		this.clearForm();
		this.setEnabled(false);
	},

    /**
     * Initialize references to DOM elements.
     */
    initializeChildren()
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
    },
	
    /**
	 * Bind events to their listeners.
     */
	bindListeners()
	{
		//jQuery will be able to only remove events attached under this namespace
		var namespace:String = ".UserForm";

		var focusEventProxy:jQueryProxy = jQuery.proxy( this, "field_focusHandler" );
		this.uname.on("focus" + namespace, focusEventProxy );
		this.password.on("focus" + namespace, focusEventProxy );
		this.confirm.on("focus" + namespace, focusEventProxy );
		this.department.on("focus" + namespace, focusEventProxy );
		this.submitButton.on( "click" + namespace, jQuery.proxy( this, "submitButton_clickHandler" ) );
		this.cancelButton.on( "click" + namespace, jQuery.proxy( this, "cancelButton_clickHandler" ) );
	},

	/**
	 * Unbind events from their listeners.
	 */
	unbindListeners()
	{
		//jQuery will only remove events attached under this namespace
		var namespace:String = ".UserForm";

		this.uname.off("focus" + namespace );
		this.password.off("focus" + namespace );
		this.confirm.off("focus" + namespace );
		this.department.off("focus" + namespace );
		this.roles.off("focus" + namespace );

		this.submitButton.off( "click" + namespace );
		this.cancelButton.off( "click" + namespace );
	},

	/**
	 * Add items from <code>DeptEnum</code> to the corresponding list UI
	 * component.
	 * 
	 * @param {Array} deptEnumList
	 *		List of <code>DeptEnum</code> items or an empty array to empty
	 *		the list UI component content. 
	 */
	fillList( deptEnumList )
	{
		var htmlList:String = "";
		for(var i:Number=0; i<deptEnumList.length; i++)
		{		
			var deptEnum:DeptEnum = deptEnumList[i];
			
			/*
			 * An item not having a value in jQuery will be excluded from the
			 * pop-up menu.
			 */ 
			var valueAttr = 'value="' + deptEnum.ordinal + '"';
			
			var selectedAttr:String = "";
			if( this.user && deptEnum.equals(this.user.department) )
				selectedAttr = "selected";
				
			if( !this.user && deptEnum.equals(DeptEnum.NONE_SELECTED) )
				selectedAttr = "selected";
								
			htmlList += "<option " + valueAttr + " " + selectedAttr + " >" + deptEnum.value + "</option>";
		}
	
		this.department.html(htmlList);
	},
	
	/**
	 * Give focus to the form component.
	 */
	setFocus()
	{
		this.fname.focus();
	},
	
	/**
	 * Set the user used to populate the form.
	 * 
	 * @param {UserVO} user
	 * 		The currently selected user.
	 */
	setUser( user )
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
	},
	
	getUser():UserVO
	{
		this.updateUser();
		return this.user;
	},
	
	/**
	 * Update user attributes with form fields value.
	 */
	updateUser()
	{
		this.user.uname = this.uname.val();
		this.user.fname = this.fname.val();
		this.user.lname = this.lname.val();
		this.user.email = this.email.val();
		this.user.password = this.password.val();
	
		var selected:Number = parseInt(this.department.val())+1;
		var deptEnumList:Array = DeptEnum.getComboList();
		this.user.department = deptEnumList[selected];
	},
	
	/**
	 * Clear the whole form.
	 */
	clearForm()
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
	},

	/**
	 * Enable or disable the form.
	 * 
	 * @param {Boolean} isEnabled
	 * 		The form must be enabled.
	 */
	setEnabled( isEnabled )
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

	},

	/**
	 * Set the form mode to ADD or EDIT.
	 * 
	 * @param {String} mode
	 * 		<code>UserForm.MODE_ADD</code> or <code>UserForm.MODE_EDIT</code>
	 */
	setMode( mode )
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
	},
	
	/**
	 * Submit the add or update.
	 */
	submitButton_clickHandler()
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
	},
	
	/**
	 * Cancel the add or update
	 */
	cancelButton_clickHandler()
	{
		this.dispatchEvent( UserForm.CANCEL );
	},
	
	/**
	 * Handle focus event on all the required form fields.
	 */
	field_focusHandler( evt )
	{
		//Remove error on the selected field.
		this.setFieldError( evt.target.id, false );
	},
	
	/**
	 * Display errors associated with form fields and return if at least one
	 * field is in error.
	 * 
	 * @return {Boolean}
	 * 		The form contains errors.
	 */
	getErrors()
	{
		var error:Boolean = false;

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
	
		var selected:Number = parseInt(this.department.val())+1;
		var deptEnumList:Array = DeptEnum.getComboList();
		var department:DeptEnum = deptEnumList[selected];
	
		if( department.equals(DeptEnum.NONE_SELECTED) )
			this.setFieldError( "department", error = true );
		else
			this.setFieldError( "department", false );
	
		return error;
	},
		
	/**
	 * Set or unset the error state on the uname field.
	 * 
	 * @param {String} fieldName
	 * 		Name of the field to mark as (or not mark as) containing an error.
	 *
	 * @param {Boolean} error
	 * 		The field must be marked as containing an error.
	 */
	setFieldError( fieldName, error )
	{
		var label:HTMLElement = this.userFormPanel.find( 'label[for="' + fieldName + '"]' );
		var field:HTMLElement = this.userFormPanel.find( "#" + fieldName );
		
		if( error )
			field.addClass( "fieldError" );
		else
			field.removeClass( "fieldError" );
	}
});

/*
 * Event names
 */
UserForm.ADD		= "add";
UserForm.UPDATE		= "update";
UserForm.CANCEL		= "cancel";

UserForm.MODE_ADD	= "modeAdd";
UserForm.MODE_EDIT	= "modeEdit";