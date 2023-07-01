let form = document.querySelector(".form__data")
let inputs = document.querySelectorAll(".form__data_input")
let btn_continue = document.querySelector(".finis_form_continue")
let inputs_array = []
inputs.forEach(clase => {
    let clases = clase.classList[1]
    console.log("clase", clases)
    inputs_array.push(clases)
})

form.addEventListener("submit", (e) => {
    e.preventDefault()
    document.querySelector(".form__data").classList.add("form__data-hidden")
    document.querySelector(".finis_form").classList.remove("finis_form-visibility")
})

btn_continue.addEventListener("click", () => {
    location.reload()
    // document.querySelector(".form__data").classList.remove("form__data-hidden")
    // document.querySelector(".finis_form").classList.add("finis_form-visibility")
})

inputs.forEach(input => {
    input.addEventListener("focus", e => {
        let input_focus = e.target;
        console.log(input_focus);

        inputs.forEach(otherInput => {
            if (otherInput !== input_focus) {
                checkInput(otherInput);
            }
        });

        if (input_focus.classList.contains("form__data_input-number")) {
            checkInput(input_focus);
            checkInputNumber(input_focus)
        }
        inputData(input_focus)
    });
});

function checkInput(input) {
    console.log("Entró a la función");
    let contenido_input = input.value.trim().split("");
    console.log(contenido_input);
    if (!input.value.trim()) {
        input.classList.add("outline-red");
    } else {
        if (contenido_input.some(item => isNaN(Number(item))) && !input.classList.contains("form__data_input-name")) {
            console.log("Hay una letra");
            input.classList.add("outline-red");
        } else {
            console.log("No hay letras");
            input.classList.remove("outline-red");
        }
    }
}

function checkInputNumber(input) {
    input.addEventListener("input", () => {
        let contenido_input = input.value.trim().split("");
        if (contenido_input.some(item => isNaN(Number(item)))) {
            document.querySelector(".form__data_title-mensaje").classList.add("mostrar_mensaje")
        } else {
            document.querySelector(".form__data_title-mensaje").classList.remove("mostrar_mensaje")
        }
    })
}

function inputData(input_data) {
    input_data.addEventListener("input", (i) => {
        let value_input = i.target
        console.log("inputdata", value_input)
        inputs_array.forEach(input_class => {
            if (value_input.classList[1] == input_class) {
                console.log("si entro a la condicion", value_input.classList[2])
                document.querySelector(`.${value_input.classList[2]}`).innerHTML = value_input.value
            } if (value_input.classList[2] == "mes") {
                document.querySelector(".card_vencimiento").innerHTML = `${localStorage.getItem("mes_card") || value_input.value || "00"}/${localStorage.getItem("anio_card") || "00"}`
                localStorage.setItem("mes_card", value_input.value)
            } if (value_input.classList[2] == "anio") {
                document.querySelector(".card_vencimiento").innerHTML = `${localStorage.getItem("mes_card") || "00"}/${localStorage.getItem("anio_card") || value_input.value || "00"}`
                localStorage.setItem("anio_card", value_input.value)
            }
        })

    })
}
