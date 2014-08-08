var colors = require('colors');
var loggly = require('loggly');
var lc = loggly.createClient({
    token: "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXX",
    subdomain: "fatihky",
    tags: ["NodeJS", "Cariye-Mobil"],
    json:true
});

var log = function (sadece_mesaj)
{
	console.log("%s".cyan, sadece_mesaj);
	lc.log(sadece_mesaj);
}

log.bilgi = function (mesaj)
{
	console.log("%s".blue, mesaj);
	lc.log(mesaj, ["bilgi"])
};

log.not = function (mesaj)
{
	console.log("%s".grey, mesaj);
	lc.log(mesaj, ["not"])
};

log.hata = function (mesaj)
{
	console.log("%s".red, mesaj);
	lc.log(mesaj, ["hata"])
};

log.uyari = function (mesaj)
{
	console.log("%s".yellow, mesaj);
	lc.log(mesaj, ["uyari"])
};

log.onemli = function (mesaj)
{
	console.log("%s".inverse, mesaj);
	lc.log(mesaj, ["onemli"])
};

log.ozel = function (mesaj, kategori)
{
	if(typeof kategori == undefined)
		return;
	lc.log(mesaj, ["ozel", kategori])
};

module.exports = log;
