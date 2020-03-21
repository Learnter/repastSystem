
const API = {
    login:"storeshopclerk/accountLogin", //登录接口
    category:'goods/cateListFromCash', //商品分类
    goods:'goods/getGoodsByCateIdFromCash',//商品列表
    searchFood:'goods/searchgoods',//搜索商品
    submitConfirm:'order/commitOrder', //提交结算
    toEquipment:'order/webToEquipment', //调用刷脸设备
    userInfo:'User/getuserInfo' //会员信息
    
}
export default API;