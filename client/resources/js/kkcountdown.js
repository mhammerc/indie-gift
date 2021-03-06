(function ()
{
	var a;
	a = function ()
	{
		function a(a, b)
		{
			var c;
			c = this, this.opts = $.extend(
			{}, this.defaults, b), this.$el = $(a), this.countdowns = [], this.prepareHTML(), this.countdownInit(this.$el)
		}
		return a.prototype.version = "1.4.1", a.prototype.defaults = {
			dayText: "day ",
			days2Text: "days ",
			daysText: "days ",
			hourText: "hour ",
			hours2Text: "hours ",
			hoursText: "hours ",
			minutesText: ":",
			secondsText: "",
			textAfterCount: "---",
			oneDayClass: !1,
			displayDays: !0,
			displayZeroDays: !0,
			addClass: !1,
			callback: !1,
			warnSeconds: 60,
			warnClass: !1,
			rusNumbers: !1,
			boxContenerClass: "kkcountdown-box",
			boxDaysClass: "kkc-days",
			boxHoursClass: "kkc-hours",
			boxMinClass: "kkc-min",
			boxSecClass: "kkc-sec",
			boxDaysTextClass: "kkc-days-text",
			boxHoursTextClass: "kkc-hours-text",
			boxMinTextClass: "kkc-min-text",
			boxSecTextClass: "kkc-sec-text",
			theme: !1,
			themeSize: "default"
		}, a.prototype.prepareHTML = function ()
		{
			var a, b, c, d, e, f, g, h, i, j;
			return j = this, a = $(document.createElement("span")).addClass(j.opts.boxContenerClass), b = $(document.createElement("span")).addClass(j.opts.boxDaysClass), d = $(document.createElement("span")).addClass(j.opts.boxHoursClass), f = $(document.createElement("span")).addClass(j.opts.boxMinClass), h = $(document.createElement("span")).addClass(j.opts.boxSecClass), c = $(document.createElement("span")).addClass(j.opts.boxDaysTextClass), e = $(document.createElement("span")).addClass(j.opts.boxHoursTextClass), g = $(document.createElement("span")).addClass(j.opts.boxMinTextClass), i = $(document.createElement("span")).addClass(j.opts.boxSecTextClass), j.opts.addClass && a.addClass(j.opts.addClass), e.html(j.opts.hoursText), g.html(j.opts.minutesText), i.html(j.opts.secondsText), a.append(b).append(c).append(d).append(e).append(f).append(g).append(h).append(i), this.$el.append(a)
		}, a.prototype.countdownInit = function (a)
		{
			var b, c, d, e;
			return b = 0, e = this, void 0 === a.id && (a.id = "kk_" + Math.random((new Date).getTime())), b = e.countdowns[a.id] || 0 === e.countdowns[a.id] ? e.countdowns[a.id] : a.data("seconds"), void 0 === b && (d = new Date, d = Math.floor(d.getTime() / 1e3), c = a.data("time"), void 0 === c && (c = a.attr("time")), b = c - d), e.countdowns[a.id] = b - 1, e.opts.warnClass && b < e.opts.warnSeconds && a.addClass(e.opts.warnClass), 0 >= b ? (a.html(e.opts.textAfterCount), e.opts.callback ? e.opts.callback.call(a) : void 0) : 86400 >= b ? (this.countdown(!0, a, b), setTimeout(function ()
			{
				return e.countdownInit(a)
			}, 1e3)) : (this.countdown(!1, a, b), setTimeout(function ()
			{
				return e.countdownInit(a)
			}, 1e3))
		}, a.prototype.countdown = function (a, b, c)
		{
			var d, e, f, g, h;
			return h = this, g = this.fixTime(c % 60), c = Math.floor(c / 60), f = this.fixTime(c % 60), c = Math.floor(c / 60), e = this.fixTime(c % 24), c = Math.floor(c / 24), d = c, h.opts.oneDayClass && a && b.addClass(h.opts.oneDayClass), h.opts.displayZeroDays && d >= 0 && (b.find("." + h.opts.boxDaysClass).html(d), b.find("." + h.opts.boxDaysTextClass).html(this.formatText(d, "day"))), b.find("." + h.opts.boxHoursClass).html(e), b.find("." + h.opts.boxHoursTextClass).html(this.formatText(e, "hour")), b.find("." + h.opts.boxMinClass).html(f), b.find("." + h.opts.boxSecClass).html(g)
		}, a.prototype.formatText = function (a, b)
		{
			var c, d, e;
			return e = this, c = e.opts[b + "sText"], e.opts.rusNumbers ? a >= 5 && 20 > a ? c = e.opts[b + "sText"] : (d = 1 * ("" + a).replace(/^\d+(\d)$/, "$1"), c = 1 === d ? e.opts[b + "Text"] : d >= 2 && 4 >= d ? e.opts[b + "s2Text"] : e.opts[b + "sText"]) : c = 1 === a ? e.opts[b + "Text"] : e.opts[b + "sText"]
		}, a.prototype.fixTime = function (a)
		{
			return a = 10 > a ? "0" + a : a
		}, a
	}(), $.fn.extend(
	{
		kkcountdown: function (b)
		{
			return this.each(function ()
			{
				var c, d;
				return c = $(this), d = c.data("kkcountdown"), d || c.data("kkcountdown", d = new a(this, b)), "string" == typeof b ? d[b].apply(d, args) : void 0
			})
		}
	})
}).call(this);