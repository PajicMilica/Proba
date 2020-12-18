$(document).ready(function () {

    // const $footer = $('#footer');
    const footer = document.getElementById('footer');

    function setNewDateInFooter () {

        const currentDate = new Date();

        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();

        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();

        const prettyDate = `Datum: ${day}.${month}.${year} - ${hours}:${minutes}:${seconds}`;

        footer.innerHTML = prettyDate;
    }
   
    setNewDateInFooter();

    setInterval(setNewDateInFooter, 1000);

    proveriDaLiJeKnjigaNarucena();
});

function dodajUkorpu(dugme, knjiga) {
    korpa = localStorage.getItem('korpaKljuc'); //ucitava sve knjige iz skladista pod tim kljucem
    if(!korpa) {    //ako je korpa prazna,tj skladiste, ubacice knjigu
        korpa = knjiga;
    } else {
        korpa += "*" + knjiga; //ako vec ima u skladistu dodace nov naziv knjige, ali ce ih razdvojiti *,
    }                          //jer se oni u skladistu prilepljuju jedan pored drugog

    localStorage.setItem('korpaKljuc', korpa); //kada zavrsi sa ubacivanjem knjige, onda ce postaviti novi korpu u skladiste
    dugme.disabled = true;  //omogucava da dugme 'dodaj u korpu' nestane, tj da ne moze opet da se klikne, kako bi korisnik video da je narucio tu knjigu
}

function proveriDaLiJeKnjigaNarucena() {
    sveKnjige = $('.knjiga'); //dohvatili smo sve div elemente

    korpa = localStorage.getItem('korpaKljuc'); //ucitava sve iz skladista
    if(korpa) {
        knjigeIzKorpe = korpa.split('*'); //pravi niz narucenih knjiga

        sveKnjige.each( function(indeks, knjiga){ //obavezni parametri, indeks i element neki

            nazivKnjigeParagraf = $(knjiga).find("[name=nazivKnjige]"); // dohvatili smo naziv knjige iz datog div elementa
            nazivKnijge = $(nazivKnjigeParagraf).html(); //ako je nasao vraca mu dati element
            if(knjigeIzKorpe.includes(nazivKnijge)) {
                //iskljuci dugme jer je korisnik vec narucio datu knjigu
                dodajUkorpuDugme = $(knjiga).find('[name=dodajUkorpuDugme]');
                $(dodajUkorpuDugme).attr('disabled',true);
            }
        });
    }
}

 
