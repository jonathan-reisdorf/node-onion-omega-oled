require('util');
const exec = require('child_process').exec;

class OmegaOled {
    constructor() {
        this._chainMode = false;
        this._commandChain = [];
    }

    /**
     * execute command line oled-exp binary with given command
     * @param command
     * @param isExecuteChain
     */
    _executeCommand(command, isExecuteChain = false) {
        if (this._chainMode && !isExecuteChain) {
            return this._commandChain.push(command);
        }

        return console.log('I would now execute: ', 'oled-exp ' + command);

        return exec('oled-exp ' + command);
    }

    init() {
        return this._executeCommand('-i');
    }

    clear() {
        return this._executeCommand('-c');
    }

    power(on = true) {
        return this._executeCommand('power ' + (on ? 'on' : 'off'));
    }

    invert(on = true) {
        return this._executeCommand('invert ' + (on ? 'on' : 'off'));
    }

    dim(on = true) {
        return this._executeCommand('dim ' + (on ? 'on' : 'off'));
    }

    cursor(row, column) {
        return this._executeCommand('cursor ' + [row, column].join(','));
    }

    cursorPixel(row, pixel) {
        return this._executeCommand('cursorPixel ' + [row, pixel].join(','));
    }

    write(string) {
        return this._executeCommand('write ' + string);
    }

    writeByte(byte) {
        return this._executeCommand('writeByte ' + byte);
    }

    scroll(direction) {
        return this._executeCommand('scroll ' + direction);
    }

    draw(imageFile) {
        return this._executeCommand('draw ' + imageFile);
    }

    /**
     * turn on/off chain mode
     * chain mode will collect commands until executeChain() is triggered
     * and then execute all commands in one call
     * @param on
     */
    chainMode(on) {
        if (typeof on === 'undefined') {
            return this._chainMode;
        }

        this._chainMode = on;
    }

    executeChain() {
        this._executeCommand(this._commandChain.join(' '), true);
        this._commandChain = [];
    }
}

module.exports = (new OmegaOled());