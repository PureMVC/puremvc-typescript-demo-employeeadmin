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

var RoleVO = Objs("org.puremvc.js.demos.objs.employeeadmin.model.vo.RoleVO", {
    uname: "",
    roles: []
});
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
    })(SimpleCommand);
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
            var userProxy = new UserProxy(EmployeeAdmin.ProxyNames.USER_PROXY, this.generateUsers());
            var roleProxy = new RoleProxy(EmployeeAdmin.ProxyNames.ROLE_PROXY, this.generateRoles());
            this.facade.registerProxy(userProxy);
            this.facade.registerProxy(roleProxy);
        };
        PrepModelCommand.prototype.generateUsers = function () {
            var user;
            var users = new Array();
            user = new UserVO();
            user.uname = "lstooge";
            user.fname = "Larry";
            user.lname = "Stooge";
            user.email = "larry@stooges.com";
            user.password = "ijk456";
            user.department = EmployeeAdmin.DeptEnum.ACCT;
            users.push(user);
            user = new UserVO();
            user.uname = "cstooge";
            user.fname = "Curly";
            user.lname = "Stooge";
            user.email = "curly@stooges.com";
            user.password = "xyz987";
            user.department = EmployeeAdmin.DeptEnum.SALES;
            users.push(user);
            user = new UserVO();
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
        };
        return PrepModelCommand;
    })(SimpleCommand);
    EmployeeAdmin.PrepModelCommand = PrepModelCommand;    
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
            var userForm = new UserForm();
            var userList = new UserList();
            var rolePanel = new RolePanel();
            var userListMediator = new UserListMediator(EmployeeAdmin.MediatorNames.USER_LIST_MEDIATOR, userList);
            var userFormMediator = new UserFormMediator(EmployeeAdmin.MediatorNames.USER_FORM_MEDIATOR, userForm);
            var rolePanelMediator = new RolePanelMediator(EmployeeAdmin.MediatorNames.ROLE_PANEL_MEDIATOR, rolePanel);
            this.facade.registerMediator(userFormMediator);
            this.facade.registerMediator(userListMediator);
            this.facade.registerMediator(rolePanelMediator);
        };
        return PrepViewCommand;
    })(SimpleCommand);
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
    })(SimpleCommand);
    EmployeeAdmin.StartupCommand = StartupCommand;    
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

