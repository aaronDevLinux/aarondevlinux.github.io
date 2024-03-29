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
                    "<p class=\"sourcecode\">dpkg -S libQtSvg.so.4</p>" +
                    "<p>Zistí veľkosť package(nemusí byt nainštalovaný) z repozitára:</p>" +
                    "<p class=\"sourcecode\">apt show firefox | grep Size</p>"
            ], //end: PM
            [ 'FS', "<p>Kto lockuje/drží súbor:</p>" +
                    "<p class=\"sourcecode\">sudo lsof &lt;subor&gt;</p>" +
                    "<p>Mount remote file system:</p>" +
                    "<p class=\"sourcecode\">sudo mount -t cifs -o user=&lt;user&gt; //remote_path /mnt/mount_name/</p>" +
                    "<p>Počíta výskyt stringu v súbore:</p>" +
                    "<p class=\"sourcecode\">grep -o \"2017008\" content.xml | wc -w</p>"
            ], //end: File system
            [ 'TCPIP', "<p>Otvorené socket-y pre nejaký proces:</p>" +
              "<p class=\"sourcecode\">sudo netstat -tnpa | grep firefox*</p>" +
              "<p>Monitor sieťového prenosu na porte(443):</p>" +
              "<p class=\"sourcecode\">sudo tcpdump -i any port 443</p>" +
              "<p>Počúva na localhost, porte 443. Všetko čo príde vypíše do súboru '/tmp/test.log':" +
              "<p class=\"sourcecode\">sudo socat -u TCP4-LISTEN:443,reuseaddr,fork OPEN:/tmp/test.log,creat,append</p>" //https://www.redhat.com/sysadmin/getting-started-socat
            ], //end: TCP/IP
            [ 'Git',
              "<p>Nájde commit podľa zadaného stringu:</p>" +
              "<p class=\"sourcecode\">git log -S hľadaný_string</p>" +
              "<p class=\"sourcecode\">git log --pretty=format:\"%h - %an, %ar : %s\" | grep hľadaný_string</p>" +
              "<p>Nájde commity po nejakom dátume:</p>" +
              "<p class=\"sourcecode\">git log --after=\"2020-04-01 00:00\"</p>" +
              "<p>Definícia aliasu:</p>" +
              "<p class=\"sourcecode\">git config --global alias.st status</p>" +
              "<p>Revert local commit - zmaže lokálny commit:</p>" +
              "<p class=\"sourcecode\">git reset HEAD~1</p>"
            ], //end: Git
            [ 'Docker',
              "<p>Základná inštalácia a run(príklad pre nginx):</p>" +
              "<p class=\"sourcecode\">sudo snap install docker</p>" +
              "<p class=\"sourcecode\">sudo docker pull nginx</p>" +
              "<p class=\"sourcecode\">sudo docker run --name ngx-docker -p 1234:80 -d nginx<span class=\"comment\"> #vytvorenie kontajnera pre nginx, bude bežať na localhost:1234</span></p>" +
              "<p class=\"sourcecode\">sudo docker stop ngx-docker<span class=\"comment\"> # znovu nastartovanie: sudo docker start ngx-docker</span></p>" +
              "<p>Zoznam bežiacich kontajnerov:</p>"+
              "<p class=\"sourcecode\">sudo docker ps</p>"
            ], //end: Docker
            [ 'Total Commander',
              "<p>Hľadanie v súboroch:</p>" +
              "- nájde všetky súbory typu 'data'. Preskočí '.git' a 'windows' folder <p class=\"sourcecode\">*.data | .git\\;windows\\</p>"
            ] //end: Total Commander
            //Regexp:
            //Najde stringy "<Key>aip" za ktorym nenasleduje znak '.': <Key>aip[^\.]
           ];
           
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
    return;
  }

  if( fParam == "Git" ) {
    document.getElementById("definition").innerHTML = defs[4][1];
    return;
  }

  if( fParam == "Docker" ) {
    document.getElementById("definition").innerHTML = defs[5][1];
    return;
  }

  if( fParam == "Total Commander" ) {
    document.getElementById("definition").innerHTML = defs[6][1];
    return;
  }
}

function itemMenuClicked(elemId)
{
    if( document.getElementById(elemId) == selectedElement ) {
        selectedElement.style = "background-color:#bbb";
        selectedElement = null;
        return;
    }
    
    if( selectedElement != null ) {
        selectedElement.style = "background-color:#bbb";
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
