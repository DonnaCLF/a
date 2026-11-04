import * as common from "./common.js"

function change_question(is_next, question, answering_list, id){
    if (!is_next && id == 0 || is_next && id == baiTracNghiem.length - 1) return id;
    if (common.SFX) sfx[3].play();
    if (is_next) id++; else id--;
    if (id in answering_list) { question.display_color(answering_list[id]); }
    else { question.display_raw(true); }
    question_id_element.forEach(element => element.textContent = `Câu ${id+1}/${baiTracNghiem.length}`);
    return id;
}

function answerHandling(id, chosen, question, answering_list, sfx) {
    if (!Object.hasOwn(answering_list, id)) {
        if (common.SFX)
            if (question.display_color(chosen)) sfx[0].play();
            else sfx[1].play();
        else question.display_color(chosen);
        answering_list[id] = chosen;
        document.getElementById(`answear_${id+1}`)
    }
    return question, answering_list;
}

const answer_elements = []
for (let i = 0; i < 4; i++) {
    answer_elements[i] = [document.getElementById(`answear_${i+1}`),
                        () => answer_elements[i][0].style.backgroundColor = common.darkMode ? "black" : "#d0d0d7",
                        () => answer_elements[i][0].style.backgroundColor = common.darkMode ? "#202024" : "white"]
}

class Cauhoi {
    constructor(question, right_answer, wrong_answers) {
        this.question = question;
        this.answers = wrong_answers
        this.answers[3] = right_answer
        this.right_answer = 3
    }

    shuffle(){
        for (let i = 3; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            switch (this.right_answer) {
                case i:
                    this.right_answer = j
                    break;
            
                case j:
                    this.right_answer = i
                    break;
            }

            [this.answers[i], this.answers[j]] = [this.answers[j], this.answers[i]];
        }

    }

    display_raw(hover){
        document.getElementById("question").textContent = this.question;
        for (let i = 0; i < 4; i++) {

            answer_elements[i][0].textContent = this.answers[i];
            answer_elements[i][0].style.backgroundColor = common.darkMode ? "#202024" : "white";

            if (!common.mobileUI) {
                answer_elements[i][0].style.fontSize = "180%";
                let size = 180;

                while (answer_elements[i][0].scrollHeight > answer_elements[i][0].clientHeight && size > 75) {
                    size -= 35;
                    answer_elements[i][0].style.fontSize = `${size}%`;
                    console.log(`${answer_elements[i][0].scrollHeight}, ${answer_elements[i][0].clientHeight}`)
                }

            } else answer_elements[i][0].style.fontSize = "150%";


            if (hover) {
                answer_elements[i][0].style.cursor = "pointer";
                answer_elements[i][0].addEventListener("mouseenter", answer_elements[i][1]);
                answer_elements[i][0].addEventListener("mouseleave", answer_elements[i][2]);
            }
        }
    }

    display_color(chosen){
        this.display_raw(false);
        if (common.darkMode) {
            document.getElementById(`answear_${this.right_answer+1}`).style.backgroundColor = "green";
            if(chosen != this.right_answer) document.getElementById(`answear_${chosen+1}`).style.backgroundColor = "firebrick";
        } else {
            document.getElementById(`answear_${this.right_answer+1}`).style.backgroundColor = "chartreuse";
            if(chosen != this.right_answer) document.getElementById(`answear_${chosen+1}`).style.backgroundColor = "red";
        }
        for (let i = 0; i < 4; i++) {
            answer_elements[i][0].style.cursor = "default"
            answer_elements[i][0].removeEventListener("mouseenter", answer_elements[i][1]);
            answer_elements[i][0].removeEventListener("mouseleave", answer_elements[i][2]);
            
        }
        return chosen == this.right_answer;
    }
}

async function gatherring(txt){
    txt = txt.slice(1)
    txt = txt.split("%^")
    if (txt[1].startsWith("%[")) {

        txt[1] = txt[1].slice(2, -2);
        txt[1] = txt[1].split("%&");
    
        const list = [];

        for (let i = 0; i < txt[1].length; i++)

            list.push(...await common.gattherData(`${txt[0]}/data/${txt[1][0]}.json`, (data) => {
                    data = new Cauhoi(data.cau_hoi, data.cau_dung, data.cau_sai);
                    data.shuffle();
                    return data;
            }))

        return shuffle_question(list);
    };
    return shuffle_question(await common.gattherData(`${txt[0]}/data/${txt[1]}.json`, (data) => {
                                                    data = new Cauhoi(data.cau_hoi, data.cau_dung, data.cau_sai);
                                                    data.shuffle();
                                                    return data;
                                                }));
}

function shuffle_question(list) {
    for (let i = list.length-1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
}

if (common.darkMode) {
    document.querySelector("#prev_question img").src = "./images/prev_button_dark.png";
    document.querySelector("#next_question img").src = "./images/next_button_dark.png";
    document.querySelector("#sfx_toggle img").src = "./images/loa dark.png"
} else {
    document.querySelector("#prev_question img").src = "./images/prev_button.png";
    document.querySelector("#next_question img").src = "./images/next_button.png";
    document.querySelector("#sfx_toggle img").src = "./images/loa.png"
}

let id = 0;
const question_id_element = document.querySelectorAll(".identifier");
let answers = []
let sfx = [document.getElementById("correct"), document.getElementById("incorrect"), document.getElementById("regular"), document.getElementById("change_question")];
var baiTracNghiem = await gatherring(location.search);

function answer(chosen) {
    baiTracNghiem[id], answers = answerHandling(id, chosen, baiTracNghiem[id], answers, sfx);
}

baiTracNghiem[id].display_raw(true);

document.getElementById("next_question").addEventListener("click", () => id = change_question(true, baiTracNghiem[id+1], answers, id));
document.getElementById("prev_question").addEventListener("click", () => id = change_question(false, baiTracNghiem[id-1], answers, id));

for (let i = 0; i < 4; i++) {
    document.getElementById(`answear_${i+1}`).addEventListener("click", () => answer(i));
}
document.getElementById("sfx_toggle").addEventListener("click", common.sfx_toggle);
document.getElementById("back").addEventListener("click", () => { if (common.SFX) sfx[2].play()});

question_id_element.forEach(element => element.textContent = `Câu 1/${baiTracNghiem.length}`);