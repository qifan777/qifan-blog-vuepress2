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

## 后端模板

<center>
<img src="./img_1.png">

图1 后端模板结构
</center>

- dto：根据entity生成dto
    - request：dto中的request分别对应create/update/query三种请求。
    - response：通用的response用与返回查询的数据
- mapper：dto和entity之间的映射，可以灵活的控制各个字段的映射规则。
- controller：接收create（创建）、update（更新）、findById（根据id查询）、query（查询）、invalid（失效）、valid（生效）。
- service：对应controller中的api。
- repository：SpringDataJpa通用增删改查。
- predicate：query中的查询条件，根据实体类的字段生成。

### dto

下面展示以User实体类和UserCreateRequest为例子，UserCreateRequest是User的dto，字段的属性上名称是一致的但是类型不一定一致。`gender`、`roles`、`phonePassword`、`weChat`这四个属性的类型和实体类中的都不一致。

剩余的`UpdateRequest`、`QueryRequest`，`CommonResponse`都是一样的。

```java
@Data
public class UserCreateRequest implements BaseRequest {

  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
  private Integer version;
  private String nickname;
  private String avatar;
  private Integer gender = GenderType.PRIVATE.getCode();
  private Set<RoleCreateRequest> roles;
  private UserPhonePasswordCreateRequest phonePassword;
  private UserWeChatCreateRequest weChat;
}
```

用户实体类

```java
@GenEntity
@Entity
@Accessors(chain = true)
@Table(name = "USER")
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class User extends BaseEntity {

  @GenField(value = "用户昵称")
  private String nickname;

  @GenField(value = "用户头像", type = ItemType.PICTURE)
  private String avatar;

  @Convert(converter = GenderTypeConverter.class)
  @GenField(value = "性别", dtoType = "java.lang.Integer", type = ItemType.SELECTABLE, selectOptionClass = GenderType.class)
  private GenderType gender;

  @GenField(value = "角色列表", association = true, type = ItemType.NONE)
  @ManyToMany(fetch = FetchType.LAZY)
  @ToString.Exclude
  @JoinTable(name = "USER_ROLE", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
  private Set<Role> roles;

  @GenField(value = "手机号", bind = "phonePassword.phoneNumber")
  @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
  @ToString.Exclude
  private UserPhonePassword phonePassword;

  @GenField(value = "小程序openId", bind = "weChat.openId")
  @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
  @ToString.Exclude
  private UserWeChat weChat;

  @GenField(value = "是否生效", ignoreRequest = true, type = ItemType.NONE)
  @Convert(converter = ValidStatusConverter.class)
  private ValidStatus validStatus;

  @Override
  public void preCreate0() {
    valid();
  }

  public void valid() {
    setValidStatus(ValidStatus.VALID);
  }

  public void invalid() {
    setValidStatus(ValidStatus.INVALID);
  }

  @Override
  public final boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null) {
      return false;
    }
    Class<?> oEffectiveClass =
        o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer()
            .getPersistentClass() : o.getClass();
    Class<?> thisEffectiveClass =
        this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer()
            .getPersistentClass() : this.getClass();
    if (thisEffectiveClass != oEffectiveClass) {
      return false;
    }
    User user = (User) o;
    return getId() != null && Objects.equals(getId(), user.getId());
  }

  @Override
  public final int hashCode() {
    return getClass().hashCode();
  }
}
```

### Mapper

Mapper文件用于dto和实体类之间的映射，通过下面的几个方法的入参和返回值可以知道映射关系。

```java
@Mapper(
        uses = {CustomMapper.class},
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        componentModel = MappingConstants.ComponentModel.SPRING

)
public interface UserMapper {

    User createRequest2Entity(UserCreateRequest request);

    User queryRequest2Entity(UserQueryRequest request);

    User updateEntityFromUpdateRequest(UserUpdateRequest request, @MappingTarget User entity);

    UserResponse entity2Response(User entity);
}
```

### Controller

生成基本的增删改查生效失效。

```java
@RestController
@Slf4j
@AllArgsConstructor
@RequestMapping("user")
public class UserController {
    private final UserService userService;

    @GetMapping("{id}")
    public UserResponse findById(@PathVariable String id) {
        return userService.findById(id);
    }

    @PostMapping
    public String createUser(@RequestBody @Validated UserCreateRequest createRequest) {
        return userService.createUser(createRequest);
    }

    @PutMapping("{id}")
    public Boolean updateUser(@RequestBody UserUpdateRequest updateRequest, @PathVariable String id) {
        userService.updateUser(updateRequest, id);
        return true;
    }

    @PatchMapping("{id}/valid")
    public Boolean validUser(@PathVariable String id) {
        userService.validUser(id);
        return true;
    }

    @PatchMapping("{id}/invalid")
    public Boolean invalidUser(@PathVariable String id) {
        userService.invalidUser(id);
        return true;
    }

    @PostMapping("query")
    public Page<UserResponse> queryUser(
            @RequestBody QueryRequest<UserQueryRequest> queryRequest) {
        return userService.queryUser(queryRequest);
    }

    @DeleteMapping
    public Boolean deleteUser(@RequestBody List<String> ids) {
        return userService.deleteUser(ids);
    }
```

### Service

和Controller中的API一一对应。
::: info
service中使用的[EntityOperations](../reference/#entityoperations)是增改两个操作的流程封装。
:::

```java

@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class UserService {

  private final RoleMapper roleMapper;
  private final UserMapper userMapper;
  private final MenuMapper menuMapper;
  private final UserRepository userRepository;
  private final UserPhonePasswordMapper phonePasswordMapper;

  public UserResponse findById(String id) {
    return userMapper.entity2Response(userRepository.findById(id)
        .orElseThrow(() -> new BusinessException(ResultCode.NotFindError)));
  }

  public void updateUser(UserUpdateRequest request, String id) {
    EntityOperations.doUpdate(userRepository).loadById(id).update(e -> {
      userMapper.updateEntityFromUpdateRequest(request, e);
      if (e.getPhonePassword().getUser() == null) {
        e.getPhonePassword().setUser(e);
      }
    }).successHook(e -> log.info("更新user：{}", e)).execute();
  }

  public String createUser(UserCreateRequest request) {
    Optional<User> user = EntityOperations.doCreate(userRepository)
        .create(() -> userMapper.createRequest2Entity(request))
        .update(e -> e.getPhonePassword().setUser(e)).successHook(e -> log.info("创建user：{}", e))
        .execute();
    return user.isPresent() ? user.get().getId() : "";
  }

  public void validUser(String id) {
    EntityOperations.doUpdate(userRepository).loadById(id).update(User::valid)
        .successHook(e -> log.info("生效user：{}", e)).execute();
  }

  public void invalidUser(String id) {
    EntityOperations.doUpdate(userRepository).loadById(id).update(User::invalid)
        .successHook(e -> log.info("失效user：{}", e)).execute();
  }

  public Page<UserResponse> queryUser(QueryRequest<UserQueryRequest> request) {
    Page<User> page = userRepository.findAll((root, query, criteriaBuilder) -> {
      // 拼接User实体类上的查询条件
      List<Predicate> predicates = UserPredicate.predicate(root, criteriaBuilder,
          request.getQuery(), request.getMatchMode(), userMapper);
      // 拼接UserPhonePassword实体类上的查询条件
      Join<User, UserPhonePassword> phonePasswordJoin = root.join(User_.phonePassword,
          JoinType.LEFT);
      predicates.addAll(UserPhonePasswordPredicate.predicate(phonePasswordJoin, criteriaBuilder,
          request.getQuery().getPhonePassword(), request.getMatchMode(), phonePasswordMapper));
      return SpecificationUtils.conjunction(predicates, criteriaBuilder);
    }, request.toPageable());
    return page.map(userMapper::entity2Response);
  }
}
```

### Predicate

在Predicate中可以定义动态的查询条件，根据参数值是否存在来确定是否要拼接条件。

```java
@Slf4j
public class UserPredicate {

  public static <T> List<Predicate> predicate(From<T, User> root, CriteriaBuilder criteriaBuilder,
      UserQueryRequest request, QueryRequest.MatchMode matchMode, UserMapper userMapper) {
    List<Predicate> predicates = new ArrayList<>();
    User requestQuery = userMapper.queryRequest2Entity(request);
    if (StringUtils.hasText(requestQuery.getId())) {
      predicates.add(criteriaBuilder.equal(root.get(User_.id), requestQuery.getId()));
    }
    if (StringUtils.hasText(requestQuery.getNickname())) {
      predicates.add(criteriaBuilder.like(root.get(User_.nickname),
          matchMode.toPredicate(requestQuery.getNickname())));
    }
    // 根据
    if (requestQuery.getGender() != null) {
      predicates.add(criteriaBuilder.equal(root.get(User_.gender), requestQuery.getGender()));
    }

    return predicates;
  }
}
```

### Repository

```java
public interface UserRepository extends BaseRepository<User> {

}
```

## 后台管理模板

<center>
<img src="./img_2.png">

图2 后台管理模板
</center>

- view：展示页面
- query：查询框
- table：数据展示
- dialog：对话框，内涵create表单和update表单。
- createForm：创建表单
- updateForm：更新表单
- common：表格列，查询条件，创建/更新表单项
- store：状态管理

