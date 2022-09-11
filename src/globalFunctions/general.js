import { Dialog } from 'quasar'

//Creates a dialog notification. 
export function showDialog(showMessage) {
    Dialog.create({
        title: "Error",
        message: showMessage
    })
}

//Changes the font size of the entire application. Save in localStorage the change
export function changeFontSize(size) {
    var sizeActive = "M;"

    if (localStorage.getItem("fontSize") !== null) {
        sizeActive = localStorage.getItem("fontSize");
    } 

    var root = document.querySelector(":root");
    if (size === "M") {
        sizeActive = "M";
        //change the variable created in app.scss
        root.style.setProperty("--appFontScale", "100%");
        localStorage.setItem("fontSize", "M");
    }
    if (size === "L") {
        sizeActive = "L";
        //change the variable created in app.scss
        root.style.setProperty("--appFontScale", "112%");
        localStorage.setItem("fontSize", "L");
    }
    if (size === "XL") {
        sizeActive = "XL";
        //change the variable created in app.scss
        root.style.setProperty("--appFontScale", "125%");
        localStorage.setItem("fontSize", "XL");
    }

    return sizeActive;
}
