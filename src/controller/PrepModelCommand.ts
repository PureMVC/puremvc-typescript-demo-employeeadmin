///<reference path='../../lib/puremvc/puremvc-typescript-standard-1.0.d.ts'/>

/**
 * Configure and initialize model for the application.
 */
var PrepModelCommand = Objs("org.puremvc.js.demos.objs.employeeadmin.controller.PrepModelCommand",
	SimpleCommand,
{	
	/**
	 * @override
	 */
	execute( note )
	{
		this.facade.registerProxy( new UserProxy( ProxyNames.USER_PROXY, this.generateUsers() ) );
		this.facade.registerProxy( new RoleProxy( ProxyNames.ROLE_PROXY , this.generateRoles() ) );
	},
	
	/**
	 * Generates and returns a dummy users list.
	 * 
	 * @return {Array}
	 * 		The generated dummy users list.	
	 */
	generateUsers()
	{
		var user/*UserVO*/;
		var users/*Array*/ = new Array();
		
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
		
		return users
	},
	
	/**
	 * Generates and returns a dummy roles list.
	 * 
	 * @return {Array}
	 * 		The generated dummy roles list.	
	 */
	generateRoles()
	{
		var role/*RoleVO*/;
		var roles/*Array*/ = new Array();
		
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
		
		return roles
	}
});