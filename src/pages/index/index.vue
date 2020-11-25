<template>
  <div :class="['userpage',themed]">
           
          <div class="userpage_header">
                <div class="setting"><img @click="onSetting" src="../../../static/images/setting.svg" alt=""></div> 
          </div>
          <div class="userpage_userinfo">
                 <div class="user_avatar"><img mode='widthFix' src="../../../static/images/aa.jpg" alt=""></div>
                 <div class="user_name"><span>韶华倾负</span><span>浪子回头，为时不晚</span></div>
          </div>
          <div class="userpage_listinfo">
                 <div class="grid">
                         <div>
                             <span>累计任务</span>
                             <span>{{ listlen }}</span>
                         </div>
                         <div>
                              <span>累计完成</span>
                              <span>{{ succes }}</span>
                         </div>
                 </div>
                 <div class="cells">
                     <div class="title">完成统计</div>
                     <div class="progress">
                        <view class="progress-box">
                            <progress :percent="successpre" show-info stroke-width="3"/>
                        </view>
                     </div> 
                 </div>
                 <div class="cells">
                     <div class="title">放弃任务统计</div>
                     <div class="progress">
                        <view class="progress-box">
                            <progress :percent="failpre" color="#f40" show-info stroke-width="3"/>
                        </view>
                     </div> 
                 </div>
                 
          </div>
  </div>
</template>

<script>
import '../../../static/sass/style.css';
import store from '../../store';
export default {
    data(){
        return{
              themed:'',
              listlen:0,
              succes:0,
              fail:0,
              successpre:0,
              failpre:0  
        }
    }, 
    onShow(){
         this.regdatas()
         this.initThemeFun();
    },
    methods:{
         regdatas(){
         this.succes=0;
         this.fail=0;     
         let datalist = store.state.lists;
         this.listlen = datalist.length;
         datalist.forEach((item,index)=>{
                  if(item.statu==1){
                      this.succes+=1
                  }else if(item.statu==2){
                      this.fail+=1  
                  }
         })
         this.successpre=parseInt((this.succes/this.listlen)*100);
         this.failpre = parseInt((this.fail/this.listlen)*100);
         
         },
         onSetting(){
              mpvue.navigateTo({
                    url:'/pages/setpage/main'
              })
         },
         initThemeFun(){
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
         }
    }
}
</script>

<style scoped>

</style>
