# Abstraction

An installation demonstrating abstraction through interaction with code

# Install

Install node modules with:

`npm install`

# Install NodeJS and Node Version Manager on rPi

Install NodeJS `node` 

For nvm (Node Version Manager) use the following installing script:

`curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash`

And run the following scripts:

`export NVM_DIR="$HOME/.nvm"`

This will load nvm:

`[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"`

Check if nvm is installed with:

`command -v nvm`

This should return: `nvm`

Now install the latest stable NodeJS version (or any other version) with:

`node install stable` or `node install vX.Y.Z` (eg. `v18.11.0`)

Now check the used version with:

`node -v`

Or switch version with:

`nvm use X` (eg. `nvm use 18`)

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

This installation was commissioned by [Museum CODA Apeldoorn](https://www.coda-apeldoorn.nl/).

# License

The software in this repository is licensed under the [**GNU GPLv3** license](https://choosealicense.com/licenses/gpl-3.0/)

The creative output of this work is licensed under the [**CC BY-SA 4.0** license](https://creativecommons.org/licenses/by-sa/4.0/legalcode)

This is a [**Free Culture License**](https://creativecommons.org/share-your-work/public-domain/freeworks)!

You are free to:

- `Share` — copy and redistribute the material in any medium or format

- `Adapt` — remix, transform, and build upon the material for any purpose, even commercially.

Under the following terms:

- `Attribution` — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.

- `ShareAlike` — If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.