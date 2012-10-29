///<reference path='../../../lib/puremvc/puremvc-typescript-standard-1.0.d.ts'/>

/**
 * @classDescription
 * An enumeration of role items.
 */
module EmployeeAdmin
{
	"use strict";

	export class RoleEnum
	{
		/**
		 * The <code>RoleEnum</code> entry identifier.
		 */
		ordinal:number = null;


		/**
		 * The <code>RoleEnum</code> entry value.
		 *
		 * @type {string}
		 */
		value: null;

		/**
		 * @constructs
		 * Initialize a <code>RoleEnum</code> instance.
		 *
		 * @param value
		 * 		Value shared by each enum item.
		 *
		 * @param ordinal
		 * 		Index of the item in the list.
		 */
		constructor( value:string, ordinal:number )
		{
			this.value = value;
			this.ordinal = ordinal;
		}

		/**
		 * Compare a <code>RoleEnum</code> object to the current one to check for their equality.
		 *
		 * @param roleEnum
		 * 		The <code>RoleEnum</code> item to compare to the current.
		 *
		 * @return
		 * 		The compared <code>RoleEnum</code> is equal to the current.
		 */
		equals( roleEnum:RoleEnum ):bool
		{
			return ( this.ordinal == roleEnum.ordinal && this.value == roleEnum.value );
		}



		////////////////////////////////////////////////////////////////////////////////////////////
		// STATIC
		////////////////////////////////////////////////////////////////////////////////////////////

		static NONE_SELECTED:RoleEnum 	= new RoleEnum( "Select a role", -1 );
		static ADMIN:RoleEnum 			= new RoleEnum( "Administrator", 0  );
		static ACCT_PAY:RoleEnum 		= new RoleEnum( "Accounts Payable", 1  );
		static ACCT_RCV:RoleEnum 		= new RoleEnum( "Accounts Receivable", 2  );
		static EMP_BENEFITS:RoleEnum 	= new RoleEnum( "Employee Benefits", 3  );
		static GEN_LEDGER:RoleEnum 		= new RoleEnum( "General Ledger", 4  );
		static PAYROLL:RoleEnum 		= new RoleEnum( "Payroll", 5  );
		static INVENTORY:RoleEnum 		= new RoleEnum( "Inventory", 6  );
		static PRODUCTION:RoleEnum 		= new RoleEnum( "Production", 7  );
		static QUALITY_CTL:RoleEnum 	= new RoleEnum( "Quality Control", 8  );
		static SALES:RoleEnum 			= new RoleEnum( "Sales", 9  );
		static ORDERS:RoleEnum 			= new RoleEnum( "Orders",10  );
		static CUSTOMERS:RoleEnum 		= new RoleEnum( "Customers",11  );
		static SHIPPING:RoleEnum 		= new RoleEnum( "Shipping",12  );
		static RETURNS:RoleEnum 		= new RoleEnum( "Returns",13  );


		/**
		 * Returns the roles list excluding the <code>RoleEnum.NONE_SELECTED</code> item used to fill
		 * the combo box.
		 *
		 * @return
		 * 		The roles list excluding the <code>RoleEnum.NONE_SELECTED</code> item.
		 */
		static getList():RoleEnum[]
		{
			return [
				RoleEnum.ADMIN,
				RoleEnum.ACCT_PAY,
				RoleEnum.ACCT_RCV,
				RoleEnum.EMP_BENEFITS,
				RoleEnum.GEN_LEDGER,
				RoleEnum.PAYROLL,
				RoleEnum.INVENTORY,
				RoleEnum.PRODUCTION,
				RoleEnum.QUALITY_CTL,
				RoleEnum.SALES,
				RoleEnum.ORDERS,
				RoleEnum.CUSTOMERS,
				RoleEnum.SHIPPING,
				RoleEnum.RETURNS
			];
		}

		/**
		 * Returns the roles list including the <code>RoleEnum.NONE_SELECTED</code> item used to
		 * fill the combo box.
		 *
		 * @return
		 * 		The department list including the <code>RoleEnum.NONE_SELECTED</code> item.
		 */
		static getComboList():RoleEnum[]
		{
			var cList:RoleEnum[] = RoleEnum.getList();
			cList.unshift( RoleEnum.NONE_SELECTED );
			return cList;
		}

		/**
		 * Returns the <code>RoleEnum</code> with this ordinal value.
		 *
		 * @param ordinal
		 * 		The ordinal value to search for in the list.
		 *
		 * @return
		 * 		The <code>RoleEnum</code> with this ordinal value or <code>null</code>
		 * 		if not found.
		 */
		static getItem( ordinal:number ):RoleEnum
		{
			var list:RoleEnum[] = RoleEnum.getList();
			for( var i:number=0; i<list.length; i++ )
				if( RoleEnum[list[i]].ordinal == ordinal )
					return RoleEnum[list[i]];

			return null;
		}
	}
}