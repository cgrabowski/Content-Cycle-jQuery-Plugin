/*
 * Name: Content Slide Show jQuery Plugin
 * Author: Christopher Grabowski
 *
 * Description: Cycles sections of html content like a
 * slide show.
 */

/*global console, jQuery*/
/*jslint browser: true*/
(function ($, window, undefined) {
    "use strict";

    var methods = {
        init: function (options) {
            var $this = this,
                children = this.children('div'),
                data = this.data('cycle');

            if (!data) {
                this.data('contentcycle', {
                    count : 0,
                    handle : null,
                    settings : {
                        inSpeed : 1500,
                        outSpeed : 1500,
                        duration : 5000
                    }
                });
            }
            if (typeof options === 'object') {
                $.extend(this.data('contentcycle').settings, options);
            }
            $(window).load(function (event) {
                // add the cycle bar
                for (var i = 0; i < $('.content-cycle-bar').length; i ++) {
                    $('.content-cycle-bar').append('<a class="content-cycle-bullet">&#8226</a>');
                }
                $('.content-cycle-bar').each(function(index, element) {
                    $($(element).children('.content-cycle-bullet')).removeClass('content-cycle-bullet-active');
                    $($(element).children('.content-cycle-bullet')[index]).addClass('content-cycle-bullet-active');

                });

                    $('.content-cycle-bar .content-cycle-bullet').each(function(index, element) {
                        $($('.content-cycle-bullet')[index]).click(function (event) {
                            methods.change($this, (index % $('.project-page').length));
                        });
                    });

                // set the initial height for the project pages container
                // then remove all pages from the layout except for the first
                methods.containHighestContentPage($this);
                methods.start($this);
                children.css('display', 'none');
                children.css('visibility', 'visible');
                $(children[0]).css('display', 'block');
            }).on('resize', function (event) {
                methods.containHighestContentPage($this);
            });
            return this;
        },

        start: function ($this) {
            var data = $this.data('contentcycle');
            // use set interval to cycle through the pages
            data.handle = setInterval(function () {
                methods.forward($this);
            }, data.settings.duration);
            return $this;
        },

        stop: function ($this) {
            clearInterval($this.data('contentcycle').handle);
            return $this;
        },

        back: function ($this) {
            var data = $this.data('contentcycle'),
                children = $this.children('div');
            $(children[data.count]).fadeOut(data.settings.OutSpeed);
            data.count = (data.count <= 0) ? children.size() - 1 : data.count -= 1;
            $(children[data.count]).fadeIn(data.settings.inSpeed, function (event) {
                $(children[data.count]).trigger('contentpagechange', [$(children[data.count])]);
            });

            return $this;
        },

        forward: function ($this) {
            var data = $this.data('contentcycle'),
                children = $this.children('div');
            $(children[data.count]).fadeOut(data.settings.outSpeed);
            data.count = (data.count >= children.size() - 1) ? 0 : data.count += 1;
            $(children[data.count]).fadeIn(data.settings.inSpeed, function (event) {
                $(children[data.count]).trigger('contentpagechange', [$(children[data.count])]);
            });
            return $this;
        },

        change: function($this, index) {
            methods.stop($this);
            var data = $this.data('contentcycle'),
                children = $this.children('div');
            $(children).fadeOut(data.settings.outSpeed);
            console.log(index);
            $($this.children('div')[index]).fadeIn(data.settings.inSpeed, function (event) {
                $(children[index]).trigger('contentpagechange', [$(children[index])]);
            });
            return $this;
        },

        // Causes container to be at least as high as its highest child.
        containHighestContentPage: function ($this) {
            var gstHeight = 0, eleHeight = 0;
            $this.children().each(function (index, element) {
                eleHeight = $(element).height();
                gstHeight = (gstHeight > eleHeight) ? gstHeight : eleHeight;
            });
            return $this.height(gstHeight);
        }
    };

    $.fn.contentCycle = function (arg) {

        if (methods[arg]) {
            return methods[arg].apply(this, arguments);
        } else if (typeof arg === 'object' || !arg) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' +  arg + ' does not exist on jQuery.contentCycle');
        }

        return this;
    };

}(jQuery, window));
