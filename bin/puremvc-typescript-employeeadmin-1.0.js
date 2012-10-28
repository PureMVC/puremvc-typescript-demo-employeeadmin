var ApplicationFacade = Objs("org.puremvc.js.demos.objs.employeeadmin.ApplicationFacade", Facade, {
    startup: function (app) {
        this.sendNotification(NotificationNames.STARTUP, app);
    },
    initializeController: function () {
        ApplicationFacade.$super.initializeController.call(this);
        this.registerCommand(NotificationNames.STARTUP, StartupCommand);
        this.registerCommand(NotificationNames.DELETE_USER, DeleteUserCommand);
    }
});
ApplicationFacade.getInstance = function () {
    if(!Facade.instance) {
        Facade.instance = new ApplicationFacade();
    }
    return Facade.instance;
};
var MediatorNames = Objs("org.puremvc.js.demos.objs.employeeadmin.abc.MediatorNames", {
});
MediatorNames.USER_FORM_MEDIATOR = "userFormMediator";
MediatorNames.USER_LIST_MEDIATOR = "userListMediator";
MediatorNames.ROLE_PANEL_MEDIATOR = "rolePanelMediator";
var NotificationNames = Objs("org.puremvc.js.demos.objs.employeeadmin.abc.NotificationNames", {
});
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
var ProxyNames = Objs("org.puremvc.js.demos.objs.employeeadmin.abc.ProxyNames", {
});
ProxyNames.ROLE_PROXY = "roleProxy";
ProxyNames.USER_PROXY = "userProxy";
var DeleteUserCommand = Objs("org.puremvc.js.demos.objs.employeeadmin.controller.DeleteUserCommand", SimpleCommand, {
    execute: function (note) {
        var user = note.getBody();
        var userProxy = this.facade.retrieveProxy(ProxyNames.USER_PROXY);
        var roleProxy = this.facade.retrieveProxy(ProxyNames.ROLE_PROXY);
        userProxy.deleteItem(user);
        roleProxy.deleteItem(user);
        this.sendNotification(NotificationNames.USER_DELETED);
    }
});
var PrepModelCommand = Objs("org.puremvc.js.demos.objs.employeeadmin.controller.PrepModelCommand", SimpleCommand, {
    execute: function (note) {
        this.facade.registerProxy(new UserProxy(ProxyNames.USER_PROXY, this.generateUsers()));
        this.facade.registerProxy(new RoleProxy(ProxyNames.ROLE_PROXY, this.generateRoles()));
    },
    generateUsers: function () {
        var user;
        var users = new Array();
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
        return users;
    },
    generateRoles: function () {
        var role;
        var roles = new Array();
        role = new RoleVO();
        role.uname = "lstooge";
        role.roles = [
            RoleEnum.PAYROLL, 
            RoleEnum.EMP_BENEFITS
        ];
        roles.push(role);
        role = new RoleVO();
        role.uname = "cstooge";
        role.roles = [
            RoleEnum.ACCT_PAY, 
            RoleEnum.ACCT_RCV, 
            RoleEnum.GEN_LEDGER
        ];
        roles.push(role);
        role = new RoleVO();
        role.uname = "mstooge";
        role.roles = [
            RoleEnum.INVENTORY, 
            RoleEnum.PRODUCTION, 
            RoleEnum.SALES, 
            RoleEnum.SHIPPING
        ];
        roles.push(role);
        return roles;
    }
});
var PrepViewCommand = Objs("org.puremvc.js.demos.objs.employeeadmin.controller.PrepViewCommand", SimpleCommand, {
    execute: function (note) {
        var userForm = new UserForm();
        var userList = new UserList();
        var rolePanel = new RolePanel();
        var userListMediator = new UserListMediator(MediatorNames.USER_LIST_MEDIATOR, userList);
        var userFormMediator = new UserFormMediator(MediatorNames.USER_FORM_MEDIATOR, userForm);
        var rolePanelMediator = new RolePanelMediator(MediatorNames.ROLE_PANEL_MEDIATOR, rolePanel);
        this.facade.registerMediator(userFormMediator);
        this.facade.registerMediator(userListMediator);
        this.facade.registerMediator(rolePanelMediator);
    }
});
var StartupCommand = Objs("org.puremvc.js.demos.objs.employeeadmin.controller.StartupCommand", MacroCommand, {
    initializeMacroCommand: function (note) {
        this.addSubCommand(PrepModelCommand);
        this.addSubCommand(PrepViewCommand);
    }
});
var RoleProxy = Objs("org.puremvc.js.demos.objs.employeeadmin.model.RoleProxy", Proxy, {
    initialize: function (name, roles) {
        RoleProxy.$super.initialize.call(this, name, roles);
        return this;
    },
    getRoles: function () {
        return this.data;
    },
    addItem: function (role) {
        this.getRoles().push(role);
    },
    deleteItem: function (item) {
        var roles = this.getRoles();
        for(var i = 0; i < roles.length; i++) {
            if(roles[i].uname == item.uname) {
                roles.splice(i, 1);
                break;
            }
        }
    },
    doesUserHaveRole: function (user, role) {
        var roles = this.getRoles();
        var hasRole = false;
        for(var i = 0; i < roles.length; i++) {
            if(roles[i].uname == user.uname) {
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
    },
    addRoleToUser: function (user, role) {
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
    },
    removeRoleFromUser: function (user, role) {
        var roles = this.getRoles();
        if(this.doesUserHaveRole(user, role)) {
            for(var i = 0; i < roles.length; i++) {
                if(roles[i].uname == user.uname) {
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
    },
    getUserRoles: function (uname) {
        var roles = this.getRoles();
        var userRoles = new Array();
        for(var i = 0; i < roles.length; i++) {
            if(roles[i].uname == uname) {
                userRoles = roles[i].roles;
                break;
            }
        }
        return userRoles;
    }
});
var UserProxy = Objs("org.puremvc.js.demos.objs.employeeadmin.model.UserProxy", Proxy, {
    initialize: function (name, users) {
        UserProxy.$super.initialize.call(this, name, users);
    },
    getUsers: function () {
        return this.data;
    },
    addItem: function (user) {
        this.getUsers().push(user);
    },
    getUser: function (uname) {
        var users = this.getUsers();
        for(var i = 0; i < users.length; i++) {
            if(users[i].uname == uname) {
                return users[i];
            }
        }
        return null;
    },
    updateItem: function (user) {
        var users = this.getUsers();
        for(var i = 0; i < users.length; i++) {
            if(users[i].uname == user.uname) {
                users[i] = user;
            }
        }
    },
    deleteItem: function (user) {
        var users = this.getUsers();
        for(var i = 0; i < users.length; i++) {
            if(users[i].uname == user.uname) {
                users.splice(i, 1);
            }
        }
    }
});
var DeptEnum = Objs("org.puremvc.js.demos.objs.employeeadmin.model.enum.DeptEnum", {
    initialize: function (value, ordinal) {
        this.value = value;
        this.ordinal = ordinal;
    },
    ordinal: null,
    value: null,
    equals: function (deptEnum) {
        return (this.ordinal == deptEnum.ordinal && this.value == deptEnum.value);
    }
});
DeptEnum.NONE_SELECTED = new DeptEnum("Select a department", -1);
DeptEnum.ACCT = new DeptEnum("Accounting", 0);
DeptEnum.SALES = new DeptEnum("Sales", 1);
DeptEnum.PLANT = new DeptEnum("Plant", 2);
DeptEnum.SHIPPING = new DeptEnum("Shipping", 3);
DeptEnum.QC = new DeptEnum("Quality Control", 4);
DeptEnum.getList = function () {
    return [
        DeptEnum.ACCT, 
        DeptEnum.SALES, 
        DeptEnum.PLANT
    ];
};
DeptEnum.getComboList = function () {
    var cList = DeptEnum.getList();
    cList.unshift(DeptEnum.NONE_SELECTED);
    return cList;
};
var RoleEnum = Objs("org.puremvc.js.demos.objs.employeeadmin.model.enum.RoleEnum", {
    ordinal: null,
    value: null,
    initialize: function (value, ordinal) {
        this.value = value;
        this.ordinal = ordinal;
    },
    equals: function (roleEnum) {
        return (this.ordinal == roleEnum.ordinal && this.value == roleEnum.value);
    }
});
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
RoleEnum.getList = function () {
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
};
RoleEnum.getComboList = function () {
    var cList = RoleEnum.getList();
    cList.unshift(RoleEnum.NONE_SELECTED);
    return cList;
};
RoleEnum.getItem = function (ordinal) {
    var list = RoleEnum.getList();
    for(var i = 0; i < list.length; i++) {
        if(RoleEnum[list[i]].ordinal == ordinal) {
            return RoleEnum[list[i]];
        }
    }
    return null;
};
var RoleVO = Objs("org.puremvc.js.demos.objs.employeeadmin.model.vo.RoleVO", {
    uname: "",
    roles: []
});
var UserVO = Objs("org.puremvc.js.demos.objs.employeeadmin.model.vo.UserVO", {
    uname: "",
    fname: "",
    lname: "",
    email: "",
    password: "",
    department: DeptEnum.NONE_SELECTED,
    getIsValid: function () {
        return this.uname != "" && this.password != "" && this.department != DeptEnum.NONE_SELECTED;
    },
    getGivenName: function () {
        return this.lname + ", " + this.fname;
    }
});
var RolePanelMediator = Objs("org.puremvc.js.demos.objs.employeeadmin.view.components.RolePaneMediator", Mediator, {
    roleProxy: null,
    initialize: function (name, viewComponent) {
        RolePanelMediator.$super.initialize.call(this, RolePanelMediator.NAME, viewComponent);
        this.registerListeners();
        this.roleProxy = this.facade.retrieveProxy(ProxyNames.ROLE_PROXY);
    },
    getRolePanel: function () {
        return this.viewComponent;
    },
    registerListeners: function () {
        var rolePanel = this.getRolePanel();
        rolePanel.addEventListener(RolePanel.ADD, this.onAddRole, this);
        rolePanel.addEventListener(RolePanel.REMOVE, this.onRemoveRole, this);
    },
    unregisterListeners: function () {
        var rolePanel = this.getRolePanel();
        rolePanel.removeEventListener(RolePanel.ADD, this.onAddRole, this);
        rolePanel.removeEventListener(RolePanel.REMOVE, this.onRemoveRole, this);
    },
    onAddRole: function (event) {
        this.roleProxy.addRoleToUser(this.getRolePanel().getUser(), this.getRolePanel().getSelectedRole());
        this.updateUserRoleList();
        this.getRolePanel().setMode(null);
    },
    onRemoveRole: function (event) {
        this.roleProxy.removeRoleFromUser(this.getRolePanel().getUser(), this.getRolePanel().getSelectedRole());
        this.updateUserRoleList();
        this.getRolePanel().setMode(null);
    },
    updateUserRoleList: function () {
        var userName = this.getRolePanel().user.uname;
        var userRoles = this.roleProxy.getUserRoles(userName);
        this.getRolePanel().setUserRoles(userRoles);
    },
    listNotificationInterests: function () {
        return [
            NotificationNames.NEW_USER, 
            NotificationNames.USER_ADDED, 
            NotificationNames.USER_UPDATED, 
            NotificationNames.USER_DELETED, 
            NotificationNames.CANCEL_SELECTED, 
            NotificationNames.USER_SELECTED, 
            NotificationNames.ADD_ROLE_RESULT
        ];
    },
    handleNotification: function (note) {
        var rolePanel = this.getRolePanel();
        switch(note.getName()) {
            case NotificationNames.NEW_USER: {
                rolePanel.clearForm();
                rolePanel.setEnabled(false);
                break;

            }
            case NotificationNames.USER_ADDED: {
                rolePanel.user = note.getBody();
                var roleVO = new RoleVO();
                roleVO.uname = rolePanel.user.uname;
                this.roleProxy.addItem(roleVO);
                rolePanel.clearForm();
                rolePanel.setEnabled(false);
                break;

            }
            case NotificationNames.USER_UPDATED: {
                rolePanel.clearForm();
                rolePanel.setEnabled(false);
                break;

            }
            case NotificationNames.USER_DELETED: {
                rolePanel.clearForm();
                rolePanel.setEnabled(false);
                break;

            }
            case NotificationNames.CANCEL_SELECTED: {
                rolePanel.clearForm();
                rolePanel.setEnabled(false);
                break;

            }
            case NotificationNames.USER_SELECTED: {
                rolePanel.clearForm();
                rolePanel.setEnabled(true);
                rolePanel.setMode(null);
                rolePanel.user = note.getBody();
                this.updateUserRoleList();
                break;

            }
            case NotificationNames.ADD_ROLE_RESULT: {
                this.updateUserRoleList();
                break;

            }
        }
    },
    onRemove: function () {
        this.unregisterListeners();
        this.getRolePanel().unbindListeners();
    }
});
var UserFormMediator = Objs("org.puremvc.js.demos.objs.employeeadmin.view.UserFormMediator", Mediator, {
    userProxy: null,
    initialize: function (name, viewComponent) {
        UserFormMediator.$super.initialize.call(this, name, viewComponent);
        this.registerListeners();
        this.userProxy = this.facade.retrieveProxy(ProxyNames.USER_PROXY);
    },
    getUserForm: function () {
        return this.viewComponent;
    },
    registerListeners: function () {
        var userForm = this.getUserForm();
        userForm.addEventListener(UserForm.ADD, this.onAdd, this);
        userForm.addEventListener(UserForm.UPDATE, this.onUpdate, this);
        userForm.addEventListener(UserForm.CANCEL, this.onCancel, this);
    },
    unregisterListeners: function () {
        var userForm = this.getUserForm();
        userForm.addEventListener(UserForm.ADD, this.onAdd, this);
        userForm.addEventListener(UserForm.UPDATE, this.onUpdate, this);
        userForm.addEventListener(UserForm.CANCEL, this.onCancel, this);
    },
    onAdd: function (event) {
        var user = this.getUserForm().getUser();
        this.userProxy.addItem(user);
        this.sendNotification(NotificationNames.USER_ADDED, user);
        var userForm = this.getUserForm();
        userForm.clearForm();
        userForm.setEnabled(false);
        userForm.setMode(UserForm.MODE_ADD);
    },
    onUpdate: function () {
        var user = this.getUserForm().getUser();
        this.userProxy.updateItem(user);
        this.sendNotification(NotificationNames.USER_UPDATED, user);
        var userForm = this.getUserForm();
        userForm.clearForm();
        userForm.setEnabled(false);
        userForm.setMode(UserForm.MODE_ADD);
    },
    onCancel: function () {
        this.sendNotification(NotificationNames.CANCEL_SELECTED);
        var userForm = this.getUserForm();
        userForm.clearForm();
        userForm.setEnabled(false);
        userForm.setMode(UserForm.MODE_ADD);
    },
    listNotificationInterests: function () {
        return [
            NotificationNames.NEW_USER, 
            NotificationNames.USER_DELETED, 
            NotificationNames.USER_SELECTED
        ];
    },
    handleNotification: function (note) {
        var userForm = this.getUserForm();
        var user;
        switch(note.getName()) {
            case NotificationNames.NEW_USER: {
                userForm.setUser(note.getBody());
                userForm.setMode(UserForm.MODE_ADD);
                userForm.setEnabled(true);
                userForm.setFocus();
                break;

            }
            case NotificationNames.USER_DELETED: {
                userForm.clearForm();
                userForm.setEnabled(false);
                break;

            }
            case NotificationNames.USER_SELECTED: {
                user = note.getBody();
                userForm.clearForm();
                userForm.setUser(user);
                userForm.setMode(UserForm.MODE_EDIT);
                userForm.setEnabled(true);
                userForm.setFocus();
                break;

            }
        }
    },
    onRemove: function () {
        this.unregisterListeners();
        this.getUserForm().unbindListeners();
    }
});
UserFormMediator.ADD = "add";
UserFormMediator.UPDATE = "update";
UserFormMediator.CANCEL = "cancel";
UserFormMediator.MODE_ADD = "modeAdd";
UserFormMediator.MODE_EDIT = "modeEdit";
var UserListMediator = Objs("org.puremvc.js.demos.objs.employeeadmin.view.UserListMediator", Mediator, {
    userList: null,
    initialize: function (name, viewComponent) {
        UserListMediator.$super.initialize.call(this, name, viewComponent);
        this.registerListeners();
        var userProxy = this.facade.retrieveProxy(ProxyNames.USER_PROXY);
        viewComponent.setUsers(userProxy.getUsers());
    },
    registerListeners: function () {
        var userList = this.getUserList();
        userList.addEventListener(UserList.NEW, this.onNew, this);
        userList.addEventListener(UserList.DELETE, this.onDelete, this);
        userList.addEventListener(UserList.SELECT, this.onSelect, this);
    },
    unregisterListeners: function () {
        var userList = this.getUserList();
        userList.removeEventListener(UserList.NEW, this.onNew, this);
        userList.removeEventListener(UserList.DELETE, this.onDelete, this);
        userList.removeEventListener(UserList.SELECT, this.onSelect, this);
    },
    getUserList: function () {
        return this.viewComponent;
    },
    listNotificationInterests: function () {
        return [
            NotificationNames.CANCEL_SELECTED, 
            NotificationNames.USER_UPDATED, 
            NotificationNames.USER_ADDED, 
            NotificationNames.USER_DELETED
        ];
    },
    handleNotification: function (note) {
        var userList = this.getUserList();
        var userProxy = this.facade.retrieveProxy(ProxyNames.USER_PROXY);
        switch(note.getName()) {
            case NotificationNames.CANCEL_SELECTED: {
                userList.deSelect();
                break;

            }
            case NotificationNames.USER_UPDATED: {
                userList.setUsers(userProxy.getUsers());
                userList.deSelect();
                break;

            }
            case NotificationNames.USER_ADDED: {
                userList.setUsers(userProxy.getUsers());
                userList.deSelect();
                break;

            }
            case NotificationNames.USER_DELETED: {
                userList.setUsers(userProxy.getUsers());
                userList.deSelect();
                break;

            }
        }
    },
    onNew: function () {
        var user = new UserVO();
        this.sendNotification(NotificationNames.NEW_USER, user);
    },
    onDelete: function () {
        var uname = this.getUserList().getSelectedUser();
        var userProxy = this.facade.retrieveProxy(ProxyNames.USER_PROXY);
        var selectedUser = userProxy.getUser(uname);
        this.sendNotification(NotificationNames.DELETE_USER, selectedUser);
    },
    onSelect: function () {
        var uname = this.getUserList().getSelectedUser();
        var userProxy = this.facade.retrieveProxy(ProxyNames.USER_PROXY);
        var selectedUser = userProxy.getUser(uname);
        this.sendNotification(NotificationNames.USER_SELECTED, selectedUser);
    },
    onRemove: function () {
        this.unregisterListeners();
        this.getUserList().unbindListeners();
    }
});
var RolePanel = Objs("org.puremvc.js.demos.objs.employeeadmin.view.components.RolePanel", UiComponent, {
    user: null,
    userRoles: null,
    selectedRole: null,
    mode: null,
    rolePanel: null,
    roleList: null,
    userRoleList: null,
    addRoleButton: null,
    removeRoleButton: null,
    initialize: function () {
        RolePanel.$super.initialize.call(this);
        this.initializeChildren();
        this.bindListeners();
        this.fillRoleList();
        this.setEnabled(false);
    },
    initializeChildren: function () {
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
    },
    bindListeners: function () {
        var namespace = ".UserRoleList";
        this.addRoleButton.on("click" + namespace, jQuery.proxy(this, "addRoleButton_clickHandler"));
        this.removeRoleButton.on("click" + namespace, jQuery.proxy(this, "removeRoleButton_clickHandler"));
        this.roleList.on("change" + namespace, jQuery.proxy(this, "roleList_changeHandler"));
        this.userRoleList.jqGrid("setGridParam", {
            onSelectRow: jQuery.proxy(this, "userRoleList_changeHandler")
        });
    },
    unbindListeners: function () {
        var namespace = ".UserRoleList";
        this.addRoleButton.off("click" + namespace);
        this.removeRoleButton.off("click" + namespace);
        this.roleList.off("change" + namespace);
        this.userRoleList.jqGrid("setGridParam", {
            onSelectRow: null
        });
    },
    fillRoleList: function () {
        var roleEnumList = RoleEnum.getComboList();
        this.roleList.empty();
        var htmlList = "";
        for(var i = 0; i < roleEnumList.length; i++) {
            var role = roleEnumList[i];
            var valueAttr = 'value="' + role.ordinal + '"';
            var selectedAttr = i == 0 ? "selected" : "";
            htmlList += '<option ' + valueAttr + ' ' + selectedAttr + ' >' + role.value + '</option>';
        }
        this.roleList.html(htmlList);
    },
    setUserRoles: function (userRoles) {
        this.userRoleList.jqGrid('clearGridData');
        if(!userRoles) {
            return;
        }
        this.userRoles = userRoles;
        for(var i = 0; i < userRoles.length; i++) {
            var role = userRoles[i];
            var rowData = role;
            this.userRoleList.jqGrid('addRowData', i + 1, rowData);
        }
    },
    getUser: function () {
        return this.user;
    },
    getSelectedRole: function () {
        return this.selectedRole;
    },
    setEnabled: function (isEnabled) {
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
    },
    setMode: function (mode) {
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
    },
    clearForm: function () {
        this.user = null;
        this.setUserRoles(null);
        this.roleList.prop("selectedIndex", 0);
        this.userRoleList.jqGrid('resetSelection');
    },
    addRoleButton_clickHandler: function () {
        this.dispatchEvent(RolePanel.ADD);
    },
    removeRoleButton_clickHandler: function () {
        this.dispatchEvent(RolePanel.REMOVE);
    },
    userRoleList_changeHandler: function (id) {
        var index = this.userRoleList.jqGrid('getInd', id);
        this.selectedRole = this.userRoles[index - 1];
        this.setMode(RolePanel.REMOVE_MODE);
    },
    roleList_changeHandler: function () {
        this.userRoleList.jqGrid('resetSelection');
        var roleEnumList = RoleEnum.getComboList();
        this.selectedRole = roleEnumList[this.roleList.prop("selectedIndex")];
        var alreadyInList = false;
        for(var i = 0; i < this.userRoles.length; i++) {
            var role = this.userRoles[i];
            if(role.equals(this.selectedRole)) {
                alreadyInList = true;
                break;
            }
        }
        if(this.selectedRole == RoleEnum.NONE_SELECTED || alreadyInList) {
            this.setMode(null);
        } else {
            this.setMode(RolePanel.ADD_MODE);
        }
    }
});
RolePanel.ADD = "add";
RolePanel.REMOVE = "remove";
RolePanel.ADD_MODE = "addMode";
RolePanel.REMOVE_MODE = "removeMode";
var UiComponent = Objs("org.puremvc.js.demos.objs.employeeadmin.view.components.UiComponent", {
    initialize: function () {
        this.listenerMap = {
        };
    },
    listenerMap: null,
    dispatchEvent: function (type, properties) {
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
    },
    addEventListener: function (type, listener, context) {
        if(typeof type == "undefined") {
            return;
        }
        if(typeof listener == "undefined") {
            return;
        }
        var newListener = new UiComponent.ListenerDescriptor(listener, context);
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
    },
    removeEventListener: function (type, listener, context) {
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
            if(listenerDescriptor.equals(new UiComponent.ListenerDescriptor(listener, context))) {
                queue.splice(i, 1);
                return;
            }
        }
    }
});
UiComponent.Event = Objs("org.puremvc.js.demos.objs.employeeadmin.view.components.UiComponent.Event", {
    type: null,
    properties: null
});
UiComponent.ListenerDescriptor = Objs("org.puremvc.js.demos.objs.employeeadmin.view.components.UiComponent.Event", {
    initialize: function (listener, context) {
        this.listener = listener;
        this.context = context;
    },
    equals: function (compared) {
        if(compared.listener == this.listener) {
            if(typeof compared.context != "undefined") {
                if(compared.context == null && this.context == null) {
                    return true;
                }
                if(compared.context == this.context) {
                    return true;
                }
            }
        }
        return false;
    }
});
UiComponent.QUEUE_PATTERN = '@_@';
var UserForm = Objs("org.puremvc.js.demos.objs.employeeadmin.view.components.UserForm", UiComponent, {
    userFormPanel: null,
    uname: null,
    fname: null,
    lname: null,
    email: null,
    password: null,
    confirm: null,
    department: null,
    submitButton: null,
    user: null,
    userRoles: null,
    mode: null,
    initialize: function () {
        UserForm.$super.initialize.call(this);
        this.initializeChildren();
        this.bindListeners();
        this.clearForm();
        this.setEnabled(false);
    },
    initializeChildren: function () {
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
    },
    bindListeners: function () {
        var namespace = ".UserForm";
        var focusEventProxy = jQuery.proxy(this, "field_focusHandler");
        this.uname.on("focus" + namespace, focusEventProxy);
        this.password.on("focus" + namespace, focusEventProxy);
        this.confirm.on("focus" + namespace, focusEventProxy);
        this.department.on("focus" + namespace, focusEventProxy);
        this.submitButton.on("click" + namespace, jQuery.proxy(this, "submitButton_clickHandler"));
        this.cancelButton.on("click" + namespace, jQuery.proxy(this, "cancelButton_clickHandler"));
    },
    unbindListeners: function () {
        var namespace = ".UserForm";
        this.uname.off("focus" + namespace);
        this.password.off("focus" + namespace);
        this.confirm.off("focus" + namespace);
        this.department.off("focus" + namespace);
        this.roles.off("focus" + namespace);
        this.submitButton.off("click" + namespace);
        this.cancelButton.off("click" + namespace);
    },
    fillList: function (deptEnumList) {
        var htmlList = "";
        for(var i = 0; i < deptEnumList.length; i++) {
            var deptEnum = deptEnumList[i];
            var valueAttr = 'value="' + deptEnum.ordinal + '"';
            var selectedAttr = "";
            if(this.user && deptEnum.equals(this.user.department)) {
                selectedAttr = "selected";
            }
            if(!this.user && deptEnum.equals(DeptEnum.NONE_SELECTED)) {
                selectedAttr = "selected";
            }
            htmlList += "<option " + valueAttr + " " + selectedAttr + " >" + deptEnum.value + "</option>";
        }
        this.department.html(htmlList);
    },
    setFocus: function () {
        this.fname.focus();
    },
    setUser: function (user) {
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
            this.fillList(DeptEnum.getComboList());
        }
    },
    getUser: function () {
        this.updateUser();
        return this.user;
    },
    updateUser: function () {
        this.user.uname = this.uname.val();
        this.user.fname = this.fname.val();
        this.user.lname = this.lname.val();
        this.user.email = this.email.val();
        this.user.password = this.password.val();
        var selected = parseInt(this.department.val()) + 1;
        var deptEnumList = DeptEnum.getComboList();
        this.user.department = deptEnumList[selected];
    },
    clearForm: function () {
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
    },
    setEnabled: function (isEnabled) {
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
    },
    setMode: function (mode) {
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
    },
    submitButton_clickHandler: function () {
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
    },
    cancelButton_clickHandler: function () {
        this.dispatchEvent(UserForm.CANCEL);
    },
    field_focusHandler: function (evt) {
        this.setFieldError(evt.target.id, false);
    },
    getErrors: function () {
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
        var deptEnumList = DeptEnum.getComboList();
        var department = deptEnumList[selected];
        if(department.equals(DeptEnum.NONE_SELECTED)) {
            this.setFieldError("department", error = true);
        } else {
            this.setFieldError("department", false);
        }
        return error;
    },
    setFieldError: function (fieldName, error) {
        var label = this.userFormPanel.find('label[for="' + fieldName + '"]');
        var field = this.userFormPanel.find("#" + fieldName);
        if(error) {
            field.addClass("fieldError");
        } else {
            field.removeClass("fieldError");
        }
    }
});
UserForm.ADD = "add";
UserForm.UPDATE = "update";
UserForm.CANCEL = "cancel";
UserForm.MODE_ADD = "modeAdd";
UserForm.MODE_EDIT = "modeEdit";
var UserList = Objs("org.puremvc.js.demos.objs.employeeadmin.view.components.UserList", UiComponent, {
    userListPanel: null,
    userList: null,
    newButton: null,
    selectedUser: null,
    users: null,
    initialize: function () {
        UserList.$super.initialize.call(this);
        this.initializeChildren();
        this.bindListeners();
    },
    initializeChildren: function () {
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
    },
    bindListeners: function () {
        var namespace = ".UserList";
        this.userList.jqGrid("setGridParam", {
            onSelectRow: jQuery.proxy(this, "userList_selectHandler")
        });
        this.newButton.on("click" + namespace, jQuery.proxy(this, "newButton_clickHandler"));
        this.deleteButton.on("click" + namespace, jQuery.proxy(this, "deleteButton_clickHandler"));
    },
    unbindListeners: function () {
        var namespace = ".UserList";
        this.userList.jqGrid("setGridParam", {
            onSelectRow: null
        });
        this.newButton.off("click" + namespace);
        this.deleteButton.off("click" + namespace);
    },
    setUsers: function (userList) {
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
    },
    getSelectedUser: function () {
        return this.selectedUser;
    },
    userList_selectHandler: function (id) {
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
    },
    newButton_clickHandler: function () {
        this.deSelect();
        this.dispatchEvent(UserList.NEW);
    },
    deleteButton_clickHandler: function () {
        this.dispatchEvent(UserList.DELETE);
    },
    deSelect: function () {
        this.userList.jqGrid("resetSelection");
        this.selectedUser = null;
        this.deleteButton.button("disable");
    }
});
UserList.NEW = "new";
UserList.DELETE = "delete";
UserList.SELECT = "select";
