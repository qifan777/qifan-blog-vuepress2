# 代码生成器

## 注解

### @GenEntity

在实体类上增加该注解自动生成后端增删改查和前端的增删改查。

### @GenField

用于生成后端查询条件、前端的表格、创建表单、删除表单、查询表单。

```java
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Target({ElementType.FIELD})
public @interface GenField {

  // 字段注释
  String value() default "";

  // 生成dto时的类型
  String dtoType() default "";

  // 是否是关联实体
  boolean association() default false;

  // 生成dto时在request中忽略
  boolean ignoreRequest() default false;

  // 生成dto时在response中忽略
  boolean ignoreResponse() default false;

  // 生成前端表单时选用的组件根据此字段生成。比如：ElInput,ELInputNumber
  ItemType type() default ItemType.INPUT_TEXT;

  // 前端v-model绑定的路径
  String bind() default "";

  // 枚举Class
  Class<? extends SelectableItem> selectOptionClass() default SelectableItem.class;

  // 获取所有的枚举值方法
  String selectOptionMethod() default "getSelectOptions";

  // 当type=INPUT_NUMBER时可以填写最大值和最小值在前端做限制
  String max() default "99999999";

  String min() default "0";

}
```

##  