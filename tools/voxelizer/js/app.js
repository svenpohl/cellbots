

function abc_test()
{
alert("123 abc_test");
}



function mls_update()
{
var parentelement =  document.getElementById('mls_resp_main');
var parent_width  =  parentelement.offsetWidth;
var parent_height =  parentelement.offsetHeight;

mls_width = parent_width;

var height = 0;

/*
if (parent_width >= 400)
   mls_height = mls_width*0.6;

if (parent_width < 400 )
*/
   mls_height = mls_width*1;
    
document.getElementById('mls_resp_main').style.height = mls_height + 'px';


//document.getElementById('mls_resp_back').style.width  = mls_width + 'px';
//document.getElementById('mls_resp_back').style.height = mls_height + 'px';


 
} // mps_update



window.addEventListener("resize", function()
{ 
 
mls_update();
//mls_app_draw();
  
}, true);


var cnt = 0;



/*
<div id="divid" style="width:250px; height:100px; background:#0809fe;"></div>
<br/><br/> Click to add the coordinates in this text field.<br/>
<input type="text" name="regcoords" id="regcoords" />
<div id="coords">Coords</div>

<script type="text/javascript">
 
var elmids = ['divid'];

var x, y = 0;       // variables that will contain the coordinates

// Get X and Y position of the elm (from: vishalsays.wordpress.com)


// Get X, Y coords, and displays Mouse coordinates
function getCoords(e) {
 // coursesweb.net/
  var xy_pos = getXYpos(this);

  // if IE
  if(navigator.appVersion.indexOf("MSIE") != -1) {
    // in IE scrolling page affects mouse coordinates into an element
    // This gets the page element that will be used to add scrolling value to correct mouse coords
    var standardBody = (document.compatMode == 'CSS1Compat') ? document.documentElement : document.body;

    x = event.clientX + standardBody.scrollLeft;
    y = event.clientY + standardBody.scrollTop;
  }
  else {
    x = e.pageX;
    y = e.pageY;
  }

  x = x - xy_pos['xp'];
  y = y - xy_pos['yp'];

  // displays x and y coords in the #coords element
  document.getElementById('coords').innerHTML = 'X= '+ x+ ' ,Y= ' +y;
}

// register onmousemove, and onclick the each element with ID stored in elmids
for(var i=0; i<elmids.length; i++) {
  if(document.getElementById(elmids[i])) {
    // calls the getCoords() function when mousemove
    document.getElementById(elmids[i]).onmousemove = getCoords;

    // execute a function when click
    document.getElementById(elmids[i]).onclick = function() {
      document.getElementById('regcoords').value = x+ ' , ' +y;
    };
  }
}
</script>
*/


function getXYpos(elm) {
  x = elm.offsetLeft;        // set x to elm’s offsetLeft
  y = elm.offsetTop;         // set y to elm’s offsetTop

  elm = elm.offsetParent;    // set elm to its offsetParent

  //use while loop to check if elm is null
  // if not then add current elm’s offsetLeft to x
  //offsetTop to y and set elm to its offsetParent
  while(elm != null) {
    x = parseInt(x) + parseInt(elm.offsetLeft);
    y = parseInt(y) + parseInt(elm.offsetTop);
    elm = elm.offsetParent;
  }

  // returns an object with "xp" (Left), "=yp" (Top) position
  return {'xp':x, 'yp':y};
} // getXYpos


var mausx=0;
var mausy=0;

// Get X, Y coords, and displays Mouse coordinates
function getCoords(e) {
 // coursesweb.net/
  var xy_pos = getXYpos(this);

  // if IE
  if(navigator.appVersion.indexOf("MSIE") != -1) {
    // in IE scrolling page affects mouse coordinates into an element
    // This gets the page element that will be used to add scrolling value to correct mouse coords
    var standardBody = (document.compatMode == 'CSS1Compat') ? document.documentElement : document.body;

    x = event.clientX + standardBody.scrollLeft;
    y = event.clientY + standardBody.scrollTop;
  }
  else {
    x = e.pageX;
    y = e.pageY;
  }

  mausx = x - xy_pos['xp'];
  mausy = y - xy_pos['yp'];

  // displays x and y coords in the #coords element
 // document.getElementById('coords').innerHTML = 'X= '+ x+ ' ,Y= ' +y;
} //getCoords






function exportPose(skeleton) {
    const pose = {};
    skeleton.bones.forEach(bone => {
        pose[bone.name] = {
            x: parseFloat(bone.rotation.x.toFixed(3)), // Runden auf 3 Nachkommastellen
            y: parseFloat(bone.rotation.y.toFixed(3)),
            z: parseFloat(bone.rotation.z.toFixed(3))
        };
    });

    // Konvertiere das Pose-Objekt in einen String
    const formattedPose = Object.entries(pose)
        .map(([key, value]) => 
            `    ${key}: { x: ${value.x}, y: ${value.y}, z: ${value.z} }`
        )
        .join(",\n");

    console.log(`const pose = {\n${formattedPose}\n};`);
}





let mixers = [];

// Funktion zur Animation der Knochen
function animateFish(skeleton) {
    const time = clockf.getElapsedTime();
    const waveFrequency = 2; // Häufigkeit der Sinusbewegung
    const amplitude = 0.1;  // Amplitude der Bewegung

    // Aktualisiere die Rotation der Knochen
    skeleton.bones.forEach((bone) => {
        switch (bone.name) {
            case 'main':
                bone.rotation.z = Math.sin(time * waveFrequency) * amplitude;
                break;
            case 'm2':
                bone.rotation.z = Math.sin(time * waveFrequency + Math.PI / 4) * amplitude;
                break;
            case 'm3':
                bone.rotation.z = Math.sin(time * waveFrequency + Math.PI / 2) * amplitude;
                break;
            case 'm4':
                bone.rotation.z = Math.sin(time * waveFrequency + (3 * Math.PI) / 4) * amplitude;
                break;
        }
    });
    
    
    
  
    
}
 



       
//---
    document.addEventListener('keydown', (event) => {
    
    console.log('key... ' + event.key);
    
    let rotationSpeed = 0.2;
    
    if (event.key === '1') {
        // Drehe das Modell nach rechts
        if ( fischmodell[0]) {
             fischmodell[0].rotation.y -= rotationSpeed;
        }
    } else if (event.key === '2') {
        // Drehe das Modell nach links
        if ( fischmodell[0]) {
             fischmodell[0].rotation.y += rotationSpeed;
        }
    }
});
      



function readurl(url, callback )
{
//alert(url);
console.log(" readurl ",url," ");
 
var jsonparam = JSON.stringify( [ ]  );

var xhr = new XMLHttpRequest();


xhr.open("POST", url);


xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");



xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {

      json = xhr.responseText;

//console.log(" json ",json," ");

      const rows = JSON.parse(json);

      callback(rows);


   }};


xhr.send();


} // readurl()



//////////////////////////////////
////
////
////
//////////////////////////////////
function app_start() 
{ 
//console.log("engel: " + engelx);
 cnt++;
 
var elm = document.getElementById('mls_resp_main');
  var xy_pos = getXYpos(elm);
  
  
  
      document.getElementById('mls_rect').style.left = mausx + "px";
      document.getElementById('mls_rect').style.top = mausy - 0 + "px";
 
// document.getElementById('debug').innerHTML = "CNT: " + cnt + " x:"+xy_pos['xp'] + " y:"+xy_pos['yp'] + " x:"+mausx + " y:" + mausy;
  
  
  // mls_punkte
} //// app_start


 