
//var coins = new XMLHttpRequest(),
//  method = "GET",
//  uri = "https://api.coinmarketcap.com/v1/ticker/?limit=10";
document.getElementById("debug").innerHTML = config.apis[0].name;



var xhr = new XMLHttpRequest();
var jsonp = document.createElement("script");

var coins = {};
var algo = "";
var download;
var apis = config.apis;

jsonp.src = apis[1].url+"?callback=mycallback";
console.log(jsonp);
function mycallback(data){
  console.log(data);

}

document.getElementById("debug2").innerHTML  = jsonp;

//get from all apis in config
xhr.open("GET", apis[1].url,true);

xhr.onload = function getCoins (e){
  if (xhr.readyState === 4 && xhr.status === 200){
   coins = JSON.parse(xhr.responseText);
   console.log(coins);
   download = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(coins));
    dllink = document.getElementById('download');
    dllink.setAttribute("href",     download     );
    dllink.setAttribute("download", "coins.json");
    document.getElementsByTagName("header")[0].innerHTML = coins.length ;
  for(i = 0 ; i < coins.length ; i++){
         //alert(i);
       expand_markup(i,coins);
  }
  }else{
    return xhr.statusText;
  }
};
xhr.send();

document.getElementsByTagName("header")[0].innerHTML += algo;

//algo = document.getElementById("algo").value;

function expand_markup(i, coins){
  document.getElementById("output").innerHTML += i +
  "<form>" +
  "<div style='border: 1px solid;' onclick='expand("+i+")'><div>Name: " + coins[i].name + " USD: " + coins[i].price_usd + "</div>" +
  "<div>"+ coins[i].price_btc+"</div>"+
  "<label>Algo</label><input id='algo' type='text' name='algo' value='test'></input><button type='submit'>Add</button>" +
  "<div style='visibility:hidden;' id='expand"+i+"'></div>" +
  "</form>";
}


function expand(id){
  var tag = document.getElementById("expand"+id);
  var visible = tag.style.visibility;
  if (visible == "visible") {
    tag.style.visibility = "hidden";
    tag.style.height ="";
  }else{
    tag.style.visibility = "visible";
    tag.style.height ="100px";
  //alert(id);
  //document.getElementById("expand"+id).style = 'visibility:visible; height:100px;';
  }
}


//document.getElementsByTagName("header")[0].innerHTML += " above 1:" + count ;
