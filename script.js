
$(document).ready(function() {

    let angkaSekarang = "0";
    let angkaSebelumnya = "";
    let operator = null;
    let resetLayar = false;


    function tampilkanLayar() {
        $("#display").text(angkaSekarang);
    }


    $(".tombol").on("click", ".angka", function() {

        let angka = $(this).attr("data-number");

        if (angka !== undefined) {

            if (angkaSekarang === "0" || resetLayar) {
                angkaSekarang = angka;
                resetLayar = false;
            } else {
                angkaSekarang += angka;
            }

        }

        if ($(this).attr("data-action") === "decimal") {

            if (resetLayar) {
                angkaSekarang = "0";
                resetLayar = false;
            }

            if (!angkaSekarang.includes(".")) {
                angkaSekarang += ".";
            }
        }

        tampilkanLayar();

    });


    $(".operator").click(function() {

        if (operator !== null && !resetLayar) {
            hitung();
        }

        angkaSebelumnya = angkaSekarang;
        operator = $(this).attr("data-operator");

        $("#riwayat").text(
            angkaSebelumnya + " " + $(this).text()
        );

        resetLayar = true;

    });


    function hitung() {

        if (operator === null) {
            return;
        }

        let angka1 = Number(angkaSebelumnya);
        let angka2 = Number(angkaSekarang);
        let hasil;

        if (operator === "+") {
            hasil = angka1 + angka2;
        }
        else if (operator === "-") {
            hasil = angka1 - angka2;
        }
        else if (operator === "*") {
            hasil = angka1 * angka2;
        }
        else if (operator === "/") {

            if (angka2 === 0) {

                angkaSekarang = "Tidak bisa dibagi 0";

                tampilkanLayar();

                operator = null;
                angkaSebelumnya = "";
                resetLayar = true;

                return;
            }

            hasil = angka1 / angka2;
        }

        hasil = Number(hasil.toPrecision(10));

        let simbol = operator;

        if (simbol === "*") simbol = "×";
        if (simbol === "/") simbol = "÷";

        $("#riwayat").text(
            angkaSebelumnya + " " + simbol + " " +
            angka2 + " ="
        );

        angkaSekarang = String(hasil);
        operator = null;
        angkaSebelumnya = "";
        resetLayar = true;

        tampilkanLayar();

    }


    $("[data-action='calculate']").click(function() {
        hitung();
    });


    $("[data-action='clear']").click(function() {

        angkaSekarang = "0";
        angkaSebelumnya = "";
        operator = null;
        resetLayar = false;

        $("#riwayat").text("");

        tampilkanLayar();

    });


    $("[data-action='delete']").click(function() {

        if (resetLayar) {
            return;
        }

        if (angkaSekarang.length > 1) {
            angkaSekarang = angkaSekarang.slice(0, -1);
        } else {
            angkaSekarang = "0";
        }

        tampilkanLayar();

    });

});
