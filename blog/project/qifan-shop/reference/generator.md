## Controller
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
## Service
```java
@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class UserService {
    private final UserMapper userMapper;
    private final UserRepository userRepository;

    public UserResponse findById(String id) {
        return userMapper.entity2Response(userRepository.findById(id)
                .orElseThrow(
                        () -> new BusinessException(ResultCode.NotFindError)));
    }

    public void updateUser(UserUpdateRequest request, String id) {
        EntityOperations.doUpdate(userRepository)
                .loadById(id)
                .update(e -> userMapper.updateEntityFromUpdateRequest(request, e))
                .successHook(e -> log.info("更新user：{}", e))
                .execute();
    }

    public String createUser(UserCreateRequest request) {
        Optional<User> user = EntityOperations.doCreate(userRepository)
                .create(() -> userMapper.createRequest2Entity(
                        request))
                .update(e -> e.getPhonePassword().setUser(e))
                .successHook(e -> log.info("创建user：{}", e))
                .execute();
        return user.isPresent() ? user.get()
                .getId() : "";
    }

    public void validUser(String id) {
        EntityOperations.doUpdate(userRepository)
                .loadById(id)
                .update(User::valid)
                .successHook(e -> log.info("生效user：{}", e))
                .execute();
    }

    public void invalidUser(String id) {
        EntityOperations.doUpdate(userRepository)
                .loadById(id)
                .update(User::invalid)
                .successHook(e -> log.info("失效user：{}", e))
                .execute();
    }

    public Page<UserResponse> queryUser(QueryRequest<UserQueryRequest> request) {
        Page<User> page = userRepository.findAll((root, query, criteriaBuilder) -> SpecificationUtils.conjunction(
                UserPredicate.predicate(root,
                    criteriaBuilder,
                    request.getQuery(),
                    request.getMatchMode(),
                    userMapper),
                criteriaBuilder),
            request.toPageable());
        return page.map(userMapper::entity2Response);
    }
}
```
### Repository
```java
public interface UserRepository extends BaseRepository<User> {

}
```

### Mapper
Mapper文件用于将User
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