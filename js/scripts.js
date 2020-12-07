document.addEventListener("mouseover", myFunction);

let defs = [ 
            //Bash
            ['Bash', "<h4>1. Základy</h4>" +
                     "<p>Podmienky(-lt, -ge, ...), manuál:</p>" +
                     "<p class=\"sourcecode\">man test</p>" +
                     "<h4>2. Podmienky</h4>" +
                     "Otestuje či je premenná rovná 1:" +
                     "<p class=\"sourcecode\"><span class=\"comment\">#!/bin/bash</span><br>" +
                     "A=1 <span class=\"comment\">#deklarácia premennej</span><br>" +
                     "if [ $A -eq 1 ]; then echo OK; else echo not OK; fi" +
                     "</p>" +
                     "<h4>3. Funkcie</h4>" +
                     "Deklarácia a volanie funkcie:" +
                     "<p class=\"sourcecode\">status() { <span class=\"comment\">#deklarácia funkcie</span><br>" +
                     "&nbsp;&nbsp;&nbsp;&nbsp;echo Function called!<br>" +
                     "}<br>" +
                     "<br>" +
                     "status <span class=\"comment\">#volanie funkcie</span><br>" +
                     "</p>"
            ], //end: Bash
            //Package manager
            [ 'PM', "<p>Pohľadá nainštalovanú aplikáciu/knižnicu:</p>" +
                    "<p class=\"sourcecode\">ldconfig -p | grep python</p> " +
                    "<p class=\"sourcecode\">apt-file search libQtSvg.so.4</p> " +
                    "<p class=\"sourcecode\">dpkg -S libQtSvg.so.4</p>"
            ], //end: PM
            [ 'FS', "<p>Kto lockuje/drží súbor:</p>" +
                    "<p class=\"sourcecode\">sudo lsof &lt;subor&gt;</p>" +
                    "<p>Mount remote file system:</p>" +
                    "<p class=\"sourcecode\">sudo mount -t cifs -o user=&lt;user&gt; //remote_path /mnt/mount_name/</p>" +
                    "<p>Počita výskyt stringu v súbore:</p>" +
                    "<p class=\"sourcecode\">grep -o \"2017008\" content.xml | wc -w</p>"
            ], //end: File system
            [ 'TCPIP', "<p>Otvorené socket-y pre nejaký proces:</p>" +
              "<p class=\"sourcecode\">sudo netstat -tnpa | grep firefox*</p>" +
              "<p>Monitor sieťového prenosu na porte(443):</p>" +
              "<p class=\"sourcecode\">sudo tcpdump -i any port 443</p>" +
              "<p>Počúva na localhost, porte 443. Všetko čo príde vypíše do súboru '/tmp/test.log':" +
              "<p class=\"sourcecode\">sudo socat -u TCP4-LISTEN:443,reuseaddr,fork OPEN:/tmp/test.log,creat,append</p>" //https://www.redhat.com/sysadmin/getting-started-socat
            ]  
           ];  //end: TCP/IP
           
function search() {
    //search query and set paragraphs found
    var input = document.getElementById("mySearch");
    var filter = input.value.toUpperCase();
    if( filter.length < 3 ) {
        return;
    }

    document.getElementById("definition").innerHTML = "";
    for (var defsCounter = 0; defsCounter < defs.length; defsCounter++) {
        var tmp = document.createElement('div');
        tmp.innerHTML = defs[defsCounter][1];

        var allParagraphs = tmp.getElementsByTagName("p");
        for (var i = 0; i < allParagraphs.length; i++) {
            if (allParagraphs[i].textContent.toUpperCase().indexOf(filter) > -1) {
                document.getElementById("definition").innerHTML += allParagraphs[i].outerHTML;
            }
        }
    }
}

let selectedElement = null;
function myFunction(fParam) {
    
  if( selectedElement != null ) {
    return;
  }
  
  // Declare variables
  var input, filter, ul, li, a, i;
  input = document.getElementById("mySearch");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myMenu");
  li = ul.getElementsByTagName("li");

  if( fParam == "AWK" ) {
    document.getElementById("definition").innerHTML =
    "<h4>1. Parsovanie stringov:</h4>" +
    "<p>Vypíše reťazec za znakom '=', výstup bude 'retazec2':</p><p class=\"sourcecode\">echo retazec1=retazec2 | awk -F'=' '{print $2}'</p>"

    return;
  }

  if( fParam == "Bash" ) {
    document.getElementById("definition").innerHTML = defs[0][1];

    return;
  }
  
  if( fParam == "PM" ) {
    document.getElementById("definition").innerHTML = defs[1][1];
  }
  
  if( fParam == "FS" ) {
    document.getElementById("definition").innerHTML = defs[2][1];
  }
  
  if( fParam == "TCPIP" ) {
    document.getElementById("definition").innerHTML = defs[3][1];
  }
}

function itemMenuClicked(elemId)
{
    if( document.getElementById(elemId) == selectedElement ) {
        selectedElement.style = "background-color:#bbb";
        selectedElement = null;
        return;
    }
    
    selectedElement = document.getElementById(elemId);
    selectedElement.style = "background-color:#faf2eb";
}

function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    displayContents(contents);
  };
  reader.readAsText(file);
}

function displayContents(contents) {
  var element = document.getElementById('definition');
  element.textContent = contents;
}
