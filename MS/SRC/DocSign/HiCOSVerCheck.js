/*
DATE	MGRNO		SA		PG		Desc
1110421 1110164 	Kevin	Kevin	弱掃移動script至js
*/

var WinVer="1.3.4.103328";
var MacVer="1.3.4.13";
var LinuxVer="1.3.4.3";
(function (window) {
    {
        var unknown = '-';

        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;
        var version = '' + parseFloat(navigator.appVersion);
        var majorVersion = parseInt(navigator.appVersion, 10);
        var nameOffset, verOffset, ix;

        // trim the version string
        if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

        majorVersion = parseInt('' + version, 10);
        if (isNaN(majorVersion)) {
            version = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }

        // mobile version
        var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

        // system
        var os = unknown;
        var clientStrings = [
            { s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ },
            { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
            { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
            { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
            { s: 'Windows Vista/Windows Server 2008', r: /Windows NT 6.0/ },
            { s: 'Windows Server 2003', r: /Windows NT 5.2/ },
            { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
            { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
            { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
            { s: 'Windows 98', r: /(Windows 98|Win98)/ },
            { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
            { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
            { s: 'Windows CE', r: /Windows CE/ },
            { s: 'Windows 3.11', r: /Win16/ },
            { s: 'Android', r: /Android/ },
            { s: 'Open BSD', r: /OpenBSD/ },
            { s: 'Sun OS', r: /SunOS/ },
            { s: 'Linux', r: /(Linux|X11)/ },
            { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
            { s: 'Mac OS X', r: /Mac OS X/ },
            { s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
            { s: 'QNX', r: /QNX/ },
            { s: 'UNIX', r: /UNIX/ },
            { s: 'BeOS', r: /BeOS/ },
            { s: 'OS/2', r: /OS\/2/ },
            { s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ }
        ];
        for (var id in clientStrings) {
            var cs = clientStrings[id];
            if (cs.r.test(nAgt)) {
                os = cs.s;
                break;
            }
        }

        var osVersion = unknown;

        if (/Windows/.test(os)) {
            osVersion = /Windows (.*)/.exec(os)[1];
            os = 'Windows';
        }

        switch (os) {
            case 'Mac OS X':
                osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'Android':
                osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'iOS':
                osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                break;
        }

    }

    osArch = get_bits_system_architecture();

    if (mobile == true)
        mobile = " (Mobile) "
    else
        mobile = ""

    window.jscd = {
        os: os,
        osVersion: osVersion,
        osArch: osArch,
        mobile: mobile,
    };
}(this));

function checkBrowser() {
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browserName = navigator.appName;
    var fullVersion = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;

    // In MSIE, the true version is after "MSIE" in userAgent
    if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
        browserName = "Microsoft Internet Explorer";
        fullVersion = nAgt.substring(verOffset + 5);
        //if ( parseInt(fullVersion) >=7 )
        //	fullVersion=IEVersion();
    }
    else if (nAgt.indexOf("Trident") != -1 && nAgt.indexOf("rv:11") != -1) {
        browserName = "Microsoft Internet Explorer";
        fullVersion = "11";
    }
        // In Opera, the true version is after "Opera" 
    else if ((verOffset = nAgt.indexOf("Opera")) != -1) {
        browserName = "Opera";
        fullVersion = nAgt.substring(verOffset + 6);
    }
        // In Chrome, the true version is after "Chrome" 
    else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
        browserName = "Chrome";
        fullVersion = nAgt.substring(verOffset + 7);
    }
        // In Safari, the true version is after "Safari" 
    else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
        browserName = "Safari";
        fullVersion = nAgt.substring(verOffset + 7);
    }
        // In Firefox, the true version is after "Firefox" 
    else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
        browserName = "Firefox";
        fullVersion = nAgt.substring(verOffset + 8);
    }
        // In most other browsers, "name/version" is at the end of userAgent 
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
        browserName = nAgt.substring(nameOffset, verOffset);
        fullVersion = nAgt.substring(verOffset + 1);
        if (browserName.toLowerCase() == browserName.toUpperCase()) {
            browserName = navigator.appName;
        }
    }

    // trim the fullVersion string at semicolon/space if present
    if ((ix = fullVersion.indexOf(";")) != -1) fullVersion = fullVersion.substring(0, ix);
    if ((ix = fullVersion.indexOf(" ")) != -1) fullVersion = fullVersion.substring(0, ix);
    majorVersion = parseInt('' + fullVersion, 10);

    if (isNaN(majorVersion)) {
        fullVersion = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
    }
    document.getElementById("info").innerHTML = 'OS: ' + jscd.os + ' ' + jscd.osVersion + ' x' + jscd.osArch + jscd.mobile + ';&nbsp;&nbsp;Browser: ' + browserName + "&nbsp;" + fullVersion;
    
}

function get_bits_system_architecture() {
    var _to_check = [];
    if (window.navigator.cpuClass) _to_check.push((window.navigator.cpuClass + "").toLowerCase());
    if (window.navigator.platform) _to_check.push((window.navigator.platform + "").toLowerCase());
    if (navigator.userAgent) _to_check.push((navigator.userAgent + "").toLowerCase());

    var _64bits_signatures = ["x86_64", "x86-64", "Win64", "x64;", "amd64", "AMD64", "WOW64", "x64_64", "ia64", "sparc64", "ppc64", "IRIX64"];
    var _bits = 32, _i, _c;
    outer_loop:
        for (var _c = 0 ; _c < _to_check.length ; _c++) {
            for (_i = 0 ; _i < _64bits_signatures.length ; _i++) {
                if (_to_check[_c].indexOf(_64bits_signatures[_i].toLowerCase()) != -1) {
                    _bits = 64;
                    break outer_loop;
                }
            }
        }
    return _bits;
}
function postData(target, data) {
    if (!http.sendRequest) {
        return null;
    }
    http.url = target;
    http.actionMethod = "POST";
    var code = http.sendRequest(data);
    if (code != 0) return null;
    return http.responseText;

}
function setOutput(output) {
    var ret = JSON.parse(output);
    if (ret.ret_code == 0x76000031) {
        alert(window.location.hostname + "非信任網站，請先加入信任網站");
    }
    document.getElementById('hipkiLocalSignServerVersion').value = ret.serverVersion;
    var nVer = navigator.appVersion;
    var version = document.getElementById('hipkiLocalSignServerVersion').value;
    if (nVer.indexOf("Win") >= 0) {
        if (version < WinVer) { document.getElementById('Rightversion').value = "請升級至1.3.4.103328"; }
        else { document.getElementById('Rightversion').value = "不需升級"; }
    } else if (nVer.indexOf("Mac") >= 0) {
        if (version < MacVer) { document.getElementById('Rightversion').value = "請升級至1.3.4.13"; }
        else { document.getElementById('Rightversion').value = "不需升級"; }
    } else if (nVer.indexOf("Linux") >= 0) {
        if (version < LinuxVerVer) { document.getElementById('Rightversion').value = "請升級至1.3.4.3"; }
        else { document.getElementById('Rightversion').value = "不需升級"; }
    }
   
}
function getImageInfo(ctx) {
    var output = "";
    for (i = 0; i < 2000; i++) {
        var data = ctx.getImageData(i, 0, 1, 1).data;
        if (data[2] == 0) break;
        output = output + String.fromCharCode(data[2], data[1], data[0]);
    }
    if (output == "") output = '{"ret_code": 1979711501,"message": "執行檔錯誤或逾時"}';
    return output;
}
function checkVersion() {
    var img = null;
    var ctx;
    var output = "";
    var ua = window.navigator.userAgent;
    if (ua.indexOf("MSIE") == -1 && ua.indexOf("Trident") == -1) //not IE
    {
        img = document.createElement("img");
        img.crossOrigin = "Anonymous";
        img.src = 'http://localhost:61161/p11Image.bmp';
        var canvas = document.createElement("canvas");
        canvas.width = 2000; canvas.height = 1;
        ctx = canvas.getContext('2d');

        img.onload = function () {
            ctx.drawImage(img, 0, 0);
            output = getImageInfo(ctx);
            setOutput(output);
        };
        img.onerror = function () {
            document.getElementById('hipkiLocalSignServerVersion').value = "未安裝客戶端程式或未啟動服務";
        };
    } else {
        document.getElementById("httpObject").innerHTML = '<OBJECT id="http" width=1 height=1 style="LEFT: 1px; TOP: 1px" type="application/x-httpcomponent" VIEWASTEXT></OBJECT>';
        output = postData("http://localhost:61161/pkcs11info", "");
        if (output == null) {
            document.getElementById('hipkiLocalSignServerVersion').value = "未安裝客戶端程式或未啟動服務";
            return;
        } else {
            setOutput(output);
        }

    }
    
}

window.onload = function() {
    checkBrowser();
    checkVersion();
}