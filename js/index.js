const determinerDeclensions = {
    "strong": {
        "nom": ["er", "ie", "as", "ie"],
        "acc": ["en", "ie", "as", "ie"],
        "dat": ["em", "er", "em", "en"],
        "gen": ["es", "er", "es", "er"],
    },
    "mixed": {
        "nom": ["", "e", "", "e"],
        "acc": ["en", "e", "", "e"],
        "dat": ["em", "er", "em", "en"],
        "gen": ["es", "er", "es", "er"],
    },
}

const adjectiveDeclensions = {
    "strong": {
        "nom": ["e", "e", "e", "en"],
        "acc": ["en", "e", "e", "en"],
        "dat": ["en", "en", "en", "en"],
        "gen": ["en", "en", "en", "en"],
    },
    "mixed": {
        "nom": ["er", "e", "es", "en"],
        "acc": ["en", "e", "es", "en"],
        "dat": ["en", "en", "en", "en"],
        "gen": ["en", "en", "en", "en"],
    },
    "weak": {
        "nom": ["er", "e", "es", "e"],
        "acc": ["en", "e", "es", "e"],
        "dat": ["em", "er", "em", "en"],
        "gen": ["en", "er", "en", "er"],
    }
}

const suffixDeclensions = {
    "strong": {
        "nom": ["", "", "", ""],
        "acc": ["", "", "", ""],
        "dat": ["", "", "", "n"],
        "gen": ["es", "", "es", ""],
    },
    "mixed": {
        "nom": ["", "", "", ""],
        "acc": ["", "", "", ""],
        "dat": ["", "", "", "n"],
        "gen": ["es", "", "s", ""],
    },
    "weak": {
        "nom": ["", "", "", ""],
        "acc": ["", "", "", ""],
        "dat": ["", "", "", ""],
        "gen": ["s", "", "es", ""],
    }
}

function buildAllTables() {
    buildTable("strong", "d", "nett", ["Mann", "Frau", "Kind", "Kinder"])
    buildTable("mixed", "mein", "klein", ["Hund", "Katze", "Kaninchen", "Vögel"])
    buildTable("weak","", "kalt", ["Kaffee", "Milch", "Brot", "Brötchen"])
}

function buildTable(declensionType, determiner, adjective, nouns) {
    let html = `
    <table class="table">
            <thead>
            <tr>
                <th scope="col">${declensionType.toUpperCase()}</th>
                <th scope="col">Masc.</th>
                <th scope="col">Fem.</th>
                <th scope="col">Neut.</th>
                <th scope="col">Pl.</th>
            </tr>
            </thead>
            <tbody>`
        if(declensionType === "weak") {
            ["nominative", "accusative", "dative", "genitive"].forEach(grammarCase => {
                html += `
                <tr>
                    <th scope="row" class="table-row-title">${grammarCase}</th>
                `
                nouns.forEach(noun => {
                    html += `
                    <td>${adjective}<input class="${declensionType} adjective ${grammarCase.substring(0, 3)}">${noun}<input class="${declensionType} suffix ${grammarCase.substring(0, 3)}"></td>
                    `
                });
                html += "</tr>"
            });

        } else {
            ["nominative", "accusative", "dative", "genitive"].forEach(grammarCase => {
                html += `
                <tr>
                    <th scope="row" class="table-row-title">${grammarCase}</th>
                `
                nouns.forEach(noun => {
                    html += `
                    <td>${determiner}<input class="${declensionType} determiner ${grammarCase.substring(0, 3)}">${adjective}<input class="${declensionType} adjective ${grammarCase.substring(0, 3)}">${noun}<input class="${declensionType} suffix ${grammarCase.substring(0, 3)}"></td>
                    `
                });
                html += "</tr>"
            });
            }
    document.getElementById("tables").innerHTML += html;
}

function checkAllTables() {
    ["strong", "mixed", "weak"].forEach(declensionType => {
        checkTable(declensionType)
    })
}

function checkTable(declensionType) {
    ["nom", "acc", "dat", "gen"].forEach(grammarCase => {
        let determiners = null;
        if(declensionType !== "weak") {
            determiners = Array.from($(`.${declensionType}.${grammarCase}.determiner`));
        }
        let adjectives = Array.from($(`.${declensionType}.${grammarCase}.adjective`));
        let suffixes = Array.from($(`.${declensionType}.${grammarCase}.suffix`));
        for(let i = 0; i < adjectives.length; i++) {
            if(declensionType !== "weak") {
                console.log("input: " + determiners[i].value)
                console.log("answer: " + determinerDeclensions[declensionType][grammarCase][i])
                if(determiners[i].value === determinerDeclensions[declensionType][grammarCase][i]) {
                    $(determiners[i]).css({"background-color": "lightgreen", "border-color": "transparent"})
                } else {
                    $(determiners[i]).css({"background-color": "lightcoral", "border-color": "transparent"})
                }
            }
            if(adjectives[i].value === adjectiveDeclensions[declensionType][grammarCase][i]) {
                $(adjectives[i]).css({"background-color": "lightgreen", "border-color": "transparent"})
            } else {
                $(adjectives[i]).css({"background-color": "lightcoral", "border-color": "transparent"})
            }
            if(suffixes[i].value === suffixDeclensions[declensionType][grammarCase][i]) {
                $(suffixes[i]).css({"background-color": "lightgreen", "border-color": "transparent"})
            } else {
                $(suffixes[i]).css({"background-color": "lightcoral", "border-color": "transparent"})
            }
        }
    })


}