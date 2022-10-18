# inventory-service-nodejs-2022-s1
Inventory management system using GRPC

Sample grpc implementations 
- [Link 1](https://daily.dev/blog/build-a-grpc-service-in-nodejs)
- [Link 2](https://www.bacancytechnology.com/blog/implement-grpc-services-in-nodejs)

# Running the project in dev mode

To run the project you need to have [nodejs](https://nodejs.org) installed on your computer
On windows systems the installation comes packed with nodejs already i.e `npm`

On linux there are a variety of ways you can use to install `nodejs`
- Using `nvm`
- Using `node source control`
- Installing the `tarball`

[Nvm Documentation](https://github.com/nvm-sh/nvm#install--update-script) is easy to work with.

Once you have installed `nvm` run the following command
```sh
nvm install --lts
```
The command should install the latest version of __nodejs__ i.e `>=16.*.*`

This should have with it `npm` installed
Next we'll choose a package manager between
 > [npm](https://docs.npmjs.com/) You can read more on `npm`

 > [yarn](https://yarnpkg.com/) You can also read more on `yarn`

 > [pnpm](https://pnpm.io/) You can also read more on `pnpm`

 Going forward we'll use `pnpm` as our package manager

### Package manager
We'll use `pnpm` as our package manager. To install it in your system run `npm i -g pnpm`

Once you've installed the `pnpm` package manager the install the `node_modules` using the following command

```sh
pnpm install
#or 
pnpm i
```
Once all modules are installed to run either servers follow the steps below
#### Server
```sh
pnpm dev-rpc:server
```
#### Client
```sh
pnpm dev-rpc:client
```