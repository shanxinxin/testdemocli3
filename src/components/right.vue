<template>
  <div>
    {{kk}}
  </div>
</template>
<script>
   import Msg from './msg.js'
   export default{
     data(){
       return{
         kk:0,
       }
     },
     mounted(){
         var _this=this;
         Msg.$on('val',function(m){
           this.kk=m;
         })
     }
    //  methods:{
    //     menu(n){
    //       msg.$emit("val",n);
    //     }
    //  }
   }
</script> 