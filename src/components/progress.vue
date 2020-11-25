<template>
  <div class="progress">
        <div class="title">任务进度</div>
        <div class="line">
              <div :style="{width:widths}"></div>
        </div>
        <div class="num">{{ nonum }}/{{ allnum }}</div>
  </div>
</template>

<script>
export default {
   data(){
      return{
       
      }
   },
   props:{
        widths:{
            type:'String',
            default:'0%'
        },
        nonum:{
            type:Number,
            default:0
        },allnum:{
            type:Number,
            default:0
        }
   }
}
</script>

<style>
.card {
  padding: 10px;
}
</style>
