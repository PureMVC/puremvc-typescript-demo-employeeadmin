///<reference path='../../../lib/puremvc/puremvc-typescript-standard-1.0.d.ts'/>

///<reference path='enum/RoleEnum.ts'/>
///<reference path='vo/RoleVO.ts'/>
///<reference path='vo/UserVO.ts'/>

/**
 * PureMVC <code>Proxy</code> class object used to control the user roles list of the application.
 */
module EmployeeAdmin
{
	"use strict";

	export class RoleProxy
		extends puremvc.Proxy
	{
		/**
		 * Get the role list.
		 * 
		 * @return
		 * 		The role list.
		 */
		getRoles():RoleVO[]
		{
			return <RoleVO[]>/*</>*/ this.data;
		}
		
		/**
		 * Add a role to the list.
		 * 
		 * @param role
		 * 		The role to add.
		 */ 
		addItem( role:RoleVO ):void
		{
			this.getRoles().push( role );
		}
		
		/**
		 * Remove a role from the list. 
		 * 
		 * @param uname
		 * 		The user name associated to the role to remove.
		 */ 
		deleteItem( uname:string ):void
		{
			var roles:RoleVO[] = this.getRoles();
			for( var i:number=0; i<roles.length; i++ )
			{
				if( roles[i].uname === uname )
				{
					roles.splice(i,1);
					break;
				}
			}	
		}
		
		/**
		 * Determine if the user has a given role.
		 * 
		 * @param user
		 * 		The user for whom to search for the role.
		 * 
		 * @param role
		 * 		The role to search for.
		 * 
		 * @return
		 * 		The user has the given role.
		 */ 
		doesUserHaveRole( user:UserVO, role:RoleEnum ):bool
		{
			var roles:RoleVO[] = this.getRoles();
			var hasRole:bool = false;
			for( var i:number=0; i<roles.length; i++ )
			{ 
				if( roles[i].uname === user.uname )
				{
					var userRoles:RoleEnum[] = roles[i].roles;
					for( var j:number=0; j<userRoles.length; j++ )
					{
						var roleEnum:RoleEnum = userRoles[j];
						if( roleEnum.equals( role ) )
						{
							hasRole = true;
							break;
						} 
					}
					break;
				}
			}
			return hasRole;
		}
		
		/**
		 * Add a role to a user.
		 * 
		 * @param user
		 * 		The user to whom to add a role.
		 * 
		 * @param role
		 * 		The role to add.
		 */ 
		addRoleToUser( user:UserVO, role:RoleEnum ):void
		{
			var roles:RoleVO[] = this.getRoles();
			var result:bool = false;
			if ( !this.doesUserHaveRole( user, role ) )
			{
				for( var i:number=0; i<roles.length; i++ )
				{
					if( roles[i].uname == user.uname )
					{
						var userRoles:RoleEnum[] = roles[i].roles;
						userRoles.push( role );
						result = true;
						break;
					}
				}
			}
		}
		
		/**
		 * Remove a role from a user.
		 * 
		 * @param user
		 * 		The user to whom remove the role.
		 * 
		 * @param role
		 * 		The role to remove.
		 */
		removeRoleFromUser( user:UserVO, role:RoleEnum ):void
		{
			var roles:RoleVO[] = this.getRoles();
			if( this.doesUserHaveRole( user, role ) )
			{
				for( var i:number=0; i<roles.length; i++ )
				{ 
					if( roles[i].uname === user.uname )
					{
						var userRoles:RoleEnum[] = roles[i].roles;
						for( var j:number=0; j<userRoles.length; j++ )
						{
							var roleEnum:RoleEnum = userRoles[j];
							if( roleEnum.equals( role ) )
							{
								userRoles.splice(j,1);
								break;
							}
						}
						break;
					}
				}
			}
		}
		
		/**
		 * Get a user's roles.
		 * 
		 * @param uname
		 * 		The user unique name.
		 * 
		 * @return
		 * 		The user's role list.
		 */ 
		getUserRoles( uname:string ):RoleEnum[]
		{
			var roles:RoleVO[] = this.getRoles();
			var userRoles:RoleEnum[] = new RoleEnum[]();
			for( var i:number=0; i<roles.length; i++ )
			{ 
				if( roles[i].uname === uname )
				{
					userRoles = roles[i].roles;
					break;
				}
			}
		
			return userRoles;
		}
	}
}