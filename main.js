function toMessageAboutWrongInput(){
    $(".msgBox")
        .css({"z-index": 1})
        .animate({opacity: 1}, 100);
}

function getInput(){
    return $("#display").html().replace("÷", "/").replace(/([^\d])0(\d)/, "$1$2");
}

$(document).ready(function(){
    // msgBox closing
    $(".msgBox .OKButton").click(()=>{
        $(".msgBox").animate({opacity: 0, "z-index": -1}, 100);
    });

    // Input
    for(let i = 0; i < 10; ++i){
        $(".button-" + i).click(()=>{
            let currentText = $("#display").html();
            if(currentText === "0"){
                $("#display").html(i);
                return;
            }
            $("#display")
                .html(currentText + i)
                .scrollLeft($("#display").prop("scrollWidth"));
        });
    }
    var nameToSign = {
        "bracketL" : "(",
        "bracketR" : ")",
        "times"    : "*",
        "division" : "÷",
        "minus"    : "-",
        "plus"     : "+",
        "point"    : "."
    }
    for(let i in nameToSign){
        $(".button-" + i).click(()=>{
            $("#display")
                .html($("#display").html() + nameToSign[i])
                .scrollLeft($("#display").prop("scrollWidth"));
        });
    }

    // Functional buttons
    $(".button-C").click(()=>{
        $("#display").html("0");
    });
    $(".button-equal").click(()=>{
        try {
            $("#display").html(eval(getInput()));
        } catch (err) {
            toMessageAboutWrongInput();
        }
    });

    // Memory
    var memoryCell = "";
    var memoryFunctions = {
        "MS"      : value => { memoryCell = value;  },
        "M_plus"  : value => { memoryCell += value; },
        "M_minus" : value => { memoryCell -= value; }
    }
    for(let i in memoryFunctions){
        $(".button-" + i).click(()=>{
            try {
                var input = eval(getInput());
            } catch (err) {
                toMessageAboutWrongInput();
                return;
            }
            memoryFunctions[i](input);
        });
    }
    $(".button-MR").click(()=>{
        $("#display")
            .html($("#display").html() + memoryCell)
            .scrollLeft($("#display").prop("scrollWidth"));
    });
});
