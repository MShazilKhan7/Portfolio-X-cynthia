const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

window.addEventListener('scroll', ()=>{
  console.log("hello scrolling");
})
// dets gives the details 
// 
var timeout = 0;
function circleMouseFollower( xsc, ysc){
    document.addEventListener("mousemove", function(dets){
        console.log("hello")
        document.querySelector("#mini-small-follower").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xsc},${ysc})`;
    })
}

function startanimation(){
    var t1 = gsap.timeline();
    
    t1.to(".start-overlay",{
      y:"-100%",
      duration: 2,
      ease: Expo.easeInOut
    })

    t1.from("#nav",{
        y:-10,
        opacity: 0, // agar opacity 1 kardun tw ye ata hua dikhega (perfect)
        duration: 1,
        ease: Expo.easeInOut
    })
    .to(".boundingelem" , {
        y:0,
        duration: 1.5,
        ease: Expo.easeInOut,
        delay:-1,
        stagger: .2
    })
    // So there was a problem arising when i set the duration to 1 and delay to -1:
    // delay:-1 (matlab orginal time se aik second phele start hogi)
    // start hone ke baad aik second mein animation complete hogai phir dubara start hui

    .from("#home-footer" , {
        y:'-10',
        opacity: 0,
        duration: 1.2,
        delay:-1,
        ease: Expo.easeInOut
    })
}

function circleSqueeze(){
    // default values
    var xScale=1;
    var yScale=1;

    var xPrevious = 0;
    var yPrevious = 0; 
    window.addEventListener("mousemove", function(dets){
        clearTimeout(timeout);
        xScale = gsap.utils.clamp(0.8,1.2,dets.clientX-xPrevious);
        yScale = gsap.utils.clamp(0.8,1.2,dets.clientY-yPrevious);

        xPrevious = dets.clientX;
        yPrevious = dets.clienty;

        circleMouseFollower(xScale,yScale);
        timeout = setTimeout(() => {
            document.querySelector("#mini-small-follower").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
        }, 100);
 
    })
}


startanimation();
circleMouseFollower();
circleSqueeze();

document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;
  
    elem.addEventListener("mouseleave", function (dets) {
      gsap.to(elem.querySelector("img"), {
        opacity: 0,
        ease: Power3,
        duration: 0.5,
      });
      gsap.to(elem.querySelector("h1"),{
        opacity: .7,
        x: 0,
        ease: Power4
      })

    });
  
    elem.addEventListener("mousemove", function (dets) {
      var diff = dets.clientY - elem.getBoundingClientRect().top;
      diffrot = dets.clientX - rotate;
      rotate = dets.clientX;
      gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        top: diff-20,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
      });
      gsap.to(elem.querySelector("h1"),{
        opacity: .2,
        x: 30,
        ease: Power4
      })
    });
  });