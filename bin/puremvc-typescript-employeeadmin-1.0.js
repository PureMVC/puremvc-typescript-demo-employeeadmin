var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var EmployeeAdmin;
(function (EmployeeAdmin) {
    "use strict";
    var ApplicationFacade = (function (_super) {
        __extends(ApplicationFacade, _super);
        function ApplicationFacade() {
            _super.apply(this, arguments);

        }
        ApplicationFacade.prototype.startup = function (app) {
            this.sendNotification(EmployeeAdmin.NotificationNames.STARTUP, app);
        };
        ApplicationFacade.prototype.initializeController = function () {
            _super.prototype.initializeController.call(this);
            this.registerCommand(EmployeeAdmin.NotificationNames.STARTUP, EmployeeAdmin.StartupCommand);
            this.registerCommand(EmployeeAdmin.NotificationNames.DELETE_USER, EmployeeAdmin.DeleteUserCommand);
        };
        ApplicationFacade.getInstance = function getInstance() {
            if(!puremvc.Facade.instance) {
                puremvc.Facade.instance = new ApplicationFacade();
            }
            return puremvc.Facade.instance;
        }
        return ApplicationFacade;
    })(puremvc.Facade);
    EmployeeAdmin.ApplicationFacade = ApplicationFacade;    
})(EmployeeAdmin || (EmployeeAdmin = {}));

var EmployeeAdmin;
(function (EmployeeAdmin) {
    "use strict";
    var MediatorNames = (function () {
        function MediatorNames() { }
        MediatorNames.USER_FORM_MEDIATOR = "userFormMediator";
        MediatorNames.USER_LIST_MEDIATOR = "userListMediator";
        MediatorNames.ROLE_PANEL_MEDIATOR = "rolePanelMediator";
        return MediatorNames;
    })();
    EmployeeAdmin.MediatorNames = MediatorNames;    
})(EmployeeAdmin || (EmployeeAdmin = {}));

var EmployeeAdmin;
(function (EmployeeAdmin) {
    "use strict";
    var NotificationNames = (function () {
        function NotificationNames() { }
        NotificationNames.STARTUP = "startup";
        NotificationNames.NEW_USER = "newUser";
        NotificationNames.DELETE_USER = "deleteUser";
        NotificationNames.CANCEL_SELECTED = "cancelSelected";
        NotificationNames.USER_SELECTED = "userSelected";
        NotificationNames.USER_ADDED = "userAdded";
        NotificationNames.USER_UPDATED = "userUpdated";
        NotificationNames.USER_DELETED = "userDeleted";
        NotificationNames.ADD_ROLE = "addRole";
        NotificationNames.ADD_ROLE_RESULT = "addRoleResult";
        return NotificationNames;
    })();
    EmployeeAdmin.NotificationNames = NotificationNames;    
})(EmployeeAdmin || (EmployeeAdmin = {}));

var EmployeeAdmin;
(function (EmployeeAdmin) {
    "use strict";
    var ProxyNames = (function () {
        function ProxyNames() { }
        ProxyNames.ROLE_PROXY = "roleProxy";
        ProxyNames.USER_PROXY = "userProxy";
        return ProxyNames;
    })();
    EmployeeAdmin.ProxyNames = ProxyNames;    
})(EmployeeAdmin || (EmployeeAdmin = {}));

var EmployeeAdmin;
(function (EmployeeAdmin) {
    "use strict";
    var UserVO = (function () {
        function UserVO() {
            this.uname = "";
            this.fname = "";
            this.lname = "";
            this.email = "";
            this.password = "";
            this.department = EmployeeAdmin.DeptEnum.NONE_SELECTED;
        }
        UserVO.prototype.getIsValid = function () {
            return this.uname != "" && this.password != "" && this.department != EmployeeAdmin.DeptEnum.NONE_SELECTED;
        };
        UserVO.prototype.getGivenName = function () {
            return this.lname + ", " + this.fname;
        };
        return UserVO;
    })();
    EmployeeAdmin.UserVO = UserVO;    
})(EmployeeAdmin || (EmployeeAdmin = {}));

var EmployeeAdmin;
(function (EmployeeAdmin) {
    "use strict";
    var RoleVO = (function () {
        function RoleVO() {
            this.uname = "";
            this.roles = new Array();
        }
        return RoleVO;
    })();
    EmployeeAdmin.RoleVO = RoleVO;    
})(EmployeeAdmin || (EmployeeAdmin = {}));

var EmployeeAdmin;
(function (EmployeeAdmin) {
    "use strict";
    var UserProxy = (function (_super) {
        __extends(UserProxy, _super);
        function UserProxy() {
            _super.apply(this, arguments);

        }
        UserProxy.prototype.getUsers = function () {
            return this.data;
        };
        UserProxy.prototype.addItem = function (user) {
            this.getUsers().push(user);
        };
        UserProxy.prototype.getUser = function (uname) {
            var users = this.getUsers();
            for(var i = 0; i < users.length; i++) {
                if(users[i].uname === uname) {
                    return users[i];
                }
            }
            return null;
        };
        UserProxy.prototype.updateItem = function (user) {
            var users = this.getUsers();
            for(var i = 0; i < users.length; i++) {
                if(users[i].uname === user.uname) {
                    users[i] = user;
                }
            }
        };
        UserProxy.prototype.deleteItem = function (user) {
            var users = this.getUsers();
            for(var i = 0; i < users.length; i++) {
                if(users[i].uname === user.uname) {
                    users.splice(i, 1);
                }
            }
        };
        return UserProxy;
    })(puremvc.Proxy);
    EmployeeAdmin.UserProxy = UserProxy;    
})(EmployeeAdmin || (EmployeeAdmin = {}));

var EmployeeAdmin;
(function (EmployeeAdmin) {
    "use strict";
    var RoleProxy = (function (_super) {
        __extends(RoleProxy, _super);
        function RoleProxy() {
            _super.apply(this, arguments);

        }
        RoleProxy.prototype.getRoles = function () {
            return this.data;
        };
        RoleProxy.prototype.addItem = function (role) {
            this.getRoles().push(role);
        };
        RoleProxy.prototype.deleteItem = function (item) {
            var roles = this.getRoles();
            for(var i = 0; i < roles.length; i++) {
                if(roles[i].uname === item.uname) {
                    roles.splice(i, 1);
                    break;
                }
            }
        };
        RoleProxy.prototype.doesUserHaveRole = function (user, role) {
            var roles = this.getRoles();
            var hasRole = false;
            for(var i = 0; i < roles.length; i++) {
                if(roles[i].uname === user.uname) {
                    var userRoles = roles[i].roles;
                    for(var j = 0; j < userRoles.length; j++) {
                        var roleEnum = userRoles[j];
                        if(roleEnum.equals(role)) {
                            hasRole = true;
                            break;
                        }
                    }
                    break;
                }
            }
            return hasRole;
        };
        RoleProxy.prototype.addRoleToUser = function (user, role) {
            var roles = this.getRoles();
            var result = false;
            if(!this.doesUserHaveRole(user, role)) {
                for(var i = 0; i < roles.length; i++) {
                    if(roles[i].uname == user.uname) {
                        var userRoles = roles[i].roles;
                        userRoles.push(role);
                        result = true;
                        break;
                    }
                }
            }
        };
        RoleProxy.prototype.removeRoleFromUser = function (user, role) {
            var roles = this.getRoles();
            if(this.doesUserHaveRole(user, role)) {
                for(var i = 0; i < roles.length; i++) {
                    if(roles[i].uname === user.uname) {
                        var userRoles = roles[i].roles;
                        for(var j = 0; j < userRoles.length; j++) {
                            var roleEnum = userRoles[j];
                            if(roleEnum.equals(role)) {
                                userRoles.splice(j, 1);
                                break;
                            }
                        }
                        break;
                    }
                }
            }
        };
        RoleProxy.prototype.getUserRoles = function (uname) {
            var roles = this.getRoles();
            var userRoles = new Array();
            for(var i = 0; i < roles.length; i++) {
                if(roles[i].uname === uname) {
                    userRoles = roles[i].roles;
                    break;
                }
            }
            return userRoles;
        };
        return RoleProxy;
    })(puremvc.Proxy);
    EmployeeAdmin.RoleProxy = RoleProxy;    
})(EmployeeAdmin || (EmployeeAdmin = {}));

var EmployeeAdmin;
(function (EmployeeAdmin) {
    "use strict";
    var DeleteUserCommand = (function (_super) {
        __extends(DeleteUserCommand, _super);
        function DeleteUserCommand() {
            _super.apply(this, arguments);

        }
        DeleteUserCommand.prototype.execute = function (note) {
            var user = note.getBody();
            var userProxy = this.facade.retrieveProxy(EmployeeAdmin.ProxyNames.USER_PROXY);
            var roleProxy = this.facade.retrieveProxy(EmployeeAdmin.ProxyNames.ROLE_PROXY);
            userProxy.deleteItem(user);
            roleProxy.deleteItem(user);
            this.sendNotification(EmployeeAdmin.NotificationNames.USER_DELETED);
        };
        return DeleteUserCommand;
    })(puremvc.SimpleCommand);
    EmployeeAdmin.DeleteUserCommand = DeleteUserCommand;    
})(EmployeeAdmin || (EmployeeAdmin = {}));

var EmployeeAdmin;
(function (EmployeeAdmin) {
    "use strict";
    var PrepModelCommand = (function (_super) {
        __extends(PrepModelCommand, _super);
        function PrepModelCommand() {
            _super.apply(this, arguments);

        }
        PrepModelCommand.prototype.execute = function (note) {
            var userProxy = new EmployeeAdmin.UserProxy(EmployeeAdmin.ProxyNames.USER_PROXY, this.generateUsers());
            var roleProxy = new EmployeeAdmin.RoleProxy(EmployeeAdmin.ProxyNames.ROLE_PROXY, this.generateRoles());
            this.facade.registerProxy(userProxy);
            this.facade.registerProxy(roleProxy);
        };
        PrepModelCommand.prototype.generateUsers = function () {
            var user;
            var users = new Array();
            user = new EmployeeAdmin.UserVO();
            user.uname = "lstooge";
            user.fname = "Larry";
            user.lname = "Stooge";
            user.email = "larry@stooges.com";
            user.password = "ijk456";
            user.department = EmployeeAdmin.DeptEnum.ACCT;
            users.push(user);
            user = new EmployeeAdmin.UserVO();
            user.uname = "cstooge";
            user.fname = "Curly";
            user.lname = "Stooge";
            user.email = "curly@stooges.com";
            user.password = "xyz987";
            user.department = EmployeeAdmin.DeptEnum.SALES;
            users.push(user);
            user = new EmployeeAdmin.UserVO();
            user.uname = "mstooge";
            user.fname = "Moe";
            user.lname = "Stooge";
            user.email = "moe@stooges.com";
            user.password = "abc123";
            user.department = EmployeeAdmin.DeptEnum.PLANT;
            users.push(user);
            return users;
        };
        PrepModelCommand.prototype.generateRoles = function () {
            var role;
            var roles = new Array();
            role = new EmployeeAdmin.RoleVO();
            role.uname = "lstooge";
            role.roles = [
                EmployeeAdmin.RoleEnum.PAYROLL, 
                EmployeeAdmin.RoleEnum.EMP_BENEFITS
            ];
            roles.push(role);
            role = new EmployeeAdmin.RoleVO();
            role.uname = "cstooge";
            role.roles = [
                EmployeeAdmin.RoleEnum.ACCT_PAY, 
                EmployeeAdmin.RoleEnum.ACCT_RCV, 
                EmployeeAdmin.RoleEnum.GEN_LEDGER
            ];
            roles.push(role);
            role = new EmployeeAdmin.RoleVO();
            role.uname = "mstooge";
            role.roles = [
                EmployeeAdmin.RoleEnum.INVENTORY, 
                EmployeeAdmin.RoleEnum.PRODUCTION, 
                EmployeeAdmin.RoleEnum.SALES, 
                EmployeeAdmin.RoleEnum.SHIPPING
            ];
            roles.push(role);
            return roles;
        };
        return PrepModelCommand;
    })(puremvc.SimpleCommand);
    EmployeeAdmin.PrepModelCommand = PrepModelCommand;    
})(EmployeeAdmin || (EmployeeAdmin = {}));

var EmployeeAdmin;
(function (EmployeeAdmin) {
    "use strict";
    var UserListMediator = (function (_super) {
        __extends(UserListMediator, _super);
        function UserListMediator(name, viewComponent) {
                _super.call(this, name, viewComponent);
            this.userList = null;
            this.registerListeners();
            var userProxy = this.facade.retrieveProxy(EmployeeAdmin.ProxyNames.USER_PROXY);
            viewComponent.setUsers(userProxy.getUsers());
        }
        UserListMediator.prototype.registerListeners = function () {
            var userList = this.getUserList();
            userList.addEventListener(EmployeeAdmin.UserList.NEW, this.onNew, this);
            userList.addEventListener(EmployeeAdmin.UserList.DELETE, this.onDelete, this);
            userList.addEventListener(EmployeeAdmin.UserList.SELECT, this.onSelect, this);
        };
        UserListMediator.prototype.unregisterListeners = function () {
            var userList = this.getUserList();
            userList.removeEventListener(EmployeeAdmin.UserList.NEW, this.onNew, this);
            userList.removeEventListener(EmployeeAdmin.UserList.DELETE, this.onDelete, this);
            userList.removeEventListener(EmployeeAdmin.UserList.SELECT, this.onSelect, this);
        };
        UserListMediator.prototype.getUserList = function () {
            return this.viewComponent;
        };
        UserListMediator.prototype.listNotificationInterests = function () {
            return [
                EmployeeAdmin.NotificationNames.CANCEL_SELECTED, 
                EmployeeAdmin.NotificationNames.USER_UPDATED, 
                EmployeeAdmin.NotificationNames.USER_ADDED, 
                EmployeeAdmin.NotificationNames.USER_DELETED
            ];
        };
        UserListMediator.prototype.handleNotification = function (note) {
            var userList = this.getUserList();
            var userProxy = this.facade.retrieveProxy(EmployeeAdmin.ProxyNames.USER_PROXY);
            switch(note.getName()) {
                case EmployeeAdmin.NotificationNames.CANCEL_SELECTED: {
                    userList.deSelect();
                    break;

                }
                case EmployeeAdmin.NotificationNames.USER_UPDATED: {
                    userList.setUsers(userProxy.getUsers());
                    userList.deSelect();
                    break;

                }
                case EmployeeAdmin.NotificationNames.USER_ADDED: {
                    userList.setUsers(userProxy.getUsers());
                    userList.deSelect();
                    break;

                }
                case EmployeeAdmin.NotificationNames.USER_DELETED: {
                    userList.setUsers(userProxy.getUsers());
                    userList.deSelect();
                    break;

                }
            }
        };
        UserListMediator.prototype.onNew = function (event) {
            var user = new EmployeeAdmin.UserVO();
            this.sendNotification(EmployeeAdmin.NotificationNames.NEW_USER, user);
        };
        UserListMediator.prototype.onDelete = function (event) {
            var userList = this.getUserList();
            var uname = userList.getSelectedUser();
            var userProxy = this.facade.retrieveProxy(EmployeeAdmin.ProxyNames.USER_PROXY);
            var selectedUser = userProxy.getUser(uname);
            this.sendNotification(EmployeeAdmin.NotificationNames.DELETE_USER, selectedUser);
        };
        UserListMediator.prototype.onSelect = function (event) {
            var userList = this.getUserList();
            var uname = userList.getSelectedUser();
            var userProxy = this.facade.retrieveProxy(EmployeeAdmin.ProxyNames.USER_PROXY);
            var selectedUser = userProxy.getUser(uname);
            this.sendNotification(EmployeeAdmin.NotificationNames.USER_SELECTED, selectedUser);
        };
        UserListMediator.prototype.onRemove = function () {
            this.unregisterListeners();
            this.getUserList().unbindListeners();
        };
        return UserListMediator;
    })(puremvc.Mediator);
    EmployeeAdmin.UserListMediator = UserListMediator;    
})(EmployeeAdmin || (EmployeeAdmin = {}));

var EmployeeAdmin;
(function (EmployeeAdmin) {
    "use strict";
    var UserFormMediator = (function (_super) {
        __extends(UserFormMediator, _super);
        function UserFormMediator(name, viewComponent) {
                _super.call(this, name, viewComponent);
            this.userProxy = null;
            this.registerListeners();
            this.userProxy = this.facade.retrieveProxy(EmployeeAdmin.ProxyNames.USER_PROXY);
        }
        UserFormMediator.prototype.getUserForm = function () {
            return this.viewComponent;
        };
        UserFormMediator.prototype.registerListeners = function () {
            var userForm = this.getUserForm();
            userForm.addEventListener(EmployeeAdmin.UserForm.ADD, this.onAdd, this);
            userForm.addEventListener(EmployeeAdmin.UserForm.UPDATE, this.onUpdate, this);
            userForm.addEventListener(EmployeeAdmin.UserForm.CANCEL, this.onCancel, this);
        };
        UserFormMediator.prototype.unregisterListeners = function () {
            var userForm = this.getUserForm();
            userForm.addEventListener(EmployeeAdmin.UserForm.ADD, this.onAdd, this);
            userForm.addEventListener(EmployeeAdmin.UserForm.UPDATE, this.onUpdate, this);
            userForm.addEventListener(EmployeeAdmin.UserForm.CANCEL, this.onCancel, this);
        };
        UserFormMediator.prototype.onAdd = function (event) {
            var user = this.getUserForm().getUser();
            this.userProxy.addItem(user);
            this.sendNotification(EmployeeAdmin.NotificationNames.USER_ADDED, user);
            var userForm = this.getUserForm();
            userForm.clearForm();
            userForm.setEnabled(false);
            userForm.setMode(EmployeeAdmin.UserForm.MODE_ADD);
        };
        UserFormMediator.prototype.onUpdate = function (event) {
            var user = this.getUserForm().getUser();
            this.userProxy.updateItem(user);
            this.sendNotification(EmployeeAdmin.NotificationNames.USER_UPDATED, user);
            var userForm = this.getUserForm();
            userForm.clearForm();
            userForm.setEnabled(false);
            userForm.setMode(EmployeeAdmin.UserForm.MODE_ADD);
        };
        UserFormMediator.prototype.onCancel = function (event) {
            this.sendNotification(EmployeeAdmin.NotificationNames.CANCEL_SELECTED);
            var userForm = this.getUserForm();
            userForm.clearForm();
            userForm.setEnabled(false);
            userForm.setMode(EmployeeAdmin.UserForm.MODE_ADD);
        };
        UserFormMediator.prototype.listNotificationInterests = function () {
            return [
                EmployeeAdmin.NotificationNames.NEW_USER, 
                EmployeeAdmin.NotificationNames.USER_DELETED, 
                EmployeeAdmin.NotificationNames.USER_SELECTED
            ];
        };
        UserFormMediator.prototype.handleNotification = function (note) {
            var userForm = this.getUserForm();
            var user;
            switch(note.getName()) {
                case EmployeeAdmin.NotificationNames.NEW_USER: {
                    userForm.setUser(note.getBody());
                    userForm.setMode(EmployeeAdmin.UserForm.MODE_ADD);
                    userForm.setEnabled(true);
                    userForm.setFocus();
                    break;

                }
                case EmployeeAdmin.NotificationNames.USER_DELETED: {
                    userForm.clearForm();
                    userForm.setEnabled(false);
                    break;

                }
                case EmployeeAdmin.NotificationNames.USER_SELECTED: {
                    user = note.getBody();
                    userForm.clearForm();
                    userForm.setUser(user);
                    userForm.setMode(EmployeeAdmin.UserForm.MODE_EDIT);
                    userForm.setEnabled(true);
                    userForm.setFocus();
                    break;

                }
            }
        };
        UserFormMediator.prototype.onRemove = function () {
            this.unregisterListeners();
            this.getUserForm().unbindListeners();
        };
        UserFormMediator.ADD = "add";
        UserFormMediator.UPDATE = "update";
        UserFormMediator.CANCEL = "cancel";
        UserFormMediator.MODE_ADD = "modeAdd";
        UserFormMediator.MODE_EDIT = "modeEdit";
        return UserFormMediator;
    })(puremvc.Mediator);
    EmployeeAdmin.UserFormMediator = UserFormMediator;    
})(EmployeeAdmin || (EmployeeAdmin = {}));

var EmployeeAdmin;
(function (EmployeeAdmin) {
    "use strict";
    var RolePanelMediator = (function (_super) {
        __extends(RolePanelMediator, _super);
        function RolePanelMediator(name, viewComponent) {
                _super.call(this, RolePanelMediator.NAME, viewComponent);
            this.roleProxy = null;
            this.registerListeners();
            this.roleProxy = this.facade.retrieveProxy(EmployeeAdmin.ProxyNames.ROLE_PROXY);
        }
        RolePanelMediator.prototype.getRolePanel = function () {
            return this.viewComponent;
        };
        RolePanelMediator.prototype.registerListeners = function () {
            var rolePanel = this.getRolePanel();
            rolePanel.addEventListener(EmployeeAdmin.RolePanel.ADD, this.onAddRole, this);
            rolePanel.addEventListener(EmployeeAdmin.RolePanel.REMOVE, this.onRemoveRole, this);
        };
        RolePanelMediator.prototype.unregisterListeners = function () {
            var rolePanel = this.getRolePanel();
            rolePanel.removeEventListener(EmployeeAdmin.RolePanel.ADD, this.onAddRole, this);
            rolePanel.removeEventListener(EmployeeAdmin.RolePanel.REMOVE, this.onRemoveRole, this);
        };
        RolePanelMediator.prototype.onAddRole = function (event) {
            this.roleProxy.addRoleToUser(this.getRolePanel().getUser(), this.getRolePanel().getSelectedRole());
            this.updateUserRoleList();
            this.getRolePanel().setMode(null);
        };
        RolePanelMediator.prototype.onRemoveRole = function (event) {
            this.roleProxy.removeRoleFromUser(this.getRolePanel().getUser(), this.getRolePanel().getSelectedRole());
            this.updateUserRoleList();
            this.getRolePanel().setMode(null);
        };
        RolePanelMediator.prototype.updateUserRoleList = function () {
            var userName = this.getRolePanel().user.uname;
            var userRoles = this.roleProxy.getUserRoles(userName);
            this.getRolePanel().setUserRoles(userRoles);
        };
        RolePanelMediator.prototype.listNotificationInterests = function () {
            return [
                EmployeeAdmin.NotificationNames.NEW_USER, 
                EmployeeAdmin.NotificationNames.USER_ADDED, 
                EmployeeAdmin.NotificationNames.USER_UPDATED, 
                EmployeeAdmin.NotificationNames.USER_DELETED, 
                EmployeeAdmin.NotificationNames.CANCEL_SELECTED, 
                EmployeeAdmin.NotificationNames.USER_SELECTED, 
                EmployeeAdmin.NotificationNames.ADD_ROLE_RESULT
            ];
        };
        RolePanelMediator.prototype.handleNotification = function (note) {
            var rolePanel = this.getRolePanel();
            switch(note.getName()) {
                case EmployeeAdmin.NotificationNames.NEW_USER: {
                    rolePanel.clearForm();
                    rolePanel.setEnabled(false);
                    break;

                }
                case EmployeeAdmin.NotificationNames.USER_ADDED: {
                    rolePanel.user = note.getBody();
                    var roleVO = new EmployeeAdmin.RoleVO();
                    roleVO.uname = rolePanel.user.uname;
                    this.roleProxy.addItem(roleVO);
                    rolePanel.clearForm();
                    rolePanel.setEnabled(false);
                    break;

                }
                case EmployeeAdmin.NotificationNames.USER_UPDATED: {
                    rolePanel.clearForm();
                    rolePanel.setEnabled(false);
                    break;

                }
                case EmployeeAdmin.NotificationNames.USER_DELETED: {
                    rolePanel.clearForm();
                    rolePanel.setEnabled(false);
                    break;

                }
                case EmployeeAdmin.NotificationNames.CANCEL_SELECTED: {
                    rolePanel.clearForm();
                    rolePanel.setEnabled(false);
                    break;

                }
                case EmployeeAdmin.NotificationNames.USER_SELECTED: {
                    rolePanel.clearForm();
                    rolePanel.setEnabled(true);
                    rolePanel.setMode(null);
                    rolePanel.user = note.getBody();
                    this.updateUserRoleList();
                    break;

                }
                case EmployeeAdmin.NotificationNames.ADD_ROLE_RESULT: {
                    this.updateUserRoleList();
                    break;

                }
            }
        };
        RolePanelMediator.prototype.onRemove = function () {
            this.unregisterListeners();
            this.getRolePanel().unbindListeners();
        };
        return RolePanelMediator;
    })(puremvc.Mediator);
    EmployeeAdmin.RolePanelMediator = RolePanelMediator;    
})(EmployeeAdmin || (EmployeeAdmin = {}));

var EmployeeAdmin;
(function (EmployeeAdmin) {
    "use strict";
    var UiComponent = (function () {
        function UiComponent() {
            this.listenerMap = null;
            this.listenerMap = {
            };
        }
        UiComponent.prototype.dispatchEvent = function (type, properties) {
            if (typeof properties === "undefined") { properties = null; }
            if(typeof type == 'undefined') {
                return;
            }
            if(typeof this.listenerMap[UiComponent.QUEUE_PATTERN + type] == 'undefined') {
                return;
            }
            var queue = this.listenerMap[UiComponent.QUEUE_PATTERN + type].slice(0);
            var props = properties || {
            };
            var len = queue.length;
            for(var i = 0; i < len; i++) {
                var listenerDescriptor = queue[i];
                if(typeof listenerDescriptor.listener == 'function') {
                    if(typeof listenerDescriptor.context != "undefined") {
                        listenerDescriptor.listener.call(listenerDescriptor.context, props);
                    } else {
                        listenerDescriptor.listener.call(this, event, props);
                    }
                }
            }
        };
        UiComponent.prototype.addEventListener = function (type, listener, context) {
            if(typeof type == "undefined") {
                return;
            }
            if(typeof listener == "undefined") {
                return;
            }
            var newListener = new ListenerDescriptor(listener, context);
            var queue;
            if(typeof this.listenerMap[UiComponent.QUEUE_PATTERN + type] == "undefined") {
                queue = this.listenerMap[UiComponent.QUEUE_PATTERN + type] = [];
            } else {
                queue = this.listenerMap[UiComponent.QUEUE_PATTERN + type];
            }
            var len = queue.length;
            for(var i = 0; i < len; i++) {
                var listenerDescriptor = queue[i];
                if(listenerDescriptor.equals(newListener)) {
                    return;
                }
            }
            queue.push(newListener);
        };
        UiComponent.prototype.removeEventListener = function (type, listener, context) {
            if(typeof type == "undefined") {
                return;
            }
            if(typeof listener == "undefined") {
                return;
            }
            if(typeof this.listenerMap[UiComponent.QUEUE_PATTERN + type] == "undefined") {
                return;
            }
            var queue = this.listenerMap[UiComponent.QUEUE_PATTERN + type];
            var len = queue.length;
            for(var i = 0; i < len; i++) {
                var listenerDescriptor = queue[i];
                if(listenerDescriptor.equals(new ListenerDescriptor(listener, context))) {
                    queue.splice(i, 1);
                    return;
                }
            }
        };
        UiComponent.QUEUE_PATTERN = '@_@';
        return UiComponent;
    })();
    EmployeeAdmin.UiComponent = UiComponent;    
    var Event = (function () {
        function Event() {
            this.type = null;
            this.properties = null;
        }
        return Event;
    })();
    EmployeeAdmin.Event = Event;    
    var ListenerDescriptor = (function () {
        function ListenerDescriptor(listener, context) {
            this.listener = listener;
            this.context = context;
        }
        ListenerDescriptor.prototype.equals = function (compared) {
            if(compared.listener === this.listener) {
                if(typeof compared.context != "undefined") {
                    if(compared.context == null && this.context == null) {
                        return true;
                    }
                    if(compared.context === this.context) {
                        return true;
                    }
                }
            }
            return false;
        };
        return ListenerDescriptor;
    })();    
})(EmployeeAdmin || (EmployeeAdmin = {}));

var EmployeeAdmin;
(function (EmployeeAdmin) {
    "use strict";
    var RolePanel = (function (_super) {
        __extends(RolePanel, _super);
        function RolePanel() {
                _super.call(this);
            this.user = null;
            this.userRoles = null;
            this.selectedRole = null;
            this.mode = null;
            this.rolePanel = null;
            this.roleList = null;
            this.userRoleList = null;
            this.addRoleButton = null;
            this.removeRoleButton = null;
            this.initializeChildren();
            this.bindListeners();
            this.fillRoleList();
            this.setEnabled(false);
        }
        RolePanel.prototype.initializeChildren = function () {
            this.rolePanel = jQuery(".role-panel");
            this.userRoleList = this.rolePanel.find("#user-role-list");
            this.userRoleList.jqGrid({
                datatype: "local",
                width: 280,
                height: 170,
                colNames: [
                    'Roles'
                ],
                colModel: [
                    {
                        name: 'value',
                        index: 'value'
                    }
                ]
            });
            this.roleList = this.rolePanel.find(".role-list");
            this.addRoleButton = this.rolePanel.find(".add-role-button").button();
            this.removeRoleButton = this.rolePanel.find(".remove-role-button").button();
        };
        RolePanel.prototype.bindListeners = function () {
            var namespace = ".UserRoleList";
            this.addRoleButton.on("click" + namespace, jQuery.proxy(this, "addRoleButton_clickHandler"));
            this.removeRoleButton.on("click" + namespace, jQuery.proxy(this, "removeRoleButton_clickHandler"));
            this.roleList.on("change" + namespace, jQuery.proxy(this, "roleList_changeHandler"));
            this.userRoleList.jqGrid("setGridParam", {
                onSelectRow: jQuery.proxy(this, "userRoleList_changeHandler")
            });
        };
        RolePanel.prototype.unbindListeners = function () {
            var namespace = ".UserRoleList";
            this.addRoleButton.off("click" + namespace);
            this.removeRoleButton.off("click" + namespace);
            this.roleList.off("change" + namespace);
            this.userRoleList.jqGrid("setGridParam", {
                onSelectRow: null
            });
        };
        RolePanel.prototype.fillRoleList = function () {
            var roleEnumList = EmployeeAdmin.RoleEnum.getComboList();
            this.roleList.empty();
            var htmlList = "";
            for(var i = 0; i < roleEnumList.length; i++) {
                var role = roleEnumList[i];
                var valueAttr = 'value="' + role.ordinal + '"';
                var selectedAttr = i == 0 ? "selected" : "";
                htmlList += '<option ' + valueAttr + ' ' + selectedAttr + ' >' + role.value + '</option>';
            }
            this.roleList.html(htmlList);
        };
        RolePanel.prototype.setUserRoles = function (userRoles) {
            this.userRoleList.jqGrid('clearGridData');
            if(!userRoles) {
                return;
            }
            this.userRoles = userRoles;
            for(var i = 0; i < userRoles.length; i++) {
                var role = userRoles[i];
                this.userRoleList.jqGrid('addRowData', i + 1, role);
            }
        };
        RolePanel.prototype.getUser = function () {
            return this.user;
        };
        RolePanel.prototype.getSelectedRole = function () {
            return this.selectedRole;
        };
        RolePanel.prototype.setEnabled = function (isEnabled) {
            if(isEnabled) {
                this.userRoleList.removeAttr("disabled");
                this.roleList.removeAttr("disabled");
                this.addRoleButton.button("enable");
                this.removeRoleButton.button("enable");
            } else {
                this.userRoleList.attr("disabled", "disabled");
                this.roleList.attr("disabled", "disabled");
                this.addRoleButton.button("disable");
                this.removeRoleButton.button("disable");
            }
            if(!isEnabled) {
                this.roleList.prop("selectedIndex", 0);
            }
        };
        RolePanel.prototype.setMode = function (mode) {
            switch(mode) {
                case RolePanel.ADD_MODE: {
                    this.addRoleButton.button("enable");
                    this.removeRoleButton.button("disable");
                    break;

                }
                case RolePanel.REMOVE_MODE: {
                    this.addRoleButton.button("disable");
                    this.removeRoleButton.button("enable");
                    this.roleList.selectedIndex = 0;
                    break;

                }
                default: {
                    this.addRoleButton.button("disable");
                    this.removeRoleButton.button("disable");

                }
            }
        };
        RolePanel.prototype.clearForm = function () {
            this.user = null;
            this.setUserRoles(null);
            this.roleList.prop("selectedIndex", 0);
            this.userRoleList.jqGrid('resetSelection');
        };
        RolePanel.prototype.addRoleButton_clickHandler = function () {
            this.dispatchEvent(RolePanel.ADD);
        };
        RolePanel.prototype.removeRoleButton_clickHandler = function () {
            this.dispatchEvent(RolePanel.REMOVE);
        };
        RolePanel.prototype.userRoleList_changeHandler = function (id) {
            var index = this.userRoleList.jqGrid('getInd', id);
            this.selectedRole = this.userRoles[index - 1];
            this.setMode(RolePanel.REMOVE_MODE);
        };
        RolePanel.prototype.roleList_changeHandler = function () {
            this.userRoleList.jqGrid('resetSelection');
            var roleEnumList = EmployeeAdmin.RoleEnum.getComboList();
            this.selectedRole = roleEnumList[this.roleList.prop("selectedIndex")];
            var alreadyInList = false;
            for(var i = 0; i < this.userRoles.length; i++) {
                var role = this.userRoles[i];
                if(role.equals(this.selectedRole)) {
                    alreadyInList = true;
                    break;
                }
            }
            if(this.selectedRole == EmployeeAdmin.RoleEnum.NONE_SELECTED || alreadyInList) {
                this.setMode(null);
            } else {
                this.setMode(RolePanel.ADD_MODE);
            }
        };
        RolePanel.ADD = "add";
        RolePanel.REMOVE = "remove";
        RolePanel.ADD_MODE = "addMode";
        RolePanel.REMOVE_MODE = "removeMode";
        return RolePanel;
    })(EmployeeAdmin.UiComponent);
    EmployeeAdmin.RolePanel = RolePanel;    
})(EmployeeAdmin || (EmployeeAdmin = {}));

var EmployeeAdmin;
(function (EmployeeAdmin) {
    "use strict";
    var DeptEnum = (function () {
        function DeptEnum(value, ordinal) {
            this.ordinal = null;
            this.value = null;
            this.value = value;
            this.ordinal = ordinal;
        }
        DeptEnum.prototype.equals = function (deptEnum) {
            return (this.ordinal == deptEnum.ordinal && this.value == deptEnum.value);
        };
        DeptEnum.NONE_SELECTED = new DeptEnum("Select a department", -1);
        DeptEnum.ACCT = new DeptEnum("Accounting", 0);
        DeptEnum.SALES = new DeptEnum("Sales", 1);
        DeptEnum.PLANT = new DeptEnum("Plant", 2);
        DeptEnum.SHIPPING = new DeptEnum("Shipping", 3);
        DeptEnum.QC = new DeptEnum("Quality Control", 4);
        DeptEnum.getList = function getList() {
            return [
                DeptEnum.ACCT, 
                DeptEnum.SALES, 
                DeptEnum.PLANT
            ];
        }
        DeptEnum.getComboList = function getComboList() {
            var cList = DeptEnum.getList();
            cList.unshift(DeptEnum.NONE_SELECTED);
            return cList;
        }
        return DeptEnum;
    })();
    EmployeeAdmin.DeptEnum = DeptEnum;    
})(EmployeeAdmin || (EmployeeAdmin = {}));

var EmployeeAdmin;
(function (EmployeeAdmin) {
    "use strict";
    var UserForm = (function (_super) {
        __extends(UserForm, _super);
        function UserForm() {
                _super.call(this);
            this.userFormPanel = null;
            this.uname = null;
            this.fname = null;
            this.lname = null;
            this.email = null;
            this.password = null;
            this.confirm = null;
            this.department = null;
            this.submitButton = null;
            this.user = null;
            this.userRoles = null;
            this.mode = null;
            this.initializeChildren();
            this.bindListeners();
            this.clearForm();
            this.setEnabled(false);
        }
        UserForm.prototype.initializeChildren = function () {
            this.userFormPanel = jQuery(".user-form-panel");
            this.uname = this.userFormPanel.find("#uname");
            this.fname = this.userFormPanel.find("#fname");
            this.lname = this.userFormPanel.find("#lname");
            this.email = this.userFormPanel.find("#email");
            this.password = this.userFormPanel.find("#password");
            this.confirm = this.userFormPanel.find("#confirm");
            this.department = this.userFormPanel.find(".department");
            this.submitButton = this.userFormPanel.find("#submit-button").button();
            this.cancelButton = this.userFormPanel.find("#cancel-button").button();
        };
        UserForm.prototype.bindListeners = function () {
            var namespace = ".UserForm";
            var focusEventProxy = jQuery.proxy(this, "field_focusHandler");
            this.uname.on("focus" + namespace, focusEventProxy);
            this.password.on("focus" + namespace, focusEventProxy);
            this.confirm.on("focus" + namespace, focusEventProxy);
            this.department.on("focus" + namespace, focusEventProxy);
            this.submitButton.on("click" + namespace, jQuery.proxy(this, "submitButton_clickHandler"));
            this.cancelButton.on("click" + namespace, jQuery.proxy(this, "cancelButton_clickHandler"));
        };
        UserForm.prototype.unbindListeners = function () {
            var namespace = ".UserForm";
            this.uname.off("focus" + namespace);
            this.password.off("focus" + namespace);
            this.confirm.off("focus" + namespace);
            this.department.off("focus" + namespace);
            this.roles.off("focus" + namespace);
            this.submitButton.off("click" + namespace);
            this.cancelButton.off("click" + namespace);
        };
        UserForm.prototype.fillList = function (deptEnumList) {
            var htmlList = "";
            for(var i = 0; i < deptEnumList.length; i++) {
                var deptEnum = deptEnumList[i];
                var valueAttr = 'value="' + deptEnum.ordinal + '"';
                var selectedAttr = "";
                if(this.user && deptEnum.equals(this.user.department)) {
                    selectedAttr = "selected";
                }
                if(!this.user && deptEnum.equals(EmployeeAdmin.DeptEnum.NONE_SELECTED)) {
                    selectedAttr = "selected";
                }
                htmlList += "<option " + valueAttr + " " + selectedAttr + " >" + deptEnum.value + "</option>";
            }
            this.department.html(htmlList);
        };
        UserForm.prototype.setFocus = function () {
            this.fname.focus();
        };
        UserForm.prototype.setUser = function (user) {
            this.user = user;
            if(!user) {
                this.clearForm();
            } else {
                this.uname.val(user.uname);
                this.fname.val(user.fname);
                this.lname.val(user.lname);
                this.email.val(user.email);
                this.password.val(user.password);
                this.confirm.val(user.password);
                this.fillList(EmployeeAdmin.DeptEnum.getComboList());
            }
        };
        UserForm.prototype.getUser = function () {
            this.updateUser();
            return this.user;
        };
        UserForm.prototype.updateUser = function () {
            this.user.uname = this.uname.val();
            this.user.fname = this.fname.val();
            this.user.lname = this.lname.val();
            this.user.email = this.email.val();
            this.user.password = this.password.val();
            var selected = parseInt(this.department.val()) + 1;
            var deptEnumList = EmployeeAdmin.DeptEnum.getComboList();
            this.user.department = deptEnumList[selected];
        };
        UserForm.prototype.clearForm = function () {
            this.uname.val("");
            this.fname.val("");
            this.lname.val("");
            this.email.val("");
            this.password.val("");
            this.confirm.val("");
            this.fillList([]);
            this.setFieldError("uname", false);
            this.setFieldError("password", false);
            this.setFieldError("confirm", false);
            this.setFieldError("department", false);
        };
        UserForm.prototype.setEnabled = function (isEnabled) {
            if(isEnabled) {
                this.fname.removeAttr("disabled");
                this.lname.removeAttr("disabled");
                this.email.removeAttr("disabled");
                this.password.removeAttr("disabled");
                this.confirm.removeAttr("disabled");
                this.department.removeAttr("disabled");
                this.submitButton.button("enable");
                this.cancelButton.button("enable");
                if(this.mode == UserForm.MODE_EDIT) {
                    this.uname.attr("disabled", "disabled");
                } else {
                    this.uname.removeAttr("disabled");
                }
            } else {
                this.uname.attr("disabled", "disabled");
                this.fname.attr("disabled", "disabled");
                this.lname.attr("disabled", "disabled");
                this.email.attr("disabled", "disabled");
                this.password.attr("disabled", "disabled");
                this.confirm.attr("disabled", "disabled");
                this.department.attr("disabled", "disabled");
                this.submitButton.button("disable");
                this.cancelButton.button("disable");
            }
        };
        UserForm.prototype.setMode = function (mode) {
            this.mode = mode;
            switch(mode) {
                case UserForm.MODE_ADD: {
                    this.submitButton.find(".ui-button-text").text("Add");
                    break;

                }
                case UserForm.MODE_EDIT: {
                    this.submitButton.find(".ui-button-text").text("Save");
                    break;

                }
            }
        };
        UserForm.prototype.submitButton_clickHandler = function () {
            this.updateUser();
            if(this.getErrors()) {
                return;
            }
            var user = this.getUser();
            if(user.getIsValid()) {
                if(this.mode == UserForm.MODE_ADD) {
                    this.dispatchEvent(UserForm.ADD);
                } else {
                    this.dispatchEvent(UserForm.UPDATE);
                }
            }
        };
        UserForm.prototype.cancelButton_clickHandler = function () {
            this.dispatchEvent(UserForm.CANCEL);
        };
        UserForm.prototype.field_focusHandler = function (evt) {
            this.setFieldError(evt.target.id, false);
        };
        UserForm.prototype.getErrors = function () {
            var error = false;
            if(this.uname.val() == "") {
                this.setFieldError("uname", error = true);
            } else {
                this.setFieldError("uname", false);
            }
            if(this.password.val() == "") {
                this.setFieldError("password", error = true);
            } else {
                this.setFieldError("password", false);
            }
            if(this.password.val() != "" && this.confirm.val() != this.password.val()) {
                this.setFieldError("confirm", error = true);
            } else {
                this.setFieldError("confirm", false);
            }
            var selected = parseInt(this.department.val()) + 1;
            var deptEnumList = EmployeeAdmin.DeptEnum.getComboList();
            var department = deptEnumList[selected];
            if(department.equals(EmployeeAdmin.DeptEnum.NONE_SELECTED)) {
                this.setFieldError("department", error = true);
            } else {
                this.setFieldError("department", false);
            }
            return error;
        };
        UserForm.prototype.setFieldError = function (fieldName, error) {
            var label = this.userFormPanel.find('label[for="' + fieldName + '"]');
            var field = this.userFormPanel.find("#" + fieldName);
            if(error) {
                field.addClass("fieldError");
            } else {
                field.removeClass("fieldError");
            }
        };
        UserForm.ADD = "add";
        UserForm.UPDATE = "update";
        UserForm.CANCEL = "cancel";
        UserForm.MODE_ADD = "modeAdd";
        UserForm.MODE_EDIT = "modeEdit";
        return UserForm;
    })(EmployeeAdmin.UiComponent);
    EmployeeAdmin.UserForm = UserForm;    
})(EmployeeAdmin || (EmployeeAdmin = {}));

var EmployeeAdmin;
(function (EmployeeAdmin) {
    "use strict";
    var UserList = (function (_super) {
        __extends(UserList, _super);
        function UserList() {
                _super.call(this);
            this.userListPanel = null;
            this.userList = null;
            this.newButton = null;
            this.selectedUser = null;
            this.users = null;
            this.initializeChildren();
            this.bindListeners();
        }
        UserList.prototype.initializeChildren = function () {
            this.userListPanel = jQuery(".user-list-panel");
            this.userList = this.userListPanel.find("#user-list");
            this.userList.jqGrid({
                datatype: "local",
                width: 630,
                height: 160,
                colNames: [
                    "User Name", 
                    "First Name", 
                    "Last Name", 
                    "Email", 
                    "Department"
                ],
                colModel: [
                    {
                        name: "uname",
                        index: "uname",
                        width: 125
                    }, 
                    {
                        name: "fname",
                        index: "fname",
                        width: 125
                    }, 
                    {
                        name: "lname",
                        index: "lname",
                        width: 125
                    }, 
                    {
                        name: "email",
                        index: "email",
                        width: 130
                    }, 
                    {
                        name: "department",
                        index: "department",
                        width: 125
                    }
                ]
            });
            this.newButton = this.userListPanel.find(".new-button").button();
            this.deleteButton = this.userListPanel.find(".delete-button").button();
            this.deleteButton.button("disable");
        };
        UserList.prototype.bindListeners = function () {
            var namespace = ".UserList";
            this.userList.jqGrid("setGridParam", {
                onSelectRow: jQuery.proxy(this, "userList_selectHandler")
            });
            this.newButton.on("click" + namespace, jQuery.proxy(this, "newButton_clickHandler"));
            this.deleteButton.on("click" + namespace, jQuery.proxy(this, "deleteButton_clickHandler"));
        };
        UserList.prototype.unbindListeners = function () {
            var namespace = ".UserList";
            this.userList.jqGrid("setGridParam", {
                onSelectRow: null
            });
            this.newButton.off("click" + namespace);
            this.deleteButton.off("click" + namespace);
        };
        UserList.prototype.setUsers = function (userList) {
            this.users = userList;
            this.userList.jqGrid("clearGridData");
            for(var i = 0; i < userList.length; i++) {
                var user = userList[i];
                var rowData = {
                    uname: user.uname,
                    fname: user.fname,
                    lname: user.lname,
                    email: user.email,
                    department: user.department.value
                };
                this.userList.jqGrid("addRowData", i + 1, rowData);
            }
        };
        UserList.prototype.getSelectedUser = function () {
            return this.selectedUser;
        };
        UserList.prototype.deSelect = function () {
            this.userList.jqGrid("resetSelection");
            this.selectedUser = null;
            this.deleteButton.button("disable");
        };
        UserList.prototype.userList_selectHandler = function (id) {
            var rowData = this.userList.jqGrid("getRowData", id);
            var uname;
            for(var i = 0; i < this.users.length; i++) {
                if(this.users[i].uname == rowData.uname) {
                    uname = rowData.uname;
                    break;
                }
            }
            this.selectedUser = uname;
            this.dispatchEvent(UserList.SELECT);
            this.deleteButton.button("enable");
        };
        UserList.prototype.newButton_clickHandler = function () {
            this.deSelect();
            this.dispatchEvent(UserList.NEW);
        };
        UserList.prototype.deleteButton_clickHandler = function () {
            this.dispatchEvent(UserList.DELETE);
        };
        UserList.NEW = "new";
        UserList.DELETE = "delete";
        UserList.SELECT = "select";
        return UserList;
    })(EmployeeAdmin.UiComponent);
    EmployeeAdmin.UserList = UserList;    
})(EmployeeAdmin || (EmployeeAdmin = {}));

var EmployeeAdmin;
(function (EmployeeAdmin) {
    "use strict";
    var PrepViewCommand = (function (_super) {
        __extends(PrepViewCommand, _super);
        function PrepViewCommand() {
            _super.apply(this, arguments);

        }
        PrepViewCommand.prototype.execute = function (note) {
            var userForm = new EmployeeAdmin.UserForm();
            var userList = new EmployeeAdmin.UserList();
            var rolePanel = new EmployeeAdmin.RolePanel();
            var userListMediator = new EmployeeAdmin.UserListMediator(EmployeeAdmin.MediatorNames.USER_LIST_MEDIATOR, userList);
            var userFormMediator = new EmployeeAdmin.UserFormMediator(EmployeeAdmin.MediatorNames.USER_FORM_MEDIATOR, userForm);
            var rolePanelMediator = new EmployeeAdmin.RolePanelMediator(EmployeeAdmin.MediatorNames.ROLE_PANEL_MEDIATOR, rolePanel);
            this.facade.registerMediator(userFormMediator);
            this.facade.registerMediator(userListMediator);
            this.facade.registerMediator(rolePanelMediator);
        };
        return PrepViewCommand;
    })(puremvc.SimpleCommand);
    EmployeeAdmin.PrepViewCommand = PrepViewCommand;    
})(EmployeeAdmin || (EmployeeAdmin = {}));

var EmployeeAdmin;
(function (EmployeeAdmin) {
    "use strict";
    var StartupCommand = (function (_super) {
        __extends(StartupCommand, _super);
        function StartupCommand() {
            _super.apply(this, arguments);

        }
        StartupCommand.prototype.initializeMacroCommand = function (note) {
            this.addSubCommand(EmployeeAdmin.PrepModelCommand);
            this.addSubCommand(EmployeeAdmin.PrepViewCommand);
        };
        return StartupCommand;
    })(puremvc.SimpleCommand);
    EmployeeAdmin.StartupCommand = StartupCommand;    
})(EmployeeAdmin || (EmployeeAdmin = {}));

var EmployeeAdmin;
(function (EmployeeAdmin) {
    "use strict";
    var RoleEnum = (function () {
        function RoleEnum(value, ordinal) {
            this.ordinal = null;
            this.value = null;
            this.value = value;
            this.ordinal = ordinal;
        }
        RoleEnum.prototype.equals = function (roleEnum) {
            return (this.ordinal == roleEnum.ordinal && this.value == roleEnum.value);
        };
        RoleEnum.NONE_SELECTED = new RoleEnum("Select a role", -1);
        RoleEnum.ADMIN = new RoleEnum("Administrator", 0);
        RoleEnum.ACCT_PAY = new RoleEnum("Accounts Payable", 1);
        RoleEnum.ACCT_RCV = new RoleEnum("Accounts Receivable", 2);
        RoleEnum.EMP_BENEFITS = new RoleEnum("Employee Benefits", 3);
        RoleEnum.GEN_LEDGER = new RoleEnum("General Ledger", 4);
        RoleEnum.PAYROLL = new RoleEnum("Payroll", 5);
        RoleEnum.INVENTORY = new RoleEnum("Inventory", 6);
        RoleEnum.PRODUCTION = new RoleEnum("Production", 7);
        RoleEnum.QUALITY_CTL = new RoleEnum("Quality Control", 8);
        RoleEnum.SALES = new RoleEnum("Sales", 9);
        RoleEnum.ORDERS = new RoleEnum("Orders", 10);
        RoleEnum.CUSTOMERS = new RoleEnum("Customers", 11);
        RoleEnum.SHIPPING = new RoleEnum("Shipping", 12);
        RoleEnum.RETURNS = new RoleEnum("Returns", 13);
        RoleEnum.getList = function getList() {
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
        RoleEnum.getComboList = function getComboList() {
            var cList = RoleEnum.getList();
            cList.unshift(RoleEnum.NONE_SELECTED);
            return cList;
        }
        RoleEnum.getItem = function getItem(ordinal) {
            var list = RoleEnum.getList();
            for(var i = 0; i < list.length; i++) {
                if(RoleEnum[list[i]].ordinal == ordinal) {
                    return RoleEnum[list[i]];
                }
            }
            return null;
        }
        return RoleEnum;
    })();
    EmployeeAdmin.RoleEnum = RoleEnum;    
})(EmployeeAdmin || (EmployeeAdmin = {}));

