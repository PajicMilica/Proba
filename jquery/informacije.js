$(document).ready(function () {

    const $form = $('#askQuestionForm');
    const $btnHideForm = $('#hideForm');
    const $btnShowForm = $('#showForm');

    $form.hide();

    $btnHideForm.click(function(){
        $form.hide();
    });

    $btnShowForm.click(function(){
        $form.show();
    });

});

$('#askQuestionForm').on('submit', function(e) { 
    if(proveraForme()) {
        alert("Hvala na postavljenom pitanju!");
    } else {
        //prekinuti submit forme jer validacija podataka nije prosla
        e.preventDefault();
    }
})

/*function proveraForme() {
    imePrezime = $('#ImePrezime').val(); 
    email=$('#email').val();
    textArea= $('#komentar').val();  
    
    if(!imePrezime) { 
        jeValidnaForma = false;
        alert("Niste uneli ime i prezime!");
        return false;
    }
    if(!email) { 
        jeValidnaForma = false;
        alert("Niste uneli email");
        return false;
    }

    if(!textArea) { 
        jeValidnaForma = false;
        alert("Niste postavili pitanje");
        return false;
    }

    return true; 
}*/
