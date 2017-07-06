window.onload = function() {
    //常用函数
    function getElem(elem) {
        return document.querySelector(elem);
    }

    function getElemAll(elem) {
        return document.querySelectorAll(elem);
    }
    //全选按钮
    var ttlChk = getElem('.ttlChk'),
        chk = getElemAll('.chk');
    ttlChk.onclick = function() {
            var ttlValue = ttlChk.getAttribute('checked');
            if (ttlValue == '') {
                ttlChk.removeAttribute('checked');
                for (var j = 0; j < chk.length; j++) {
                    //chk[j].removeAttribute('checked');
                    chk[j].checked = false;
                }
            } else {
                ttlChk.setAttribute('checked', '');
                for (var j = 0; j < chk.length; j++) {
                    //chk[j].setAttribute('checked','');
                    chk[j].checked = true;
                }
            }
            Cal();
        }
        //行按钮
    for (k = 0; k < chk.length; k++) {
        chk[k].onclick = function() {
            var t = 0;
            for (m = 0; m < chk.length; m++) {
                if (chk[m].checked == true) {
                    t++;
                }
            }
            if (t == chk.length) {
                ttlChk.setAttribute('checked', '');
                ttlChk.checked = true;
            } else {
                ttlChk.removeAttribute('checked');
                ttlChk.checked = false;
            }
            Cal();
        }
    }
    //加减按钮与总价
    var total = getElemAll('.total'),
        num = getElemAll('.num'),
        plus = getElemAll('.plus'),
        minus = getElemAll('.minus'),
        numValue,
        totleInner;

    function add(now) {
        numValue = num[now].value;
        numValue++;
        num[now].value = numValue;
        //num[now].setAttribute('value',numValue);
        totalInner = 396 * numValue;
        total[now].innerHTML = totalInner;
    }

    function subtract(now) {
        numValue = num[now].value;
        if (numValue <= 1) {
            num[now].setAttribute('value', numValue);
        } else {
            numValue--;
            num[now].value = numValue;
            //num[now].setAttribute('value',numValue);
            totalInner = 396 * numValue;
            total[now].innerHTML = totalInner;
        }
    }
    //键盘输入总价变化
    for (var i = 0; i < num.length; i++) {
        num[i].setAttribute('press', i);
        num[i].onblur = function() {
            numValue = this.value;
            var press = this.getAttribute('press')
            totalInner = 396 * numValue;
            total[press].innerHTML = totalInner;
            Cal();
        }
    }
    //加按钮
    for (var i = 0; i < plus.length; i++) {
        plus[i].setAttribute('now', i);
        plus[i].onclick = function() {
            var now = this.getAttribute('now');
            add(now);
            Cal();
        }
    }
    //减按钮
    for (var i = 0; i < minus.length; i++) {
        minus[i].setAttribute('now', i);
        minus[i].onclick = function() {
            var now = this.getAttribute('now');
            subtract(now);
            Cal();
        }
    }
    //应付金额部分
    var ttlCal = getElem('b');

    function Cal() {
        var sum = 0;
        for (n = 0; n < chk.length; n++) {
            chk[n].setAttribute('order', n);
            if (chk[n].checked) {
                var order = chk[n].getAttribute('order');
                console.log(order);
                var money = total[order].innerHTML;
                sum += +money;
            }
        }
        ttlCal.innerHTML = sum;
    }
    //页脚微信二维码
    var WX = getElem('.WX'),
        img = getElem('.img');
    WX.onmouseover = function() {
        WX.style.opacity = '1';
        img.style.display = 'block';
    };
    WX.onmouseout = function() {
        WX.style.opacity = '.5';
        img.style.display = 'none';
    };
}
