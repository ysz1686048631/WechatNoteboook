<template>
      <div class="addpage">
            <div class="addpage_textarea">
                <div>
                    <textarea v-model="text" placeholder="任务一经发布就不能修改与删除，请根据自己的实际能力和时间来制定任务！"></textarea>
                </div>
            </div>
            <div class="addpage_address">
                    <div>
                         地点:   
                    </div>
                    <div>
                         <input type="text" placeholder="再此输入地点" v-model="address">    
                    </div>
            </div>
            <div class="addpage_time">
                     <div class="section">
                            <picker mode="date" :value="initime" :start="initime" end="2022-11-24" @change="bindDateChange">
                                <div class="picker addpage_type_cell">
                                    <div>
                                        开始时间: {{date}}
                                    </div>
                                    <div>
                                        >
                                    </div>
                                </div>
                            </picker>
                 </div>
            </div>
            <div class="addpage_type">
                  <div class="addpage_type_cell">任务类型</div>
                  <div class="type_list">
                         <span 
                         :class="['type_list_item',{'active':typeindex==index}]" 
                         v-for="(item,index) in typelist" :key="index"
                         @click="onActiveType(index)"
                         >
                                {{ item }}
                         </span> 
                         <span @click="onshowModal" :class="['type_list_item',{'active':showadd}]">
                                +
                         </span>
                  </div> 
                  <div :class="['addtype',{'addtypeActive':showadd}]">
                       <div><input v-model="tagtext" type="text"></div>
                       <div @click="addtypetag()">添加</div>
                  </div>    
                
            </div>
            <div class="bars">
                     <div @click="onCancel">取消</div>
                     <div @click="onSave">保存</div>
            </div>
           
      </div>
</template>

<script>
import store from '../../store';
export default {
    data(){
         return{
              date:'',
              text:'',
              typelist:[
                   //任务类型
                    '运动',
                    '编程'
              ],
              typeindex:0,
              showadd:false,
              address:'',
              tagtext:'',
              initime:''
         }
    },
    onUnload(){
         //当页面卸载之前通知内容是否保存
         let that=this;
         if(this.text){
                    wx.showModal({
                    title: '提示',
                    content:'你指定的计划尚未保存，你确认要离开吗！',
                    success (res) {
                    if (res.confirm) {
                         that.toNavigation();
                    }else if(res.cancel){
                         mpvue.redirectTo({
                             url:'/pages/addpage/main'
                         })  
                    }
                    }
              })
             }else{
                 this.toNavigation(); 
             }
    },
    mounted(){
           let date = new Date();
           let y = date.getFullYear();
           let m = date.getMonth()+1;
           let d = date.getDate();
           this.initime=`${y}-${m}-${d}`;
    },
    methods:{
         intidatafun(){
               this.address='';
               this.text='';
               this.date='';
               this.tagtext='';
         },
         addtypetag(){
            
              if(this.typelist.indexOf(this.tagtext)<0&&this.tagtext){
                    this.typelist.push(this.tagtext);

              }else{
                    mpvue.showToast({
                           title:'类型不可以重复添加哦！'
                    })
              }
  
         },
         bindDateChange(e){
               this.date = e.target.value;
         },
         onActiveType(index){
            
              this.typeindex=index;
            
         },
         onCancel(){
             let that=this;
             if(this.text){
                    wx.showModal({
                    title: '提示',
                    content:'你指定的计划尚未保存，你确认要离开吗！',
                    success (res) {
                    if (res.confirm) {
                         that.toNavigation();
                    }
                    }
              })
             }else{
                  that.toNavigation(); 
             }
            
         },
         //条状到首页
         toNavigation(){
          this.intidatafun();    
          mpvue.switchTab({
                url:'/pages/dome/main'
          })
        },
        //保存
         onSave(){
                if(!this.text){
                      wx.showToast({
                         title: '任务内容不能少于6个字符',
                         icon:'none',
                         duration: 2000
                         })
                         return false;

                }else if(!this.address){
                     wx.showToast({
                         title: '地址不能为空',
                         icon:'none',
                         duration: 2000
                         })
                         return false;
                }else if(!this.date){
                     wx.showToast({
                         title: '请选择时间',
                         icon:'none',
                         duration: 2000
                         })
                         return false;
                }
                let {h,m} = this.gethouer();
                let date = this.date.split('-');
                let userinfo = mpvue.getStorageSync('userinfo');
               
                let obj = {
                        listid:parseInt(Date.parse(new Date)/2),
                        date,
                        statu:0,
                        stratime:`${h}:${m}`,
                        text:this.text,
                        type:this.typelist[this.typeindex],
                        username:userinfo.username, 
                        address:this.address,
                        endtime:''
                } 
                store.commit('increment',obj);
                wx.showToast({
                         title: '保存成功',
                         icon:'success',
                         duration: 2000
                         })
                this.intidatafun();
         },
         gethouer(){
               let data = new Date();
               let h = data.getHours();
               let m = data.getMinutes();
               let obj = {
                     h,
                     m
               } 
               return obj;   
         },
         onshowModal(){
              this.showadd=!this.showadd;
              
         }
    }
}
</script>

<style lang="less" scoped>

.flex(@direction){
      display: flex;
      flex-direction: @direction; 
    
}
.font(@size,@color,@weight:200){
      font-size: @size;
      color: @color;
      font-weight: @weight; 
}
.padbox(@tb,@lr){
       padding:@tb @lr;
       box-sizing: border-box;
}
    .addpage{
          &_textarea{
               .flex(column);
               &>div:nth-of-type(1){
                      width: 95%;
                      margin: 0 auto;
                      background: #eeeeee;
                      height: 400rpx;
                      .padbox(10rpx,10rpx);
                      &>textarea{
                           width: 100%;
                           .font(28rpx,#333);
                           &::placeholder{
                                font-size: 28rpx;
                           }
                      }  
               }
          }
          &_type{
              .padbox(10rpx,10rpx);
              .flex(column);
            &_cell{
                  .font(28rpx,#333);
                  .flex(row);
                  justify-content: space-between;
                //   border-bottom: 1px solid #eeeeee;
                  .padbox(10rpx,10rpx);
            }
            .type_list{
                 width: 95%;
                 height: 100rpx;
                 overflow: scroll;
                 white-space: nowrap;
                 .flex(row);
                 align-items: center;
                 .active{
                      border: 2px solid #f40 !important;
                      color: #f40;
                 }
                 &_item{
                      height: 50rpx;
                      line-height: 50rpx;
                      border-radius: 10rpx;
                      .padbox(0,20rpx);
                      .font(30rpx,#008c8c,bold);
                      margin: 0 10rpx;
                      border: 2px solid #008c8c;
                 }
            }  
            .addtypeActive{
               height:100rpx !important;overflow: hidden;
                 .padbox(10rpx,10rpx);
               
            }
            .addtype{
                 height:0rpx;overflow: hidden;
             
                .font(28rpx,#333);
                .flex(row); 
                transition: all .5s ease-in 0s;
                align-items: center;
                &>div:nth-of-type(1){
                      border-radius: 10rpx; 
                      border:1px solid #eeeeee; 
                }
                &>div:nth-of-type(2){
                      border-radius: 10rpx; 
                      .font(30rpx,#008c8c,bold);
                      margin-left: 20rpx;

                }
            }
          }
          &_address{
             
              .padbox(10rpx,20rpx);
              .flex(row);
              .font(28rpx,#333);
              align-items: center;
              &>div:nth-of-type(1){
                  margin-right: 10rpx;  
              }

          }
          &_time{
               .padbox(10rpx,10rpx);
          }
          .bars{
               .flex(row);
               align-items: center;
               justify-content: center;
               &>div{
                    background: #008c8c;
                    .font(30rpx,#fff,bold);
                    .padbox(10rpx,141rpx);
                    border-radius: 10rpx;
                    margin: 0 20rpx;
               }
          }
    }
</style>