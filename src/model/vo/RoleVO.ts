///<reference path='../../../lib/puremvc/puremvc-typescript-standard-1.0.d.ts'/>

/**
 * @classDescription
 * The value object in charge of transporting the data to describe each user roles.
 */
var RoleVO = Objs("org.puremvc.js.demos.objs.employeeadmin.model.vo.RoleVO",
{
	/**
	 * Unique name of the user to whom is associated the role.
	 * 
	 * @type {string}
	 */
	uname: "";
	
	/**
	 * The list of roles associated to the user.
	 * 
	 * @type {Array}
	 */	
	roles: []
});