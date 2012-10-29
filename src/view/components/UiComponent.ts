///<reference path='../../../lib/puremvc/puremvc-typescript-standard-1.0.d.ts'/>

/**
 * A base class used for UI components of the application.
 *
 * It mainly adds a basic UiComponent implementation to make UI components listenable from the
 * <code>Mediator</code>s. Here to simplify the demo we don't use a real <code>Event</code> class.
 * Implementers and listeners are responsible for the anonymous events object they dispatch and
 * receive.
 */
module EmployeeAdmin
{
	"use strict";

	export class UiComponent = Objs("org.puremvc.js.demos.objs.employeeadmin.view.components.UiComponent",
{
	/**
	 * Constructs a <code>UiComponent</code> instance.
	 */
	constructor()
	{
		this.listenerMap = {}
	}
	
	/**
	 * A map of <code>UiComponent.listenerDescriptor</code> objects.
	 * 
	 * @type {Object}
	 * @private
	 */
	listenerMap: null;
	
	/**
	* Dispatches an event into the event flow.
	* 
	* @param {string} type
	* 		The type of the event to dispatch.
	* 
	* @param {Object} properties
	* 		An optional anonymous object to send to listeners of the event when it
	* 		is dispatched.
	*/
	dispatchEvent( type, properties )
	{
		if( typeof type == 'undefined' )
			return;
			
		if( typeof this.listenerMap[UiComponent.QUEUE_PATTERN + type] == 'undefined' )
			return;
	
		var queue:Array = this.listenerMap[UiComponent.QUEUE_PATTERN + type].slice(0);
		
		var props:Object = properties || {}
		var len:number = queue.length;
		for(var i:number=0; i<len; i++)
		{
			var listenerDescriptor/*UiComponent.ListenerDescriptor*/ = queue[i];
	
			if( typeof listenerDescriptor.listener == 'function' )
			{
				if( typeof listenerDescriptor.context != "undefined" )
					listenerDescriptor.listener.call( listenerDescriptor.context, props );
				else
					listenerDescriptor.listener.call( this, event, props );
			}
		}
	}
	
	/**
	* Add an event listener so that the listener receives notification of an event.
	 *  
	 * @param {string} type
	 * 		Type of the event to add.
	 * 
	 * @param {Function} listener
	 * 		The listener method of the event to add.
	 * 
	 * @param {Object} context
	 * 		The context attached for the listener method of the event to remove.
	 */
	addEventListener
	(
		type,
		listener,
		context
	)
	{
		if( typeof type == "undefined" )
			return;
	
		if( typeof listener == "undefined" )
			return;
			
		var newListener/*UiComponent.ListenerDescriptor*/ = new UiComponent.ListenerDescriptor( listener, context );
	
		var queue:Object;
		if( typeof this.listenerMap[ UiComponent.QUEUE_PATTERN + type ] == "undefined" )
			queue = this.listenerMap[ UiComponent.QUEUE_PATTERN + type ] = [];
		else
			queue = this.listenerMap[ UiComponent.QUEUE_PATTERN + type ];
	
		var len:number = queue.length;
		for(var i:number=0; i<len; i++ )
		{
			var listenerDescriptor/*UiComponent.ListenerDescriptor*/ = queue[i];
			if( listenerDescriptor.equals( newListener ) )
				return;
		}
	
		queue.push(newListener);
	}
	
	/**
	 * Remove an event listener so that the listener stops receiving notification
	 * of an event.
	 *  
	 * @param {string} type
	 * 		Type of the event to remove.
	 * 
	 * @param {Function} listener
	 * 		The listener method of the event to remove.
	 * 
	 * @param {Object} context
	 * 		The context attached for the listener method of the event to remove.
	 */
	removeEventListener
	(
		type,
		listener,
		context
	)
	{
		if( typeof type == "undefined" )
			return;
	
		if( typeof listener == "undefined" )
			return;
	
		if( typeof this.listenerMap[UiComponent.QUEUE_PATTERN + type] == "undefined" )
			return;
			
		var queue:Object = this.listenerMap[ UiComponent.QUEUE_PATTERN + type ];
		var len:number = queue.length;
		for(var i:number=0; i<len; i++)
        {
            var listenerDescriptor/*UiComponent.ListenerDescriptor*/ = queue[i];
            if( listenerDescriptor.equals( new UiComponent.ListenerDescriptor( listener, context ) ) )
			{
				queue.splice(i,1);
				return;
			}
        }
	}
});

/**
 * @private
 * The event object dispatched by the <code>UiComponent</code> class to its
 * event listeners.
 */
UiComponent.Event = Objs("org.puremvc.js.demos.objs.employeeadmin.view.components.UiComponent.Event",
{
	/**
	 * Type of the dispatched event.
	 * 
	 * @type {string}
	 */
	type: null;
	
	/**
	 * Properties that follow the dispatched event.
	 * 
	 * @type {Object}	
	 */
	properties: null

});

/**
 * @private
 * 
 * A descriptor object used by the <code>UiComponent.listenerMap</code>
 * to identify each event listener.
 * 
 * <P>
 * It is intentionally not declared on prototype as it built a kind of inner
 * class for JavaScript.
 */
UiComponent.ListenerDescriptor = Objs("org.puremvc.js.demos.objs.employeeadmin.view.components.UiComponent.Event",
{
	/**
	 * @construct
	 * Constructs a <code>UiComponent.ListenerDescriptor</code> instance.
	 * 
	 * @param {Function} listener
	 * 		The listener method to call.
	 * 
	 * @param {Function} listener
	 * 		The listener context on which to call the method.
	 */	
	constructor( listener, context )
	{
		this.listener = listener;
		this.context = context;
	}

    /**
     * @private
     *
     * Compare two <code>UiComponent.ListenerDescriptor</code>s to determine if
     * they target the exact same event listener.
     *
     * @param {UiComponent.ListenerDescriptor} compared
     * 		The descriptor that will be compared to the current.
     *
     * @return {bool}
     * 		The two compared listeners are equals.
     */
    equals( compared )
    {
        if( compared.listener == this.listener )
        {
            if( typeof compared.context != "undefined" )
            {
                if( compared.context == null && this.context == null )
                    return true;

                if( compared.context == this.context )
                    return true;
            }
        }

        return false;
    }
});

/* 
 * Private statics
 */
	
/**
 * @private
 * 
 * A prefix used on map item names to prevent name conflicts.
 * 
 * @type {string}
 * @constant
 */
UiComponent.QUEUE_PATTERN = '@_@';