# 第八期 Stream请求ChatGPT/WebSocket推送响应
## 本期内容

1. 使用Websocket Stomp协议配合`@MessageMapping`和`@Payload` 开放消息接口，和接收JSON请求体。
2. 实现私有订阅，服务器将请求的结果响应给对应的用户，而不是广播给所有用户。
3. 使用Proxy将请求转发给OpenAI。
4. 对代码进行逻辑分层，让代码更清晰。

## 代码实现

### 1. WebsocketController接收消息

与MVC中的Controller不同，这边不能使用`@RestController`需要用`@Controller`。`@AllArgsConstructor`
是lombok提供的一个为类中的属性生成构成器的注解。这样我们可以方便的使用Spring推荐的构造器依赖注入。

`@MessageMapping`类似于`@RequestMapping`用来标识消息路由。它不仅可以加在方法上，也可以加载类上。加在类上那就表名类中的所有消息路由都会拼接上这个路径。

在被`@MessageMapping`标识的方法中（如下的chat方法），可以使用`@Payload`解析JSON格式的消息体和`@RequestBody`
一样。同时也可以配合`@Valid`或者`@Validated`做参数校验。

chat()方法的第二个参数接收了`Principle`
。它代表着在websocket的handshake阶段获取到的用户信息。可以参考`io.qifan.chatgpt.assistant.infrastructure.websocket.UserHandshakeHandler#determineUser`
这个方法。

```java

@Controller
@AllArgsConstructor
@Slf4j
public class WebsocketChatMessageController {
    private final ChatMessageService chatMessageService;

    @MessageMapping("/chatMessage/send")
    public void chat(@Payload ChatMessageCreateRequest requestMessage, Principal principal) {
        chatMessageService.sendMessage(requestMessage, principal);
    }
}
```

> 此外，在被`@MessageMapping`标识的方法中还可以接收
>1. `@Headers`或者`@Header`获取Stomp协议中的消息头，和http协议中的请求头类似。
>2. `@DestinationVariable`获取`@MessageMapping("/chat/{id}")`的id变量。和`@PathVariable`一样
>3. 接受完整的`Message`对象，其中包含消息头和消息体消息目标路由等。
>
>
详细可以参考[Spring WebSocket](https://docs.spring.io/spring-framework/reference/web/websocket/stomp/handle-annotations.html)

### 2 发送消息

发送消息的逻辑包含下面四个步骤。

1. GPT配置校验
2. 创建OpenAIService用于调用OpenAI接口。
3. 构造请求参数，将用户发送的内容以及用户的GPT配置填充到请求中。
4. 发送请求并将响应的结果通过私有订阅地址推送给响应的用户。

#### 2.1 GPT配置校验

在正式调用OpenAI的GPT接口之前，需要做一些基础配置的校验。只有这些基础数据校验通过后才能保障后面的代码正常运行。如果不存在API Key则无法调用OpenAI的GPT接口。

```java

@Service
@AllArgsConstructor
@Slf4j
public class SendMessageService {
    private final MongoTemplate mongoTemplate;

    /**
     * 校验用户是否存在GPT配置以及GPT配置中是否已经配置了API Key
     *
     * @param principal 握手阶段得到的用户信息
     * @return 该用户的GPT配置
     */
    public ChatConfig checkConfig(Principal principal) {
        log.info("GPT配置校验，当前用户：{}", principal);
        ChatConfig chatConfig = Optional.ofNullable(mongoTemplate.findOne(Query.query(Criteria.where("createdBy.id")
                                                                                              .is(principal.getName())),
                                                                          ChatConfig.class))
                                        .orElseThrow(() -> new BusinessException(ResultCode.NotFindError,
                                                                                 "请配置API Key"));
        if (!StringUtils.hasText(chatConfig.getApiKey())) {
            throw new BusinessException(ResultCode.ValidateError, "请配置API Key");
        }
        log.info("GPT配置校验通过，配置内容：{}", chatConfig);
        return chatConfig;
    }
}
```
#### 2.2 创建OpenAIService
配置proxy，通过proxy转发给OpenAI。先定义Property配置类，spring boot会自动读取application.yml中的配置信息到配置类中。在代码中注入该配置类就可以获取到yml中的配置信息了。
```java
@ConfigurationProperties(prefix = "gpt")
@Component
@Data
public class GPTProperty {
    Proxy proxy;

    @Data
    public static class Proxy {
        private String host;
        private Integer port;
    }
}
```
```yaml
# 下面是我的代理信息，你们可以根据自己的实际情况更换host和port
gpt:
  proxy:
    host: localhost
    port: 7890
```

下面开始创建OpenAIService，用于发送请求。在创建OpenAIService时我们配置了它底层的代理，API Key以及Jackson序列化和反序列化。
```java
@Service
@AllArgsConstructor
@Slf4j
public class SendMessageService {
    private final MongoTemplate mongoTemplate;
    private final GPTProperty gptProperty;
    
    public ChatConfig checkConfig(Principal principal) {
        //... 
    }

    /**
     * @param chatConfig 用户的GPT配置
     * @return OpenAIService用于调用OpenAI接口
     */
    public OpenAiService createOpenAIService(ChatConfig chatConfig) {
        log.info("开始创建OpenAIService");
        ObjectMapper mapper = defaultObjectMapper();
        Proxy proxy = new Proxy(Proxy.Type.HTTP,
                                new InetSocketAddress(gptProperty.getProxy().getHost(),
                                                      gptProperty.getProxy().getPort()));
        OkHttpClient client = defaultClient(chatConfig.getApiKey(), Duration.ofMinutes(1))
                .newBuilder()
                .proxy(proxy)
                .build();
        Retrofit retrofit = defaultRetrofit(client, mapper);
        OpenAiApi api = retrofit.create(OpenAiApi.class);
        return new OpenAiService(api);
    }
}
```
#### 2.3 构造ChatGPT请求
构造的ChatGPT请求参数需要包含用户的历史发送消息和GPT的历史回复消息，这样它才能记住你们之前的对话内容。所以可以看见我开始的时候根据聊天会话查询该会话内的聊天记录，然后将最新的消息插入到历史消息的尾部。还需要填写要使用的GPT模型，默认是3.5。还有随机性，话题新鲜度，最大回复数。最后我们选择了请求方式是stream，这样可以一个个字的得到ChatGPT的响应，而不是长时间的等待最后得到一个结果。
```java
@Service
@AllArgsConstructor
@Slf4j
public class SendMessageService {
    private final MongoTemplate mongoTemplate;
    private final GPTProperty gptProperty;
    
    public ChatConfig checkConfig(Principal principal) {
        //...
    }


    public OpenAiService createOpenAIService(ChatConfig chatConfig) {
        //...
    }

    /**
     * 构造ChatGPT请求参数
     *
     * @param chatMessage 用户的发送内容
     * @param chatConfig  用户的GPT配置信息
     * @return 返回包含用户发送内容+配置信息的ChatGPT请求参数。
     */
    public ChatCompletionRequest createChatRequest(ChatMessage chatMessage, ChatConfig chatConfig) {
        List<ChatMessage> chatMessageList = mongoTemplate.find(Query.query(Criteria.where("session.id")
                                                                                   .is(chatMessage.getSession()
                                                                                                  .getId())),
                                                               ChatMessage.class);

        chatMessageList.add(chatMessage);
        ChatCompletionRequest chatCompletionRequest = ChatCompletionRequest.builder()
                                                                           .messages(chatMessageList.stream()
                                                                                                    .map(chatMessageMapper::entityToMessage)
                                                                                                    .collect(
                                                                                                            Collectors.toList()))
                                                                           .model(chatConfig.getModel().getName())
                                                                           .presencePenalty(
                                                                                   chatConfig.getPresencePenalty())
                                                                           .temperature(chatConfig.getTemperature())
                                                                           .maxTokens(chatConfig.getMaxTokens())
                                                                           .stream(true)
                                                                           .build();


        log.info("请求体：{}", chatCompletionRequest);
        return chatCompletionRequest;
    }
}
```
还需要在ChatMessageMapper中添加我们的ChatMessage实体类和第三方包中的ChatMessage映射，这样我们可以方便的构造请求参数。
```java
public interface ChatMessageMapper {
    // ...
    com.theokanning.openai.completion.chat.ChatMessage entityToMessage(ChatMessage entity);
}
```

#### 2.4 发送请求和推送消息
在`io.qifan.chatgpt.assistant.gpt.session.ChatSession.Statistic`新增plusChat和plusToken方法。方便统计用户调用GPT接口时的消耗情况。
```java
public static class Statistic {
    private Integer charCount;
    private Integer tokenCount;

    public Statistic plusChar(Integer charCount) {
        this.charCount += charCount;
        return this;
    }

    public Statistic plusToken(Integer tokenCount) {
        this.tokenCount += tokenCount;
        return this;
    }
}
```
先获取已有的统计数量，在上面累加本次用户发送消息的长度。新建一个ChatGPT回答消息对象`responseMessage`用于记录回答的消息。由于本次的请求是stream类型，所以每次响应是一个Token（一个单词或者一个中文字）的，这边就需要阻塞一个按顺序调用`convertAndSendToUser`推送给前端。回答完毕后将用户发送的消息和GPT回答的消息都插入到数据库，并且更新会话消耗Token的统计数量。

```java
@Service
@AllArgsConstructor
@Slf4j
public class SendMessageService {
    private final MongoTemplate mongoTemplate;
    private final GPTProperty gptProperty;
    
    public ChatConfig checkConfig(Principal principal) {
        // ...
    }


    public OpenAiService createOpenAIService(ChatConfig chatConfig) {
        // ...
    }


    public ChatCompletionRequest createChatRequest(ChatMessage chatMessage, ChatConfig chatConfig) {
        // ...
    }
    
    /**
     * 向OpenAI发起ChatGPT请求，并将响应的结果推送给前端。
     * @param openAiService 封装好的OpenAI的服务，调用就可以发起请求。
     * @param chatCompletionRequest ChatGPT请求参数
     * @param chatMessage 用户发送的消息内容
     * @param chatSession 消息归属的会话
     * @param principal 当前用户信息
     */
    @SneakyThrows
    public void sendMessage(OpenAiService openAiService,
                            ChatCompletionRequest chatCompletionRequest,
                            ChatMessage chatMessage,
                            ChatSession chatSession,
                            Principal principal) {
        ChatSession.Statistic statistic = chatSession.getStatistic()
                                                     .plusChar(chatMessage.getContent().length())
                                                     .plusToken(chatMessage.getContent().length());

        ChatMessage responseMessage = new ChatMessage().setContent("")
                                                       .setRole("assistant")
                                                       .setSession(chatSession);
        openAiService.streamChatCompletion(chatCompletionRequest)
                     .doOnError(Throwable::printStackTrace)
                     .blockingForEach(chunk -> {
                         log.info(chunk.toString());
                         String text = chunk.getChoices().get(0).getMessage().getContent();
                         if (text == null) {
                             return;
                         }
                         statistic.plusToken(1)
                                  .plusChar(text.length());
                         messagingTemplate.convertAndSendToUser(principal.getName(),
                                                                "/queue/chatMessage/receive",
                                                                text);
                         responseMessage.setContent(responseMessage.getContent() + text);
                     });
        chatMessageRepository.save(chatMessage);
        chatMessageRepository.save(responseMessage);
        chatSessionRepository.save(chatSession);
    }

}
```
在推送给前端时要注意，推送的订阅地址是`/queue/chatMessage/receive`，而用户的订阅地址是`/user/queue/chatMessage/receive`。但是为什么依然可以推送给对应的用户呢？

可以这么理解，当用户发送订阅消息`/user/queue/chatMessage/receive`时，其中的`/user`被替换成了用户id如：`/queue/chatMessage/receive-1234`。然后在服务端推送消息时，使用的是`convertAndSendToUser`推送给这个订阅地址`/queue/chatMessage/receive`，实际上会推送给`/queue/chatMessage/receive-1234`。这样推送和订阅的最终地址都达到了一致，并且这个地址是用户私有的。

那为什么`/user`可以被替换成用户id呢？因为我们之前在 `io.qifan.chatgpt.assistant.infrastructure.websocket.WebSocketConfig#configureMessageBroker`里面配置了`.setUserDestinationPrefix("/user")`。这行配置就是告诉SpringWebSocket遇到 `/user`开头的订阅地址要替换成用户id，变成改用户的私有订阅地址。

### 3. 组合各个步骤发送消息
依次按照配置校验，创建OpenAIService，ChatGPT请求参数，发送请求的顺序调用实现消息发送逻辑。
```java
@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class ChatMessageService {
    private final ChatSessionRepository chatSessionRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final ChatMessageMapper chatMessageMapper;
    private final SendMessageService sendMessageService;
    
    // ...
    
    public void sendMessage(ChatMessageCreateRequest requestMessage, Principal principal) {
        ChatSession chatSession = chatSessionRepository.findById(requestMessage.getSession().getId())
                                                       .orElseThrow(() -> new BusinessException(ResultCode.NotFindError));
        ChatMessage chatMessage = chatMessageMapper.createRequest2Entity(requestMessage);
        ChatConfig chatConfig = sendMessageService.checkConfig(principal);
        OpenAiService openAIService = sendMessageService.createOpenAIService(chatConfig);
        ChatCompletionRequest chatRequest = sendMessageService.createChatRequest(chatMessage, chatConfig);
        sendMessageService.sendMessage(openAIService, chatRequest, chatMessage, chatSession, principal);
    }
}
```