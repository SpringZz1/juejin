<template>
    <div class="right">
      <aside class="index-aside aside">
        <!-- 签到栏 -->
        <div class="signin-tip signin">
          <!-- 第一行 -->
          <div class="first-line" style="opacity: 1">
            <div class="icon-text">
              <img src="images/date.png" />
              <span class="title">下午好!</span>
            </div>
            <button class="btn signin-btn">
              <span class="btn-text">去签到</span>
            </button>
          </div>
          <div class="second-line" style="opacity: 1">点击你在社区的每一天</div>
        </div>
      </aside>
        <!-- banner -->

        <div class="sidebar-block banner-block">
          <div class="banner banner">
            <a href="#">
              <img
                src="images/plan.png"
                alt=""
                width="240px"
                height="200px"
                class="banner-image"
              />
            </a>
            <div class="ctrl-box">
              <i class="ion-close-round close-btn">X</i>
              <a data-v-cb59515e="" class="label" href="https://bd.juejin.cn?utm_campaign=bd&amp;utm_source=web&amp;utm_medium=banner" target="_blank">
                <span data-v-cb59515e="" class="inco">投放</span>
                <span data-v-cb59515e="">广告</span>
              </a>
            </div>
          </div>
        </div>
        <div class="sidebar-block banner-block">
          <div class="banner banner">
            <a href="#">
              <img
                src="images/dig.png"
                alt=""
                width="240px"
                height="200px"
                class="banner-image"
              />
            </a>
            <div class="ctrl-box">
              <i class="ion-close-round close-btn">X</i>
              <a data-v-cb59515e="" class="label" href="https://bd.juejin.cn?utm_campaign=bd&amp;utm_source=web&amp;utm_medium=banner" target="_blank">
                            <span data-v-cb59515e="" class="inco">投放</span>
                            <span data-v-cb59515e="">广告</span>
                        </a>
            </div>
          </div>
        </div>

        <!-- link -->
        <div class="block-body">
          <a href="#">
            <div class="app-link">
              <img src="images/home.59780ae.png" alt="" class="qr-img" />
              <div class="content-box">
                <div class="headline">下载稀土掘金APP</div>
                <div class="desc">一个帮助开发者成长的社区</div>
              </div>
            </div>
          </a>
        </div>

        <!-- 作者榜 -->
        <div class="sidebar-block user-block">
          <div class="recommend-author-block sticky-author-block">
          <header class="user-block-header">🎖️作者榜</header>
          <!-- 作者 -->
          <div class="right_nav">
            <div class="user-list">
              <div class="item">
                <a class="username username" href="#">
                  <img id="pic1" src="images/author1.png" alt="前端小工的头像" />
                  <div class="user-info">
                    <div class="top">
                      <span class="name">我是前端小工</span>
                      <span class="rank">
                        <img src="images/lv-4.a78c420.png" alt="创作等级" />
                      </span>
                    </div>
                    <div class="position">高级前端工程师 @ 阿里</div>
                  </div>
                </a>
              </div>
            </div>
            </div>
            <div class="user-list">
              <div class="item">
                <a class="username username" href="#">
                  <img id="pic1" src="images/author2.png" alt="我是小阵不悲催的头像" />
                  <div class="user-info">
                    <div class="top">
                      <span class="name">我是小阵不悲催</span>
                      <span class="rank">
                        <img src="images/lv-4.a78c420.png" alt="创作等级" />
                      </span>
                    </div>
                    <div class="position">前端开发 @ 公众号：进阶日记</div>
                  </div>
                </a>
              </div>
            </div>
            <div class="user-list">
              <div class="item">
                <a class="username username" href="#">
                  <img id="pic1" src="images/author3.png" alt="前端早早聊的的头像" />
                  <div class="user-info">
                    <div class="top">
                      <span class="name">我是前端早早聊</span>
                      <span class="rank">
                        <img src="images/lv-4.a78c420.png" alt="创作等级" />
                      </span>
                    </div>
                    <div class="position">帮 5000 个前端先跑</div>
                  </div>
                </a>
              </div>
              <!-- 更多 -->
            <a href="#" class="item">
              <div class="more">
                <span>完整榜单 ></span>
                <i class="icon ion-chevron-right"></i>
              </div>
            </a>
            </div>
          </div>
          </div>
        <!-- 插件 指南等 -->
        <div class="sidebar-block link-block" >
          <ul class="link-list" >
              <li class="item" >
                  <a class="link"  href="#">
                      <img src="images/juejin-tutu.d58819c.png" class="icon">
                      <span class="title" >稀土掘金漫游指南</span>
                  </a>
              </li>
              <li class="item" >
                  <a class="link" href="#">
                  <img src="images/juejin-extension-icon.4b79fb4.png" class="icon">
                  <span class="title" >安装掘金浏览器插件</span>
                  </a>
              </li>
              <li class="item" >
                  <a class="link" href="#" rel="nofollow noopener noreferrer">
                      <img src="images/juejin-miner.b78347c.png" class="icon">
                      <span class="title" >前往掘金翻译计划</span>
                  </a>
              </li>
          </ul>
      </div>

        <!-- 小链接 -->
        <div st:block="more" class="index-aside-footer" >
          <ul class="more-list" >
              <li class="item" >
              <a href="#" target="_blank" rel="nofollow" >用户协议</a>
              </li>
              <li class="item" >
                  <a href="#" target="_blank" rel="nofollow" st:name="businessLicense" >
                  营业执照
                  </a>
              </li>
              <li class="item" >
                  <a href="#" target="_blank" rel="nofollow" >
                  隐私政策
                  </a>
              </li>
              <li class="item" >
                  <a href="#" target="_blank" rel="nofollow">
                  关于我们
                  </a>
              </li>
          </ul>
          <ul class="more-list" >
              <li class="item" >
                  <a st:name="sitemap"  href="#" target="_blank">
                  站点地图
                  </a>
              </li>
              <li class="item" >
                  <a st:name="guideLink"  href="#" target="_blank">
                  使用指南
                  </a>
              </li>
              <li class="item" >
                  <a href="#" target="_blank" rel="" >
                  友情链接
                  </a>
              </li>
              <li class="item" >
                  <a href="#" target="_blank" rel="" >
                  更多文章
                  </a>
              </li>
          </ul>
          <ul class="more-list" >
              <li class="item" >
                  <a href="#" target="_blank" rel="nofollow" >
                  京ICP备18012699号-3
                  </a>
              </li>
          </ul>
          <ul class="more-list" >
              <li class="item" >
                  <a href="#" target="_blank" rel="nofollow" >
                  <img src="images/police.d0289dc.png" alt="police" style="vertical-align:middle;" class="police">
                  京公网安备11010802026719号
                  </a>
              </li>
              <li class="item" >
                  <span >版权所有：北京北比信息技术有限公司</span>
              </li>
              <li class="item" >
                  <span >公司地址：北京市海淀区信息路甲28号13层B座13B-5</span></li>
              <li class="item" ><span >公司座机：010-83434395</span>
              </li>
              <li class="item" >
                  <span >举报邮箱：
                  <a href="#" >feedback@xitu.io</a>
                  </span>
              </li>
          </ul>
          <ul class="more-list" >
              <li class="item" >
                  <a >©2022 稀土掘金
                  </a>
              </li>
          </ul>
          <ul class="more-list account-list" >
              <li st:name="weiboBtn" class="item weibo" >
                  <a href="#" target="_blank" rel="nofollow noopener noreferrer" >
                      <img src="images/weibo.0cd39f5.png" alt="微博" class="icon" >
                  </a>
              </li>
              <li st:name="wechatBtn" class="item wechat" >
                  <img src="images/wechat.ce329e6.png" alt="微信" class="icon" >
                  <div class="qr-panel" >
                      <div class="title" >微信扫一扫</div>
                      <img src="images/juejin-qr.b247fde.jpeg" class="qr" >
                  </div>
              </li>
          </ul>
      </div>
    </div>
</template>
