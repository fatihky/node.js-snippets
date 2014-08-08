var colors = require('colors');
var loggly = require('loggly');
var lc = loggly.createClient({
    token: "c0a8e9e1-2ddd-4331-a7f7-9d85fad27272",
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
