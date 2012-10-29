/**
 * An enumeration of department items.
 */
module EmployeeAdmin
{
	"use strict";

	export class DeptEnum
	{
		/**
		 * Constructs a <code>DeptEnum</code> instance.
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
		 * The <code>DeptEnum</code> entry identifier.
		 *
		 * @type
		 */
		ordinal:number = null;

		/**
		 * The <code>DeptEnum</code> entry value.
		 *
		 * @type
		 */
		value:string = null;

		/**
		 * Compare a <code>DeptEnum</code> object to the current one to check for their equality.
		 *
		 * @param deptEnum
		 * 		The <code>DeptEnum</code> item to compare to the current.
		 *
		 * @return
		 * 		The compared <code>DeptEnum</code> is equal to the current.
		 */
		equals( deptEnum:DeptEnum ):bool
		{
			return ( this.ordinal == deptEnum.ordinal && this.value == deptEnum.value );
		}



		////////////////////////////////////////////////////////////////////////////////////////////
		// STATIC
		////////////////////////////////////////////////////////////////////////////////////////////

		static NONE_SELECTED:DeptEnum 	= new DeptEnum( "Select a department", -1 );
		static ACCT:DeptEnum 			= new DeptEnum( "Accounting", 0  );
		static SALES:DeptEnum 			= new DeptEnum( "Sales"	, 1  );
		static PLANT:DeptEnum 			= new DeptEnum( "Plant", 2  );
		static SHIPPING:DeptEnum 		= new DeptEnum( "Shipping", 3  );
		static QC:DeptEnum 				= new DeptEnum( "Quality Control", 4  );

		/**
		 * Returns the department list excluding the <code>DeptEnum.NONE_SELECTED</code> item used
		 * to fill the combo box.
		 *
		 * @return
		 * 		The department list excluding the <code>DeptEnum.NONE_SELECTED</code> item.
		 */
		static getList():DeptEnum[]
		{
			return [
				DeptEnum.ACCT,
				DeptEnum.SALES,
				DeptEnum.PLANT
			];
		}

		/**
		 * Returns the department list including the <code>DeptEnum.NONE_SELECTED</code> item used
		 * to fill the combo box.
		 *
		 * @return
		 * 		The department list including the <code>DeptEnum.NONE_SELECTED</code> item.
		 */
		static getComboList():DeptEnum[]
		{
			var cList:DeptEnum[] = DeptEnum.getList();
			cList.unshift( DeptEnum.NONE_SELECTED );
			return cList;
		}
	}
}