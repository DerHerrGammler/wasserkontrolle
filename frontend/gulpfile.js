"use strict";
var gulp = require("gulp");
var fs = require("fs");
var path = require("path");
var realFavicon = require("gulp-real-favicon");

// Functions
function fLoadFiles(sPath) {
    var i = 0;
    var aFilesRtn = [];
    var aFiles = fs.readdirSync(sPath);
    while (i < aFiles.length) {
        if (fs.lstatSync(path.join(sPath, aFiles[i])).isDirectory()) {
            aFilesRtn = aFilesRtn.concat(fLoadFiles(path.join(sPath, aFiles[i])));
        } else {
            aFilesRtn.push(path.join(sPath, aFiles[i]));
        }
        i += 1;
    }
    return aFilesRtn;
}

function isObject(item) {
    return (item && typeof item === "object" && !Array.isArray(item));
}

function deepMerge(obj1, obj2) {
    var obj3 = {};
    Object.keys(obj1).forEach((key) => {
        if (isObject(obj1[key])) {
            obj3[key] = deepMerge({}, obj1[key]);
        } else {
            obj3[key] = obj1[key];
        }
    });
    Object.keys(obj2).forEach((key) => {
        if (obj3[key]) {
            if (isObject(obj2[key])) {
                if (isObject(obj3[key])) {
                    obj3[key] = deepMerge(obj3[key], obj2[key]);
                } else {
                    obj3[key] = deepMerge({}, obj2[key]);
                }
            } else {
                obj3[key] = obj2[key];
            }
        } else {
            if (isObject(obj2[key])) {
                obj3[key] = deepMerge({}, obj2[key]);
            } else {
                obj3[key] = obj2[key];
            }
        }
    });
    return obj3;
}

function clearObj(obj) {
    Object.keys(obj).forEach((key) => {
        if (isObject(obj[key])) {
            obj[key] = clearObj(obj[key]);
        } else {
            obj[key] = "";
        }
    });
    return obj;
}

// Tasks
gulp.task("i18n-app", function (done) {
    var oDefaultLocales = require("./src/assets/i18n/_app_default.json");
    var oLocales = {};
    // Lesen aller Datein
    var aFiles = fLoadFiles("src/app");
    var i = 0;
    while (i < aFiles.length) {
        // Durchgehen aller Datein nach der "i18n" Pipe
        var aFile = fs.readFileSync(aFiles[i]).toString().match(/{{(.*)\| i18n(.*)}}/g);
        if (aFile !== null) {
            var n = 0;
            while (n < aFile.length) {
                aFile[n] = aFile[n].replace(/\|/g, "\n");
                aFile[n] = aFile[n].replace(/:/g, "\n");
                var aItem = aFile[n].match(/("|')(.*)("|')/g);

                var x = 0;
                if (aItem) {
                    while (x < aItem.length) {
                        aItem[x] = aItem[x].replace(/("|')/g, "");
                        x += 1;
                    }
                    if (!oLocales[aItem[1]]) {
                        oLocales[aItem[1]] = {};
                    }
                    oLocales[aItem[1]][aItem[0]] = "";
                }
                n += 1
            }
        }
        i += 1;
    }
    // Datei schreiben
    fs.writeFile("src/assets/i18n/_app_default.json", JSON.stringify(deepMerge(oLocales, oDefaultLocales), null, 4), function () {
        done();
    });
});

gulp.task("i18n-locales", function (done) {
    // Datei Pfade
    var aFiles = [
        "./src/assets/i18n/_api_default.json"
    ];
    // Locales
    var aLocales = [{
        "iso": "aa",
        "name": "Afar"
    }, {
        "iso": "ae",
        "name": "Avestan"
    }, {
        "iso": "af",
        "name": "Afrikaans"
    }, {
        "iso": "ak",
        "name": "Akan"
    }, {
        "iso": "am",
        "name": "Amharic"
    }, {
        "iso": "an",
        "name": "Aragonese"
    }, {
        "iso": "ar",
        "name": "Arabic"
    }, {
        "iso": "as",
        "name": "Assamese"
    }, {
        "iso": "av",
        "name": "Avaric"
    }, {
        "iso": "ay",
        "name": "Aymara"
    }, {
        "iso": "az",
        "name": "Azerbaijani"
    }, {
        "iso": "ba",
        "name": "Bashkir"
    }, {
        "iso": "be",
        "name": "Belarusian"
    }, {
        "iso": "bg",
        "name": "Bulgarian"
    }, {
        "iso": "bh",
        "name": "Bihari"
    }, {
        "iso": "bi",
        "name": "Bislama"
    }, {
        "iso": "bm",
        "name": "Bambara"
    }, {
        "iso": "bn",
        "name": "Bengali"
    }, {
        "iso": "bo",
        "name": "Tibetan"
    }, {
        "iso": "br",
        "name": "Breton"
    }, {
        "iso": "bs",
        "name": "Bosnian"
    }, {
        "iso": "ca",
        "name": "Catalan"
    }, {
        "iso": "ce",
        "name": "Chechen"
    }, {
        "iso": "ch",
        "name": "Chamorro"
    }, {
        "iso": "co",
        "name": "Corsican"
    }, {
        "iso": "cr",
        "name": "Cree"
    }, {
        "iso": "cs",
        "name": "Czech"
    }, {
        "iso": "cu",
        "name": "Slavonic"
    }, {
        "iso": "cv",
        "name": "Chuvash"
    }, {
        "iso": "cy",
        "name": "Welsh"
    }, {
        "iso": "da",
        "name": "Danish"
    }, {
        "iso": "de",
        "name": "German"
    }, {
        "iso": "dv",
        "name": "Maldivian"
    }, {
        "iso": "dz",
        "name": "Dzongkha"
    }, {
        "iso": "ee",
        "name": "Ewe"
    }, {
        "iso": "el",
        "name": "Greek, Modern"
    }, {
        "iso": "en",
        "name": "English"
    }, {
        "iso": "eo",
        "name": "Esperanto"
    }, {
        "iso": "es",
        "name": "Spanish"
    }, {
        "iso": "et",
        "name": "Estonian"
    }, {
        "iso": "eu",
        "name": "Basque"
    }, {
        "iso": "fa",
        "name": "Persian"
    }, {
        "iso": "ff",
        "name": "Fula"
    }, {
        "iso": "fi",
        "name": "Finnish"
    }, {
        "iso": "fj",
        "name": "Fijian"
    }, {
        "iso": "fo",
        "name": "Faroese"
    }, {
        "iso": "fr",
        "name": "French"
    }, {
        "iso": "fy",
        "name": "Western Frisian"
    }, {
        "iso": "ga",
        "name": "Irish"
    }, {
        "iso": "gd",
        "name": "Gaelic"
    }, {
        "iso": "gl",
        "name": "Galician"
    }, {
        "iso": "gn",
        "name": "Guarani"
    }, {
        "iso": "gu",
        "name": "Gujarati"
    }, {
        "iso": "gv",
        "name": "Manx"
    }, {
        "iso": "ha",
        "name": "Hausa"
    }, {
        "iso": "he",
        "name": "Hebrew (modern)"
    }, {
        "iso": "hi",
        "name": "Hindi"
    }, {
        "iso": "ho",
        "name": "Hiri Motu"
    }, {
        "iso": "hr",
        "name": "Croatian"
    }, {
        "iso": "ht",
        "name": "Haitian"
    }, {
        "iso": "hu",
        "name": "Hungarian"
    }, {
        "iso": "hy",
        "name": "Armenian"
    }, {
        "iso": "hz",
        "name": "Herero"
    }, {
        "iso": "ia",
        "name": "Interlingua"
    }, {
        "iso": "id",
        "name": "Indonesian"
    }, {
        "iso": "ie",
        "name": "Interlingue"
    }, {
        "iso": "ig",
        "name": "Igbo"
    }, {
        "iso": "ii",
        "name": "Nuosu"
    }, {
        "iso": "ik",
        "name": "Inupiaq"
    }, {
        "iso": "io",
        "name": "Ido"
    }, {
        "iso": "is",
        "name": "Icelandic"
    }, {
        "iso": "it",
        "name": "Italian"
    }, {
        "iso": "iu",
        "name": "Inuktitut"
    }, {
        "iso": "ja",
        "name": "Japanese (ja)"
    }, {
        "iso": "jv",
        "name": "Javanese (jv)"
    }, {
        "iso": "ka",
        "name": "Georgian"
    }, {
        "iso": "kg",
        "name": "Kongo"
    }, {
        "iso": "ki",
        "name": "Gikuyu"
    }, {
        "iso": "kj",
        "name": "Kuanyama"
    }, {
        "iso": "kk",
        "name": "Kazakh"
    }, {
        "iso": "kl",
        "name": "Greenlandic"
    }, {
        "iso": "km",
        "name": "Khmer"
    }, {
        "iso": "kn",
        "name": "Kannada"
    }, {
        "iso": "ko",
        "name": "Korean"
    }, {
        "iso": "kr",
        "name": "Kanuri"
    }, {
        "iso": "ks",
        "name": "Kashmiri"
    }, {
        "iso": "ku",
        "name": "Kurdish"
    }, {
        "iso": "kv",
        "name": "Komi"
    }, {
        "iso": "kw",
        "name": "Cornish"
    }, {
        "iso": "ky",
        "name": "Kyrgyz"
    }, {
        "iso": "la",
        "name": "Latin"
    }, {
        "iso": "lb",
        "name": "Luxembourgish"
    }, {
        "iso": "lg",
        "name": "Luganda"
    }, {
        "iso": "li",
        "name": "Limburgish"
    }, {
        "iso": "ln",
        "name": "Lingala"
    }, {
        "iso": "lo",
        "name": "Lao"
    }, {
        "iso": "lt",
        "name": "Lithuanian"
    }, {
        "iso": "lu",
        "name": "Luba-Katanga"
    }, {
        "iso": "lv",
        "name": "Latvian"
    }, {
        "iso": "mg",
        "name": "Malagasy"
    }, {
        "iso": "mh",
        "name": "Marshallese"
    }, {
        "iso": "mi",
        "name": "Maori"
    }, {
        "iso": "mk",
        "name": "Macedonian"
    }, {
        "iso": "ml",
        "name": "Malayalam"
    }, {
        "iso": "mn",
        "name": "Mongolian"
    }, {
        "iso": "mr",
        "name": "Marathi"
    }, {
        "iso": "ms",
        "name": "Malay"
    }, {
        "iso": "mt",
        "name": "Maltese"
    }, {
        "iso": "my",
        "name": "Burmese"
    }, {
        "iso": "na",
        "name": "Nauru"
    }, {
        "iso": "nb",
        "name": "Norwegian"
    }, {
        "iso": "nd",
        "name": "North Ndebele"
    }, {
        "iso": "ne",
        "name": "Nepali"
    }, {
        "iso": "ng",
        "name": "Ndonga"
    }, {
        "iso": "nl",
        "name": "Dutch"
    }, {
        "iso": "nn",
        "name": "Norwegian Nynorsk"
    }, {
        "iso": "no",
        "name": "Norwegian"
    }, {
        "iso": "nr",
        "name": "South Ndebele"
    }, {
        "iso": "nv",
        "name": "Navajo, Navaho"
    }, {
        "iso": "ny",
        "name": "Chichewa"
    }, {
        "iso": "oc",
        "name": "Occitan"
    }, {
        "iso": "oj",
        "name": "Ojibwe, Ojibwa"
    }, {
        "iso": "om",
        "name": "Oromo"
    }, {
        "iso": "or",
        "name": "Oriya"
    }, {
        "iso": "os",
        "name": "Ossetian, Ossetic"
    }, {
        "iso": "pa",
        "name": "Panjabi, Punjabi"
    }, {
        "iso": "pi",
        "name": "Pali"
    }, {
        "iso": "pl",
        "name": "Polish"
    }, {
        "iso": "ps",
        "name": "Pashto, Pushto"
    }, {
        "iso": "pt",
        "name": "Portuguese"
    }, {
        "iso": "qu",
        "name": "Quechua"
    }, {
        "iso": "rm",
        "name": "Romansh"
    }, {
        "iso": "rn",
        "name": "Kirundi"
    }, {
        "iso": "ro",
        "name": "Romanian"
    }, {
        "iso": "ru",
        "name": "Russian"
    }, {
        "iso": "rw",
        "name": "Kinyarwanda"
    }, {
        "iso": "sa",
        "name": "Sanskrit"
    }, {
        "iso": "sc",
        "name": "Sardinian"
    }, {
        "iso": "sd",
        "name": "Sindhi"
    }, {
        "iso": "se",
        "name": "Northern Sami"
    }, {
        "iso": "sg",
        "name": "Sango"
    }, {
        "iso": "si",
        "name": "Sinhala"
    }, {
        "iso": "sk",
        "name": "Slovak"
    }, {
        "iso": "sl",
        "name": "Slovene"
    }, {
        "iso": "sm",
        "name": "Samoan"
    }, {
        "iso": "sn",
        "name": "Shona"
    }, {
        "iso": "so",
        "name": "Somali"
    }, {
        "iso": "sq",
        "name": "Albanian"
    }, {
        "iso": "sr",
        "name": "Serbian"
    }, {
        "iso": "ss",
        "name": "Swati"
    }, {
        "iso": "st",
        "name": "Southern Sotho"
    }, {
        "iso": "su",
        "name": "Sundanese"
    }, {
        "iso": "sv",
        "name": "Swedish"
    }, {
        "iso": "sw",
        "name": "Swahili"
    }, {
        "iso": "ta",
        "name": "Tamil"
    }, {
        "iso": "te",
        "name": "Telugu"
    }, {
        "iso": "tg",
        "name": "Tajik"
    }, {
        "iso": "th",
        "name": "Thai"
    }, {
        "iso": "ti",
        "name": "Tigrinya"
    }, {
        "iso": "tk",
        "name": "Turkmen"
    }, {
        "iso": "tl",
        "name": "Tagalog"
    }, {
        "iso": "tn",
        "name": "Tswana"
    }, {
        "iso": "to",
        "name": "Tonga"
    }, {
        "iso": "tr",
        "name": "Turkish"
    }, {
        "iso": "ts",
        "name": "Tsonga"
    }, {
        "iso": "tt",
        "name": "Tatar"
    }, {
        "iso": "tw",
        "name": "Twi"
    }, {
        "iso": "ty",
        "name": "Tahitian"
    }, {
        "iso": "ug",
        "name": "Uighur"
    }, {
        "iso": "uk",
        "name": "Ukrainian"
    }, {
        "iso": "ur",
        "name": "Urdu"
    }, {
        "iso": "uz",
        "name": "Uzbek"
    }, {
        "iso": "ve",
        "name": "Venda"
    }, {
        "iso": "vi",
        "name": "Vietnamese"
    }, {
        "iso": "vo",
        "name": "VolapÃƒÂ¼k"
    }, {
        "iso": "wa",
        "name": "Walloon"
    }, {
        "iso": "wo",
        "name": "Wolof"
    }, {
        "iso": "xh",
        "name": "Xhosa"
    }, {
        "iso": "yi",
        "name": "Yiddish"
    }, {
        "iso": "yo",
        "name": "Yoruba"
    }, {
        "iso": "za",
        "name": "Zhuang"
    }, {
        "iso": "zh-cn",
        "name": "Chinese/China (simplified)"
    }, {
        "iso": "zh-hk",
        "name": "Chinese/Hongkong"
    }, {
        "iso": "zh-sg",
        "name": "Chinese/Singapur",
    }, {
        "iso": "zh-tw",
        "name": "Chinese/Taiwan (traditional)"
    }, {
        "iso": "zh",
        "name": "Chinese"
    }, {
        "iso": "zu",
        "name": "Zulu"
    }];
    // Includes
    var oDefault = require("./src/assets/i18n/__default.json");
    var oAppDefault = require("./src/assets/i18n/_app_default.json");
    var oCopy = deepMerge(oDefault, oAppDefault);
    aFiles.forEach(function (sFile) {
        oCopy = deepMerge(oCopy, require(sFile));
    });
    // Datei schreiben
    fs.writeFileSync("src/assets/i18n/__default.json", JSON.stringify(oCopy, null, 4));
    oDefault = oCopy;
    aLocales.forEach(function (aLocale) {
        if (!fs.existsSync("src/assets/i18n/" + aLocale.iso + ".json")) {
            fs.writeFileSync("src/assets/i18n/" + aLocale.iso + ".json", "{}");
        }
        var oFile = require("./src/assets/i18n/" + aLocale.iso + ".json");
        fs.writeFileSync("src/assets/i18n/" + aLocale.iso + ".json", JSON.stringify(deepMerge(deepMerge({
            iso: aLocale.iso,
            language: aLocale.name
        }, clearObj(oDefault)), oFile), null, 4));
    })
    done();
});

gulp.task("files", function (done) {
    var aFiles = [
        ["src/assets/i18n/__default.json", "{}"],
        ["src/assets/i18n/_app_default.json", "{}"],
        ["src/assets/i18n/_api_default.json", "{}"]
    ];
    aFiles.forEach(function (aFile) {
        if (!fs.existsSync(aFile[0])) {
            fs.writeFileSync(aFile[0], aFile[1]);
        }
    });
    done();
});

gulp.task("mdi-icons", function () {
    return gulp.src("./node_modules/@mdi/angular-material/*.svg")
        .pipe(gulp.dest("./src/assets/icons"))
});

var FAVICON_DATA_FILE = "./src/assets/favicons/faviconData.json";
gulp.task("favicon-generate", function (done) {
    realFavicon.generateFavicon({
        masterPicture: "./src/assets/brand/logo.png",
        dest: "./src/assets/favicons",
        iconsPath: "assets/favicons",
        design: {
            ios: {
                pictureAspect: "backgroundAndMargin",
                backgroundColor: "#ffffff",
                margin: "18%",
                assets: {
                    ios6AndPriorIcons: true,
                    ios7AndLaterIcons: true,
                    precomposedIcons: true,
                    declareOnlyDefaultIcon: false
                },
                appName: "Herold Solutions"
            },
            desktopBrowser: {},
            windows: {
                pictureAspect: "noChange",
                backgroundColor: "#00aba9",
                onConflict: "override",
                assets: {
                    windows80Ie10Tile: true,
                    windows10Ie11EdgeTiles: {
                        small: true,
                        medium: true,
                        big: false,
                        rectangle: true
                    }
                },
                appName: "Herold Solutions"
            },
            androidChrome: {
                pictureAspect: "shadow",
                themeColor: "#ffffff",
                manifest: {
                    name: "Herold Solutions",
                    display: "standalone",
                    orientation: "notSet",
                    onConflict: "override",
                    declared: true
                },
                assets: {
                    legacyIcon: true,
                    lowResolutionIcons: true
                }
            },
            safariPinnedTab: {
                pictureAspect: "blackAndWhite",
                threshold: 60.625,
                themeColor: "#00aba9"
            }
        },
        settings: {
            compression: 5,
            scalingAlgorithm: "Mitchell",
            errorOnImageTooSmall: false,
            readmeFile: true,
            htmlCodeFile: true,
            usePathAsIs: false
        },
        markupFile: FAVICON_DATA_FILE
    }, done);
});

gulp.task("favicon-markup-injection", function () {
    var aHTML = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code.split(/\n/g);
    aHTML.unshift("<!-- START FAV -->");
    aHTML.push("<!-- END FAV -->");
    var sHTML = "";
    aHTML.forEach(function (html) {
        sHTML += "    " + html + "\n";
    });
    var aIndex = fs.readFileSync("./src/index.html").toString().split(/\n|\r|\r\n/g);
    var i = 0;
    let bDelete = false;
    var aIndexNew = [];
    while (i < aIndex.length) {
        if (aIndex[i].indexOf("<!-- START FAV -->") !== -1) {
            bDelete = true;
        }
        if (!bDelete) {
            aIndexNew.push(aIndex[i]);
        }
        if (aIndex[i].indexOf("<!-- END FAV -->") !== -1) {
            bDelete = false;
        }
        i += 1;
    }
    var sIndex = "";
    aIndexNew.forEach(function (html) {
        sIndex += html + "\n";
    });
    fs.writeFileSync("./src/index.html", sIndex);
    // throw Error();
    return gulp.src(["./src/index.html"])
        .pipe(realFavicon.injectFaviconMarkups(sHTML))
        .pipe(gulp.dest("./src"));
});

// Execution
gulp.task("default",
    gulp.parallel(
        "mdi-icons",
        gulp.series(
            "files",
            // "i18n-app",
            // "i18n-locales"
        ),
        gulp.series(
            "favicon-generate",
            "favicon-markup-injection"
        )
    )
);
