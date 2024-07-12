/**
 * Общие скрипты сайта
 */
(function (w) {
    if (typeof w.__ === 'undefined')
    {
        var t = new w.translator.default;

        w.__ = function (original) {
            try
            {
                return t.gettext.apply(t, arguments);
            }
            catch (e)
            {
                return original;
            }
        };
        w.n__ = function (original, counter) {
            try
            {
                if (original.split('|').length === 3)
                {
                    var translated = t.translate(undefined, undefined, original);

                    var args = [$anketolog.pluralize(counter, translated.split('|'))];

                    if (arguments.length >= 3)
                    {
                        for (var i = 2; i < arguments.length; i++)
                        {
                            args.push(arguments[i]);
                        }
                    }

                    return t.format.apply(t, args);
                }

                return t.gettext.apply(t, arguments);
            }
            catch (e)
            {
                return original;
            }
        };
    }

})(window);