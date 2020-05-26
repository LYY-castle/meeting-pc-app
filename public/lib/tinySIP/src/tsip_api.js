/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
function tsip_api_add_js_scripts(s_elt) {
    var tag_hdr = document.getElementsByTagName(s_elt)[0]
    for (var i = 1; i < arguments.length; ++i) {
        var tag_script = document.createElement('script')
        tag_script.setAttribute('type', 'text/javascript')
        tag_script.setAttribute('src', arguments[i] + '?svn=252')
        tag_hdr.appendChild(tag_script)
    }
}

// add tinySAK API
tsip_api_add_js_scripts('head', 'lib/tinySAK/src/tsk_api.js')

// add tinyMEDIA API
tsip_api_add_js_scripts('head', 'lib/tinyMEDIA/src/tmedia_api.js')

// add tinySDP API
tsip_api_add_js_scripts('head', 'lib/tinySDP/src/tsdp_api.js')

// add tinySIP API
tsip_api_add_js_scripts('head',
'lib/tinySIP/src/tsip_action.js',
'lib/tinySIP/src/tsip_event.js',
'lib/tinySIP/src/tsip_message.js',
'lib/tinySIP/src/tsip_session.js',
'lib/tinySIP/src/tsip_stack.js',
'lib/tinySIP/src/tsip_timers.js',
'lib/tinySIP/src/tsip_uri.js'
)

tsip_api_add_js_scripts('head',
'lib/tinySIP/src/authentication/tsip_auth.js',
'lib/tinySIP/src/authentication/tsip_challenge.js'
)

tsip_api_add_js_scripts('head',
'lib/tinySIP/src/dialogs/tsip_dialog.js',
'lib/tinySIP/src/dialogs/tsip_dialog_layer.js'
)

tsip_api_add_js_scripts('head',
'lib/tinySIP/src/headers/tsip_header.js'
)

tsip_api_add_js_scripts('head',
'lib/tinySIP/src/parsers/tsip_parser_header.js'
)

tsip_api_add_js_scripts('head',
'lib/tinySIP/src/transactions/tsip_transac.js'
)

tsip_api_add_js_scripts('head',
'lib/tinySIP/src/transports/tsip_transport.js',
'lib/tinySIP/src/transports/tsip_transport_layer.js'
)
