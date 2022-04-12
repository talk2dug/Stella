var html = `
<div class="row">
<div class="col containerright">
  <div class="righteyeBall">
    <div class="rightiris"></div>
  </div>
  <div class="righteyeLid"></div>
  <div class="rightlid"></div>
</div>

<div class="col containerleft">
  <div class="lefteyeBall">
    <div class="leftiris"></div>
  </div>
  <div class="lefteyeLid"></div>
  <div class="leftlid"></div>
</div>
</div>


<div class="card voiceBoxDIV text-center" >
    <div class="container ">
       
        <div class="row">
            <div class="col">
                <div class="voiceBoxIndicator off"></div>
                <div class="voiceBoxIndicator off"></div>
                <div class="voiceBoxIndicator off 10"  id="1"></div>
                <div class="voiceBoxIndicator off 20"  id="2"></div>
                <div class="voiceBoxIndicator off 30"  id="3"></div>
                <div class="voiceBoxIndicator" ></div>
                <div class="voiceBoxIndicator"></div>
                <div class="voiceBoxIndicator"></div>
                <div class="voiceBoxIndicator"></div>
                <div class="voiceBoxIndicator off 30"  id="3"></div>
                <div class="voiceBoxIndicator off 20"  id="2"></div>
                <div class="voiceBoxIndicator off 10"  id="1"></div>
                <div class="voiceBoxIndicator off" ></div>
                <div class="voiceBoxIndicator off"></div>
            </div>
            <div class="col">
                <div class="voiceBoxIndicator off 4"  id="4"></div>
                <div class="voiceBoxIndicator off 5"  id="5"></div>
                <div class="voiceBoxIndicator off 6"  id="6"></div>
                <div class="voiceBoxIndicator"></div>
                <div class="voiceBoxIndicator"></div>
                <div class="voiceBoxIndicator"></div>
                <div class="voiceBoxIndicator"></div>
                <div class="voiceBoxIndicator"></div>
                <div class="voiceBoxIndicator"></div>
                <div class="voiceBoxIndicator"></div>
                <div class="voiceBoxIndicator"></div>
                <div class="voiceBoxIndicator off 6"  id="6"></div>
                <div class="voiceBoxIndicator off 5"  id="5"></div>
                <div class="voiceBoxIndicator off 4"  id="4"></div>
            </div>
            <div class="col">
                <div class="voiceBoxIndicator off"></div>
                <div class="voiceBoxIndicator off"></div>
                <div class="voiceBoxIndicator off 10"  id="10"></div>
                <div class="voiceBoxIndicator off 20"  id="20"></div>
                <div class="voiceBoxIndicator off 30"  id="30"></div>
                <div class="voiceBoxIndicator"></div>
                <div class="voiceBoxIndicator"></div>
                <div class="voiceBoxIndicator"></div>
                <div class="voiceBoxIndicator"></div>
                <div class="voiceBoxIndicator off 30"  id="30"></div>
                <div class="voiceBoxIndicator off 20"  id="20"></div>
                <div class="voiceBoxIndicator off 10"  id="10"></div>
                <div class="voiceBoxIndicator off"></div>
                <div class="voiceBoxIndicator off"></div>
            </div>
        </div>
    </div>
    
</div>`

$(function() {

$('#main').html(html);
function talkUp(){
    setTimeout(() => {
        $( ".30" ).removeClass( "off" )
        setTimeout(() => {
            $( ".20" ).removeClass( "off" )
            $( ".6" ).removeClass( "off" )
            setTimeout(() => {
                $( ".5" ).removeClass( "off" )
                setTimeout(() => {
                    $( ".20" ).addClass( "off" )
                    $( ".6" ).addClass( "off" )
                    $( ".5" ).addClass( "off" )
                    setTimeout(() => {
                        $( ".30" ).addClass( "off" )
                    }, 210);
                }, 190);
            }, 160);
        }, 130);
    }, 100);
}

setInterval(() => {
    talkUp()
},900);

const eye = document.querySelector('.rightiris');
const eye2 = document.querySelector('.leftiris');
window.addEventListener('mousemove', (event) => {
const x = -(window.innerWidth / 2 - event.pageX) / 35;
const y = -(window.innerHeight / 2 - event.pageY) / 35;
eye.style.transform = `rotate(-45deg) translateY(${y}px)  translateX(${x}px)`;   
eye2.style.transform = `rotate(-45deg) translateY(${y}px)  translateX(${x}px)`;        
        }); 
})