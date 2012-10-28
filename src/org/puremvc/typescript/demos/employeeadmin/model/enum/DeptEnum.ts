/**
 * @class
 * An enumeration of department items.
 */
var DeptEnum = Objs("org.puremvc.js.demos.objs.employeeadmin.model.enum.DeptEnum",
{
	/**
	 * @constructs
	 * Initialize a <code>DeptEnum</code> instance.
	 * 
	 * @param {String} value
	 * 		Value shared by each enum item.
	 * 
	 * @param {Number} ordinal
	 * 		Index of the item in the list.	
	 */
	initialize: function( value, ordinal )
	{
		this.value = value;
		this.ordinal = ordinal;
	},
	
	/**
	 * The <code>DeptEnum</code> entry identifier.
	 * 
	 * @type {Number}
	 */
	ordinal: null,
	
	/**
	 * The <code>DeptEnum</code> entry value.
	 * 
	 * @type {String}
	 */
	value: null,
	
	/**
	 * Compare a <code>DeptEnum</code> object to the current one to check for their
	 * equality.
	 * 
	 * @param {DeptEnum} deptEnum
	 * 		The <code>DeptEnum</code> item to compare to the current.
	 * 
	 * @return {Boolean}
	 * 		The compared <code>DeptEnum</code> is equal to the current.
	 */
	equals: function( deptEnum )
	{
		return ( this.ordinal == deptEnum.ordinal && this.value == deptEnum.value );
	}
});

DeptEnum.NONE_SELECTED/*DeptEnum*/ 	= new DeptEnum( "Select a department", -1 );
DeptEnum.ACCT/*DeptEnum*/ 			= new DeptEnum( "Accounting", 0  );
DeptEnum.SALES/*DeptEnum*/ 			= new DeptEnum( "Sales"	, 1  );
DeptEnum.PLANT/*DeptEnum*/ 			= new DeptEnum( "Plant", 2  );
DeptEnum.SHIPPING/*DeptEnum*/ 		= new DeptEnum( "Shipping", 3  );
DeptEnum.QC/*DeptEnum*/ 			= new DeptEnum( "Quality Control", 4  );

/**
 * Returns the department list excluding the
 * <code>DeptEnum.NONE_SELECTED</code> item used to fill the combo box.
 * 
 * @return {Array}
 * 		The department list excluding the <code>DeptEnum.NONE_SELECTED</code>
 * 		item.
 */
DeptEnum.getList = function()
{
	return [
		DeptEnum.ACCT, 
		DeptEnum.SALES, 
		DeptEnum.PLANT
	];
};

/**
 * Returns the department list including the
 * <code>DeptEnum.NONE_SELECTED</code> item used to fill the combo box.
 * 
 * @return {Array}
 * 		The department list including the <code>DeptEnum.NONE_SELECTED</code>
 * 		item.
 */
DeptEnum.getComboList = function()
{
	var cList/*Array*/ = DeptEnum.getList();
	cList.unshift( DeptEnum.NONE_SELECTED );
	return cList;
};