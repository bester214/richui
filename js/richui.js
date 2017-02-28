
function adapt(w){
    var winWidth = $(window).width();
    var font_size = (winWidth / w) * 20;
    $('html').css('font-size', font_size);
}

function openWindow1(msg){
    $("#richui-dialog1 .richui-dialog_content").html(msg);
    easyDialog.open({
        container : 'richui-dialog1'
    });
}

function openWindow2(msg){
    $("#richui-dialog2 .richui-dialog_content").html(msg);
    easyDialog.open({
        container : 'richui-dialog2'
    });
}

function openWindow3(msg){
    $("#richui-dialog3 .richui-dialog_content").html(msg);
    easyDialog.open({
        container : 'richui-dialog3'
    });
}

function openWindow4(msg){
    $("#richui-dialog4 .richui-dialog_content").html(msg);
    easyDialog.open({
        container : 'richui-dialog4'
    });
}

function closeWindow(){
    easyDialog.close();
};

function showToast(toastText){
    var $loadingToast2 = $('#loadingToast2');
    if ($loadingToast2.css('display') != 'none') return;
    $("#loadingToast2 .richui-toast__content").html(toastText);
    $loadingToast2.fadeIn(100);
    setTimeout(function () {
        $loadingToast2.fadeOut(100);
    }, 3000);   
};
function richPicker(data1,data2,data3){
    if(document.getElementById('picker1') !== null){
        var picker1El = document.getElementById('picker1');
        var picker1 = new Picker({
            data: [data1]
        });
        picker1.on('picker.select', function (selectedVal, selectedIndex) {
            picker1El.innerText = data1[selectedIndex[0]].text;
        });
        picker1.on('picker.valuechange', function (selectedVal, selectedIndex) {
            console.log(selectedVal);
        });
        picker1El.addEventListener('click', function () {
            picker1.show();
        });
    }
    if(document.getElementById('picker2') !== null){
        var picker2El = document.getElementById('picker2');
        var picker2 = new Picker({
            data: [data1,data2]
        });
        picker2.on('picker.select', function (selectedVal, selectedIndex) {
            picker2El.innerText = data1[selectedIndex[0]].text + ' ' + data2[selectedIndex[1]].text;
        });
        picker2.on('picker.valuechange', function (selectedVal, selectedIndex) {
            console.log(selectedVal);
        });
        picker2El.addEventListener('click', function () {
            picker2.show();
        });
    }
    if(document.getElementById('picker3') !== null){
        var picker3El = document.getElementById('picker3');
        var picker3 = new Picker({
            data: [data1,data2,data3]
        });
        picker3.on('picker.select', function (selectedVal, selectedIndex) {
            picker3El.innerText = data1[selectedIndex[0]].text + ' ' + data2[selectedIndex[1]].text + ' ' + data3[selectedIndex[2]].text;
        });
        picker3.on('picker.valuechange', function (selectedVal, selectedIndex) {
            console.log(selectedVal);
        });
        picker3El.addEventListener('click', function () {
            picker3.show();
        });
    }
}