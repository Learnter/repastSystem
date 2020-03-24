
<template>
  <div>
    <header class="topNav">
      <div class="nav_left">
        <img class="nav_left_logo" :src="userInfo.store_logo" alt />
        <div class="nav_left_user">
          <div class="nav_left_user_info">
            <i class="iconfont icon-touxiang"></i>
            <span>{{userInfo.username}}</span>
          </div>
           <!-- <el-select v-model="deviceNum" placeholder="请选择收款设备" size="mini" @change="selectDevice">
            <el-option v-for="item in userInfo.equipments" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select> -->
        </div>
      </div>
      <div class="nav_right">
        <el-button type="text" @click="exit">退出<i class="iconfont icon-xialashixin" style="margin-left:8px"></i></el-button>
      </div>
    </header>
    <div class="main">
      <div class="left">
        <div class="left_top">
          <div class="left_top_main">
            <div class="left_top_main_up">
              <div class="left_top_content">
                <span class="left_top_content_num">C07</span>
                <div class="left_top_content_right">
                  <span>订单列表</span>
                  <span class="left_top_content_order">NO.123 456 789 132</span>
                </div>
              </div>
              <div class="right_top_content">
                <div>零钱：{{memberInfo.money || 0}}</div>
                <div>积分：{{memberInfo.inte || 0}}</div>
              </div>
            </div>
            <div class="left_top_bottom">
             <el-input placeholder="请输入会员卡号" size="small" v-model="memberInfo.card_num" clearable>
                <template slot="prefix">NO:</template>
                <el-button slot="append" icon="el-icon-search" @click="searchUserInfo"></el-button>
              </el-input>
            </div>
          </div>
        </div>
        <div class="left_middle">
          <div class="left_middle_item" v-for="(item,index) in chooseFoods" :key="index">
            <div class="left_middle_circle">{{index+1}}</div>
            <div class="left_middle_info">
              <div class="left_middle_info_food">
                <p>{{item.goods_name}}</p>
                <p class="left_middle_info_food_bottom">
                  <span>{{`NO.${item.goods_id}`}}</span>
                  <!-- <span>{{"粤菜"}}</span> -->
                </p>
              </div>
              <span>{{`x${item.goods_num}`}}</span>
              <span class="left_middle_info_price" :class="item.present ?'left_middle_price_present':''">{{`￥${item.shop_price}`}}</span>
              <p class="note_class" v-if="item.note">{{`备注：${item.note}`}}</p>
            </div>
            <div class="left_middle_item_sale" v-if="item.discount > 0 && item.discount < 1">
              <span>折</span>
              <span>特</span>
            </div>
            
            <el-checkbox-group class="left_middle_item_del" v-model="checkboxArr" @change="handleCheckbox">
              <el-checkbox :label="item.goods_id">&nbsp;</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="left_bottom">
          <div class="left_bottom_info">
            <div class="left_bottom_info_item">
              <p>数量：{{chooseFoods.length}}</p>
              <p>折扣：-￥{{discountMoney}}</p>
            </div>
            <div class="left_bottom_info_item">
              <p>合计：</p>
              <p class="left_bottom_info_itme_total">￥{{totalMoney}}</p>
            </div>
          </div>
          <div class="left_bottom_noteClass">
            <span>全单备注：</span>
            <span class="left_bottom_noteClass_text">{{orderNote}}</span>
          </div>
          <div class="left_bottom_btn">
            <el-button type="danger" @click="orderRemarks">全单备注</el-button>
            <el-button type="primary"  @click="showPayMask" >结账</el-button>
          </div>
        </div>
      </div>



      <div class="right">
        <div class="right_nav">
         <!-- <div class="right_nav_item" :class="lightNavType=='huancan'?'lightNav':''">
            <div class="right_nav_item_inner">
              <i class="iconfont icon-view" style="font-size:25px;margin-bottom:5px"></i>
              <span>换餐</span>
            </div>
          </div> 
          <div class="right_nav_item" :class="lightNavType=='tuicai'?'lightNav':''"> 
            <div class="right_nav_item_inner" >
              <i class="iconfont icon-guanbi" style="font-size:25px;margin-bottom:5px"></i>
              <span>退菜</span>
            </div>
          </div>   -->
          <div class="right_nav_item" :class="lightNavType=='addNum'?'lightNav':''" @click="addNum('addNum')" @dblclick="cancelLigntNav">
            <div class="right_nav_item_inner" >
              <i class="iconfont icon-zengjia" style="font-size:25px;margin-bottom:5px"></i>
              <span>增加数量</span>
            </div>
          </div>  
          <div class="right_nav_item" :class="lightNavType=='reduceNum'?'lightNav':''" @click="reduceNum('reduceNum')" @dblclick="cancelLigntNav">
             <div class="right_nav_item_inner" >
              <i class="iconfont icon-jianshao" style="font-size:25px;margin-bottom:5px"></i>
              <span>减少数量</span>
            </div>
          </div>  
          <div class="right_nav_item" :class="lightNavType=='delFoods'?'lightNav':''"  @click="delFoods('delFoods')">
             <div class="right_nav_item_inner">
              <i class="iconfont icon-shanchu" style="font-size:25px;margin-bottom:5px"></i>
              <span>删菜</span>
            </div>
          </div>  
          <div class="right_nav_item"  :class="lightNavType=='manage'?'lightNav':''" @click="manage('manage')">
            <div class="right_nav_item_inner">
              <i class="iconfont icon-guanli" style="font-size:25px;margin-bottom:5px"></i>
              <span>管理</span>
            </div>
          </div>
             
          <div class="right_nav_item">
            <div class="right_nav_item_inner" @click="remarks">
              <i class="iconfont icon-tianjiabeizhu" style="font-size:25px;margin-bottom:5px"></i>
              <span>备注</span>
            </div>
          </div>

          <div class="right_nav_item"  :class="isHasSingleNote?'lightNav':''" >
             <div class="right_nav_item_inner" @click="sNoteRemove">
              <i class="iconfont icon-cancel" style="font-size:25px;margin-bottom:5px"></i>
              <span>取消备注</span>
            </div>
          </div>
            
          <div class="right_nav_item"  :class=" isPresent ?'lightNav':''" >
             <div class="right_nav_item_inner" @click="present('present')"  v-if="!isPresent">
              <i class="iconfont icon-zengsong" style="font-size:25px;margin-bottom:5px"></i>
              <span>赠送</span>
            </div>
            <div class="right_nav_item_inner" @click="canclePresent" v-else>
              <i class="iconfont icon-zengsong" style="font-size:25px;margin-bottom:5px"></i>
              <span>取消</span>
            </div>
          </div>  
            
          <div class="right_nav_item"  :class="{lightNav:isTakeOut === 2}"  @click="takeOut">
            <div class="right_nav_item_inner">
              <i class="iconfont icon-waimai" style="font-size:25px;margin-bottom:5px"></i>
              <span>外卖</span>
            </div>
          </div>  
           
          <el-badge :value="goodsUpArr.length" class="item" :hidden="goodsUpArr.length == 0"> 
            <div class="right_nav_item"   :class="goodsUpArr.length?'lightNav':''"  @click="putUp">
                <div class="right_nav_item_inner">
                  <i class="iconfont icon-tuichu" style="font-size:25px;margin-bottom:5px"></i>
                  <span>挂单</span>
                </div>
            </div>
          </el-badge>   
        </div>

        <div class="right_menu">
          <div class="right_menu_bar">
            <i class="iconfont icon-xiangzuo" @click="forwardTab"></i>
            <ul class="right_menu_bar_list">
              <li :class="currentMenu == index ? 'right_menu_bar_item':''"
                v-for="(item,index) in menuNav"
                :key="index"
                @click="menuTap(item.cat_id,index)"
              >{{item.name}}</li>
            </ul>
            <i class="iconfont icon-xiangyou" @click="backTab"></i>
          </div>
          <div class="right_menu_search">
            <i class="iconfont icon-sousuo"></i>
            <input type="text" placeholder="请输入关键字" v-model="searchKeyConfig.keyword"  @change="searchFoods" />
          </div>
        </div>


        <div class="right_bottom">
          <ul class="right_bottom_ul"  @scroll="lodeMore" ref="scrollElement">
            <li v-for="(item,index) in foodList" :key="index" @click="selectFood(item)">
              <div class="right_bottom_photo">
                <img :src="item.picture" alt />
                <div class="right_bottom_photo_mask">
                  <div>
                    <template class="right_bottom_photo_sale" v-if="item.discount > 0 && item.discount < 1">
                        <span>折</span>
                        <span>特</span>
                    </template>
                  </div>
                  <span>￥{{item.shop_price*1}}</span>
                </div>
              </div>
              <p>{{item.goods_name}}</p>
              <p>{{`NO.${item.goods_id}`}}</p>
            </li>
          </ul>  
        </div>
      </div>
    </div>


    <el-dialog title="添加备注" :visible.sync="singleNoteInput" width="30%" center :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
       <el-input type="textarea" placeholder="请输入商品备注信息" v-model="textarea"  maxlength="30" show-word-limit></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelSingleNote">取 消</el-button>
        <el-button type="primary" @click="sNoteConfirm">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="全单备注" :visible.sync="orderNoteInput" width="30%" center  :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
       <el-input type="textarea" placeholder="请输入订单备注信息" v-model="orderNote"  maxlength="50" show-word-limit></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelOrderNote">取 消</el-button>
        <el-button type="primary" @click="orderNoteInput = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="商品挂单" :visible.sync="isGoodsUp" width="35%" center  top="5vh"  :close-on-click-modal="false" :close-on-press-escape="false">
       <ul class="left_middle goodsUp">
         <li v-for="(pItem,PIndex) in goodsUpArr" :key="PIndex">
           <el-radio v-model="cancelGoodUp" :label="PIndex" :border= false  size="mini" style="margin-bottom:15px" @change="cancelGoodUpBtn" >取消挂单</el-radio>
           <div class="left_middle_item" v-for="(item,index) in pItem" :key="index">
             <div class="left_middle_circle">{{index+1}}</div>
              <div class="left_middle_info">
                <div class="left_middle_info_food">
                  <p>{{item.goods_name}}</p>
                  <p class="left_middle_info_food_bottom">
                    <span>{{`NO.${item.goods_id}`}}</span>
                    <!-- <span>{{"粤菜"}}</span> -->
                  </p>
                </div>
                <span>{{`x${item.goods_num}`}}</span>
                <span class="left_middle_info_price" :class="item.present ?'left_middle_price_present':''">{{`￥${item.shop_price}`}}</span>
                <p class="note_class" v-if="item.note">{{`备注：${item.note}`}}</p>
              </div>
           </div>
        </li>
       </ul>
    </el-dialog>

    <div class="maskLayer" v-if="drawer">
        <div class="mask_layer_content">
          <div class="mask_layer_content_top">
            <div class="m_l_c_top_Btn" :class="{'pay_method_light':payType == item.value}" v-for="(item,index) in paymentTerm" :key="index" @click="payMethodTap(item.value)">
              {{item.name}}
              <img v-if="payType == item.value" src="../assets/img/corner.png"/>
            </div>
          </div>
          <div class="mask_layer_content_middle">
            <div class="mask_layer_content_middle_item">
              <span class="m_l_c_m_title">本次支付</span>
              <el-input size="small" placeholder="请使用扫码器进行扫描"  :value="`￥${payAmount}`"  disabled  class="autoInput input_red_color"></el-input>
            </div>
            <div class="mask_layer_content_middle_item">
              <span class="m_l_c_m_title">优惠金额</span>
              <el-input size="small" placeholder="0.00"  v-model="disAmount" ref="inputMoney"  clearable class="autoInput">
                <i slot="prefix" class="el-input__icon">￥</i>
              </el-input>
            <el-button type="primary" size="small" style="width:100px;font-size:14px" @click="disAmountBtn">确 认</el-button>
            </div>
            <div class="mask_layer_content_middle_item">
              <span class="m_l_c_m_title">请扫描</span>
              <el-input size="small" placeholder="请使用扫码器进行扫描" ref="autofocus"  v-model="searchCode" clearable  class="autoInput"></el-input>
            </div>
          </div>
          <table>
              <tr>
                <td @click="inputMoneyBtn(7)">7</td>
                <td @click="inputMoneyBtn(8)">8</td>
                <td @click="inputMoneyBtn(9)">9</td>
                <td @click="inputMoneyBtn(10)">10</td>
                <td class="td_blue_bgcolor">打印结账单</td>
                <td class="td_blue_bgcolor">需开发票</td>
              </tr>
              <tr>
                <td @click="inputMoneyBtn(4)">4</td>
                <td @click="inputMoneyBtn(5)">5</td>
                <td @click="inputMoneyBtn(6)">6</td>
                <td @click="inputMoneyBtn(20)">20</td>
                <td colspan="2" @click="cancelDrawer">返回</td>
              </tr>
              <tr>
                <td @click="inputMoneyBtn(1)">1</td>
                <td @click="inputMoneyBtn(2)">2</td>
                <td @click="inputMoneyBtn(3)">3</td>
                <td @click="inputMoneyBtn(50)">50</td>
                <td style="vertical-align: middle;" colspan="2" rowspan="2">
                <el-button type="danger" style="width:100%;height:100%;font-size:20px" @click="confirmPay" :loading="payling">结 账</el-button>
                </td>
              </tr>
              <tr>
                <td  @click="inputMoneyBtn(0)">0</td>
                <td  @click="inputMoneyBtn('00')">00</td>
                <td  @click="inputMoneyBtn('.')">.</td>
                <td  @click="inputMoneyBtn(100)">100</td>
              </tr>
            </table>
          </div>
        </div> 
      </div> 
  </div> 
</template>

<script>
let timer;
export default {
  data() {
    return {
      socketLimit:0,//socket重链次数
      payling:false,//是否正在支付
      payType:'5',//收款方式
      disAmount:'', //优惠金额
      payAmount:0,//需要支付金额
      searchCode:'',//扫码的序列号
      drawer:false, //显示遮罩层
      isTakeOut:1, //是否外带 1为堂食  2为外带
      memberInfo:{ //会员信息
        user_id:'', //会员id
        nickname:'', //会员名称
        card_num:'', //会员卡号
        money:'', //会员余额
        inte:'' //会员积分
      },
      isGoodsUp:false,//是否挂单
      cancelGoodUp:null,//取消挂单索引
      deviceNum:"",//收款设备SN
      userInfo:null, //用户信息
      isPresent:false,//是否赠送商品
      singleNoteInput: false, //单条备注输入框
      isHasSingleNote: false, //是否有单条备注
      textarea: "", //单商品备注信息
      orderNoteInput:false, //订单备注输入框
      orderNote:'',//订单备注信息
      checkboxArr: [], //复选框数组
      lightNavType: null, //高亮导航类型
      currentMenu: null, //当前菜单
      totalMoney: 0, //总金额
      discountMoney: 0, //折扣金额
      menuNav: [],//菜单分类
      requestConfig:{//商品请求配置
        cat_id:0,
        page:0,
        page_num:10
      },
      searchKeyConfig:{ //关键字搜索请求
      keyword:'',
      cat_id:'',
      page:0,
      page_num:10
      },
      submitConfig:{ //订单提交请求
        sn:'', //设备的sn
        note:'', //全单备注
        take_out:1, //1表示堂食,2表示外带
        concessional:"0",//优惠金额
        type:"5",//1：支付宝刷脸 ，4：微信刷脸,5：现金支付，6：支付宝，7：微信，//8：扫码枪
        bar_code:'',//扫码枪的条形码
        goodslist:[] //订单商品列表
      },
      foodList: [],//菜单列表
      foodsCatchArray:[],//菜单缓存列表
      chooseFoods: [],//已选菜品
      goodsUpArr: [],//挂单数组
      webSocket:null,//soket通信
      paymentTerm:[ //收款方式数组
        {type:"xianjin",name:'现金',value:5},
        {type:"weChat",name:'微信',value:7},
        {type:"alipay",name:'支付宝',value:6},
        {type:'codeScanner',name:'扫码枪',value:8},
        {type:"weChatFace",name:'微信刷脸',value:4},
        {type:"alipayFace",name:'支付宝刷脸',value:1},
      ]
    };
  },
  created(){
    this.userInfo = JSON.parse(localStorage.getItem("USER_INFO"));
    this.cacheInfo();
    this.category();
    this.sumMoney();
  },
  methods: {
    clearOrderInfo(){ //清空订单信息
      this.disAmount = '';
      this.searchCode = '';
      this.isTakeOut = 1;
      this.chooseFoods.splice(0);
      this.checkboxArr.splice(0);
      this.isPresent = false;
      this.isHasSingleNote = false;
      this.lightNavType = null;
      this.orderNote = '';
      this.deviceNum = '';
      this.payType = "5";
      this.drawer = false;
      this.sumMoney();
    },
    cancelDrawer(){ //取消支付返回
      this.deviceNum = '';
      this.disAmount = '';
      this.searchCode = '';
      this.payType = "5";
      this.payling = false;
      this.drawer = false;
    },
    confirmPay(){ //确认支付结账
      this.submitConfig.concessional = this.disAmount; //商品优惠金额
      this.submitConfig.goodslist = this.chooseFoods; //商品订单列表
      this.submitConfig.take_out = this.isTakeOut; //是否为外带
      this.submitConfig.note = this.orderNote; //订单备注
      this.submitConfig.type = this.payType;//支付类型
      if(this.submitConfig.type === 8){
         this.submitConfig.bar_code = this.searchCode; //扫码条形码
      }
      this.payling = true;
      this.$https.post(this.$api.submitConfirm,this.submitConfig).then(res => {
        if( res && res.code == 200){
           if(res.data.payType === 1){
            this.$note.success({message:"结账成功!",center:true});
            setTimeout(()=>{
              this.clearOrderInfo();
              this.payling = false;
            },800)
           }else if(res.data.payType === 3){
             this.toEquipment(res.data.order_sn);
           }
        }
      }) 
    },
    inputMoneyBtn(value){ //输入优惠金额
      var reg = /^(10|20|50|100)/i;
      if(reg.test(value)){
        this.disAmount = value;
      }else{
        this.disAmount += value.toString();
      }
    },
    payMethodTap(value){ //切换支付方式
      if(value == '8'){
        this.$refs['autofocus'].focus();
      }else if(value == '1'){
        let alipay = this.userInfo.alipayEquipments;
        if(alipay[0]){
          this.deviceNum = alipay[0].value;
        }
      }else if(value == '4'){
        let wechat = this.userInfo.wechatEquipments;
        if(wechat[0]){
          this.deviceNum = wechat[0].value;
        }
      }
      this.payType = value;
    },
    disAmountBtn(){ //点击优惠按钮
      if(!this.disAmount || (this.disAmount > this.payAmount)) return this.disAmount = '';
      this.payAmount = (this.payAmount - this.disAmount).toFixed(2);
    },
    searchUserInfo(){ //搜索会员的余额及积分
      if(!this.memberInfo.card_num) return;
      this.$https.post(this.$api.userInfo,this.memberInfo).then((res)=>{
        if( res && res.code === 200){
          this.memberInfo = res.data;
        }
      })
    },
    cancelLigntNav(){ //取消按钮高亮
      clearTimeout(timer);
      this.lightNavType = null;
      this.checkboxArr.splice(0); 
    },
    selectDevice(value){ //选择收款设备
      this.deviceNum = this.submitConfig.sn = value;
    },
    cancelOrderNote(){ //取消全单备注
      this.orderNoteInput = false;
      this.orderNote = '';
    },
     remarks(type) {//调用菜品备注输入框
      if (this.checkboxArr.length == 0)return;
      //  this.$note.warning({message:"请勾选需添加备注的商品",center:true})
      this.singleNoteInput = true;
    },
    cancelSingleNote(){ //取消单商品备注
      this.textarea = '';
      this.checkboxArr.splice(0);
      this.singleNoteInput = false;
    },
    sNoteConfirm(){ //添加单商品备注
        this.chooseFoods.forEach((item)=>{
          this.checkboxArr.forEach((num,index)=>{
            if(item.goods_id == num){
              item.note = this.textarea;
              this.checkboxArr.splice(index,1);
            }
         })
      })
      this.isHasSingleNote = true;
      this.singleNoteInput = false;
      this.textarea = "";
    },
     sNoteRemove(){ //删除单商品备注
     if (this.checkboxArr.length == 0)return ;
    //  this.$note.warning({message:"请勾选需移除备注的商品",center:true})
        this.chooseFoods.forEach((item)=>{
          this.checkboxArr.forEach((num,index)=>{
            if(item.goods_id == num){
              item.note = "";
              this.checkboxArr.splice(index,1);
             }
          })
      })
      this.isHasSingleNote = this.chooseFoods.some((item)=>{return item.note});
    },
     sumMoney() {//计算总金额
      let total = 0,discount = 0;
      this.chooseFoods.forEach(item => {
         if(!item.present){ //非赠送的商品才计算金额
            total += item.shop_price * item.goods_num;
           discount += (item.shop_price - item.shop_price * item.discount) * item.goods_num;
         }
      });
      this.totalMoney = Math.ceil((total - discount) * 100) / 100;
      this.discountMoney = Math.floor(discount * 100) / 100;
      var catchInfo = {cacheFoods:this.chooseFoods,discountMoney:this.discountMoney,totalMoney:this.totalMoney};
      sessionStorage.setItem("CATCH_INFO",JSON.stringify(catchInfo));
    },
    searchFoods(){ //搜索商品
      this.$https.post(this.$api.searchFood,this.searchKeyConfig).then(res => {
        if(res && res.code == 200){
          if(res.data.length){
            this.foodList = res.data;
          }
        }
      })
    },
    cacheInfo(){ //获取缓存信息
        var catchInfo = sessionStorage.getItem("CATCH_INFO");
        var goodsUp = sessionStorage.getItem("GOODS_UP");
        if(catchInfo){
          let {cacheFoods,discountMoney,totalMoney} = JSON.parse(catchInfo);
          this.chooseFoods = cacheFoods;
          this.discountMoney = discountMoney;
          this.totalMoney = totalMoney;
        }
        if(goodsUp){
          this.goodsUpArr = JSON.parse(goodsUp);
        }
    },
    category(){ //商品分类
        this.$https.post(this.$api.category).then(res => {
        if(res && res.code == 200){
          this.menuNav =  res.data;
          if(res.data.length > 0){
            res.data.map((item,index) => { //创建菜单缓存数组
              this.foodsCatchArray[index] = {
                list:[],
                requestConfig:{//商品请求配置
                  cat_id:0,
                  page:0,
                  page_num:10
                },
                isFinish:false
              }
            })
             this.foodsCatchArray[0].requestConfig.cat_id = res.data[0].cat_id;
             this.currentMenu = 0;
          }
        }
      })
    },
    goodsList(){ //商品列表 // 导航栏切换时需初始化请求数据 
       this.$refs.scrollElement.scrollTop = 0;
       let currentFood = this.foodsCatchArray[this.currentMenu];
       if(currentFood.list.length == 0){
            this.$https.post(this.$api.goods,currentFood.requestConfig).then(res => {
              if(res && res.code == 200){
                this.foodList = currentFood.list = res.data;
                if(res.data.length < 10){ //首次就已经加载完后台数据
                  currentFood.isFinish = true;
                }
              }
          })
       }else{
         this.foodList = currentFood.list;
       }
    },
     lodeMore(e){ //加载更多
      let currentFood = this.foodsCatchArray[this.currentMenu];; //获取需要加载更多的菜单数组 
      if(currentFood.isFinish) return false;
      let{scrollTop,clientHeight,scrollHeight} = e.target;
      if(scrollHeight  == (scrollTop + clientHeight) ){
         currentFood.requestConfig.page++;
         let loadingIcon  =  this.$loading.service({
          target:".right_bottom",
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0,0,0,0.3)'
        });
        this.$https.post(this.$api.goods,currentFood.requestConfig).then(res => {
          setTimeout(() => {
                loadingIcon.close();
          },500);
          if(res && res.code == 200){
            this.foodList = currentFood.list = currentFood.list.concat(res.data);
            if(res.data.length < 10){
               currentFood.isFinish = true;
            }
          }
        })
      }
    },
     menuTap(cateId,index) {//切换菜单栏
      this.currentMenu = index;
      this.foodsCatchArray[index].requestConfig.cat_id = cateId;
    },
    forwardTab() {
      //菜单前进按钮
      if (this.currentMenu === 0) return false;
      this.currentMenu--;
      this.foodsCatchArray[this.currentMenu].requestConfig.cat_id  = this.menuNav[this.currentMenu].cat_id;
    },
    backTab() {
      //菜单前进按钮
      if (this.currentMenu === this.menuNav.length - 1) return false;
      this.currentMenu++;
      this.foodsCatchArray[this.currentMenu].requestConfig.cat_id  = this.menuNav[this.currentMenu].cat_id;
    },
    handleCheckbox(array) {//点击checkbox选择框
      this.checkboxArr = array;
    },
    selectFood(obj) {//添加菜品
        // let jsObj =  JSON.stringify(obj);
        // let deepObj = JSON.parse(jsObj);
        let deepObj = Object.assign({},obj); //对象深拷贝
        let foodIndex;
        let isHas  =  this.chooseFoods.some((one,index)=>{
          foodIndex = index;
          return one.goods_id == deepObj.goods_id;
        });
        if(isHas){
          this.chooseFoods[foodIndex].goods_num++;
        }else{
          this.chooseFoods.unshift(deepObj);
        }
        this.sumMoney();
    },
    delFoods(type) {//删除已选菜品
      if (this.checkboxArr.length == 0)return; 
      // this.$note.warning({message:"请勾选需移除的商品",center:true});
        this.lightNavType = type;
        this.checkboxArr.forEach(num => {
          this.chooseFoods = this.chooseFoods.filter(item => {
            return item.goods_id != num;
          });
        });
        this.checkboxArr = [];
        this.sumMoney();
        setTimeout(()=>{
          this.lightNavType = null;
        },800)
    },
    addNum(type) {//增加已选菜品数量
      if (this.checkboxArr.length == 0)return;
      //  this.$note.warning({message:"请勾选需增量的商品",center:true})
      clearTimeout(timer);
      timer = setTimeout(()=>{
        this.chooseFoods.forEach(item => {
          this.checkboxArr.forEach(num => {
            if (item.goods_id == num) {
              item.goods_num++;
            }
          });
        });
        this.lightNavType = type;
        this.sumMoney();
      },500)
    },
    reduceNum(type) {//减少已选菜品数量
      if (this.checkboxArr.length == 0)return;
      //  this.$note.warning({message:"请勾选需减量的商品",center:true})
      clearTimeout(timer);
      timer = setTimeout(()=>{
          this.chooseFoods.forEach(item => {
            this.checkboxArr.forEach(num => {
              if (item.goods_id == num && item.goods_num > 1) {
                item.goods_num--;
              }
            });
          });
        this.lightNavType = type;
        this.sumMoney();
      },500);
    },
    orderRemarks() { //订单备注信息
      if (!this.chooseFoods.length)  return;
      // this.$note.error({message:"请添加商品!",center:true})
      this.orderNoteInput = true;
    },
    present(type){ //赠送
      if (this.checkboxArr.length == 0)return;
      // this.$note.warning({message:"请勾选需赠送的商品",center:true})
      this.chooseFoods.forEach(item => {
        this.checkboxArr.forEach((num,index) => {
          if (item.goods_id == num) {
            item.present = true;
            this.checkboxArr.splice(index,1); //清空多选框状态
          }
        });
      });
      this.isPresent = true;
      this.sumMoney();
    },
    canclePresent(){ //取消赠送
     if (this.checkboxArr.length == 0)return ;
     // this.$note.warning({message:"请勾选需取消赠送的商品",center:true})
      this.chooseFoods.forEach(item => {
        this.checkboxArr.forEach((num,index) => {
          if (item.goods_id === num) {
             item.present = false;
             this.checkboxArr.splice(index,1); //清空多选框状态
          }
        });
      });
      this.isPresent = this.chooseFoods.some((item)=>{return item.present === true}); //判断是否还有需要赠送的商品,如果有继续保持高亮按钮
      this.sumMoney();
    },
    exit() {
      //退出登录
      this.$message.confirm("您是否确定退出?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
        .then(() => {
          sessionStorage.clear();
          localStorage.clear();
          this.$router.replace("/login");
        }).catch(()=>{
          this.$note({message:"取消退出",center:true});
        })
    },
    showPayMask(){  //显示结账遮罩框
      if (!this.chooseFoods.length) return;
      this.drawer = true;
      this.payAmount = this.totalMoney; 
    },
    putUp(){//挂单
      if(this.chooseFoods.length){
          this.$message.confirm('已选商品将会挂单处理, 是否继续?', '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: "warning"
          }).then(() => {
            this.goodsUpArr.push(this.chooseFoods);
            this.chooseFoods = [];
            this.sumMoney();
            sessionStorage.setItem('GOODS_UP',JSON.stringify(this.goodsUpArr))
            this.$message.confirm("挂单成功","提示",{
                confirmButtonText: '查看',
                cancelButtonText: '取消',
                type:"success"
            }).then(()=>{
                this.isGoodsUp = true;
            }).catch(()=>{
              
            });
          })
       }else{
         if(!this.goodsUpArr.length) return;
         this.isGoodsUp = true;
       }
    }, 
    cancelGoodUpBtn(){ //取消挂单
      this.chooseFoods = this.goodsUpArr[this.cancelGoodUp];
      this.goodsUpArr.splice(this.cancelGoodUp,1);
      sessionStorage.setItem('GOODS_UP',JSON.stringify(this.goodsUpArr));
      this.cancelGoodUp = null;
      this.isGoodsUp  = false;
      this.sumMoney();
    },
    takeOut(){//外卖
      if(!this.chooseFoods.length) return;
      this.isTakeOut == 1 ? this.isTakeOut = 2 : this.isTakeOut = 1;
    },
    manage(){//管理

    },
    toEquipment(orderNum){ //调起刷脸设备
      let data = {order_sn:orderNum,sn:this.deviceNum,old_sn:`web${this.userInfo.id}`};
       this.$https.post(this.$api.toEquipment,data).then(res => {
        if(res && res.code == 200){ //调起刷脸设备后建立webSocket监听
           this.initSocket();
        }
      }) 
    },
    initSocket(){ //初始化webSocket
      this.webSocket = new WebSocket("wss://api.2020demo.jiafuw.com/wss");
      this.webSocket.onopen = this.webSocketOpen;
      this.webSocket.onmessage = this.webSocketGetMessage;
        // 监听socket错误信息
      this.webSocket.onerror = this.webSocketError;
        // 监听socket消息
      this.webSocket.onclose =  this.webSocketClose;
    },
    webSocketOpen(){ //webSocket建立链接发送消息
      this.webSocket.send(JSON.stringify({sn:`web${this.userInfo.id}`,type:4}));
    },
    webSocketClose(){  //webSocket断开重连
      this.socketLimit++;
      if(this.socketLimit < 10){
        this.initSocket();
      }
    },
    webSocketGetMessage(result){ //监听服务器回调信息
       let serverMsg = JSON.parse(result.data);
      if(serverMsg.code == 1){
        this.$note.success({message:"用户支付成功",center:true});
        setTimeout(()=>{
          this.clearOrderInfo();
        },800)
        this.payling = false;
        this.webSocket.close(); //支付成功关闭webSocket监听
      }else if(serverMsg.code == -1){
        this.$message.confirm("是否清空列表?", "用户取消支付", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        }).then(res => {
          this.clearOrderInfo();
        });
         this.payling = false;
        this.webSocket.close(); //取消支付关闭webSocket监听
      }
    },
    webSocketError(e){ //websocket失败
      console.log(e);
    }
  },
  watch:{
    'currentMenu':function(){
      this.goodsList();
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
.nav_left_user_info{
  display:flex;
  align-items:center;
}
.nav_left_user_info > i {
  font-size:30px;
  padding:5px;
  /* margin-right:10px; */
  background:#fff;
  border-radius:50%;
  color:#375ECC;
}

.nav_left_user_info > span:nth-child(2) {
  padding: 0 20px;
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
  color: #ffffff !important;
}
.nav_right > button {
 color:#fff;
 font-size:16px;
}

.main {
  box-sizing: border-box;
  height: calc(100vh - 70px);
  padding: 10px;
  display: flex;
}

.left {
  width:400px;
  height: 100%;
  background: #212120;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.left > .left_top {
  width: 100%;
  height:auto
}
.left_top_main {
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.left_top_main_up{
  display:flex;
  align-items:stretch;
  padding:8px;
  margin:0 auto;
}

.right_top_content{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  align-items: start;
  margin-left: 15px;
  color:#fff;
  font-size:14px;
}

.left_top_bottom {
  flex: 1;
  border-radius: 5px 5px 0 0;
  box-sizing: border-box;
  padding: 10px 15px;
  text-align: left;
  width:85%;
  margin: 0 auto;
}

.left_top_bottom > p:nth-child(1) {
  color: #523802;
  padding-bottom: 10px;
  font-weight: 600;
  font-size:14px;
}

.left_top_bottom > p:nth-child(2) {
  color: rgba(0, 0, 0, 0.6);
  font-size: 12px;
  font-weight: 600;
}

.left_top_content {
  display: flex;
  justify-content: center;
  align-items: center;
  align-items: stretch;
  color: #ffffff;
  flex-shrink: 0;
}
.left_top_content_num {
  font-size: 30px;
  margin-right: 10px;
  letter-spacing: 2px;
}
.left_top_content_right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  font-size: 13px;
  padding: 3px 5px;
  overflow: hidden;
}
.left_top_content_order {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  padding-top: 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.left_middle {
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
  bottom: 20px;
}


.note_class{
  position: absolute;
  left:0px;
  bottom: 5px;
  font-size: 13px;
  color:#dca53c;
  width:100%;
  text-align:left;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.left_middle_item_del {
  position: absolute;
  right: 0px;
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
  text-align:center;
}

.left_middle_info {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px;
  padding-bottom: 25px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.4);
  position: relative;
  overflow: hidden;
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
.left_middle_info .left_middle_price_present{
   color:#e3ac42;
   text-decoration:line-through;
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
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background: #21201f;
  border-radius: 8px 8px 0 0;
  box-shadow: 0px -1px 2px 1px rgba(0, 0, 0, 0.4);
}

.left_bottom_noteClass{
  text-align:left;
  margin-bottom: 13px;
  color: #fff;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.left_bottom_info {
  flex: 1;
  margin-bottom: 13px;
  display: flex;
  justify-content: space-between;
  align-items:stretch;
}

.left_bottom_info_item {
  width: 48%;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #ffffff;
}

.left_bottom_info_itme_total{
  margin-top:15px;
  font-size:20px;
}

.left_bottom_noteClass_text{
  color:#dca53c;
}


.left_bottom_btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left_bottom_btn > button {
  width: 48%;
  /* padding: 15px 0; */
  font-size: 16px; 
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
  justify-content: space-around;
  padding: 0 15px;
}
.right_nav_item {
  width: 76px;
  height: 76px;
  box-sizing: border-box;
  border: 5px solid rgba(255, 255, 255, 0.6);
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

.lightNav {
  background: linear-gradient(120deg, red, blue, green);
}

.lightNav > .right_nav_item_inner {
  transform: scale(0.98);
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
  flex-wrap: nowrap;
  align-items: center;
  align-self: stretch;
  overflow-x: scroll;
}

.right_menu_bar_list > li {
  position: relative;
  padding:0 10px;
  margin:0 15px;
  letter-spacing: 2px;
  line-height:50px;
  align-self:stretch;
}

.right_menu_bar_item {
  color: #dca53c;
}

.right_menu_bar_item::after {
  display: block;
  content: "";
  position: absolute;
  left: 0;
  bottom:0px;
  width: 100%;
  height: 3.5px;
  background: #e1a93d;
  border-radius: 10px;
}

.icon-xiangzuo {
  padding-right: 5px;
  font-size:20px;
}

.icon-xiangyou {
  padding-left: 5px;
  font-size:20px;
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
  display:flex;
  flex-direction: column;
  text-align:center;
  overflow: hidden;
}

.right_bottom > ul {
  width:100%;
  height:100%;
  display: flex;
  flex-wrap: wrap;
  overflow-y:scroll;
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
  margin-bottom:5px;
  overflow: hidden;
}
.right_bottom_photo {
  flex: 1;
  border-radius:8px;
  overflow: hidden;
  position: relative;
}

.right_bottom_photo_mask {
  z-index: 2;
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 34px;
  padding: 5px 10px;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
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
  font-size: 18px;
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

.goodsUp{
  height:400px;
  overflow-y: scroll;
  border-radius: 5px;
  background:rgba(0, 0, 0, 0.4);
}

.goodsUp .left_middle_info{
  border-bottom: 1.2px solid ;;
}

/deep/.left_top_bottom  .el-input__prefix{
  display: flex;
  align-items: center;
  font-size: 14px;
}
/deep/.el-input-group>.el-input__inner{
  text-indent:2px;
  font-size:13px;
  outline: none;
  border: none;
}

.maskLayer{
 position: absolute;
 top:0;
 right:0;
 left:0;
 bottom:0;
 z-index:998;
 background-color: rgba(0, 0, 0, 0.5);
 box-sizing: border-box;
}

.mask_layer_content{
  position: absolute;
  top:80px;
  left:420px;
  right:0;
  bottom:0;
  z-index:999;
  background:rgba(0, 0, 0,1);
  box-sizing: border-box;
  padding:15px 50px;
  border-radius: 10px;
  overflow: hidden;
  display:flex;
  flex-direction: column;
} 

.mask_layer_content_top{
  display:flex;
  flex-wrap: wrap;
  align-items:center;
  margin-bottom:15px;
}


.mask_layer_content_middle{
  display:flex;
  flex-wrap: wrap;
  align-items:center;
  margin-bottom:15px;
}

.mask_layer_content_middle_item{
  display:flex;
  align-items:center;
  margin: 0 10px 15px 0;
}

.mask_layer_content_middle_item .autoInput{
  width:200px;
  margin:0 10px;
  font-size: 14px;
}

/deep/.input_red_color > input{
   color:#f92a41 !important;
   font-size:15px;
}


.m_l_c_top_Btn{
  width:150px;
  height:60px;
  line-height:60px;
  background:#fff;
  margin:0 15px 15px 0;
  border-radius:3px;
  font-weight: bold;
  box-sizing:border-box;
  position: relative;
}

.m_l_c_top_Btn>img{
  position: absolute;
  top: -2px;
  right: -2px;
  width: 25px;
  height: 25px;
}

.m_l_c_m_title{
  color:#fff;
  font-weight:400;
  min-width:65px;
  text-align: right;
}

table{
  width:100%;
  table-layout: fixed;
  border-collapse: separate;
  border-spacing:8px;
  box-sizing:border-box;
}

td{
  width:110px;
  height:50px;
  line-height:50px;
  border-radius:4px;
  background:#fff;
  font-size:18px;
  font-weight: bold;
  color:#137DD0;
}

.pay_method_light{
  border:3px solid #D72334;
}

.td_blue_bgcolor{
  background:#137DD0;
  color:#fff;
}



</style>