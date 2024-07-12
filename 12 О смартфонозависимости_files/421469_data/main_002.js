/**
 * Общие скрипты сайта
 */
(function(w)
{
	"use strict";

	w.$anketolog = {};

	w.$anketolog.DEBUG = true;

	/**
	 * Индикатор загрузки
	 */
	$anketolog.loader = {
		enable: function(e)
		{
			$(e).addClass('anketolog-loader');
		},
		disable: function(e)
		{
			$(e).removeClass('anketolog-loader');
		}
	};

	/**
	 * Информационные сообщения
	 */
	$anketolog.message = (function()
	{
		var options = {
			timeoutOpen: 0,
			timeoutClose: 2000,
			animationOpen: 700,
			animationClose: 700
		};
		
		var M = function()
		{
			var self = this;

            this._createBox = function(type, message)
            {
                var $box = $('<div></div>')
                        .addClass('notification-box')
                        .addClass(type)
                        .css({opacity: 0});

                var $close = $('<a></a>')
                        .addClass('notification-close')
                        .attr('title', 'Закрыть')
                        .on('click', function (e)
                        {
                            e.preventDefault();
                            $box.each(self._messageBoxClose);
                        });

                return $box.append($('<div></div>', {class: "notification-box__content", text: message}).append($close)).prependTo(document.body);
            };
            this._removeBox = function()
            {
                $('.notification-box').remove();
            };

            this.errorShow = function(message)
            {
                this.show('error', message);
            };
            this.infoShow = function(message)
            {
                this.show('info', message);
            };
            this.approveShow = function(message)
            {
                this.show('approve', message);
            };
            this.hide = function()
            {
                this._removeBox();
            };
            this.show = function(type, message)
            {
                this.hide();

                var $box = this._createBox(type, message);
                $box.stop(true, true)
                    .hover(function () {
                        $box.stop(true, true);
                    }, function () {
                        $box.stop(true, true)
                            .each(self._messageBoxCloseWithDelay);
                    })
                    .delay(options.timeoutOpen)
                    .animate({opacity: 1, bottom: '+=35px'}, options.animationOpen, 'swing')
                    .each(this._messageBoxCloseWithDelay);
            };
            this._messageBoxCloseWithDelay = function ()
            {
                $(this)
                    .delay(options.timeoutClose)
                    .each(self._messageBoxClose);
            };
            this._messageBoxClose = function ()
            {
                var $box = $(this);

                $box
                    .animate({opacity: 0, bottom: '-=35px'}, options.animationClose, 'swing', function() { $box.remove(); });
            };
		};
		return new M;
	})();

	$anketolog.geoManager = (function ()
	{
		var geo = {
			countries: {},
			regions: {},
			cities: {}
		};

		var M = function ()
		{
			this.loadGeo = function(countryId, regionId, callback)
			{
				this._load(countryId, regionId).done(function()
				{
					callback && callback(geo);
				});
			};

			this._load = function(countryId, regionId)
			{
				var d = $.Deferred();
				var self = this;

				$.when(this._countryManager.load(), this._regionManager.load(countryId), this._cityManager.load(regionId))
					.done(function(country, region, city){

						geo.countries = country || {};
						geo.regions = region || {};
						geo.cities = city || {};

						d.resolve();
					});
				return d.promise();
			};

			/**
			 * Список стран
			 */
			this._countryManager = {
				_data: {},
				_lock: false,
				load: function()
				{
					var d = $.Deferred();
					if (this._lock)
					{
						return d.promise();
					}

					var self = this;
					if ($.isEmptyObject(this._data))
					{
						self._lock = true;
						$.ajax({
							type: 'get',
							url: '/list/country',
							dataType: 'json',
							cache: true,

							success: function(data)
							{
								self._data = data;
							},
							error: function()
							{
								self._data = {};
							},
							complete: function()
							{
								self._lock = false;
								d.resolve(self._data);
							}
						});
					}
					else
					{
						d.resolve(self._data);
					}
					return d.promise();
				}
			};

			/**
			 * Список регионов
			 */
			this._regionManager = {
				_data: {},
				_locks: {},
				load: function(countryId)
				{
					var d = $.Deferred();
					if (this._locks[countryId])
					{
						return d.promise();
					}

					var self = this;
					if (countryId && !this._data[countryId])
					{
						self._locks[countryId] = true;
						$.ajax({
							type: 'get',
							url: '/list/region',
							dataType: 'json',
							cache: true,
							data: {country: countryId},

							success: function(data)
							{
								self._data[countryId] = data;
							},
							error: function()
							{
								self._data[countryId] = {};
							},
							complete: function()
							{
								self._locks[countryId] = false;
								d.resolve(self._data[countryId]);
							}
						});
					}
					else
					{
						d.resolve(self._data[countryId]);
					}
					return d.promise();
				}
			};
			/**
			 * Список городов
			 */
			this._cityManager = {
				_data: {},
				_locks: {},
				load: function(regionId)
				{
					var d = $.Deferred();
					if (this._locks[regionId])
					{
						return d.promise();
					}

					var self = this;
					if (regionId && !this._data[regionId])
					{
						self._locks[regionId] = true;
						$.ajax({
							type: 'get',
							url: '/list/city',
							dataType: 'json',
							cache: true,
							data: {region: regionId},

							success: function(data)
							{
								self._data[regionId] = data;
							},
							error: function()
							{
								self._data[regionId] = {};
							},
							complete: function()
							{
								d.resolve(self._data[regionId]);
								self._locks[regionId] = false;
							}
						});
					}
					else
					{
						d.resolve(self._data[regionId]);
					}
					return d.promise();
				}
			};
		};

		return new M;
	})();

	/**
	 * настройки пользователя
	 */
	$anketolog.userSettings = (function()
	{
		var M = function()
		{
			this.get = function(name, callback)
			{
				$.ajax({
					type:       'get',
					url:        '/user/settings/value',
					data:       {name: name},
					dataType:   'json',
					cache:      true
				}).done(function(result)
				{
					callback && callback(result.value);
				});
			};
			this.set = function(name, value, callback)
			{
				$.ajax({
					type:       'post',
					url:        '/user/settings/value',
					data:       $.extend({}, {name: name, value: JSON.stringify(value)}, window.csrfToken),
					dataType:   'json',
					cache:      true
				}).done(function(result)
				{
					callback && callback(result.value);
				});
			};
		};

		return new M;
	})();

	/**
	 * Форматирование в денежный формат
	 *
	 * @param {Number} number Число
	 * @param {Number} [dec] Количество знаков после запятой
	 * @param {String} [dsep] Разделитель челой и дробной части
	 * @param {String} [tsep] Разделитель разрядов
	 * @returns {String}
	 */
	$anketolog.formatMoney = function (number, dec, dsep, tsep)
	{
		if (isNaN(number) || number == null)
		{
			number = 0.00;
		}

		if (dec === undefined)
		{
			dec = Math.round(number * 1000) / 1000 === Math.round(number) ? 0 : 2;
		}

		tsep = tsep || ' ';
		dsep = dsep || ',';

		var parts = parseFloat(number).toFixed(dec).split('.'),
			integers = parts[0],
			decimals = parts[1] ? dsep + parts[1] : '';

		return integers.replace(/(\d)(?=(?:\d{3})+$)/g, '$1' + tsep) + decimals;
	};

	/**
	 * Форматирование в целочисленный формат
	 *
	 * @param {Number} number Число
	 * @param {String} [tsep] Разделитель разрядов
	 * @returns {String}
	 */
	$anketolog.formatInteger = function(number, tsep)
	{
		if (isNaN(number) || number == null)
		{
			number = 0;
		}

		tsep = tsep || ' ';
		return parseInt(number).toFixed(0).replace(/(\d)(?=(?:\d{3})+$)/g, '$1' + tsep);
	};

	/**
	 * Форматирование размера файла
	 *
	 * @param bytes размер в байтах
	 * @returns {string}
	 */
	$anketolog.formatFilesize = function (bytes)
	{
		var sizes = ['Байт', 'КБ', 'МБ', 'ГБ', 'ТБ'];
		if (bytes == 0)
		{
			return '0 Байт';
		}

		var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

		return (bytes / Math.pow(1024, i)).toFixed(2)  + ' ' + sizes[i];
	};

	/**
	 * Форматирование длительности по времени
	 *
	 * @param {Number} seconds Длительность в секундах
	 * @returns {string}
	 */
	$anketolog.formatDuration = function(seconds)
	{
		var format = function(value)
		{
			value = value.toFixed(0);
			return value.length === 1 ? '0' + value : value;
		};

		return [
			format(Math.floor(seconds / 3600)),
			format(Math.floor(seconds % 3600 / 60)),
			format(seconds % 60)
		].join(':');
	};

	/**
	 * Образовать множественное число
	 *
	 * @param {Number} num Число
	 * @param {Array} forms Формы ['стол', 'стола', 'столов']
	 * @returns {String}
	 */
	$anketolog.pluralize = function(num, forms)
	{
		var i = num % 100;
        if (i >= 11 && i <= 19)
        {
            return forms[2];
        }

        i = i % 10;
        if (i === 1)
        {
            return forms[0];
        }
        else if (i >= 2 && i <= 4)
        {
            return forms[1];
        }
        else
        {
            return forms[2];
        }
	};

	$anketolog.t = window._t = function (message, params, dictionary) {
        // try to translate string
        var translation = (dictionary && typeof dictionary[message] !== 'undefined') ? dictionary[message] : message;

        if (typeof params == 'undefined') params = 0;

        // declare numeric param
        var num = 0;

        // extract number from params
        if (params % 1 === 0) params = {'n':params}; // param is numeric, convert to object key for convenience
        if (params.n % 1 === 0) num = params.n;

        // split translation into pieces
        var chunks = translation.split('|');

        if (translation.indexOf('#') !== -1) { // translation contains expression
            for (var i = 0; i < chunks.length; i++) {
                var pieces = chunks[i].split('#'), // split each chunk in two parts (0: expression, 1: message)
                    ex = pieces[0],
                    msg = pieces[1];

                if (pieces.length == 2) {
                    // handle number shortcut (0 instead of n==0)
                    if (ex % 1 === 0) ex = 'n==' + ex;

                    // create expression to be evaluated (e.g. n>3)
                    var eval_expr = ex.split('n').join(num);

                    // if expression matches, set translation to current chunk
                    if (eval(eval_expr)) {
                        translation = msg;
                        break;
                    }
                }
            }
        }
        // if translation doesn't contain # but does contain |, treat it as simple choice format
        else if (chunks.length > 1) {
            var i = num % 100;
            if (i >= 11 && i <= 19) {
                translation = chunks[2];
            }
            i = i % 10;
            if (i === 1) {
                translation = chunks[0];
            }
            else if (i >= 2 && i <= 4) {
                translation = chunks[1];
            }
            else {
                translation = chunks[2];
            }
        }

        // replace placeholder/replacements
        if (typeof(params == 'Object'))
            for (var key in params) translation = translation.split('{' + key + '}').join(params[key]);

        return translation;
    };

	/**
	 * Журнал
	 *
	 * @param {Object} message Сообщение
	 */
	$anketolog.log = window._l = function (object)
	{
		"use strict";

		if (window.console && window.console.log && $anketolog.DEBUG === true)
		{
			window.console.log(object);
		}
	};

	/**
	 * Журнал ошибок
	 *
	 * @param {Object} message Сообщение
	 */
	$anketolog.error = window._e = function (message)
	{
		"use strict";

		if (typeof window.console !== "undefined" && typeof window.console.error !== "undefined" && $anketolog.DEBUG === true)
		{
			window.console.error(message);
		}
	};

	/**
	 * Проверить доступ
	 *
	 * @param name
	 * @returns {boolean}
	 */
	$anketolog.checkPermission = function (name)
	{
		if (typeof window.permission === 'undefined' || typeof window.permission[name] === 'undefined')
		{
			return true;
		}

		return !!window.permission[name];
	};

	/**
	 *
	 * @type {M}
	 */
	$anketolog.permission = (function()
	{
		var M = function()
		{
			this.get = function(name) {
				if (window.anpm[name])
				{
					var permission = window.anpm[name];

					if (typeof permission.value === 'boolean')
					{
						permission.allow = permission.value;
					}
					else
					{
						permission.allow = permission.value === null;
					}

					return permission;
				}

				return {
					value: false,
					allow: false,
					labels: {

					},
				};
			};
		};

		return new M;
	})();

	$(document).ready(function()
	{
		$('.disable-button').on('submit', function (e)
		{
			$('input[type="submit"], button[type="submit"]', $(e.currentTarget)).prop('disabled', true);
		});

		if (typeof flexibility !== 'undefined') {
            flexibility(document.documentElement);
        }
	});

	try
    {
        document.createEvent("TouchEvent");

        $('body').addClass('touch-device');
    }
    catch(e) {}

	window.analyticsReachGoal = window.analyticsReachGoal || function () {};

	(function (last, interval) {
        $(window).on('error', function (e) {
            if (last === null || Date.now() - last >= interval)
            {
                var message = e.originalEvent.message;
                if (e.originalEvent.error)
                {
                    message = e.originalEvent.error.toString();
                    if (e.originalEvent.error.stack)
                    {
                        message += '\n' + e.originalEvent.error.stack;
                    }
                }

                $.ajax('/main/jserror', {
                    type: 'post',
                    dataType: 'json',
                    data: {
                        error: {
                            message:            message,
	                        href:               window.location.href,
                            filename:           e.originalEvent.filename,
                            lineno:             e.originalEvent.lineno,
                            colno:              e.originalEvent.colno,

                            bubbles:            e.originalEvent.bubbles,
                            cancelBubble:       e.originalEvent.cancelBubble,
                            cancelable:         e.originalEvent.cancelable,
                            composed:           e.originalEvent.composed,
                            defaultPrevented:   e.originalEvent.defaultPrevented,
                            error:              e.originalEvent.error,
                            eventPhase:         e.originalEvent.eventPhase,
                            isTrusted:          e.originalEvent.isTrusted,
                            returnValue:        e.originalEvent.returnValue,
                            timeStamp:          e.originalEvent.timeStamp,
                            type:               e.originalEvent.type
                        }
                    }
                });

                last = Date.now();
            }
        });
    })(null, 2000);
})(window);