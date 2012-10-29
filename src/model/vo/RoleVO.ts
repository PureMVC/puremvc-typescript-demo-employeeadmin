///<reference path='../../../lib/puremvc/puremvc-typescript-standard-1.0.d.ts'/>

/**
 * The value object in charge of transporting the data to describe each user roles.
 */
module EmployeeAdmin
{
	"use strict";

	export class RoleVO
	{
		/**
		 * Unique name of the user to whom is associated the role.
		 */
		uname:string = "";

		/**
		 * The list of roles associated to the user.
		 */
		roles:RolesVO[] = new RolesVO[]();
	}
}