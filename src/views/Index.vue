<template>
  <div class="main">
    <div class="left">
      <left></left>  
    </div>
    <div class="right">
      <div class="top">
        <img src="../../public/img/banner.jpg" alt="">
      </div>
      <div class="bottom">
         <right></right>
      </div>
    </div>
  </div>
</template>
<script>
 import left from '../components/left';
 import right from '../components/right'
 export default{
    components:{
      left,right
   }
 }

</script>
<style type="text/css">
 *{
   padding:0;
   margin:0;
 }
 .left{
   width:100px;
   float:left;
   margin-right:10px;
 }
 .right{
   width:1000px;
   float:left;
   margin-left:10px;
 }
  .main{
    width:1200px;
    margin:20px auto;
  }
  .top img{
       height:200px;
       width:1000px;
    }
    .right,.left{
      height:500px;
      background:#f5f5f5;
    }
</style>