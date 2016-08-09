const {app, BrowserWindow} = require('electron');
var git = require('simple-git')();
let mainWindow;



// Function to read file
function readFile(callback){
  fs = require('fs');
  fs.readFile('/home/ashutosh/electron-apps/DeployerApp/ashu1212/jsonfile.json', 'utf8', function (err,data) {
    if (err) {
     console.log(err);
     if (callback)
    callback();
    }
    else {
      var JsonObject= JSON.parse(data);
      console.log('JsonObject');
      console.log(JsonObject);
      console.log('auth'+" "+JsonObject['auth-service']);
      console.log('iotser'+" "+JsonObject['iot-service']);
      console.log('gatewayser'+" "+JsonObject['gateway-service']);
      console.log('frontend'+" "+JsonObject['iot-frontend']);
      if (callback)
      callback();
     }
    });
}

 function pullCommand(){
   git
        .addRemote('origin', 'https://github.com/ashu1212/ashutoshrepo.git')
        .pull(function(err, update) {
           if(update && update.summary.changes) {
              require('child_process').exec('npm restart');
           }
      });
}
//Function to perform git clone
function  gitCommand(){
console.log('Before cloning');
git
 .clone("https://github.com/ashu1212/ashutoshrepo.git","ashu1212",function(err,data) {
   if(err)
   {
     console.log("repository already found");
     pullCommand();
       readFile(function(){
        //  writeFile();
         readFile();
     });
   }
   else
    {
    console.log('Cloned successfully');
    pullCommand();
    readFile(
      function(){
      //  writeFile();
        console.log('new update value');
        //readFile();
    }
    );
   }
 });
}


app.on('ready', () => {
  mainWindow = new BrowserWindow({
      height: 600,
      width: 800
  });

//function call
 gitCommand();
  mainWindow.loadURL('file://' + __dirname + '/index.html');
});
