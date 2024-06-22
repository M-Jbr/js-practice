

let btn = document.querySelector(".div-1");
let input = document.querySelector(".input");
let equal = document.querySelector(".equal");


btn.addEventListener("click", function (e) {
    let target = e.target;

    if (!target.matches("button")) {
        return false;
    }

    if (target.classList.contains('equal')) {
        try {
            if (input.value !== undefined && input.value !== '') {
                let result = eval(input.value);
                input.value = result;
            } else {
                return false
            }
        } catch (error) {
            alert("Error Input");
            input.value = '';
        }
    } else if (target.value === 'c') {
        input.value = ""
    } else {
        input.value += target.value;
    }

});



