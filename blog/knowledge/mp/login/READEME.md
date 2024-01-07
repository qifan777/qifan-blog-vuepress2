# 小程序登录功能

## OpenID 登录

一个微信用户在不同的小程序中 openId 是不一样的。但是在同一个小程序中 openId 是固定的。也无法通过 openId 获取微信的用户信息。

- 1. 用户点击登录按钮，小程序调用 wx.login 获取 code
- 2. 小程序调用微信服务器，向微信服务器发送 code，获取 openid
- 3. 小程序将 openid 存储在数据库，以便后续登录使用

## 手机号+openId 登录

如果你的应用不止有微信小程序端，可能还有 APP 端，H5 端等等。同一个现实中的用户可能在不同的终端都有账户，使用手机号可以使得这些账户共享数据。

- 1. 用户点击登录按钮，触发获取手机号事件得到手机号的 phoneCode（手机号加密信息）
- 2. 小程序调用 wx.login 获取 code（openId 加密信息）
- 3. 发送加密信息到服务器，服务器解密得到手机号和 openId
- 3. 服务器将手机号和 openid 存储在数据库，以便后续登录使用

### 微信小程序 API 获取手机号

通过微信的 API 获取手机号需要有营业执照的资质，个体无法申请该 API。调用微信的 API 获取手机号不需要实现发送验证码的功能，可以省一笔费用。

### 自己实现手机号输入框

自己提供手机号输入框和获取验证码的按钮，在后端发送验证码并实现验证码校验逻辑。

## 实现

本次教程实现[手机号+openId 登录](#手机号openid-登录)，学会了这个自然也会 OpenId 登录。

### 前端

技术：
- Taro
- NutUI
- Pinia

由于小程序官方不允许跳转到登录页面，在小程序中的登录界面是通过弹出的形式提醒用户登录。

```vue
<template>
  <!-- 从底部弹出 -->
  <nut-popup
    v-model:visible="loginShow"
    :style="{ padding: '30px 50px' }"
    position="bottom"
    pop-class="login-popup"
  >
    <div class="login-section">
      <view class="climb-icon">
        <image
          class="climb"
          mode="heightFix"
          src="../../assets/img/climb.png"
        ></image>
      </view>

      <view class="title-section">
        <view class="title">欢迎登录~</view>
        <view class="info">登录后可享受更好的服务体验</view>
      </view>
      <view class="button-section">
        <!-- open-type指定为点击获取手机号 -->
        <button class="btn" open-type="getPhoneNumber" @getphonenumber="submit">
          <image
            class="icon"
            mode="heightFix"
            src="../../assets/icons/wechat.png"
          ></image>
          微信一键登录
        </button>
      </view>
    </div>
  </nut-popup>
</template>

<script lang="ts" setup>
import Taro from "@tarojs/taro";
import { useHomeStore } from "@/stores/home-store";
import { api } from "@/utils/api-instance";
import { storeToRefs } from "pinia";

const homeStore = useHomeStore();
const { loginShow } = storeToRefs(homeStore);
const handleClose = () => {
  loginShow.value = false;
};
// 获取手机号成功触发
const submit = (e: { detail: { code: string } }) => {
  Taro.login({
    success: function (loginRes) {
      // 调用微信登录接口
      api.authController
        .authByWecChat({
          body: {
            // openId加密信息 
            loginCode: loginRes.code,
            // 手机号的加密信息
            phoneCode: e.detail.code,
          },
        })
        .then((res) => {
          // 登录成功将token存储，后续请求携带token
          Taro.setStorageSync("token", res.tokenValue);
          // 获取用户的信息
          homeStore.getUserInfo();
          // 关闭弹窗
          handleClose();
        });
    },
  });
};

defineExpose({
  submit,
  handleClose,
});
</script>

<style lang="scss">
page,
:root {
  .nut-popup {
    padding: 0 !important;
    overflow: unset;
  }
}
.login-section {
  height: 600px;
  background-color: white;
  width: 100%;

  .climb-icon {
    position: relative;
    width: 100%;

    .climb {
      position: absolute;
      height: 350px;
      right: 100px;
      top: -175px;
    }
  }

  .title-section {
    padding: 100px 0 100px 50px;

    .title {
      color: red;
      font-size: 55px;
      font-weight: bold;
      margin-bottom: 30px;
    }

    .info {
      color: #727272;
      font-size: 35px;
    }
  }

  .button-section {
    width: 100%;
    display: flex;
    justify-content: center;

    .icon {
      height: 40px;
      margin-right: 20px;
    }

    .btn {
      background-color: rgb(0, 200, 0);
      margin: 0;
      color: white;
      width: 80%;
      height: 90px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 45px;
      font-size: 40px;
    }
  }
}
</style>
```

### 后端

相关技术：
- Jimmer(国产ORM框架)
- SaToken权鉴
- SpringBoot3
- wx-java-miniapp-spring-boot-starter（小程序相关api）

1. 定义模型接受前端传输的参数
```java
@Data
public class WeChatAuth implements AuthModel {
    private String loginCode;
    private String phoneCode;
}
```

2. 手机号+OpenId解密


```java
import cn.binarywang.wx.miniapp.api.WxMaService;
import cn.binarywang.wx.miniapp.bean.WxMaJscode2SessionResult;
import cn.dev33.satoken.stp.SaTokenInfo;
import cn.dev33.satoken.stp.StpUtil;
import io.qifan.mall.server.auth.model.AuthModel;
import io.qifan.mall.server.auth.model.WeChatAuth;
import io.qifan.mall.server.inviter.history.service.InviteHistoryService;
import io.qifan.mall.server.user.entity.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.chanjar.weixin.common.error.WxErrorException;
import org.babyfish.jimmer.sql.JSqlClient;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service(IAuthStrategy.WECHAT)
@Slf4j
@AllArgsConstructor
public class WechatAuthStrategyImpl implements IAuthStrategy {

    private final WxMaService wxMaService;
    private final StringRedisTemplate redisTemplate;
    private final JSqlClient jSqlClient;
    private final InviteHistoryService inviteHistoryService;
    private final static String OPENID_KEY = "openid:";

  /**
   * 
   * @param authModel 手机号加密信息和oepnId加密信息
   * @return
   */
    @Override
    public SaTokenInfo auth(AuthModel authModel) {
        try {
            WeChatAuth weChatAuth = (WeChatAuth) authModel;
            // wx-java-miniapp-spring-boot-starter 使用这个包可以快速的调用微信小程序的api
            // 把openId的加密信息传入，wxMaService已经配置好appid和appsecret。
            // 得到解密后的openId
            WxMaJscode2SessionResult session = wxMaService.getUserService()
                    .getSessionInfo(weChatAuth.getLoginCode());
            String openid = session.getOpenid();
            // redis锁，防止重复登录
            Boolean isSet = redisTemplate.opsForValue()
                    .setIfAbsent(OPENID_KEY + openid, openid, 5, TimeUnit.SECONDS);
            if (Boolean.FALSE.equals(isSet)) {
                return null;
            }
            // 和解密openId的过程一样，传入手机号的加密信息得到解密的手机号
            String phoneNumber = wxMaService.getUserService().getPhoneNoInfo(weChatAuth.getPhoneCode())
                    .getPhoneNumber();
            UserWechatTable wechatTable = UserWechatTable.$;
            //  查找openId对应的用户是否存在
            Optional<UserWechat> weChatUserOptional = jSqlClient.createQuery(wechatTable)
                    .where(wechatTable.openId().eq(openid))
                    .select(wechatTable).fetchOptional();

            // openId -> 微信用户是否存在 -> 不存在则创建微信用户
            UserWechat userWeChat = weChatUserOptional.orElseGet(
                    () -> jSqlClient.insert(UserWechatDraft.$.produce(draft -> {
                        UserTable userTable = UserTable.$;
                        // 如果该手机号通过别的渠道已经在本系统创建过，则关联。否则用该手机号创建一个用户
                        User userInfo = jSqlClient.createQuery(userTable)
                                .where(UserTable.$.phone().eq(phoneNumber)).select(userTable)
                                .fetchOptional().orElseGet(() -> UserDraft.$.produce(userDraft -> {
                                    userDraft.setNickname("默认用户")
                                            .setPhone(phoneNumber);
                                }));
                        draft.setUser(userInfo);
                        draft.setOpenId(openid);
                    })).getModifiedEntity());
            // sa-token登录
            // 登录时统一用user表的id，而不是用第三方渠道表的id。以后可能有QQ User，新浪User等等。微信小程序渠道也只是其中的一种。
            StpUtil.login(userWeChat.user().id(), LoginDevice.MP_WECHAT);
            return StpUtil.getTokenInfo();
        } catch (WxErrorException e) {
            throw new RuntimeException(e);
        }
    }
}

```