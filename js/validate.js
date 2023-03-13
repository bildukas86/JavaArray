//////////////////////////////////
///email validation and storing to tempEmail
////////////////////////////////
function printError(elemId, hintMsg) {
    document.getElementById(elemId).innerHTML = hintMsg;
};
//


function validateEmail(){


        if (emailInput.value === "") {
          printError("emailErr", "* Email can't be empty.");
          emailInput.classList = "error";
        }else {
        var emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (emailRegEx.test(emailInput.value) === false ) {
          printError("emailErr", "* Please enter a valid email address.");
          emailInput.classList = "error";
        }else {
          printError("emailErr", "");
          emailInput.classList = "valid";
          checkIfEmailExists();
          phoneErr = false;
        }
        }


}
