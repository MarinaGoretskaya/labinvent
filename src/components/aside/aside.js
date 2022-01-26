$(function(){
    let progPlus = 0;
    let progMinus = 60;
    let progFill = 0;

    setInterval(function(){
        ++progPlus;
        --progMinus;
        progFill = progFill + 1.666666666666667;
        $(".progress .progress-fill").css("width", (progFill) + "%");

        if (progPlus == 60) {
            progPlus = 0;
            progFill = 0;
            progMinus = 60;
        }


        (progPlus.toString().length === 1) ? (progPlus = '0' + progPlus) : progPlus;
        (progMinus.toString().length === 1) ? (progMinus = '0' + progMinus) : progMinus;


        $(".progress .progress-text .txt-left").html("Run 00:" + progPlus + "/01:00");
        $(".progress .progress-text .txt-right").html("-00:" + progMinus);

    }, 1500);
});