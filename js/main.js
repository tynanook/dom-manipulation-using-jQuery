//////////////////////////////////////////////////
// WATS1020 Dom Manipulation
// Custom script goes here.
//////////////////////////////////////////////////

// toDo:
// make storages longterm  - local storage
// PASSWORD VALIDATION IN HTML
// GET SUBMIT TO WORK TO SHOW TOOLTIP ERROR
// GET HAMBURGER BUTTON TO FUNCTION PROPERLY WHEN MOBILE SIZE
    
// question:  inject class names rather than use .css styles?  (have hardcoded css and use the class?)

// ========================================================================
//  GLOBALs
// ========================================================================

    var voteCounts = {
        great: 0,
        greatest: 0,
        total: 0,
        greatPct: function() {
            return 100.0*this.great/this.total;
        },
        greatestPct: function() {
            return 100.0*this.greatest/this.total;
        },        
    };

    var details_text = [];


var forEach_ = function (array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]); // passes back stuff we need
  }
}

// ========================================================================
//  jQuery READY function
// ========================================================================

$(document).ready(function () {
  
    $(".details").toggle();  // ensures details show if JS not active         
    
    var userInfo = {
        firstName: 'Jane',
        lastName: 'Doe'
    };
    
    // ========================================================================
    //  USER LOGIN   - NOT currently used
    // ========================================================================
    var LoginError = $('#Login-btn22').on('click', function () {  
        
       // this function doesn't fully work, and is NOT USED in this revision
        // ... fields hide but then 'unhide' ... related to the submit button            
        
       if (false) {
           
           // debug code - can't get forms to stay hidden
            alert("got here");

            var email_input = document.getElementById("Login-btn");
            email_input.removeAttribute("type");        

            var email_input = document.getElementById("Email");
            email_input.removeAttribute("required");        
            email_input.setAttribute("type", "hidden");

            var email_input = document.getElementById("Password_1");
            email_input.removeAttribute("required");        
            email_input.setAttribute("type", "hidden");


            $("#login-form").css({ "display": "none" });
            $(".user-info").css({ "display": "block" });   
       }

         // this code should work and be all that is required... 
        //    --> using HTML to validate 
        if ((document.getElementById("Email").validity.valid===true) && (document.getElementById("Password_1").validity.valid===true)) {
            alert("login correct");
            
             $('#Login-btn').toggle();
             $('#login-form').toggle();
            // $('#Logout-btn').toggle();
            //  $('#user-info').toggle();

        }
    });
        
    // ========================================================================
    //  USER LOGIN   - IS currently used
    // ========================================================================
    
    var LoginError = $('#Login-btn').on('click', function () {           

        // remove error from earlier login try
        $(".error").hide();        
        var hasError = false;

        //ensure default colors (in case of prior login fails)
        $("#Email").css({ "background-color": "white" });
        $("#Email").css({ "color": "black" });
        $("#Password_1").css({ "background-color": "white" });
        $("#Password_1").css({ "color": "black" });  

        // vars for validating email address
        var emailReg = /.+@.+/;        
        var emailaddressVal = $("#Email").val();
        var passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/; 
        var passwordVal_1 = $("#Password_1").val();        
        var passwordVal_2 = $("#Password_2").val();
    
        // check if login format correct, if error - make red and prompt text above
        if (emailaddressVal == '') {            
            $("#Email").before('<span class="error">Please enter your email address!</span>');
            $("#Email").css({ "background-color": "firebrick" });
            $("#Email").css({ "color": "white" });
            hasError = true;        
        }        
        else if (!emailReg.test(emailaddressVal)) {            
            $("#Email").before('<span class="error">Please enter a valid email address!</span>');            
            $("#Email").css({ "background-color": "firebrick" });
            $("#Email").css({ "color": "white" });
            hasError = true;        
        }        
        else if (passwordVal_1 == '') {            
            $("#Email").before('<span class="error">Please enter a password!</span>');            
            $("#Password_1").css({ "background-color": "firebrick" });
            $("#Password_1").css({ "color": "white" });
            hasError = true;        
        }     
        else if (!passwordReg.test(passwordVal_1)) {              
            $("#Email").before('<span class="error">Please enter a <a href="#" id="tooltip2" data-tip-type="text" data-tip-source="tooltip info"><strong><u>valid</u></strong></a> password!</span>');            
            $("#Password_1").css({ "background-color": "firebrick" });
            $("#Password_1").css({ "color": "white" });
            hasError = true;        
        }    
        
        //  remove login fields and show user name
        else if (hasError == false) {
            $("#login-form").toggle();
            $(".user-info").toggle();           
            $('.user-fullname').html(userInfo.lastName + " " + userInfo.firstName);
            $("#logout-form").toggle();
        }
     
        if (hasError == true) {
            return false;
        }     
    });
    
    // remove user info and reset email & password
    var LoginError = $('#Logout-btn').on('click', function () {           
        $("#logout-form").toggle();
        $("#login-form").toggle();
        $(".user-info").toggle();
        document.getElementById("Email").value = "";
        document.getElementById("Password_1").value = "";
    });
    
    
    // ========================================================================
    //  VIEW DETAILs - Show or Hide
    // ========================================================================
    
    $('.view-details').on('click', function (event) {
        var tFactor = 1.0;
        if ($(this).html() === 'Hide details') {
            $(this).html(details_text[$('.view-details').index(this)]);
        }
        else {
            details_text[$('.view-details').index(this)] = $(this).html();
            $(this).html('Hide details');
            tFactor = 2.0;
        }
        $(this.parentElement.parentElement).find('.details').toggle(tFactor*400);   
    });

    
    // ========================================================================
    //  VOTING - calculate & update progress bar
    // ========================================================================
    
    $('.vote').on('click', function (event) {
        voteCounts.total++;
        if (this.dataset.vote == "great") {
            voteCounts.great++;
        }
        else {  // this.dataset.vote == "greatest"
            voteCounts.greatest++;
        }
        $('.great-progress').css({"width":voteCounts.greatPct()+"%"});
        $('.greatest-progress').css({"width":voteCounts.greatestPct()+"%"});
        $('#voting-completed').css('visibility','visible').hide(0).fadeIn(50).fadeOut(2000);
    });
});


