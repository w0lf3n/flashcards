import shuffle from "../lib/JST/native/array.js";
import { get_flag } from "./flags.js";

import { init_ui, show_result, show_task } from "./ui.js";


let tasks_index = 0;
let answers = null;
let questions = null;
let result = [];

let question_to_answer = null;
let reveal_answers_immediately = null;

const show_next_card = () => {

    if (tasks_index < questions.length) {

        if (question_to_answer) {
            show_task(questions[tasks_index.valueOf()]);
        } else {
            show_task(...answers[tasks_index.valueOf()]);
        }

        tasks_index = tasks_index + 1;

    } else {

        show_result();

    }

};

const begin_session = () => {
    tasks_index = 0;
    shuffle(questions);
    question_to_answer = get_flag("question_to_answer");
    reveal_answers_immediately = get_flag("reveal_answers_immediately");
    show_next_card();
};

const init = (data) => {
    answers = Object.keys(data);
    questions = Object.values(data);
    init_ui(
        begin_session
    );
};

fetch("dat/progr1.json").then((response) => response.json()).then((data) => init(data));
