(function ($) {
    $.CreateInstantOption = function () {
        var $this = $("<div></div>");
        return $this;
    };

    $.fn.instOpAddUrl = function (id, RefUrl, text, target, onclick) {
        var str = "";
        if (id)
            str += "id=\"" + id + "\" ";

        if (RefUrl)
            str += "href=\"" + RefUrl + "\" ";

        if (target)
            str += "target=\"" + target + "\" ";

        if (onclick)
            str += "onclick=\"" + onclick + "\" ";

        $(this).append("<a " + str + " class=\"inst-op-url\">&nbsp; • " + text + "</a>");
        return $(this);
    };


    $.fn.instOpSetCss = function (css) {
        var $this = $(this);
        $.each(css, function (index, value) {
            $this.data(index, value);
        });

        $.alertVar($this.data());
        return $(this);
    };

    $.fn.instOpSetClickable = function (cls, data) {
        var $this = $(this);
        $("." + cls).click(function (event) {
            $('.instant-option').remove();
            var $thisP = $("<div class=\"instant-option\" id=\"instantOp\"></div>");

            var $thisOp = $(this);
            var generatedHtml = $this.html();
            $.each(data, function (index, value) {
                generatedHtml = generatedHtml.split('{' + value + '}').join($thisOp.attr(index));
            });

            $("body").append($thisP);
            $thisP
                .css($this.data())
                .css({
                    'display': 'block',
                    'left': ($(this).offset().left + $(this).outerWidth() - $thisP.outerWidth()),
                    'top': ($(this).offset().top + $(this).outerHeight())
                })
                .html(generatedHtml)
                .click(function (event) {
                    event.stopPropagation();
                });

            $(window).click(function (event) {
                $('.instant-option').remove();
            });

            event.stopPropagation();
        });
    };
})(jQuery);
