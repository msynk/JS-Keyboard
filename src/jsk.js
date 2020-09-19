var JSK = (function () {

    JSK.Events = {
        KeyUp: { code: 1 },
        KeyDown: { code: 2 },
        Both: { code: 3 }
    };

    return JSK;

    function JSK(container) {
        container = container || window;
        container.addEventListener('keydown', keydown);
        container.addEventListener('keyup', keyup);

        var _keyboard = { listeners: {} };

        _keyboard.Keys = getKeys();

        _keyboard.on = on;
        _keyboard.off = off;
        _keyboard.release = releaseAll;

        function on(key, func, options) {
            if (!key || !func || typeof func !== 'function') return;
            var originalKey = key,
                combKey = key[0],
                combinations = {
                    '*': 'ctrl',
                    '-': 'alt',
                    '+': 'shift',
                    '!': 'default'
                };
            if (Object.keys(combinations).indexOf(combKey) !== -1 && key.length > 1) {
                key = key.slice(1);
            } else {
                combKey = '';
            }

            key = key.toLowerCase();
            options = options || {};
            !options['Event'] && (options['Event'] = JSK.Events.KeyDown);
            !_keyboard.listeners[key] && (_keyboard.listeners[key] = []);
            var listeners = _keyboard.listeners[key],
                listener;

            for (var i = 0; i < listeners.length; i++) {
                //if (listener.func.toString() === func.toString()) {
                if (listeners[i].func === func) {
                    listener = listeners[i];
                    listener.func = func;
                    listener.options = options;
                    break;
                }
            }
            if (!listener) {
                listener = { func: func, options: options };
                _keyboard.listeners[key].push(listener);
            }

            listener.combinations = {};
            combinations[combKey] && (listener.combinations[combinations[combKey]] = true);

            return _keyboard;
        }

        function off(key, func) {
            if (!key || !func || typeof func !== 'function') return _keyboard.Keyboard;

            var listeners = _keyboard.listeners[key];
            if (!listeners) return;
            for (var i = 0; i < listeners.length; i++) {
                var listener = listeners[i];
                listener.func.toString() === func.toString() && listeners.splice(i, 1);
            }
            listeners.length === 0 && (delete _keyboard.listeners[key]);

            return _keyboard;
        }

        function releaseAll(key) {
            var listeners = _keyboard.listeners[key];
            if (!listeners) return;

            delete _keyboard.listeners[key];

            return _keyboard;
        }

        function keydown(e) {
            run(JSK.Events.KeyDown, e);
        }

        function keyup(e) {
            run(JSK.Events.KeyUp, e);
        }

        function run(event, e) {
            var code = e.keyCode || e.which,
                keys = _keyboard.Keys[code] || [],
                nodeName = e.target.nodeName.toUpperCase();

            for (var i = 0; i < keys.length; i++) {
                var key = keys[i],
                    listeners = _keyboard.listeners[key];
                if (!listeners) continue;
                for (var j = 0; j < listeners.length; j++) {
                    var listener = listeners[j],
                        options = listener.options;
                    if (!(!options || (
                        (!options['Event'] || options['Event'] === event) &&
                        (!options['Element'] || options['Element'] === e.target))
                    )) continue;

                    //if (['INPUT', 'TEXTAREA'].indexOf(nodeName) !== -1 && !options['triggerOnTextInputs']) continue;

                    if (!(
                        ((!e.altKey && !listener.combinations.alt) || (e.altKey && listener.combinations.alt)) &&
                        ((!e.ctrlKey && !listener.combinations.ctrl) || (e.ctrlKey && listener.combinations.ctrl)) &&
                        ((!e.shiftKey && !listener.combinations.shift) || (e.shiftKey && listener.combinations.shift))
                    )) continue;

                    if (!listener.combinations.default) {
                        e.preventDefault();
                        e.stopPropagation();
                    }

                    listener.func.call(options.context, e, options.args);
                }
            }
        }

        function getKeys() {
            return [
                [], //0
                [], //1
                [], //2
                [], //3
                [], //4
                [], //5
                [], //6
                [], //7
                ['backspace', 'bs'], //8
                ['tab'], //9
                [], //10
                [], //11
                [], //12
                ['enter'], //13
                [], //14
                [], //15
                ['shift'], //16
                ['control', 'ctrl'], //17
                ['alt'], //18
                ['pause'], //19
                ['capslock', 'cl'], //20
                [], //21
                [], //22
                [], //23
                [], //24
                [], //25
                [], //26
                ['esc'], //27
                [], //28
                [], //29
                [], //30
                [], //31
                ['space', ' '], //32
                ['pageup', 'pu'], //33
                ['pagedown', 'pd'], //34
                ['end'], //35'
                ['home'], //36:'
                ['leftarrow', 'la', 'left'], //37:'
                ['uparrow', 'ua', 'up'], //38:'
                ['rightarrow', 'ra', 'right'], //39:'
                ['downarrow', 'da', 'down'], //40:'
                [], //41
                [], //42
                [], //43
                ['printscreen', 'prtscr', 'ps'], //44:'
                ['insert'], //45:'
                ['delete'], //46:'
                [], //47
                ['num0', 'n0', '0'], //48:'
                ['num1', 'n1', '1'], //49:'
                ['num2', 'n2', '2'], //50:'
                ['num3', 'n3', '3'], //51:'
                ['num4', 'n4', '4'], //52:'
                ['num5', 'n5', '5'], //53:'
                ['num6', 'n6', '6'], //54:'
                ['num7', 'n7', '7'], //55:'
                ['num8', 'n8', '8'], //56:'
                ['num9', 'n9', '9'], //57:'
                [], //58
                [], //59
                [], //60
                [], //61
                [], //62
                [], //63
                [], //64
                ['a'], //65:'
                ['b'], //66:'
                ['c'], //67:'
                ['d'], //68:
                ['e'], //69:
                ['f'], //70:
                ['g'], //71:
                ['h'], //72:
                ['i'], //73:
                ['j'], //74:
                ['k'], //75:
                ['l'], //76:
                ['m'], //77:
                ['n'], //78:
                ['o'], //79:
                ['p'], //80:
                ['q'], //81:
                ['r'], //82:
                ['s'], //83:
                ['t'], //84:
                ['u'], //85:
                ['v'], //86:
                ['w'], //87:
                ['x'], //88:
                ['y'], //89:
                ['z'], //90:
                ['leftwindow', 'lw', 'window', 'w'], //91: //219 opera
                ['rightwindow', 'rw', 'window', 'w'], //92:
                ['contextmenu', 'cm'], //93:
                [], //94
                [], //95
                ['numpad0', 'np0'], //96: 
                ['numpad1', 'np1'], //97: 
                ['numpad2', 'np2'], //98: 
                ['numpad3', 'np3'], //99: 
                ['numpad4', 'np4'], //100:
                ['numpad5', 'np5'], //101:
                ['numpad6', 'np6'], //102:
                ['numpad7', 'np7'], //103:
                ['numpad8', 'np8'], //104:
                ['numpad9', 'np9'], //105:
                ['multiply', 'mul', '*'], //106:'
                ['add', 'plus', '+'], //107:'
                [], //108
                ['subtract', 'sub', '-'], //109:'
                ['decimalpoint', 'dp'], //110:'
                ['divide'], //111:'
                ['f1'], //112:
                ['f2'], //113:
                ['f3'], //114:
                ['f4'], //115:
                ['f5'], //116:
                ['f6'], //117:
                ['f7'], //118:
                ['f8'], //119:
                ['f9'], //120:
                ['f10'], //121:
                ['f11'], //122:
                ['f12'], //123:
                [], //124
                [], //125
                [], //126
                [], //127
                [], //128
                [], //129
                [], //130
                [], //131
                [], //132
                [], //133
                [], //134
                [], //135
                [], //136
                [], //137
                [], //138
                [], //139
                [], //140
                [], //141
                [], //142
                [], //143
                ['numlock', 'nl'], //144:'
                ['scrolllock', 'sl'], //145:'
                [], //146
                [], //147
                [], //148
                [], //149
                [], //150
                [], //151
                [], //152
                [], //153
                [], //154
                [], //155
                [], //156
                [], //157
                [], //158
                [], //159
                [], //160
                [], //161
                [], //162
                [], //163
                [], //164
                [], //165
                [], //166
                [], //167
                [], //168
                [], //169
                [], //170
                [], //171
                [], //172
                [], //173
                [], //174
                [], //175
                [], //176
                [], //177
                [], //178
                [], //179
                [], //180
                [], //181
                [], //182
                [], //183
                [], //184
                [], //185
                ['semicolon', 'sc', ';'], //186:59: // opera & firefox
                ['equal', 'eq', '='], //187:61: // opera //107 firefox
                ['comma', ','], //188:'
                ['dash', 'hyphen'], //189:'
                ['period', 'dot', '.'], //190:'
                ['slash', 'forwarslash', 'fs', '/'], //191:'
                ['graveaccent', 'ga', 'grave', '`'], //192:'
                [], //193
                [], //194
                [], //195
                [], //196
                [], //197
                [], //198
                [], //199
                [], //200
                [], //201
                [], //202
                [], //203
                [], //204
                [], //205
                [], //206
                [], //207
                [], //208
                [], //209
                [], //210
                [], //211
                [], //212
                [], //213
                [], //214
                [], //215
                [], //216
                [], //217
                [], //218
                ['openbracket', 'ob', '['], //219:'
                ['backslash', 'bsl', '\\'], //220:'
                ['closebracket', 'cs', ']'], //221:'
                ['singlequote', 'sq', '\''], //222:'
            ];
        }

        return _keyboard;
    }
}());