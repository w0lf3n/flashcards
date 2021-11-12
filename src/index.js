
let vocabulary_index = 0;

// TODO make json file
const vocabulary_list = [

    "assembly;Montage",
    "central node;zentraler Knotenpunkt",
    "copper wire;Kupferkabel",
    "data delivery;Datenauslieferung",
    "(to) go down;ausfallen",
    "insulation;Isolierung",
    "layer;Netzzugang (Schicht)",
    "optical fibre;Glasfaserleiter",
    "packet switching;Datenpaketvermittlung",
    "(to) plug in;einstecken",
    "resilient;widerstandsfähig",
    "secure connection;sichere Verbindung",
    "reliable;zuverlässig",
    "query;Anfrage/Abfrage",
    "(to) process;verarbeiten",
    "volatile;flüchtig",
    "clipboard;Zwischenablage",
    "grid;Gitter",
    "power supply;Netzteil",
    "cooling fan;Lüfter",
    "air-conditioned;klimatisiert"

];

let flag_reveal_immediately = false;
let flag_direction_eng_ger = true;
let flag_restart = true;
let state_quest = true;

let prompt_box = null;
let question = null;
let solution = null;
let reveal_box = null;

const shuffle = function (array) {
    array.sort(() => Math.random() - 0.5);
};

const init_tester = function () {
    flag_restart = false;
    document.body.innerHTML = "";
    create_prompt();
};

const show_next_card = function () {

    if (vocabulary_index < vocabulary_list.length) {

        const vocable = vocabulary_list[vocabulary_index].split(";");

        if (flag_direction_eng_ger) {
            question.textContent = vocable[0];
            solution.textContent = vocable[1];
        } else {
            question.textContent = vocable[1];
            solution.textContent = vocable[0];
        }

        vocabulary_index = vocabulary_index + 1;

    } else {

        question.style.display = "none";
        solution.style.display = "none";
        document.body.appendChild(reveal_box);

        flag_restart = true;
    }

};

const hit_word_box = function () {

    if (flag_restart) {
        init_tester();
        return true;
    }

    if (state_quest) {

        if (flag_reveal_immediately) {
            question.style.display = "none";
            solution.style.display = "block";
            state_quest = false;
        } else {
            const row = document.createElement("p");
            row.className = "Row";
            row.textContent = question.textContent + " - " + solution.textContent;
            reveal_box.appendChild(row);
            show_next_card();
        }

    } else {

        state_quest = true;
        solution.style.display = "none";
        question.style.display = "block";
        show_next_card();

    }

    return true;
};

const create_elements = function () {

    const word_container = document.createElement("div");
    word_container.className = "WordBox";
    word_container.addEventListener("click", hit_word_box);

    document.body.appendChild(word_container);

    question = document.createElement("p");
    question.className = "Question";
    question.style.display = "block";
    word_container.appendChild(question);

    solution = document.createElement("p");
    solution.className = "Solution";
    solution.style.display = "none";
    word_container.appendChild(solution);

    reveal_box = document.createElement("div");
    reveal_box.className = "RevealBox";

};

const start_tester = function () {
    prompt_box.style.display = "none";
    state_quest = true;
    vocabulary_index = 0;
    shuffle(vocabulary_list);
    create_elements();
    show_next_card();
};

const createRadioButton = function (groupName, buttonId, value, action, checked) {
    const container = document.createElement("div");
    const radiobutton = document.createElement("input");
    container.appendChild(radiobutton);
    radiobutton.id = buttonId;
    radiobutton.addEventListener("change", action);
    radiobutton.setAttribute("name", groupName);
    radiobutton.setAttribute("type", "radio");
    if (checked) {
        radiobutton.setAttribute("checked", "checked");
    }
    const label = document.createElement("label");
    label.setAttribute("for", buttonId);
    label.textContent = value;
    container.appendChild(label);

    return container;
};

const create_prompt = function () {

    prompt_box = document.createElement("div");
    prompt_box.className = "PromptBox";
    document.body.appendChild(prompt_box);

    const fieldset_language = document.createElement("fieldset");
    prompt_box.appendChild(fieldset_language);
    const legend_language = document.createElement("legend");
    legend_language.textContent = "language direction";
    fieldset_language.appendChild(legend_language);
    const button_english = createRadioButton("language", "english", "english -> german", () => {
        flag_direction_eng_ger = true;
    }, true);
    fieldset_language.appendChild(button_english);
    const button_german = createRadioButton("language", "german", "german -> english", () => {
        console.log("clicked ger -> eng");
        flag_direction_eng_ger = false;
    }, false);
    fieldset_language.appendChild(button_german);

    const fieldset_reveal = document.createElement("fieldset");
    prompt_box.appendChild(fieldset_reveal);
    const legend_reveal = document.createElement("legend");
    legend_reveal.textContent = "reveal answer";
    fieldset_reveal.appendChild(legend_reveal);
    const button_reveal_at_the_end = createRadioButton("reveal", "at_the_end", "at the end", () => {
        flag_reveal_immediately = false;
    }, true);
    fieldset_reveal.appendChild(button_reveal_at_the_end);
    const button_reveal_immediately = createRadioButton("reveal", "immediately", "immediately", () => {
        flag_reveal_immediately = true;
    }, false);
    fieldset_reveal.appendChild(button_reveal_immediately);

    const button_start = document.createElement("button");
    button_start.textContent = "start";
    button_start.addEventListener("click", () => {
        start_tester();
    });
    prompt_box.appendChild(button_start);

};

init_tester();
