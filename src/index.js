import shuffle from "../lib/JST/native/array.js";
import Random from "../lib/JST/random/random.js";
import { get_flag } from "./flags.js";

import { init as init_gui, show_result, show_next_task } from "./ui.js";


/** @type {number} */
let tasks_index = 0;
/** @type {Array<Array<string>>} */
let answers = null;
/** @type {Array<string>} */
let questions = null;
/** @type {Array<string>} */
let result = null;

/** @type {boolean} */
let question_to_answer = true;
/** @type {boolean} */
let reveal_answers_immediately = false;

const show_next_card = () => {

    if (questions instanceof Array && answers instanceof Array && tasks_index < questions.length) {

        /** @type {Array<string>} */
        let task_data = null;

        if (question_to_answer) {
            task_data = [questions[tasks_index.valueOf()]];
        } else {
            task_data = answers[tasks_index.valueOf()];
        }

        show_next_task(task_data).then((answer) => {
            tasks_index = tasks_index + 1;
            // store result
            // show_next_card();
        });

    } else {

        show_result(result);

    }

};

/** @param {{key: string, value: Array<string>}} data */
const load_cards = (data) => {
    questions = Object.keys(data);
    answers = Object.values(data);
};

const begin_session = () => {

    if (questions instanceof Array && questions.length > 0 && answers instanceof Array && answers.length > 0) {

        tasks_index = 0;

        question_to_answer = get_flag("question_to_answer");
        reveal_answers_immediately = get_flag("reveal_answers_immediately");

        const seed = Date.now();
        Random.init(seed);
        shuffle(questions);
        Random.init(seed);
        shuffle(answers);

        result = [];
        show_next_card();

    } else {
        // error: select flashcards
    }
};

init_gui(begin_session, load_cards);
