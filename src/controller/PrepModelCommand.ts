///<reference path='../../lib/puremvc/puremvc-typescript-standard-1.0.d.ts'/>

///<reference path='../abc/ProxyNames.ts'/>
///<reference path='../model/vo/UserVO.ts'/>
///<reference path='../model/vo/RoleVO.ts'/>
///<reference path='../model/UserProxy.ts'/>
///<reference path='../model/RoleProxy.ts'/>

/**
 * Configure and initialize model for the application.
 */
module EmployeeAdmin
{
	"use strict";

	import puremvc = module("puremvc");

	export class PrepModelCommand
		extends SimpleCommand
	{
		/**
		 * @override
		 */
		execute( note:INotification ):void
		{
			/*
			 * Data initialization.
			 */
			var userProxy:IProxy = new UserProxy( ProxyNames.USER_PROXY, this.generateUsers() );
		 	var roleProxy:IProxy = new RoleProxy( ProxyNames.ROLE_PROXY , this.generateRoles() );

			/*
			 * Proxies initialization.
			 */
			this.facade.registerProxy( userProxy );
			this.facade.registerProxy( roleProxy );
		}

		/**
		 * Generates and returns a dummy users list.
		 *
		 * @return
		 * 		The generated dummy users list.
		 */
		generateUsers():UserVO[]
		{
			var user:UserVO;
			var users:UserVO[] = new UserVO[]();

			user = new UserVO();
			user.uname = "lstooge";
			user.fname = "Larry";
			user.lname = "Stooge";
			user.email = "larry@stooges.com";
			user.password = "ijk456";
			user.department = DeptEnum.ACCT;
			users.push(user);

			user = new UserVO();
			user.uname = "cstooge";
			user.fname = "Curly";
			user.lname = "Stooge";
			user.email = "curly@stooges.com";
			user.password = "xyz987";
			user.department = DeptEnum.SALES;
			users.push(user);

			user = new UserVO();
			user.uname = "mstooge";
			user.fname = "Moe";
			user.lname = "Stooge";
			user.email = "moe@stooges.com";
			user.password = "abc123";
			user.department = DeptEnum.PLANT;
			users.push(user);

			return users;
		}

		/**
		 * Generates and returns a dummy roles list.
		 *
		 * @return
		 * 		The generated dummy roles list.
		 */
		generateRoles():RoleVO[]
		{
			var role:RoleVO;
			var roles:RoleVO[] = new RoleVO[]();

			role = new RoleVO();
			role.uname = "lstooge";
			role.roles = [ RoleEnum.PAYROLL, RoleEnum.EMP_BENEFITS	];
			roles.push(role);

			role = new RoleVO();
			role.uname = "cstooge";
			role.roles = [ RoleEnum.ACCT_PAY, RoleEnum.ACCT_RCV, RoleEnum.GEN_LEDGER ];
			roles.push(role);

			role = new RoleVO();
			role.uname = "mstooge";
			role.roles = [ RoleEnum.INVENTORY, RoleEnum.PRODUCTION, RoleEnum.SALES, RoleEnum.SHIPPING ];
			roles.push(role);

			return roles;
		}
	}
}