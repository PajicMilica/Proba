$(document).ready(function (){

    kartica = $('[name=brojKartice]'); //ucitava u karticu stavke sa tim imenom
    nacinPlacanja = 'gotovina';  //po difoltu je gotovina 
    $('#divPorucivanje').hide(); //sakrice formu jer je korpa prazna
    
    kartica.each(function(index,element){
        $(element).hide();                     //kada je nasao elemente sa tim imenom ona ce ih sakriti
    })

    ispisiNaruceneKnjige(); //funk koja ispisuje knjige koje su u korpi

    $('#formaPorucivanja').on('submit', function(e) { //provera validacije forme
        if(validacijaForme()) {
            alert("Uspesno ste narucili knjige");
            //israzni korpu jer je naruceno
            localStorage.removeItem('korpaKljuc');
        } else {
            //prekinuti submit forme jer validacija podataka nije prosla
            e.preventDefault();
        }
    })

    function validacijaForme() {
        ime = $('#firstName').val(); //proverava validaciju imena i prezimena
        prezime = $('#lastName').val();
            
        if(!ime || !prezime) { //ako je validacija netacna baca alert i izlazi iz funk
            jeValidnaForma = false;
            alert("Niste uneli ime ili prezime!");
            return false;
        }

        if(nacinPlacanja === 'kartica') {    //ako je ime i prezime tacno, proverava karticu ako je korisnik izabrao i ako je netacna baca alert
            brojKartice = $('#brojKariceInput').val();
            if(!brojKartice || isNaN(brojKartice)) {
                alert("Broj kartice ne sme sadrzati druge karaktere osim cifara!");
                return false;
            }
        }

        return true; //ako je sve uredu vraca true
    }
})

function sakrijGotovina(){ //ako korisnik klikne gotvina sakrice text areu za unos broja kartice
    nacinPlacanja = 'gotovina';
    kartica.each(function(index,element){
        $(element).hide();
    });
}
function prikaziKartica(){ //ako korisnik klikne karticu, prikazuje mu text areu za unos broja kartice
    nacinPlacanja = 'kartica';
    kartica.each(function(index,element){
        $(element).show();
    })
}

function ispisiNaruceneKnjige() {
    korpa = localStorage.getItem("korpaKljuc");  //prikuplja(ucitava) sve knjige koje su u skladistu koje su pod kljucem korpaKljuc
    if(korpa) {
        naruceneKnjge = korpa.split('*'); //posto se one u skladistu stavljaju kao jedan string,potrebno ih je funk split razdvojiti i staviti u niz

        listaKnjigaUl = document.getElementById('listaKnjiga'); //ucitavamo div sa tim idjem
        
        for(let knjiga of naruceneKnjge) { //jedan element niza ce biti jedan element liste, odnosno svaka knjiga iz korpe je jedan element
            let noviDiv = document.createElement('li'); //tako se kreira jedan elem liste
            noviDiv.innerHTML = knjiga;  //kada smo ga kreirali, pristupamo njegovom telu i stavljamo jedan elem niza, jednu knjigu
            listaKnjigaUl.appendChild(noviDiv); //dodaje dete divu
        }
        $('#divPorucivanje').show(); //sada otvaramo formu, posto je korisnik narucio knjige
    } else {
        let praznaKorpaParagraf = document.createElement('p'); //ako u skladistu nema nicega,
        praznaKorpaParagraf.innerHTML = "Vaša korpa je prazna.";  // odnosno korpa je prazna, kreiramo paragraf i ispisujemo korisniku da je korpa prazna
        document.getElementsByTagName('body')[0].appendChild(praznaKorpaParagraf);

    }
}



