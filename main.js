require.config
(
	{
		baseUrl: '.',

		paths:
		{
			puremvc: 'lib/puremvc/puremvc-typescript-standard-1.0-min',
			EmployeeAdmin: 'bin/puremvc-typescript-employeeadmin-1.0'
		},

		shims:
		{
			"EmployeeAdmin":
			{
				deps: ["puremvc"]
			}

		}
	}
);

require
(

	[
		'puremvc',
		'EmployeeAdmin'
	],

	function
	(
		puremvc,
		EmployeeAdmin
	)
	{
		//Wait for dom to be ready before setting up the application.
		jQuery( function ()
		{
			var applicationFacade/*ApplicationFacade*/ = EmployeeAdmin.ApplicationFacade.getInstance();
			applicationFacade.startup( jQuery("body") );
		})
	}

);