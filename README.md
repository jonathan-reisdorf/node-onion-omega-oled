# onion-omega-oled

##  Node.js wrapper for the OLED expansion of the Onion Omega / Omega2

# Prerequisites

- Onion Omega / Onion Omega 2
- Onion OLED expansion

# Installation

1. Make sure you have Node.js and npm installed on your Omega.
To do so, ssh into your device (or open the terminal from the web console)
and then run the following commands:

```
opkg update
opkg install nodejs
opkg install npm
```

Then check if the `oled-exp` command works by running the following:

```
oled-exp -h
```

It should print out a help containing a list of commands.

Then go into your local project directory and execute:

```
npm install onion-omega-oled
```

# Example usage

Within your project, create a .js file like this:

```
var omegaOled = require('onion-omega-oled');

omegaOled.init().then(function() {
  omegaOled.write('This is a test!');
});
```

# Advanced usage

The following commands are available:
- `init()`
- `clear()`
- `power(true|false)`
- `invert(true|false)`
- `dim(true|false)`
- `cursor(row, column)`
- `cursorPixel(row, pixel)`
- `write(string)`
- `writeByte(byte)`
- `scroll(direction)`
- `draw(imageFile)`

That is exactly the set of commands you also have with the command line binary.
Additionally you have the following commands:

- `chainMode(true|false)`
Setting this to true will enable a chain mode where all following commands are not
executed until `executeChain()` is called. Then all commands will be executed in one
call.
- `chainMode()`
Returns true or false, gets the current setting
- `executeChain()`
Executes all commands in the chain at once