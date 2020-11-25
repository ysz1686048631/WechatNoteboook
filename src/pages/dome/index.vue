<template>
     <div :class="themed">
            <div class="home_header">
                         <div class="home_header_top">
                             <div class="home_header_top_title">
                                     <div><img src="../../../static/images/flower.png" alt=""></div>
                                     <div>小白记事本</div>
                             </div>
                             <div @click="toNavigation" class="home_header_top_bar"><img src="../../../static/images/add.svg" alt=""></div>
                         </div>
                         <div class="time">
                                   <div>
                                        <span>{{ year }}年-</span>
                                        <span>{{ mouth }}月</span>  
                                   </div>
                                   <div>
                                         <span @click="preMouth"> 《 </span><span @click="nextMouth"> 》 </span>
                                   </div>  
                         </div>
                         <div class="home_header_calendar">
                                  
                                    <div class="calendar_list">
                                          
                                              <div v-for="(item,index) in timelist" :key="index" class="calendar_list_item">
                                                <div @click="onClickday(item.day,item.year,item.mouth)">
                                                    <span class="week">{{ item.week }}</span>
                                                    <span :class="['day',{
                                                         'active':item.day==time.d&&time.y==year&&time.m==mouth,
                                                         'clickactive':item.day==clickday&&item.year==clickyear&&item.mouth==clickmouth,
                                                         'dataactive':item.datas
                                                         }]">{{ item.day }}</span> 
                                                    <span :class="{'dotactive':item.datas}"></span>
                                                </div>  
                                        </div>
                                    </div>
                         </div>
                         
            </div>
            <v-progress :widths='prowidths' :nonum='nonum' :allnum='allnum'/>
            <div class="home_calendar_list">
                        <div class="home_calendar_list_item" v-for="(item,ind) in showlist" :key="ind">
                                    <div class="tag"><img :src="imgs[item.statu]" alt=""></div>
                                    <div class="content"  @click="onShowlistContent(ind)">
                                         <div>
                                              {{ item.type }} 
                                         </div>
                                         <div>     
                                              {{ item.text  }} 
                                         </div>
                                         <div v-if="item.endcom">{{ item.endcom}}</div>
                                    </div>
                                    <div class="time" :style="{height:ind===listindex&&item.statu!==1&&item.statu!==2?'auto':'50rpx'}">
                                           <span>开始时间:{{ item.stratime }}</span>
                                          
                                    </div>                             
                        </div>
                         
            </div>
            <div class="dalog" :style="{'visibility':showdelog?'visible':'hidden'}">
                      <div :class="['dalog_content',showdelog?'dalogactive':'']">
                              <div class="dalog_content_title">
                                      <div class="img"><img :src="imgs[showdatas.statu]" alt=""></div>
                                      <div class="typeaddress">
                                            <span>地点:{{ showdatas.address }}</span>
                                            <span>类型:{{ showdatas.type }}</span>
                                      </div>
                                      <div class="times">
                                            <span>开始时间:{{ showdatas.stratime }}</span>
                                            <span>结束时间:{{ showdatas.endtime||'无' }}</span>
                                      </div>
                              </div>
                              <div class="dalog_content_text">
                                    {{ showdatas.text }}
                              </div>      
                      </div> 
                      <div :class="['dalog_bars',showdelog?'dalogactive':'']" v-if="showdatas.statu!==2&&showdatas.statu!==1">
                              <span @click="onfailcompilsh(showdatas.index,true)" :class="['accomplish',1===listindex?'btnactive':'']">完成</span>
                              <span @click="onfailcompilsh(showdatas.index,false)" :class="['failomplish',1===listindex?'btnactive':'']">放弃</span>
                      </div>
                      <div class="close" @click="onClose">
                             <img src="../../../static/images/close.svg" alt="">
                      </div>        
            </div>   
       </div>     
</template>

<script>
import '../../../static/sass/style.css';
// mpvue 引入组件 与vue 一样 不用设置 usingCompontents
import progress from '../../components/progress';
import {mapGetters} from 'vuex';
import store from '../../store';
export default {
  data(){
       return{
            imgs:[
                  require('../../../static/images/doing.svg'),
                  require('../../../static/images/aucc.svg'), 
                  require('../../../static/images/fail.svg')
            ],
            year:'',
            mouth:'',
            week:'',
            day:'',
            opleft:'-200rpx',
            timelist:[],
            prowidths:'50%',
            nonum:0,
            allnum:0,
            clickday:0,
            clickyear:0,
            clickmouth:0,
            listindex:'',
            initlistdata:{
                    //刚从状态中获取的数据
            },
            time:{},
            showlist:[],
            clicktime:{},
            showdelog:false,
            datalist:{
                   //存在数据库里的格式不是这样的
                 // 状态 1 完成 0 进行中 2  放弃
            },
            showdatas:{}, //展示在遮罩层中的任务
            themed:'theme-one'
            
       }
       
  },
  components:{
        'v-progress':progress
  },
  onShow(){
        // 设置主题
         let themes = store.state.theme; // 所有主题
         let getthemes = mpvue.getStorageSync('themes');
         if(!getthemes){
               mpvue.setStorageSync('themes','theme-one');  
         }else{
               this.themed = getthemes; 
              
         }
        wx.setNavigationBarColor({
                  frontColor: '#ffffff',
                  backgroundColor: themes[getthemes],
                  animation: {
                  duration: 400,
                  timingFunc: 'easeIn'
                  }
          })
         mpvue.setStorageSync('userinfo',{username:'韶华倾负',avatar:'sss'})  
        let lists = this.initlistdata = store.getters.onsendlists;
        this.initlists(lists)
        // 这里调用登录接口 获取用户信息  因为登录接口总是有问题只能 使用虚拟用户信息
      //   mpvue.login({
      //     success (res) {
      //            console.log(res)
      //            mpvue.getUserInfo({
      //                  success(res){
      //                        console.log(res);
      //                  }
      //            })
      //     }
      //  })
     
  },

  mounted(){
        //初始化时间
     this.inittime();
  },
  onPullDownRefresh(){
        let lists = this.initlistdata = store.getters.onsendlists;
        
         setTimeout(() => {
              mpvue.stopPullDownRefresh();
              this.initlists(lists);
              this.onClickday(this.day,this.year,this.mouth); 
         }, 500);
  },
  methods:{
        initlists(lists){
                 let obj={};
                  // 这里判断需要考虑三种情况 年 月 日 每一个都需要判断 因为最后的日期为数组 也需要做判断 所以递归可能会内存溢出
                  // 将扁平化数据转化为对象树的格式
                   lists.forEach((item,index)=>{
                      if(!obj[item.date[0]]){
                            obj[item.date[0]]={};
                            let mobj = obj[item.date[0]];
                             if(!obj[item.date[0]][item.date[1]]){
                                  obj[item.date[0]][item.date[1]]={};
                                  let dobj = obj[item.date[0]][item.date[1]]; 
                                  dobj[item.date[2]]=[item]
                              }
                              //只要年存在就不用做 日期下面的判断了
                      }else{
                           if(!obj[item.date[0]][item.date[1]]){
                                  obj[item.date[0]][item.date[1]]={};
                                  let dobj = obj[item.date[0]][item.date[1]]; 
                                  dobj[item.date[2]]=[item];
                              }else{
                                let dobj = obj[item.date[0]][item.date[1]]; 
                                if(!dobj[item.date[2]]){
                                      dobj[item.date[2]]=[item];
                                }else{
                                      dobj[item.date[2]].push(item);
                                }   
                              } 
                      }
                 
           }) 
           this.datalist=obj; 
        },
        //关闭遮罩层
        onClose(){
             this.showdelog=false;   
        },
        //跳转路由
        toNavigation(){
          mpvue.navigateTo({
                url:'/pages/addpage/main'
          })
        },
       //放弃
       onfailcompilsh(index,type){
           
             let _that = this;
             if(type){
                    wx.showToast({
                         title: '恭喜你完成任务!',
                         icon:'success',
                         duration: 2000
                         })
                    
                  //   这里因为数据储存在状态中静态数据 只做临时改变 如果后期有后台 需要 发送数据请求
                    this.showlist[index].statu= this.showdatas.statu = 1    
               
             }else{
                  wx.showModal({
                        title: '提示',
                        content:'你确认放弃此任务吗？',
                        success (res) {
                        if (res.confirm) {
                              _that.showlist[index].statu=2;
                              _that.showdatas.statu = 2;
                        } 
                  }
            })
             }
       },
       //展开遮罩层
       onShowlistContent(index){
                 this.listindex=index;
                 this.showdelog=true; 
                 let {address,date,stratime,statu,type,text,username,endtime,listid} = this.showlist[index];
               
                 this.showdatas={
                       address,
                       date,
                       stratime,
                       statu,
                       type,
                       text,
                       username,
                       endtime,
                       listid,
                       index
                       }
                 
                 
       },
       //选取某天
       onClickday(d,y,m){
             // 点击某天 将某天的数据展示在 日历下方
             if(this.datalist[y]){
                   if(this.datalist[y][m]){
                         if(this.datalist[y][m][d]){
                                    this.listindex='';
                                    let datas = this.datalist[y][m][d];
                                    this.clickyear=y;
                                    this.clickmouth=m;
                                    this.clickday=d;
                                    this.showlist=datas;
                                    if(this.showlist){
                                          this.onlistChange(datas);
                                    } 
                         }else{
                             wx.showToast({
                              title: `在${y}年${m}月${d}日无任务数据！`,
                              icon:'none',
                              duration: 2000
                              }) 
                         }
                   }else{
                             wx.showToast({
                              title: `在${y}年${m}月无任务数据！`,
                              icon:'none',
                              duration: 2000
                              }) 
                         }
                
             }else{
                             wx.showToast({
                              title: `在${y}年无任务数据！`,
                              icon:'none',
                              duration: 2000
                              }) 
                         }
              
             
       },
       //上个月
       preMouth(){
             this.mouth=this.mouth<=1?12:this.mouth-1;
             this.year=this.mouth==12?this.year-1:this.year;
             this.time['w'] = new Date(this.year,this.mouth-1,0).getDay();
             this.reftime();
          
           
       },
       //下个月
       nextMouth(){
             this.mouth=this.mouth>=12?1:this.mouth+1;
             this.year=this.mouth==1?this.year+1:this.year;
             this.time['w'] = new Date(this.year,this.mouth-1,0).getDay();
             this.reftime();
       },
       //计算任务完成进度
       onlistChange(data){
               let num = 0;
               data.forEach((item,index) => {
                        if(item.statu==1){
                             num++;
                        }
               });
               this.nonum=num;
               this.allnum=data.length;
               this.prowidths=parseFloat(this.nonum/this.allnum)*100+'%';
              
       },
       
         getWeek(val){
           let week = new Date(this.year,this.mouth-1,val).getDay();
     
           let str = '';
            switch(week){
                 case 1:
                 str = 'Mon';break;
                 case 2:
                 str = 'Tue';break;  
                 case 3:
                 str = 'Wed';break; 
                 case 4:
                 str = 'Thu';break;
                 case 5:
                 str = 'Fri';break;
                 case 6:
                 str = 'Sat';break;
                 case 0:
                 str = 'Sun';break;
            }
           
            return str;
            
       },
     //初始化
        inittime(){
           let time = new Date();
           this.year = this.time['y'] = this.clickyear = time.getFullYear();
           this.mouth = this.time['m'] = this.clickmouth = time.getMonth()+1;
           this.day = this.time['d'] = this.clickday = time.getDate();
           this.week  = time.getDay();
           this.time['w'] = new Date(this.year,this.mouth-1,0).getDay();
           this.reftime();
           this.onClickday(this.day,this.year,this.mouth);

         
        },
      //获取 每月天数和周几   
        reftime(){
               this.timelist=[];
               let data = new Date(this.year,this.year,0).getDate();
               let datas = this.datalist[this.year]?this.datalist[this.year]:false;  //查看该年数据是否存在
                   datas = datas==undefined?false:datas[this.mouth]; //月份数据
               let len = this.time['w'];    
               for(let a = 0;a<len;a++){
                     let obj={}
                     this.timelist.push(obj);   
               }    
               for(let n=1,len=data;n<=len;n++){
                         let dayobj = datas==undefined?false:datas[n]; //指定日期查找
                
                         let obj={
                              week:this.getWeek(n),
                              day:n,
                              year:this.year,
                              mouth:this.mouth,
                              datas:dayobj
                         };
                         this.timelist.push(obj); 
               }  
        }

  }
 
}
</script>
<style scoped>
.mini-btn{
      padding: 0  10rpx;
      line-height:1.5;
      margin: 10rpx 10rpx;
      white-space: nowrap;
}
</style>