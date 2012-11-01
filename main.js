require.config
(
	{
		baseUrl: 'lib',

		paths:
		{
			jQuery: 'jquery/jquery-1.7.1',
			jQueryUi: 'jquery-ui/jquery-ui-1.8.16.custom.min',
			jqGrid: 'jqgrid/js/jquery.jqGrid.min',
			jqGridLocale: 'jqgrid/i18n/grid.locale-en.js',

			puremvc: 'puremvc/puremvc-typescript-standard-1.0-min',
			EmployeeAdmin: '../bin/puremvc-typescript-employeeadmin-1.0-min'
		},

		shims:
		{

			"jqGrid":
			{
				deps: ["jQuery","jqGridLocale"]
			},

			"jqGridLocale":
			{
				deps: ["jQuery"]
			},

			"jQueryUi":
			{
				deps: ["jQuery"]
			},

			"EmployeeAdmin":
			{
				deps: ["puremvc","jQuery","jqGrid","jQueryUi"]
			}

		}
	}
);

require
(
	[
		'jQuery',
		'EmployeeAdmin'

	],
	function
	(
		jQuery,
		EmployeeAdmin
	)
	{
		//Wait for dom ready before setting up the application.
		jQuery( function ()
		{
			var applicationFacade/*ApplicationFacade*/ = EmployeeAdmin.ApplicationFacade.getInstance();
			applicationFacade.startup( jQuery("body") );
		})
	}
);