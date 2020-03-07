<!--  -->
<template>
  <div>
    <header class="topNav">
      <div class="nav_left">
        <img class="nav_left_logo" src="../assets/img/logo.png" alt />
        <div class="nav_left_user">
          <img src="../assets/img/atavar.png" alt />
          <span>管理员</span>
          <span>NO.00001</span>
        </div>
      </div>
      <div class="nav_right">
        <font>退出</font>
        <i class="iconfont icon-xialashixin" @click="exit"></i>
      </div>
    </header>
    <div class="main">
      <div class="left">
        <div class="left_top">
          <div class="left_top_main">
            <div class="left_top_content">
              <span class="left_top_content_num">C07</span>
              <div class="left_top_content_right">
                <span>订单列表</span>
                <span class="left_top_content_order">NO.123 456 789 132</span>
              </div>
            </div>
            <div class="left_top_bottom">
              <p>高级会员卡</p>
              <p>NO.1234 4567 1231 7897</p>
            </div>
          </div>
        </div>
        <div class="left_middle">
          <div class="left_middle_item" v-for="(item,index) in 10" :key="index">
            <div class="left_middle_circle">{{index+1}}</div>
            <div class="left_middle_info">
              <div class="left_middle_info_food">
                <p>黄焖排骨（小份）</p>
                <p class="left_middle_info_food_bottom">
                  <span>N0.235</span>
                  <span>川菜</span>
                </p>
              </div>
              <span>x3</span>
              <span class="left_middle_info_price">￥33</span>
            </div>

            <div class="left_middle_item_sale">
              <span>折</span>
              <span>特</span>
            </div>
          </div>
        </div>
        <div class="left_bottom">
          <div class="left_bottom_info">
            <div class="left_bottom_info_item">
              <p>数量：8</p>
              <p>折扣：-￥57.50</p>
            </div>
            <div class="left_bottom_info_item">
              <p>合计：</p>
              <p style="font-size:30px">￥57.50</p>
            </div>
          </div>
          <div class="left_bottom_btn">
            <button>全单备注</button>
            <button>结账</button>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="right_nav">
          <div class="right_nav_item" :class="clickNavTap === index ?'lightNav':''" v-for="(item,index) in navIcons" :key="index" @click="clickNav(index)">
            <div class="right_nav_item_inner">
              <i class="iconfont" :class="item.iconClass" style="font-size:25px;margin-bottom:5px"></i>
              <span>{{item.name}}</span>
            </div>
          </div>
        </div>
        <div class="right_menu">
          <div class="right_menu_bar">
            <i class="iconfont icon-xiangzuo" @click="forwardTab"></i>
            <ul class="right_menu_bar_list">
              <li
                :class="currentMenu == index ? 'right_menu_bar_item':''"
                v-for="(item,index) in menuNav"
                :key="index"
              >{{item.name}}</li>
            </ul>
            <i class="iconfont icon-xiangyou" @click="backTab"></i>
          </div>
          <div class="right_menu_search">
            <i class="iconfont icon-sousuo"></i>
            <input type="text" placeholder="请输入关键字" />
          </div>
        </div>
        <div class="right_bottom">
          <ul>
            <li v-for="(item,index) in 13" :key="index">
              <div class="right_bottom_photo">
                <img src="../assets/img/111.jpg" alt />
                <div class="right_bottom_photo_mask">
                  <div class="right_bottom_photo_sale">
                    <span>折</span>
                    <span>特</span>
                  </div>
                  <span>￥38</span>
                </div>
              </div>
              <p>凉拌凉粉（中份）</p>
              <p>NO.2548</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clickNavTap:0,
      currentMenu: 0, //当前菜单
      navIcons: [
        { name: "换餐", iconClass: "icon-view" },
        { name: "退菜", iconClass: "icon-guanbi" },
        { name: "输入数量", iconClass: "icon-zengjia" },
        { name: "减少菜品", iconClass: "icon-jianshao" },
        { name: "删菜", iconClass: "icon-shanchu" },
        { name: "管理", iconClass: "icon-guanli" },
        { name: "备注", iconClass: "icon-tianjiabeizhu" },
        { name: "赠送", iconClass: "icon-zengsong" },
        { name: "外卖", iconClass: "icon-waimai" },
        { name: "挂单", iconClass: "icon-tuichu" }
      ],
      menuNav: [
        { name: "粤菜", index: 0 },
        { name: "川菜", index: 1 },
        { name: "湘菜", index: 2 },
        { name: "冷菜", index: 3 },
        { name: "甜品", index: 4 },
        { name: "酒水", index: 5 },
        { name: "料理", index: 6 },
        { name: "小吃", index: 7 },
        { name: "其他", index: 8 }
      ]
    };
  },

  // components: {},

  // computed: {},

  // mounted: {},

  methods: {
    clickNav(index){ //点击导航栏
        console.log(index);
        this.clickNavTap = index;
    },
    forwardTab() {
      //菜单前进按钮
      if (this.currentMenu === 0) return false;
      this.currentMenu--;
    },
    backTab() {
      //菜单前进按钮
      if (this.currentMenu === this.menuNav.length - 1) return false;
      this.currentMenu++;
    },
    exit() {
      //退出登录
      console.log("退出登录");
      this.$confirm("您是否确定退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then((res) => {
        console.log(res);
      })
    }
  }
};
</script>
<style  scoped>
.topNav {
  display: flex;
  align-items: center;
}
.nav_left {
  height: 50px;
  padding: 10px;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #212121;
  border-right: 2px solid;
}
.nav_left_logo {
  width: 20%;
  height: 100%;
}
.nav_left_user {
  height: 100%;
  display: flex;
  align-items: center;
  color: #ffffff;
  font-size: 18px;
}
.nav_left_user > img {
  height: 100%;
  width: 50px;
  border-radius: 50%;
  margin-right: 20px;
}

.nav_left_user > span:nth-child(3) {
  padding: 0 30px;
  color: #b1b1b1;
}

.nav_right {
  width: 10%;
  height: 50px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1b1b1b;
  color: #ffffff;
}
.nav_right > font {
  margin-right: 10px;
  font-size: 18px;
}

.main {
  box-sizing: border-box;
  height: calc(100vh - 70px);
  padding: 10px;
  display: flex;
}

.left {
  flex-shrink: 0;
  width: 25%;
  height: 100%;
  background: #212120;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.left > .left_top {
  width: 100%;
  height: 20%;
}
.left_top_main {
  width: 65%;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.left_top_bottom {
  flex: 1;
  border-radius: 10px 10px 0 0;
  background-image: url("../assets/img/222.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 20px;
  text-align: left;
}

.left_top_bottom > p:nth-child(1) {
  color: #523802;
  padding-bottom: 10px;
  font-weight: 600;
}

.left_top_bottom > p:nth-child(2) {
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
  font-weight: 600;
}

.left_top_content {
  display: flex;
  justify-content: center;
  align-items: center;
  align-items: stretch;
  color: #ffffff;
  padding: 20px 0;
  flex-shrink: 0;
}
.left_top_content_num {
  font-size: 40px;
  margin-right: 10px;
  letter-spacing: 2px;
}
.left_top_content_right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  font-size: 15px;
  padding: 3px 5px;
  overflow: hidden;
}
.left_top_content_order {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  padding-top: 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.left > .left_middle {
  flex: 1;
  background: #212121;
  border-radius: 8px 8px 0 0;
  box-shadow: 0px -1px 2px 1px rgba(0, 0, 0, 0.4);
  padding: 20px 10px 0 10px;
  overflow-y: scroll;
}

.left_middle_item {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  margin-bottom: 15px;
  position: relative;
}

.left_middle_item_sale {
  position: absolute;
  right: 10px;
  top: -10px;
}

.left_middle_item_sale > span {
  padding: 3px;
  border-radius: 5px;
  font-size: 13px;
  color: #ffffff;
}

.left_middle_item_sale > span:nth-child(1) {
  background: #3197f2;
}

.left_middle_item_sale > span:nth-child(2) {
  background: #f92a41;
}

.left_middle_circle {
  width: 15px;
  height: 15px;
  line-height: 15px;
  border-radius: 50%;
  color: black;
  background: #e3ac42;
  font-size: 10px;
}

.left_middle_info {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px;
  padding-bottom: 25px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.4);
}

.left_middle_info_food {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  color: #ffffff;
  font-size: 15px;
}

.left_middle_info .left_middle_info_price {
  color: #ffffff;
  font-size: 18px;
}

.left_middle_info_food_bottom {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 18px;
}

.left_middle_info span {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
}

.left > .left_bottom {
  height: 23%;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background: #21201f;
  border-radius: 8px 8px 0 0;
  box-shadow: 0px -1px 2px 1px rgba(0, 0, 0, 0.4);
}

.left_bottom_info {
  flex: 1;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left_bottom_info_item {
  width: 48%;
  height: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #ffffff;
}

.left_bottom_btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left_bottom_btn > button {
  width: 48%;
  padding: 15px 0;
  border-radius: 5px;
  border: none;
  outline: none;
  color: #ffffff;
  font-size: 16px;
}

.left_bottom_btn > button:nth-child(1) {
  background: #f52a3f;
}
.left_bottom_btn > button:nth-child(2) {
  background: #3195ef;
}

.right {
  flex: 1;
  height: 100%;
  margin-left: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}

.right_nav {
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content:space-around;
  padding: 0 15px;
}
.right_nav_item {
  width: 76px;
  height: 76px;
  box-sizing: border-box;
  border: 5px solid rgba(255,255,255,0.6);
  padding: 4px;
  border-radius: 14px;
  overflow: hidden;
}

.right_nav_item_inner {
  height: 100%;
  border-radius: 10px;
  background: #1c1c1c;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 13px;
}

.lightNav{
  background:linear-gradient(-90deg, #29bdd9 0%, #276ace 100%);
}

.lightNav > .right_nav_item_inner{
  transform:scale(0.98);
  border-radius: 12px;
}



.right_menu {
  height: 50px;
  display: flex;
  align-items: stretch;
  margin: 10px 0;
}

.right_menu_bar {
  width: 75%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
}
.right_menu_bar_list {
  flex: 1;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.right_menu_bar_list > li {
  position: relative;
  padding: 0 5px;
  letter-spacing: 2px;
}

.right_menu_bar_item {
  color: #dca53c;
}

.right_menu_bar_item::after {
  display: block;
  content: "";
  position: absolute;
  left: 0;
  bottom: -10px;
  width: 100%;
  height: 3.5px;
  background: #e1a93d;
  border-radius: 10px;
}

.icon-xiangzuo {
  padding-right: 5px;
}

.icon-xiangyou {
  padding-left: 5px;
}

.right_menu_search {
  flex: 1;
  margin: 0 10px;
  padding: 0 8px;
  background: #0c0c0c;
  border-radius: 5px;
  display: flex;
  align-items: center;
}

.icon-sousuo {
  font-size: 30px !important;
  color: rgba(255, 255, 255, 0.8);
}

.right_menu_search > input {
  flex: 1;
  background-color: transparent;
  caret-color: #ffffff;
  color: #ffffff;
  border: none;
  outline: none;
  text-indent: 5px;
  font-size: 15px;
}

.right_bottom {
  flex: 1;
  overflow-y: scroll;
}

.right_bottom > ul {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}

.right_bottom > ul > li {
  width: 20%;
  height: 50%;
  box-sizing: border-box;
  padding: 0 15px 15px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
.right_bottom_photo {
  flex: 1;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.right_bottom_photo_mask {
  z-index: 2;
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 50px;
  padding: 5px 10px;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.right_bottom_photo_sale {
  display: flex;
  align-items: center;
}

.right_bottom_photo_sale > span {
  padding: 5px;
  border-radius: 5px;
  font-size: 14px;
  color: #ffffff;
}

.right_bottom_photo_sale > span:nth-child(1) {
  background: #3197f2;
  margin-right: 5px;
}

.right_bottom_photo_sale > span:nth-child(2) {
  background: #f92a41;
}

.right_bottom_photo_mask > span {
  font-size: 25px;
  color: #e3ac42;
}

.right_bottom_photo img {
  width: 100%;
  height: 100%;
}

.right_bottom > ul > li > p:nth-child(2) {
  color: #ffffff;
  padding: 15px 0 10px 0;
}

.right_bottom > ul > li > p:nth-child(3) {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
}
</style>