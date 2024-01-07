# 角色

角色的创建修改和[用户的创建修改](./user.md)差不多是一个意思。

## 创建角色配置菜单

### 修改dto

增加`menuIds`
```java
input RoleInput {
    #allScalars(Role)
    id?
    // 用于接收菜单id列表
    menuIds: Array<String>
}
``` 
### 前端实现


###