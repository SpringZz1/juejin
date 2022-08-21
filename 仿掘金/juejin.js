   //鼠标经过出现叉号
   var image = document.querySelector(".banner-image");
   // 关闭广告
   var banner = document.querySelector(".banner");
   var close = document.querySelector(".close-btn");
   //投放广告
   var label = document.querySelector(".label");
   var inco = document.querySelector('.inco');

   //鼠标经过出现叉号
   image.addEventListener("mouseover",function(){
    close.style.color = "#333";
    close.style.display="block";
   })
   image.addEventListener("mouseout",function(){
    close.style.color = "#909090";
    close.style.display="none";
   })

   // 鼠标经过出现二维码
   var wechat = document.querySelector(".wechat");
   var qr = document.querySelector(".qr-panel");

   //关闭广告
   close.onclick = function () {
     banner.style.display = "none";
   };

  //  // 投放广告
  //  label.addEventListener("mouseenter",function(){
  //   inco.style.display="block";
  //  })

   // 微信扫一扫
   wechat.addEventListener("mouseover", function (e) {
    qr.style.margin = qr.style.margin - 300;
    qr.style.display = "block";
   });

   wechat.addEventListener("mouseout", function () {
    qr.style.display = "none";
  });

   //滚动效果
   window.onscroll=()=>{
    let scrollHeight = document.documentElement.scrollTop;
    if(scrollHeight >= 300) {
      $(".block-body").addClass('fixed');}
    else{
      $(".block-body").removeClass('fixed');
    }
    console.log(document.documentElement.scorllTop);
   } 