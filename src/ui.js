
import { set_flag } from "./flags.js";

import Application from "../lib/JST/dom/application.js";
import Container from "../lib/JST/dom/container.js";
import TextComponent from "../lib/JST/dom/text_component.js";
import RadioButtonGroup from "../lib/JST/dom/radio_button_group.js";
import RadioButton from "../lib/JST/dom/radio_button.js";
import TextButton from "../lib/JST/dom/text_button.js";
import FileChooser from "../lib/JST/dom/file_chooser.js";


/** @type {Application} */
let app = null;
/** @type {Container} */
let welcome = null;
/** @type {Container} */
let tasks = null;
/** @type {Container} */
let task_content = null;
/** @type {Container} */
let result = null;

const create_welcome = (start_method, load_cards_method) => {

    welcome = new Container("Welcome").append(

        new FileChooser("Select Flashcards", (files) => {
            if (files instanceof FileList && files.length === 1) {
                const file = files.item(0);
                if (file !== null) {
                    file.text().then((response) => {
                        const json = JSON.parse(response);
                        // TODO -> json.name
                        // TODO -> load performance by id from localStorage
                        load_cards_method(json);
                    });
                }
            } else {
                console.warn("Error loading flashcards.");
            }
        }),

        new Container("QuestionType").append(
            new TextComponent("Question Type", "Title"),
            new RadioButtonGroup("QuestionTypeGroup").append(
                new RadioButton("Question to Answer", 0, () => set_flag("question_to_answer", true)),
                new RadioButton("Answer to Question", 1, () => set_flag("question_to_answer", false))
            )
        ),

        new Container("RevealType").append(
            new TextComponent("Reveal Type", "Title"),
            new RadioButtonGroup("RevealTypeGroup").append(
                new RadioButton("At the end", 0, () => set_flag("reveal_answers_immediately", false)),
                new RadioButton("Immediately", 1, () => set_flag("reveal_answers_immediately", true))
            )
        ),

        new TextButton("Start", () => {
            if (start_method instanceof Function) {
                welcome.hide();
                tasks.show();
                start_method();
            }
        })

    );

    app.getRootPane().addComponent(welcome);
};

const create_card = () => {

    task_content = new Container("Content");

    tasks = new Container("TaskBox");
    tasks.addComponent(task_content)
        .hide();

    result = new Container("ResultBox");
    result.addComponent(new TextComponent("Result", "Title"))
        .hide();

    app.getRootPane().append(
        tasks,
        result
    );
};

const show_next_task = (...text) => new Promise((resolve) => {
    task_content.clear();
    text.forEach((line) => task_content.addComponent(new TextComponent(line, "Line")));
    resolve();
});

const show_result = () => {

};

/**
 * @param {Function} start
 * @param {Function} load_cards
 */
const init = (start, load_cards) => {
    app = new Application("Flashcards");
    create_welcome(start, load_cards);
    create_card();
};


export {
    init,
    show_next_task,
    show_result
};
