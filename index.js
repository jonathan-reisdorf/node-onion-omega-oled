module.exports = (function() {
  'use strict';

  const exec = require('node-exec-promise').exec;

  class OmegaOled {
    constructor() {
      this._chainMode = false;
      this._commandChain = [];
      this._is = {
        poweredOn: false,
        inverted: false,
        dimmed: false
      };
    }

    /**
     * execute command line oled-exp binary with given command
     * @param command
     * @param isExecuteChain
     */
    _executeCommand(command, isExecuteChain) {
      if (this._chainMode && !isExecuteChain) {
        this._commandChain.push(command);
        return Promise.resolve(this._commandChain);
      }

      return exec('oled-exp ' + command);
    }

    _getFlag(property) {
      return this._is[property];
    }

    _setFlag(carry, value, property) {
      this._is[property] = value;
      return carry;
    }

    init() {
      return this._executeCommand('-i')
        .then(result => this._setFlag(result, true, 'poweredOn'));
    }

    clear() {
      return this._executeCommand('-c');
    }

    power(on) {
      if (typeof on === 'undefined') {
        return this._getFlag('poweredOn');
      }

      return this._executeCommand('power ' + (on ? 'on' : 'off'))
        .then(result => this._setFlag(result, !!on, 'poweredOn'));
    }

    invert(on) {
      if (typeof on === 'undefined') {
        return this._getFlag('inverted');
      }

      return this._executeCommand('invert ' + (on ? 'on' : 'off'))
        .then(result => this._setFlag(result, !!on, 'inverted'));
    }

    dim(on) {
      if (typeof on === 'undefined') {
        return this._getFlag('dimmed');
      }

      return this._executeCommand('dim ' + (on ? 'on' : 'off'))
        .then(result => this._setFlag(result, !!on, 'dimmed'));
    }

    cursor(row, column) {
      return this._executeCommand('cursor ' + [row, column].join(','));
    }

    cursorPixel(row, pixel) {
      return this._executeCommand('cursorPixel ' + [row, pixel].join(','));
    }

    write(string) {
      return this._executeCommand("write '" + string + "'");
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
      const executionResult = this._executeCommand(this._commandChain.join(' '), true);
      this._commandChain = [];
      return executionResult;
    }
  }

  return new OmegaOled();
})();
