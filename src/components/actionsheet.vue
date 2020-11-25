<template>
         <div class="activeshoeet" :style="{visibility:show?'visible':'hidden'}" @click.stop="onClose">
                  <div class="sheets" :style="{bottom:show?'1rpx':'-400rpx'}">
                         <div v-for="(item,index) in datalist" :key="index" class="cell" @click="onchangeColor(item.id)">
                               <span :style="{background:item.color}"></span>
                               <span :style="{color:item.color}">{{ item.name }}</span>
                               <span v-if="themeindex==item.id"></span>
                         </div> 
                       <div class="cancel" @click="onClose">
                           取消
                       </div>
                  </div>
         </div>
</template>

<script>
export default {
    props:{
        show:{
             type:Boolean,
             default:false
         },
         datalist:{
              type:Array,
              default:[] 
         },
         themeindex:{
             type:String,
             default:''
         }
    },
    onShow(){
         
    },
    methods:{
         onClose(){
              this.$emit('onclose')
         },
         onchangeColor(cid){
              if(cid==this.themeindex)return false;
              this.$emit('onSelect',cid);
              mpvue.showToast({
                           title:'切换主题成功'
                    })
         }
    }
}
</script>
<style lang="less" scoped>
.activeshoeet{
     width: 100%;
     height: 100vh;
     background: rgba(100, 100, 100, 0.281);
     position: fixed;
     top: 0;
     overflow: hidden;
   
    .sheets{
            width: 100%;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            border-radius: 20rpx 20rpx 0 0 ;
            position: absolute;
            bottom: -400rpx;
            transition: all .3s ease-out 0s;
            &>.cell{
                display: flex;
                flex-direction: row;
                align-items: center; 
                justify-content: center;
                background: #fff;
                padding: 20rpx 20rpx;
                text-align: center; 
                border-bottom: 1px solid #eeeeee;  
                font-size: 32rpx;
                &>span:nth-of-type(1){
                     width: 40rpx;
                     height: 40rpx;
                     display: inline-block;
                     background: red;
                     border-radius: 50%;
                     border: 5rpx solid rgb(168, 167, 167);
                     margin-right: 30rpx;
                }
                &>span:nth-of-type(3){
                     width: 20rpx;
                     height: 20rpx;
                     display: inline-block;
                     background: rgb(253, 128, 83); 
                     border-radius: 50%;
                     margin-left: 10rpx;            
                }

            }
            .cancel{
                background: #fff;
                margin-top: 20rpx;
                padding: 20rpx 20rpx;
                text-align: center; 
                border-bottom: 1px solid #eeeeee;  
            }
    } 
}
</style>