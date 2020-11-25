<template>
      <div>
            <div class="setting">
               <div class="cells" @click="onChangetheme">
                  <span>切换主题</span>
                  <span><img src="../../../static/images/right.svg" alt=""></span>
               </div>
               <div class="cells" @click="about">
                  <span >关于</span>
                  <span><img src="../../../static/images/right.svg" alt=""></span>
               </div>
          </div>
          <actionsheet 
          :datalist='itemList' 
          :show='showsheet' 
          :themeindex='themed'
          @onclose='onhandlClose'
          @onSelect='onSelect'
          />
      </div>
</template>

<script>
import actionsheet from '../../components/actionsheet';
import store from '../../store';
export default {
      data(){
            return{
                    itemList:[
                    {
                         name:'山茶红',
                         id:'theme-one',
                         color:'#f1939c' 
                    },
                     {
                         name:'锌灰色',
                         id:'theme-two',
                         color:'#74787a' 
                    },
                     {
                         name:'蓟粉红',
                         id:'theme-three',
                         color:'#b598a1' 
                    }
                    ],
                    showsheet:false,
                    themed:''
            }
      },
      components: {
             actionsheet,
           
      },
      onShow(){
          this.initTheme();
      },
      methods:{
            initTheme(){
                  let themes = store.state.theme; // 所有主题
                  let getthemes = mpvue.getStorageSync('themes');
                  if(!getthemes){
                        mpvue.setStorageSync('themes','theme-one');  
                  }else{
                        this.themed = getthemes; 
                  }
                  
                  //设置导航颜色   
                  wx.setNavigationBarColor({
                              frontColor: '#ffffff',
                              backgroundColor: themes[getthemes],
                              animation: {
                              duration: 400,
                              timingFunc: 'easeIn'
                              }
                  })
            },
            onChangetheme(){
                   this.showsheet=true;
            },
            onhandlClose(){
                  this.showsheet=false;
            },
            onSelect(e){
                   mpvue.setStorageSync('themes',e);
                   this.initTheme(); 
            },
            about(){
                   wx.showModal({
                    title: '提示',
                    content:'欢迎使用小白记事本！！！',
                    success (res) {
                    if (res.confirm) {
                        
                    }else if(res.cancel){
                        
                    }
                    }
              })
            }
      }
}
</script>
<style lang="less" scoped>
.flex(@direction){
      display: flex;
      flex-direction: @direction;
}
.setting{
     .flex(column);
     &>.cells{
        .flex(row);
        align-items: center;
        justify-content: space-between;
        padding: 20rpx 20rpx;
        border-bottom: 1px solid #eeeeee;
        &>span{
              display: inline-block;
              font-size: 30rpx;

              &:nth-of-type(2){
                    width: 50rpx;
                    height: 50rpx;
                    img{
                       width: 100%;
                       height: 100%;   
                    }
              }
        }  
     } 
}
</style>