jQuery.noConflict();
jQuery(document).ready(function ($) {
    setTimeout(() => {
        $("#canvas").removeClass("display")
    }, 800);
    var player = []
    $("input").each(function (index, obj) {
        obj.addEventListener('keypress', function (e) {
            if (e.key == "Enter") {
                e.preventDefault();
                if (obj.parentElement.nextElementSibling.querySelector("input")) {
                    obj.parentElement.nextElementSibling.querySelector("input").focus()
                    player.push(obj.value);
                }
                else {
                    player.push(obj.value);
                    $("#exampleInputName1").val("")
                    $("#exampleInputName2").val("")
                    setTimeout(() => {
                        $("#canvas").addClass("display")
                    }, 600);
                }
            }
        })
    })
    var shape, type;
    var turn = 1, status = "run";
    $(".newgame").each((_,obj)=>{
        obj.addEventListener('click',function(){
            location.reload(true);
        })
    })
    $(".exit").each((_,obj)=>{
        obj.addEventListener('click',function(){
            window.top.close();
        })
    })
    $(".restart").each((_,obj)=>{
        obj.addEventListener('click',function(){
            if(status=="win"){
                console.log(1);
                $("#canvas2").addClass("display");
            }
            else if(status=="draw"){
                console.log(2);
                $("#canvas3").addClass("display");
            }

            $(".boxstyle").html("");
            $(".boxstyle").removeClass("highlight");
            turn=1;
            status="run";
        });
    })
    function highlight(boxes) {
        let counter = 0;
        let stop = setInterval(() => {
            if (counter == boxes.length - 1) {
                clearInterval(stop);
            }
            boxes[counter].classList.add("highlight");
            counter++;
        }, 300);
        throw ("done");
    }
    function highlightd(boxes) {
        let counter = 0;
        let stop = setInterval(() => {
            if (counter == boxes.length - 1) {
                clearInterval(stop);
            }
            boxes[counter].addClass("highlight");
            counter++;
        }, 300);
        throw ("done");
    }
    function column_check(e, shape) {
        boxes = [];
        count = 0
        let child_index = Array.prototype.indexOf.call(Array.from(e.currentTarget.parentNode.children), e.currentTarget)
        $(".d-flex").each(function (_, box_container) {
            var box = Array.from(box_container.children)[child_index];
            boxes.push(box);
            if (box.childElementCount == 0) {
                return "no"
            }
            else {
                if (box.firstElementChild.classList[1] == shape) {
                    count++
                    if (count == 3) {
                        highlight(boxes);
                    }
                }
            }
        })
    }
    function row_check(e, shape) {
        element = Array.from(e.currentTarget.parentElement.children)
        count = 0
        for (sub_parent of element) {
            if (sub_parent.childElementCount == 0) {
                return ("no");
            }
            else {
                if (sub_parent.firstElementChild.classList[1] == shape) {
                    count++
                    if (count == 3) {
                        highlight(element);
                    }
                }
            }
        };
    }
    function check_shap_space(e) {
        if (e.currentTarget.childElementCount == 0) {
            var new_elem = document.createElement("i");
            if (turn % 2 == 0) {
                shape = "fa-circle"
                type = "fa-regular"
            }
            else {
                shape = "fa-x"
                type = "fa-solid"
            }
            new_elem.classList.add(type, shape);
            e.currentTarget.appendChild(new_elem);
        }
    }
    function diognal_check(e, shape) {
        let diog_l = [$("#block1"), $("#block5"), $("#block9")];
        let diog_r = [$("#block3"), $("#block5"), $("#block7")];
        if (e.currentTarget.getAttribute("id") == "block1" || e.currentTarget.getAttribute("id") == "block9") {
            if ($("#block1 i").hasClass(shape) && $("#block5 i").hasClass(shape) && $("#block9 i").hasClass(shape)) {
                highlightd(diog_l);
            }
        }
        else if (e.currentTarget.getAttribute("id") == "block3" || e.currentTarget.getAttribute("id") == "block7") {
            if ($("#block3 i").hasClass(shape) && $("#block5 i").hasClass(shape) && $("#block7 i").hasClass(shape)) {
                highlightd(diog_r);
            }
        }
        else if (e.currentTarget.getAttribute("id") == "block5") {
            if ($("#block1 i").hasClass(shape) && $("#block5 i").hasClass(shape) && $("#block9 i").hasClass(shape)) {
                highlightd(diog_l);
            }
            if ($("#block3 i").hasClass(shape) && $("#block5 i").hasClass(shape) && $("#block7 i").hasClass(shape)) {
                highlightd(diog_r);
            }
        }
    }
    $(".boxstyle").each((index, elem) => {
        elem.addEventListener('click', function driver(e) {
            box_num = index + 1
            if (status != "win" && status!="draw") {
                check_shap_space(e)
                if (turn > 4) {
                    try {
                        row_check(e, shape)
                        column_check(e, shape)
                        if (box_num % 2 != 0) {
                            diognal_check(e, shape)
                        }
                    }
                    catch (err) {
                        status = "win";
                        setTimeout(() => {
                            if(turn%2!=0){
                                console.log($("#canvas2 h3:nth-child(2)").text(`${player[1]}`));
                            }
                            else{
                                console.log("even");
                                console.log($("#canvas2 h3:nth-child(2)").text(`${player[0]}`));
                            }
                            $("#canvas2").removeClass("display");
                        }, 1500);
                    }
                }
                if(turn==9){
                    status="draw";
                    setTimeout(() => {
                        $("#canvas3").removeClass("display");
                    }, 100);
                }
                turn++
            }
        })
    })
})