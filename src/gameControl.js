$(function(){
    window.GameControl = {
        Keys: {
            "Up": "up",
            "Down": "down",
            "Left": "left",
            "Right": "right",
            "Btn_0": "btn_0",
            "Btn_1": "btn_1",
            "Btn_2": "btn_2",
            "Btn_3": "btn_3",
            //TBC
            // "Cus_0": "cus_btn_0",
            // "Cus_1": "cus_btn_1",
            // "Cus_2": "cus_btn_2",
            // "Cus_3": "cus_btn_3"
        },
        DirectionBtnType: {
            "Grid": 0,
            "Circle": 1 //TBC
        },
        Position: {
            "TopRight": "posTopRight",
            "TopLeft": "posTopLeft",
            "BottomRight": "posBottomRight",//default
            "BottomLeft": "posBottomLeft"
        },
        CommonBtns: {}
    };
    var GameControlArea = $('<div class="gameControl"></div>');
    var usingMobile = navigator.userAgent.match(/(Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone)/i);
    var GameControlCommonBtnsHTML = `
        <div class="commonBtns">
            <div class="btnRow row1">
                <span class="controlBtn" btn-for="btn_0">A</span>
                <span class="controlBtn" btn-for="btn_2">X</span>
            </div>
            <div class="btnRow row2">
                <span class="controlBtn" btn-for="btn_1">B</span>
                <span class="controlBtn" btn-for="btn_3">Y</span>
            </div>
        </div>
    `;
    var GameControlDirectionGridHTML = `
        <table class="directionBtns">
            <tbody>
                <tr>
                    <td></td>
                    <td><span class="arrow upArrow" btn-for="up"></span></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="arrow leftArrow" btn-for="left"></span></td>
                    <td><span class="arrow downArrow" btn-for="down"></span></td>
                    <td><span class="arrow rightArrow" btn-for="right"></span></td>
                </tr>
            </tbody>
        </table>
    `;

    /**
     * Init the game control panel with settings.
     *
     * @param   {JSON}      setting  The settings to be used.(include diection btns' type, panel position, common buttons to show, etc)
     * @returns {boolean}   init result
     */
    function init(setting) {
        if (setting.mobileOnly && !usingMobile) {
            return false;
        }
        $('body').append(GameControlArea);
        GameControl.panel = GameControlArea;
        switch(setting.type) {
            case GameControl.DirectionBtnType.Grid:
                GameControlArea.append(GameControlDirectionGridHTML);
                break;
            case GameControl.DirectionBtnsType.Circle://TBC
                return false;
            default:
                GameControlArea.append(GameControlDirectionGridHTML);
        }
        if (setting.position && Object.values(GameControl.Position).indexOf(setting.position) > -1) {
            GameControlArea.addClass(setting.position);
        } else {
            GameControlArea.addClass(GameControl.Position.BottomRight);
        }
        if (setting.buttons) {
            if (setting.buttons.common && setting.buttons.common.num) {
                GameControlArea.append(GameControlCommonBtnsHTML);
                for (var i = setting.buttons.common.num; i < 4; i++) {
                    GameControlArea.find('[btn-for="btn_' + i + '"]').hide();
                }
                for (var i = 0; i< setting.buttons.common.num; i++) {
                    GameControl.CommonBtns['btn_' + i] = GameControlArea.find('[btn-for="btn_' + i + '"]');
                }
            }
        }
        return true;
    }
    GameControl.init = init;

    /**
     * Bind key press event for specific key.
     *
     * @param   {string}     key  The key to be bound with the event.
     * @param   {Function}   callback  The callback function after the key pressed
     * @param   {Function}   touchendCallback  The callback function when touchend fired for mobile
     * @returns null
     */
    function bindKeyPressEvent(key, callback, touchendCallback) {
        var eventToBind = 'click';
        if (usingMobile) {
            eventToBind = 'touchstart';
        }
        $('.gameControl [btn-for="' + key + '"]').on(eventToBind, callback);
        if (usingMobile && touchendCallback) {
            $('.gameControl [btn-for="' + key + '"]').on('touchend', touchendCallback);
        }
    }
    GameControl.bindKeyPressEvent = bindKeyPressEvent;

    /**
     * Hide the game control panel.
     *
     */
    function hide() {
        GameControlArea.hide();
    }
    GameControl.hide = hide;

    /**
     * Show the game control panel.
     *
     */
    function show() {
        GameControlArea.show();
    }
    GameControl.show = show;
});