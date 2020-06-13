
   var nav=document.querySelectorAll(".cho li div");
   for(let i=0;i<nav.length;i++){
       nav[i].onmouseenter=function(){
           nav[i].style.display="block";
       }
   }
   var anav=document.querySelectorAll(".sort b a");
   for(let i=0;i<anav.length;i++){
       anav[i].onclick=function(){
        for(let i=0;i<anav.length;i++){
            anav[i].style.color="black";
        }
           anav[i].style.color="red";
       }
   }
   var alist=document.querySelectorAll(".list li");
   for(let i=0;i<alist.length;i++){
      alist[i].onclick=function(){
        for(let i=0;i<alist.length-2;i++){
            alist[i].style.background="white";
        }
        alist[i].style.background="red";
       }
   }
