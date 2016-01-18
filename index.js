  // Generate the user private channel
  var channel = generateUserChannel();

  $(document).ready(function() {

    // we're ready ...
    // check if current browser is Chrome
    var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    if(!is_chrome) {
      alert("No can do ... this demo requires Chrome 42+");
    }

    // update the UI  
    $('#curl').text('curl "http://ortc-developers2-useast1-s0001.realtime.co/send" --data "AK=B2N59F&AT=SomeToken&C=' + channel + '&M=hello"');
    $('#channel').text(channel);
      
    // start Chrome Push Manager to obtain device id and register it with Realtime
    // a service worker will be launched in background to receive the incoming push notifications
    var chromePushManager = new ChromePushManager('./service-worker.js', function(error, registrationId){
      
      console.log(registrationId);


    });    
});

// generate a GUID
function S4() {
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}

// generate the user private channel and save it at the local storage
// so we always use the same channel for each user
function generateUserChannel(){
  userChannel = localStorage.getItem("channel");
  if (userChannel == null || userChannel == "null"){ 
      guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();               
      userChannel = 'channel-' + guid;
      localStorage.setItem("channel", userChannel);
  }
  return userChannel;
}

// send a message to the user private channel to trigger a push notification
function send(){
  if (client) {
    client.send(channel, "This will trigger a push notification");
  };
}
