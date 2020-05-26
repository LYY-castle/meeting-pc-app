﻿/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
function tmedia_api_add_js_scripts(s_elt) {
    var tag_hdr = document.getElementsByTagName(s_elt)[0]
    for (var i = 1; i < arguments.length; ++i) {
        var tag_script = document.createElement('script')
        tag_script.setAttribute('type', 'text/javascript')
        tag_script.setAttribute('src', arguments[i] + '?svn=252')
        tag_hdr.appendChild(tag_script)
    }
}

tmedia_api_add_js_scripts('head',
'lib/tinyMEDIA/src/tmedia_common.js',
'lib/tinyMEDIA/src/tmedia_param.js',
'lib/tinyMEDIA/src/tmedia_qos.js'
)
