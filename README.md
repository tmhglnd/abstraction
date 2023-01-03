# Abstraction

An installation demonstrating abstraction through interaction with code

# Install

Install node modules with:

`npm install`

# Run process on boot on rPi

Install Process Manager 2 with npm

`npm install pm2 -g`

Navigate to project and start project:

`pm2 start server.js --name [process name]`

Create startup files:

`pm2 startup` (`pm2 unstartup` to remove)

Copy/paste/execute the command printed in the terminal and afterwards save the startup process

`pm2 save`

Some useful commands to monitor processes:

`pm2 list`, `pm2 monit`, `pm2 logs [process name]`

# Acknowledgements

This installation was commissioned by Museum CODA Apeldoorn.

