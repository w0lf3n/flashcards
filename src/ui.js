
import set_flag from "./flags.js";

import Application from "../lib/JST/dom/application.js";
import Container from "../lib/JST/dom/container.js";
import TextComponent from "../lib/JST/dom/text_component.js";
import RadioButtonGroup from "../lib/JST/dom/radio_button_group.js";
import RadioButton from "../lib/JST/dom/radio_button.js";
import TextButton from "../lib/JST/dom/text_button.js";


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

const create_welcome = (start_method) => {

    welcome = new Container("Welcome").append(

        new Container("QuestionType").append(
            new TextComponent("Question Type", "Title"),
            new RadioButtonGroup("QuestionType").append(
                new RadioButton("Question -> Answer", 0, () => set_flag("question_to_answer", true)),
                new RadioButton("Answer -> Question", 1, () => set_flag("question_to_answer", false))
            )
        ),

        new Container("RevealType").append(
            new TextComponent("Reveal Type", "Title"),
            new RadioButtonGroup("RevealType").append(
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

const show_task = (...text) => {
    task_content.clear();
    text.forEach((line) => task_content.addComponent(new TextComponent(line, "Line")));
};

const show_result = () => {

};

const init_ui = (start_method) => {
    app = new Application("Flashcards");
    create_welcome(start_method);
    create_card();
};


export {
    init_ui,
    show_result,
    show_task
};
