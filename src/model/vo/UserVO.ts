///<reference path='../../../lib/puremvc/puremvc-typescript-standard-1.0.d.ts'/>

/**
 * @classDescription
 * The value object in charge of transporting the data to describe each user of the application.
 */
var UserVO = Objs("org.puremvc.js.demos.objs.employeeadmin.model.vo.UserVO",
{
	/** 
	 * Unique name of the user.
	 * 
	 * @type {String}
	 */
	uname: "",
	
	/** 
	 * First name of the user.
	 * 
	 * @type {String}
	 */
	fname: "",
	
	/**  		
	 * Last name of the user.
	 * 
	 * @type {String}
	 */
	lname: "",
	
	/** 		
	 * E-mail name of the user.
	 * 
	 * @type {String}
	 */
	email: "",
	
	/** 		
	 * Password name of the user.
	 * 
	 * @type {String}
	 */
	password: "",
	
	/**		
	 * The <code>DeptEnum</code> item associated to the user.
	 * 
	 * @type {DeptEnum}
	 */
	department: DeptEnum.NONE_SELECTED,
	
	/**
	 * Indicate if the data shared by the value object are valid.
	 * 
	 * @return {Boolean}
	 * 		The data shared by the value object are valid.
	 */
	getIsValid()
	{
		return 	this.uname != "" 
				&&
				this.password != ""
				&&
				this.department != DeptEnum.NONE_SELECTED
		;
	},
	
	/**
	 * Return the complete name for this user.
	 * 
	 * @return {Boolean}
	 * 		The complete name for this user.
	 */
	getGivenName()
	{
		return this.lname + ", " + this.fname;
	}
});