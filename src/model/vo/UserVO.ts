///<reference path='../../../lib/puremvc/puremvc-typescript-standard-1.0.d.ts'/>

/**
 * The value object in charge of transporting the data to describe each user of the application.
 */
module EmployeeAdmin
{
	"use strict";

	export class UserVO
	{
		/**
		 * Unique name of the user.
		 */
		uname:string = "";

		/**
		 * First name of the user.
		 */
		fname:string = "";

		/**
		 * Last name of the user.
		 */
		lname:string = "";

		/**
		 * E-mail name of the user.
		 */
		email:string = "";

		/**
		 * Password name of the user.
		 */
		password:string = "";

		/**
		 * The <code>DeptEnum</code> item associated to the user.
		 */
		department:DeptEnum = DeptEnum.NONE_SELECTED;

		/**
		 * Indicate if the data shared by the value object are valid.
		 *
		 * @return
		 * 		The data shared by the value object are valid.
		 */
		getIsValid():bool
		{
			return 	this.uname != ""
					&&
					this.password != ""
					&&
					this.department != DeptEnum.NONE_SELECTED
			;
		}

		/**
		 * Return the complete name for this user.
		 *
		 * @return
		 * 		The complete name for this user.
		 */
		getGivenName():string
		{
			return this.lname + ", " + this.fname;
		}
	}
}