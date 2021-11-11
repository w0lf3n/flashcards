
let vocabulary_index = 0;
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
    "reliable;zuverlässig"

];

let flag_reveal_immediately = false;
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

        question.textContent = vocable[0];
        solution.textContent = vocable[1];

        vocabulary_index = vocabulary_index + 1;

    } else {

        question.style.display = "none";
        solution.style.display = "none";
        document.body.appendChild(reveal_box);

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

const start_tester = function (reveal_immediately) {
    flag_reveal_immediately = reveal_immediately;
    prompt_box.style.display = "none";
    flag_restart = true;
    state_quest = true;
    vocabulary_index = 0;
    shuffle(vocabulary_list);
    create_elements();
    show_next_card();
};

const create_prompt = function () {

    prompt_box = document.createElement("div");
    prompt_box.className = "PromptBox";
    document.body.appendChild(prompt_box);

    const button_reveal_at_end = document.createElement("button");
    button_reveal_at_end.textContent = "reveal at the end";
    button_reveal_at_end.addEventListener("click", () => {
        start_tester(false);
    });
    prompt_box.appendChild(button_reveal_at_end);

    const button_reveal_immediately = document.createElement("button");
    button_reveal_immediately.textContent = "reveal immediately";
    button_reveal_immediately.addEventListener("click", () => {
        start_tester(true);
    });
    prompt_box.appendChild(button_reveal_immediately);

};

init_tester();
