var socket = io();
var mainServer = io('//192.168.196.11:3000/', { transports: ['websocket', 'polling', 'flashsocket'] });
var rover = io('//192.168.196.10:3000/', { transports: ['websocket', 'polling', 'flashsocket'] });
var sensorData = {}
var mainDIVHTML = `<div class="container">

<div class="row">
  <div class="col" id='sensor1'>
  </div>
  <div class="col" id='sensor2'>
    Column
  </div>
  <div class="col" id='sensor3'>
    Column
  </div>
</div>
</div>


<div class="container">
<div class="row">
  <div class="col" id='sensor4'>
    Column
  </div>
  <div class="col">
   <img src="http://192.168.196.10:8090/camera1.mjpeg"></img>
  </div>
  <div class="col">
    Column
  </div>
</div>
</div>


<div class="container">
<div class="row">
  <div class="col" id='sensor5'>
    Column
  </div>
  <div class="col" id='sensor6'>
    Column
  </div>
  <div class="col">
    Column
  </div>
</div>
</div>`

$(function() {


    $('#mainDIV').html(mainDIVHTML)
    rover.on("sensors", (data) => {
        console.log(data)
       sensorData = data
        $('#sensor1').html("Front Rover: " + data.lidarMain)
        $('#sensor2').html("Rear Rover: "+ data.lidarSecondary)

        $('#sensor3').html(data.sonar1)
        $('#sensor4').html(data.sonar2)
        $('#sensor5').html(data.sonar3)
        $('#sensor6').html(data.sonar4)
        });
  
})