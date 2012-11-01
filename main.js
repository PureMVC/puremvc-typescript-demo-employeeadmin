require.config
(
	{
		baseUrl: 'lib/',

		paths:
		{
			jQueryUi: 'jquery-ui/jquery-ui-1.8.16.custom.min',
			jqGrid: 'jqgrid/js/jquery.jqGrid.min',
			jqGridLocale: 'jqgrid/i18n/grid.locale-en',

			puremvc: 'puremvc/puremvc-typescript-standard-1.0',
			EmployeeAdmin: '../bin/puremvc-typescript-employeeadmin-1.0'
		},

		shims:
		{

			"jqGrid":
			{
				deps: ["jquery","jqGridLocale"]
			},

			"jqGridLocale":
			{
				deps: ["jquery"]
			},

			"jQueryUi":
			{
				deps: ["jquery"]
			},

			"EmployeeAdmin":
			{
				deps: ["puremvc","jquery","jqGrid","jQueryUi"]
			}

		}
	}
);

require
(

	[
		'puremvc',
		'jqGridLocale',
		'jqGrid',
		'jQueryUi',
		'EmployeeAdmin'
	],

	function
	(
		puremvc,
		jqGridLocale,
		jqGrid,
		jQueryUi,
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