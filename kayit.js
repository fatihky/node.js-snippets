var  _ = require('lodash');

var k = {
	yaz: _kayit('', 'black'),
	renkli: _kayit('', 'rainbow'),
	bilgi: _kayit('[bilgi]', 'green'),
	not: _kayit('[not]', 'grey'),
	uyari: _kayit('[uyarı]', 'yellow'),
	onemli: _kayit('[önemli]', 'magenta'),
	hata: _kayit('[hata]', 'red'),
	ornek: function()
	{
		k.yaz('yaz');
		k.renkli('renkli');
		k.not('not');
		k.bilgi('bilgi');
		k.uyari('uyarı');
		k.onemli('önemli');
		k.hata('hata');
	}
}

function _kayit(on_ek, renk)
{
	return function()
	{
		var arr;
		if(arguments.length > 1)
		{
			var x = _.toArray(arguments);
			x.shift();
			if(arguments[0].contains('%'))
				arr = [String.prototype.sprintf.apply(arguments[0], x)[renk]];
			else
			{
				arr = _.toArray(arguments);
				arr.forEach(function(e, i)
				{
					arr[i] = (typeof arr[i] == "object" && arr[i] instanceof Object ? JSON.stringify(arr[i]) : arr[i].toString())[renk];
				});
			}
		} else if(arguments.length === 1) {
			arr = [arguments[0][renk]]
		}

		arr.unshift(on_ek[renk].bold);

		if(arguments.length === 0)
		{
			arr = [];
		}
		console.log.apply(this, arr);
	}
}

module.exports = k;
