---
category:
  - 起凡小商店
  - 后端基础
tag:
  - JPA
  - 函数式抽象
date: 2023-09-10
timeline: true
---

# 后端基础

## BaseEntity

所有的实体都会继承该基础实体，里面包含了主键Id和Id的

```java

@MappedSuperclass
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public abstract class BaseEntity extends AbstractAggregateRoot<BaseEntity> {

  static final Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
  // 主键
  @Id
  // UUID生成策略
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;
  // 创建时间不允许修改，且不能为空
  @Column(name = "created_at", nullable = false, updatable = false)
  // 创建时自动填写当前时间
  @CreationTimestamp
  private LocalDateTime createdAt;
  // 更新时间
  @Column(name = "updated_at", nullable = false)
  // 更新时自动填写当前时间
  @UpdateTimestamp
  private LocalDateTime updatedAt;
  // 乐观锁并发控制
  @Version
  @Column(name = "version")
  private Integer version;

  // 实体插入到数据库之前的扩展点
  @PrePersist
  public final void prePersist() {
    // 进行数据校验
    doValidate(this, CreateGroup.class);
    preCreate0();
  }

  // 实体更新到数据库前的扩展点
  @PreUpdate
  public final void preUpdate() {
    // 进行数据校验
    doValidate(this, UpdateGroup.class);
    preUpdate0();
  }

  // 子类可以复写该方法
  public void preCreate0() {

  }

  // 子类可以复习该方法
  public void preUpdate0() {

  }

  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o))
      return false;
    BaseEntity that = (BaseEntity) o;
    return id != null && Objects.equals(id, that.id);
  }

  @Override
  public int hashCode() {
    return getClass().hashCode();
  }

  public <T> void doValidate(T t, Class<? extends ValidateGroup> group) {
    Set<ConstraintViolation<T>> constraintViolations = validator.validate(t, group,
        Default.class);
    if (!CollectionUtils.isEmpty(constraintViolations)) {
      throw new ConstraintViolationException(constraintViolations);
    }
  }
}

```

## EntityOperations

针对常见地增加和修改操作进行了函数式封装。下面是一个正常地更新用户信息流程。

```java
public void updateUser(UserUpdateRequest request, String id) {
// 查询数据中的用户信息
User user = userRepository.findById(id)
    .orElseThrow(() -> new BusinessException(ResultCode.NotFindError));
// 前端传来的更新请求更新用户
userMapper.updateEntityFromUpdateRequest(request, user);
// 保存到数据库
userRepository.save(user);
// 打印日志
log.info("更新user：{}", user);
}
```

使用`EntityOperations`函数式编程改造上面的更新流程。在update操作上注册多个钩子，最后execute逐一执行这些钩子。每个钩子都具备语义，相比于上面的流程会更加清晰易懂。

```java
// 创建update操作对象，需要传入repository，因为最后要保存到数据库。
EntityOperations.doUpdate(userRepository)
    // 根据id加载用户信息，userRepository包含了泛型，所以这边loadById返回的是User类型
    .loadById(id)
    // 更新数据库中的user信息。
    .update(e -> userMapper.updateEntityFromUpdateRequest(request, e))
    // 当保存到数据库成功后会执行下面的回调函数打印日志。
    .successHook(e -> log.info("更新user：{}", e))
    // 开始执行
    .execute();
```

使用`EntityOperations`执行创建操作也是一样的。

```java
public String createUser(UserCreateRequest request) {
    // 创建create操作
    Optional<User> user = EntityOperations.doCreate(userRepository)
        // 从前端请求得到需要创建的user对象
        .create(() -> userMapper.createRequest2Entity(
            request))
        // 在插入到数据库之前做一些修改操作
        .update(e -> e.getPhonePassword().setUser(e))
        // 创建成功后
        .successHook(e -> log.info("创建user：{}", e))
        // 执行创建
        .execute();
    return user.isPresent() ? user.get()
        .getId() : "";
}
```



