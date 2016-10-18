javascript: (function() {
    var hide_markdown_url = 1;
    var save_to_trello = 1;
    var no_qa = 1;
    var default_short = 1;
    var nico_short_domain = 'nico\.ms';
    var is_can_uselocalStorage = 0;
    try {
        is_can_uselocalStorage = 'localStorage' in window && window['localStorage'] !== null
    } catch (e) {
        is_can_uselocalStorage = false
    };
    var get_shortlink = '';
    var x = document.getElementsByTagName('link');
    var i = x.length;
    while (i--) {
        if (x[i].rel == 'shortlink') {
            get_shortlink = x[i].href
        }
    }
    if (location.href.indexOf('\/\/www\.youtube\.com\/watch\?') != -1) {
            get_shortlink = location.href.replace(/.*youtube\.com\/watch\?v=(.*)\&(.*)/,'https://youtu.be/$1?$2');
    }    
    if (location.href.indexOf('\/\/www\.pixiv\.net\/member\.php\?id\=') != -1) {
        x = document.getElementsByTagName('input');
        i = x.length;
        while (i--) {
            if (/http\:\/\/pixiv\.me\/.*/.test(x[i].value)) {
                get_shortlink = (get_shortlink == '') ? x[i].value : get_shortlink;
                break
            }
        }
    }
    if (location.href.indexOf('\/\/www\.pixiv\.net\/member\_illust\.php\?') != -1) {
        x = document.getElementsByTagName('link');
        i = x.length;
        var page_lang = (document.getElementsByTagName('html')[0].lang.length > 0) ? document.getElementsByTagName('html')[0].lang : '';
        while (i--) {
            if (x[i].hreflang == 'en') {
                get_shortlink = (get_shortlink == '') ? x[i].href.replace(/www(\.pixiv\.com)/, page_lang + '$1') : get_shortlink;
                break
            }
        }
    }
    if (location.href.indexOf('\/\/dic\.nicovideo\.jp') != -1) {
        x = document.getElementsByTagName('a');
        i = x.length;
        while (i--) {
            if (/.*\/id\/(\d+)/.test(x[i].href)) {
                get_shortlink = (get_shortlink == '') ? x[i].href.replace(/.*\/id\/(\d+)/, 'http://nico.ms/dic/$1') : get_shortlink;
                break
            }
        }
    }
    if ((is_can_uselocalStorage) && (!no_qa)) {
        var short_yes = (typeof localStorage['short_yes'] === 'undefined') ? default_short : ((localStorage['short_yes'] == 'true') ? 1 : 0);
        var rem_text = null;
        if (!(typeof window.localStorage === 'undefined')) {
            if (localStorage['rember_set_'] != 'true') {
                if (get_shortlink == '') {
                    if ((location.href.indexOf('\/\/www.nicovideo.jp') != -1) || (location.href.indexOf('\/\/dic.nicovideo.jp\/id') != -1) || (location.href.indexOf('\/\/news.nicovideo.jp\/watch') != -1) || (location.href.indexOf('\/\/commons.nicovideo.jp\/material') != -1) || (location.href.indexOf('\/\/jk.nicovideo.jp\/watch') != -1) || (location.href.indexOf('\/\/app.nicovideo.jp\/app') != -1) || (location.href.indexOf('\/\/ichiba.nicovideo.jp\/item') != -1) || (location.href.indexOf('\/\/chokuhan.nicovideo.jp\/products\/detail\/') != -1) || (/ch\.nicovideo\.jp\/.*\/blomaga\/ar.*/.test(location.href)) || (location.href.indexOf('\/\/com.nicovideo.jp') != -1) || (location.href.indexOf('\/\/live.nicovideo.jp') != -1) || (location.href.indexOf('\/\/seiga.nicovideo.jp') != -1) || (location.href.indexOf('\/\/nico.ms') != -1)) {
                        short_yes = confirm('請問ニコニコ動画相關網址要縮成短網址嗎？');
                        localStorage['rember_set_'] = confirm('請問下次可以不要詢問「是否縮短網址」的問題，\n直接沿用剛剛的回答？');
                        if (localStorage['rember_set_'] == 'true') {
                            localStorage['short_yes'] = short_yes
                        }
                    }
                    if ((location.href.indexOf('\/\/www.facebook.com') != -1) || (location.href.indexOf('\/\/fb.com') != -1)) {
                        short_yes = confirm('請問 www.facebook.com 相關網址要縮成短網址嗎？');
                        localStorage['rember_set_'] = confirm('請問下次可以不要詢問「是否縮短網址」的問題，\n直接沿用剛剛的回答？');
                        if (localStorage['rember_set_'] == 'true') {
                            localStorage['short_yes'] = short_yes
                        }
                    }
                    if (location.href.indexOf('\/\/www\.pixiv\.net\/member\.php\?id\=') != -1) {
                        short_yes = confirm('請問 pixiv.net 使用者網址要縮成短網址嗎？');
                        localStorage['rember_set_'] = confirm('請問下次可以不要詢問「是否縮短網址」的問題，\n直接沿用剛剛的回答？');
                        if (localStorage['rember_set_'] == 'true') {
                            localStorage['short_yes'] = short_yes
                        }
                    }
                    if ((location.href.indexOf('\/\/bangumi.tv') != -1)) {
                        short_yes = confirm('請問 bangumi.tv 相關網址要縮成短網址嗎？');
                        localStorage['rember_set_'] = confirm('請問下次可以不要詢問「是否縮短網址」的問題，\n直接沿用剛剛的回答？');
                        if (localStorage['rember_set_'] == 'true') {
                            localStorage['short_yes'] = short_yes
                        }
                    }
                    if ((location.href.indexOf('\/\/www.bilibili.com') != -1)) {
                        short_yes = confirm('請問 嗶哩嗶哩 相關網址要縮成短網址嗎？');
                        localStorage['rember_set_'] = confirm('請問下次可以不要詢問「是否縮短網址」的問題，\n直接沿用剛剛的回答？');
                        if (localStorage['rember_set_'] == 'true') {
                            localStorage['short_yes'] = short_yes
                        }
                    }
                    if ((location.href.indexOf('\/\/trello.com\/b') != -1) || (location.href.indexOf('\/\/trello.com\/c') != -1)) {
                        short_yes = confirm('請問 Trello 相關網址要縮成短網址嗎？');
                        localStorage['rember_set_'] = confirm('請問下次可以不要詢問「是否縮短網址」的問題，\n直接沿用剛剛的回答？');
                        if (localStorage['rember_set_'] == 'true') {
                            localStorage['short_yes'] = short_yes
                        }
                    }
                } else {
                    short_yes = confirm('請問要直接使用這個網站本身提供的短網址嗎？');
                    localStorage['rember_set_'] = confirm('請問下次可以不要詢問「是否縮短網址」的問題，\n直接沿用剛剛的回答？');
                    if (localStorage['rember_set_'] == 'true') {
                        localStorage['short_yes'] = short_yes
                    }
                }
            }
            var need_rem = (!(typeof localStorage['always_no_rem'] === 'undefined')) ? ((localStorage['always_no_rem'] == 'true') ? false : true) : confirm('請問需要加入註解嗎？');
            if (need_rem) {
                var rem_text = window.prompt('【為 Markdown 連結標示註解提示文字】\n\n這是稍後要組合出 Markdown 連結時，要用的註解文字。\n效果是滑鼠停留在連結上時，會出現這段說明文字。\n已有預設值你可自行修改，也可取消就不會使用註解。', document.title.replace(/( - ニコニコ動画:GINZA| ‐ ニコニコ動画:GINZA| ‐ niconico動畫:GINZA| - Niconico Douga: Ginza)/, ''));
                if ((rem_text == null) || (rem_text == '')) {
                    if (confirm('請問以後執行時，可以都不加入註解嗎？')) {
                        localStorage['always_no_rem'] = 'true'
                    }
                }
            }
            if ((typeof localStorage['always_no_rem'] === 'undefined')) {
                if (confirm('下次可以直接沿用剛才「是否加入註解」的決定嗎？')) {
                    localStorage['always_no_rem'] = !need_rem
                }
            }
        }
    } else {
        var short_yes = default_short;
        var rem_text = null
    };


    // 拆開 Markdown 讓他 Title 歸 Title、URL 歸 URL

	var markdown_url = ((short_yes == 1) ? ((get_shortlink == '') ? location.href.replace(/https?\:\/\/www\.nicovideo\.jp\/watch\//, 'http\:\/\/' + nico_short_domain + '\/').replace(/https?\:\/\/seiga\.nicovideo\.jp\/(seiga|watch)\//, 'http\:\/\/' + nico_short_domain + '\/').replace(/https?\:\/\/live\.nicovideo\.jp\/watch\//, 'http\:\/\/' + nico_short_domain + '\/').replace(/https?\:\/\/com\.nicovideo\.jp\/community\//, 'http\:\/\/' + nico_short_domain + '\/').replace(/https?\:\/\/ch\.nicovideo\.jp\/.*\/blomaga\/(ar.*)/, 'http\:\/\/' + nico_short_domain + '\/$1').replace(/https?\:\/\/chokuhan\.nicovideo\.jp\/products\/detail\/(\d*)/, 'http\:\/\/' + nico_short_domain + '\/nd$1').replace(/https?\:\/\/ichiba\.nicovideo\.jp\/item\/(az.*)/, 'http\:\/\/' + nico_short_domain + '\/$1').replace(/https?\:\/\/ichiba\.nicovideo\.jp\/item\/(ysamiami.*)/, 'http\:\/\/' + nico_short_domain + '\/$1').replace(/https?\:\/\/ichiba\.nicovideo\.jp\/item\/(ggbo.*)/, 'http\:\/\/' + nico_short_domain + '\/$1').replace(/https?\:\/\/ichiba\.nicovideo\.jp\/item\/(ndsupplier.*)/, 'http\:\/\/' + nico_short_domain + '\/$1').replace(/https?\:\/\/ichiba\.nicovideo\.jp\/item\/(dw.*)/, 'http\:\/\/' + nico_short_domain + '\/$1').replace(/https?\:\/\/ichiba\.nicovideo\.jp\/item\/(it.*)/, 'http\:\/\/' + nico_short_domain + '\/$1').replace(/https?\:\/\/app\.nicovideo\.jp\/app\/(ap.*)/, 'http\:\/\/' + nico_short_domain + '\/$1').replace(/https?\:\/\/jk\.nicovideo\.jp\/watch\/(jk.*)/, 'http\:\/\/' + nico_short_domain + '\/$1').replace(/https?\:\/\/commons\.nicovideo\.jp\/material\/(nc.*)/, 'http\:\/\/' + nico_short_domain + '\/$1').replace(/https?\:\/\/news\.nicovideo\.jp\/watch\/(nw.*)/, 'http\:\/\/' + nico_short_domain + '\/$1').replace(/https?\:\/\/www\.nicovideo\.jp\/(user\/\d*)/, 'http\:\/\/' + nico_short_domain + '\/$1').replace(/https?\:\/\/www\.nicovideo\.jp\/(mylist\/\d*)/, 'http\:\/\/' + nico_short_domain + '\/$1').replace(/https?\:\/\/www\.nicovideo/, 'http\:\/\/nicovideo').replace(/https?\:\/\/www\.facebook\.com/, 'http\:\/\/fb\.com').replace(/https?\:\/\/www\.pixiv\.net\/member\.php\?id\=/, 'http\:\/\/p\.tl\/m\/').replace(/https?\:\/\/www\.pixiv/, 'http\:\/\/pixiv').replace('http\:\/\/bangumi\.tv', 'http\:\/\/bgm\.tv').replace(/https?\:\/\/www\.bilibili\.com/, 'http\:\/\/acg\.tv').replace(/(https?:\/\/trello\.com\/(c|b)\/.*)\/.*/, '$1').replace(/(https?)\:\/\/www\.plurk/, '$1\:\/\/plurk').replace(/(https?)\:\/\/www\.playpcesor/, '$1\:\/\/playpcesor').replace(/:\/\/.*\.(googledrive\.com.{0,})/, ':\/\/$1') : get_shortlink) : location.href.replace(/(https?)\:\/\/www\.plurk/, '$1\:\/\/plurk').replace(/https?\:\/\/www\.facebook/, 'http\:\/\/facebook').replace(/https?\:\/\/www\.pixiv/, 'http\:\/\/pixiv').replace(/https?\:\/\/www\.nicovideo/, 'http\:\/\/nicovideo').replace(/https?\:\/\/www\.bilibili/, 'http\:\/\/bilibili').replace(/(https?)\:\/\/www\.playpcesor/, '$1\:\/\/playpcesor').replace(/:\/\/.*\.(googledrive\.com.{0,})/, ':\/\/$1')) + (((rem_text == null) || (rem_text == '')) ? '' : ' \"' + rem_text + '\"');
	var markdown_title = document.title.replace(/( - ニコニコ動画:GINZA| ‐ ニコニコ動画:GINZA| ‐ niconico動畫:GINZA| - Niconico Douga: Ginza)/, '').replace(/( - 哔哩哔哩 - \( ゜- ゜\)つロ 乾杯~ - bilibili| - 嗶哩嗶哩 - \( ゜- ゜\)つロ 乾杯~ - bilibili)/, '').replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\./g, '\\.').replace(/http\:/g, 'http\\:').replace(/https\:/g, 'https\\:').replace(/\_/g, '\\_').replace(/\#/g, '\\#').replace(/\*/g, '\\*');

    if(hide_markdown_url==0){	
    	//分離版
    	var markdown_link = window.prompt('這是目前網頁的標題 + 網址。\n並以 Markdown 的語法寫成連結。' + ((location.href.indexOf('\/\/www.nicovideo.jp') != -1) || (location.href.indexOf('\/\/nico.ms') != -1) ? '\n\n另外標題已自動排除部分字樣：\n「 - ニコニコ動画:GINZA」' : ''), '[' + markdown_title + '](' + markdown_url + ')');
    	//原版
        // var markdown_link = window.prompt('這是目前網頁的標題 + 網址。\n並以 Markdown 的語法寫成連結。' + ((location.href.indexOf('\/\/www.nicovideo.jp') != -1) || (location.href.indexOf('\/\/nico.ms') != -1) ? '\n\n另外標題已自動排除部分字樣：\n「 - ニコニコ動画:GINZA」' : ''), '[' + document.title.replace(/( - ニコニコ動画:GINZA| ‐ ニコニコ動画:GINZA| ‐ niconico動畫:GINZA| - Niconico Douga: Ginza)/, '').replace(/( - 哔哩哔哩 - \( ゜- ゜\)つロ 乾杯~ - bilibili| - 嗶哩嗶哩 - \( ゜- ゜\)つロ 乾杯~ - bilibili)/, '').replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\./g, '\\.').replace(/http\:/g, 'http\\:').replace(/https\:/g, 'https\\:').replace(/\_/g, '\\_').replace(/\#/g, '\\#').replace(/\*/g, '\\*') + '](' + ((short_yes == 1) ? ((get_shortlink == '') ? location.href.replace(/https?\:\/\/www\.nicovideo\.jp\/watch\//, 'http\:\/\/' + nico_short_domain + '\/').replace(/https?\:\/\/seiga\.nicovideo\.jp\/(seiga|watch)\//, 'http\:\/\/' + nico_short_domain + '\/').replace(/https?\:\/\/live\.nicovideo\.jp\/watch\//, 'http\:\/\/' + nico_short_domain + '\/').replace(/https?\:\/\/com\.nicovideo\.jp\/community\//, 'http\:\/\/' + nico_short_domain + '\/').replace(/https?\:\/\/ch\.nicovideo\.jp\/.*\/blomaga\/(ar.*)/, 'http\:\/\/' + nico_short_domain + '\/$1').replace(/https?\:\/\/chokuhan\.nicovideo\.jp\/products\/detail\/(\d*)/, 'http\:\/\/' + nico_short_domain + '\/nd$1').replace(/https?\:\/\/ichiba\.nicovideo\.jp\/item\/(az.*)/, 'http\:\/\/' + nico_short_domain + '\/$1').replace(/https?\:\/\/ichiba\.nicovideo\.jp\/item\/(ysamiami.*)/, 'http\:\/\/' + nico_short_domain + '\/$1').replace(/https?\:\/\/ichiba\.nicovideo\.jp\/item\/(ggbo.*)/, 'http\:\/\/' + nico_short_domain + '\/$1').replace(/https?\:\/\/ichiba\.nicovideo\.jp\/item\/(ndsupplier.*)/, 'http\:\/\/' + nico_short_domain + '\/$1').replace(/https?\:\/\/ichiba\.nicovideo\.jp\/item\/(dw.*)/, 'http\:\/\/' + nico_short_domain + '\/$1').replace(/https?\:\/\/ichiba\.nicovideo\.jp\/item\/(it.*)/, 'http\:\/\/' + nico_short_domain + '\/$1').replace(/https?\:\/\/app\.nicovideo\.jp\/app\/(ap.*)/, 'http\:\/\/' + nico_short_domain + '\/$1').replace(/https?\:\/\/jk\.nicovideo\.jp\/watch\/(jk.*)/, 'http\:\/\/' + nico_short_domain + '\/$1').replace(/https?\:\/\/commons\.nicovideo\.jp\/material\/(nc.*)/, 'http\:\/\/' + nico_short_domain + '\/$1').replace(/https?\:\/\/news\.nicovideo\.jp\/watch\/(nw.*)/, 'http\:\/\/' + nico_short_domain + '\/$1').replace(/https?\:\/\/www\.nicovideo\.jp\/(user\/\d*)/, 'http\:\/\/' + nico_short_domain + '\/$1').replace(/https?\:\/\/www\.nicovideo\.jp\/(mylist\/\d*)/, 'http\:\/\/' + nico_short_domain + '\/$1').replace(/https?\:\/\/www\.nicovideo/, 'http\:\/\/nicovideo').replace(/https?\:\/\/www\.facebook\.com/, 'http\:\/\/fb\.com').replace(/https?\:\/\/www\.pixiv\.net\/member\.php\?id\=/, 'http\:\/\/p\.tl\/m\/').replace(/https?\:\/\/www\.pixiv/, 'http\:\/\/pixiv').replace('http\:\/\/bangumi\.tv', 'http\:\/\/bgm\.tv').replace(/https?\:\/\/www\.bilibili\.com/, 'http\:\/\/acg\.tv').replace(/(https?:\/\/trello\.com\/(c|b)\/.*)\/.*/, '$1').replace(/(https?)\:\/\/www\.plurk/, '$1\:\/\/plurk').replace(/(https?)\:\/\/www\.playpcesor/, '$1\:\/\/playpcesor').replace(/:\/\/.*\.(googledrive\.com.{0,})/, ':\/\/$1') : get_shortlink) : location.href.replace(/(https?)\:\/\/www\.plurk/, '$1\:\/\/plurk').replace(/https?\:\/\/www\.facebook/, 'http\:\/\/facebook').replace(/https?\:\/\/www\.pixiv/, 'http\:\/\/pixiv').replace(/https?\:\/\/www\.nicovideo/, 'http\:\/\/nicovideo').replace(/https?\:\/\/www\.bilibili/, 'http\:\/\/bilibili').replace(/(https?)\:\/\/www\.playpcesor/, '$1\:\/\/playpcesor').replace(/:\/\/.*\.(googledrive\.com.{0,})/, ':\/\/$1')) + (((rem_text == null) || (rem_text == '')) ? '' : ' \"' + rem_text + '\"') + ')');
        if(markdown_link==null) save_to_trello = 0;
    }


    if (navigator.userAgent.match('MSIE') != null) {
        if (!((markdown_link == null) || (markdown_link == ''))) {
            window.clipboardData.setData('Text', markdown_link)
        }
    }
    console.log(markdown_link);


    //if(markdown_link!=null){
	//if(1){
    if(save_to_trello==1){

		var url = window.location.href, name = document.title, desc = getSelection ? getSelection().toString() : '';

		function trello_savecard(url, name, desc) {
		    var win = window;
            var desc_format = encodeURIComponent('- ['+markdown_title+']('+markdown_url+')') +  (desc ? encodeURIComponent('\n\n----\n\n ```\n' + desc + '\n```') : '');
		    //win.open('https://trello.com/add-card' + '?source=' + win.location.host + '&mode=popup' + '&url=' + encodeURIComponent(url) + (name ? '&name=' + encodeURIComponent(name) : '') + (desc ? '&desc=' + encodeURIComponent(desc) : ''), 'add-trello-card', 'width=500,height=600,left=' + (win.screenX + (win.outerWidth - 500) / 2) + ',top=' + (win.screenY + (win.outerHeight - 740) / 2))
		    win.open('https://trello.com/add-card' + '?source=' + win.location.host + '&mode=popup' + '&url=' + encodeURIComponent(url) + (name ? '&name=' + encodeURIComponent(name) : '') + '&desc=' + desc_format, 'add-trello-card', 'width=500,height=600,left=' + (win.screenX + (win.outerWidth - 500) / 2) + ',top=' + (win.screenY + (win.outerHeight - 740) / 2))
		}

	    if (location.href.indexOf('\/\/www\.youtube\.com\/watch\?') != -1) {
	    	markdown_url = location.href;
	    }
		trello_savecard(markdown_url, markdown_title, desc);
    }

})();
