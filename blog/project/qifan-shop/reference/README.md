# 参考

## 通用模块

### BaseEntity

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

##