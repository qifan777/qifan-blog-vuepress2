---
order: 0
---
# 模型设计

权限管理模型主要分以下几种

- ACL模型：访问控制列表
- DAC 模型：自主访问控制
- MAC 模型：强制访问控制
- ABAC 模型：基于属性的访问控制
- RBAC 模型：基于角色的权限访问控制
    - RBAC0 模型
    - RBAC1 模型
    - RBAC2 模型
    - RBAC3 模型

在上面的这么多模型中,RBAC这类的模型是应用最广泛的。然后根据系统的复杂度在RBAC0-3中进行选择。RBAC0就已经可以解决大部分小项目的需求了。

下面的内容就是实现RBAC0权限模型。

## ER图

```er 用户权限ER图
User ||--o{ UserRoleRel : "拥有"
UserRoleRel ||--o{ Role : "被拥有"
Role ||--o{ RoleMenuRel: "拥有"
RoleMenuRel ||--o{ Menu : "被拥有"
User {
    string id PK
}
UserRoleRel { 
    string id PK
    string userId FK "外键关联到user表主键"
    string roleId FK "外键关联到role表主键"
}
Role {
    string id PK
}

RoleMenuRel { 
    string id PK
    string roleId FK "外键关联到role表主键"
    string menuId FK "外键关联到menu表主键"
}
Menu {
    string id PK
}
```

## jimmer实现关系图

### User 实体类

user表中包含了一些必要的字段的，其余的拓展字段可以通过关联表的形式在后续增加。

```java
@Entity
@GenEntity
public interface User extends BaseDateTime {
    @Id
    @GeneratedValue(generatorType = UUIDIdGenerator.class)
    String id();

    @Key
    @GenField(value = "手机号", order = -1)
    String phone();

    String password();

    @GenField(value = "昵称", order = 0)
    String nickname();

    @GenField(value = "头像", type = ItemType.PICTURE, order = 1, nullable = true)
    @Nullable
    String avatar();

    @GenField(value = "性别", order = 3, type = ItemType.SELECTABLE, dictId = 1001, nullable = true)
    @Nullable
    String gender();
    // 参考ER图中的user拥有多个UserRoleRel
    @OneToMany(mappedBy = "user")
    List<UserRoleRel> roles();
    // 将UserRoleRel中的Role映射出来，方便获取用户关联的角色列表。
    @ManyToManyView(
            prop = "roles",
            deeperProp = "role"
    )
    List<Role> rolesView();
}
```

:::info
[@OneToMany(mappedBy = "xxx")](https://babyfish-ct.gitee.io/jimmer-doc/docs/mapping/base/association/one-to-many)代表一对多映射，和ER图中的一对多相对应。
由于一对多的一方不存在外键，因此为了确定是哪张表关联了自己需要指定`mappedBy = "xxx"`。

[@Key](https://babyfish-ct.gitee.io/jimmer-doc/docs/mapping/advanced/key)是业务主键。还有一种主键是`@Id`，这种主键和业务无关。
两者都可以唯一的标识一行记录，只是前者有业务的意义。如User表中的Phone也可以唯一代表一个用户，但是它多了一个业务含义——手机号。

[@ManyToManyView](https://babyfish-ct.gitee.io/jimmer-doc/docs/mapping/advanced/view/many-to-many-view#%E5%88%9D%E8%AF%86manytomanyview)：
在权限模型中，如果用户需要获得它关联的角色，需要通过下面这种方式获得`List<Role> roles=user.getRoles().map(userRoleRel -> userRoleRel.getRole()).toList();`。
使用`@ManyToManyView`可以便捷的将`UserRoleRel`中的`Role`获取。
:::

### UserRoleRel实体类

要实现两个实体类的多对多关联必然需要一张中间表。UserRoleRel就是负责建立起User 多——多 Role这个联系的中间表。

除了BaseEntity中的逻辑主键`@Id`之外，还包含了两个业务主键`@Key`，分别是userId和roleId。他们组合起来可以唯一标识一行记录，因此加上了`@Key`。

用户拥有多个角色，当减少关联的角色时我们希望删除掉UserRoleRel中相应的记录。[`@OnDissociate(DissociateAction.DELETE)`](https://babyfish-ct.gitee.io/jimmer-doc/docs/mutation/save-command/dissociation#%E8%84%B1%E5%8B%BE%E4%B8%AD%E9%97%B4%E8%A1%A8%E6%95%B0%E6%8D%AE)
即可达到这种脱钩操作。

```java
@Entity
public interface UserRoleRel extends BaseEntity {

    @OnDissociate(DissociateAction.DELETE)
    @ManyToOne
    @Key
    User user();

    @ManyToOne
    @Key
    Role role();
}
```

:::info
[BaseEntity](../reference/backend/README.md/#baseentity)包含通用的id, editedTime, createdTime, editor, creator。并且会自动填写这些字段。
:::

### Role实体类

根据ER图中可以知道角色是权限模型的核心部分，它不仅和用户建立起了多对多关系，同时也和菜单建立起了多对多关系。
因此下面的角色实体类中包含了两个中间表`RoleMenuRel`和`UserRoleRel`。

```java
@GenEntity
@Entity
public interface Role extends BaseEntity {
    // 业务主键
    @GenField(value = "角色名称")
    @Key
    String name();
    // 角色拥有多个菜单
    @OneToMany(mappedBy = "role")
    List<RoleMenuRel> menus();
    // 角色可以被多个用户拥有
    @OneToMany(mappedBy = "role")
    List<UserRoleRel> users();
    
    // 将RoleMenuRel中的Menu映射出来
    @ManyToManyView(prop = "menus")
    List<Menu> menusView();
}
```

### RoleMenuRel实体类

包含roleId和menuId，用于实现角色和菜单直接的多对多关联。参考[UserRoleRel](#userrolerel实体类)

```java
@Entity
public interface RoleMenuRel extends BaseEntity {

    @OnDissociate(DissociateAction.DELETE)
    @ManyToOne
    @Key
    Role role();

    @ManyToOne
    @Key
    Menu menu();
}

```

### Menu实体类

为了实现不同的角色显示的菜单和操作权限不一样，菜单表就诞生了。

由于菜单本身就是树状的结构，所以它还需要关联子菜单和父亲菜单。`@OneToMany  List<Menu> children();`关联了子菜单`@ManyToOne  Menu parent();`关联了父菜单。

```java
@GenEntity
@Entity
public interface Menu extends BaseEntity {
    @GenField(value = "菜单名称", order = 0)
    String name();

    @Nullable
    @ManyToOne
    Menu parent();

    @IdView
    @GenField(value = "父菜单Id", order = 1)
    @Nullable
    String parentId();

    @GenField(value = "路由路径", order = 2)
    String path();

    @GenField(value = "排序号")
    Integer orderNum();

    @GenField(value = "菜单类型", type = ItemType.SELECTABLE, dictId = 1002)
    String menuType();

    @GenField(value = "图标", type = ItemType.PICTURE, nullable = true)
    @Nullable
    String icon();

    @OneToMany(mappedBy = "parent")
    List<Menu> children();

    @OneToMany(mappedBy = "menu")
    List<RoleMenuRel> roles();
}
```

:::info
[@IdView](https://babyfish-ct.gitee.io/jimmer-doc/docs/mapping/advanced/view/id-view)可以将关联对象的id映射到当前的实体类。如果菜单想要获取父亲菜单的id，正常来说需要`menu.getParent().getId()`，这样就有点麻烦。使用`@IdView`生成`parentId`就代表着`parent.id`。
:::


