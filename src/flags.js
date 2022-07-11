
import { hasProperty, isBoolean, isString } from "../lib/JST/native/type_check.js";


const flags = Object.seal({
    question_to_answer: true,
    reveal_answers_immediately: false
});

const get_flag = (flag_id) => flags[`${flag_id}`];

/** @param {boolean} value  */
const set_flag = (flag_id, value) => {
    if (isString(flag_id) && hasProperty(flags, flag_id) && isBoolean(value)) {
        flags[`${flag_id}`] = value;
    }
};


export {
    get_flag,
    set_flag
};
