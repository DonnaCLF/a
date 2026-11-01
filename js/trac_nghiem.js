import { SFX, sfx_toggle, gattherData } from "./common.js"

function change_question(is_next, question, answering_list, id){
    if (SFX) sfx[3].play();
    if (is_next) id++; else id--;
    if (id in answering_list) { question.display_color(answering_list[id]); }
    else { question.display_raw(true); }
    console.log(id);
    return id;
}

function answerHandling(id, chosen, question, answering_list, sfx) {
    if (!Object.hasOwn(answering_list, id)) {
        if (SFX)
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
                        () => answer_elements[i][0].style.backgroundColor = "#d0d0d7",
                        () => answer_elements[i][0].style.backgroundColor = "white"]
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

    hover(element) {
        element.style.backgroundColor = "#d0d0d7";
        element.style.backgroundColor = "white";
    }


    display_raw(hover){
        document.getElementById("question").textContent = this.question;
        for (let i = 0; i < 4; i++) {
            answer_elements[i][0].textContent = this.answers[i];
            answer_elements[i][0].style.backgroundColor = "white";
            if (hover) {
                answer_elements[i][0].style.cursor = "pointer"
                answer_elements[i][0].addEventListener("mouseenter", answer_elements[i][1]);
                answer_elements[i][0].addEventListener("mouseleave", answer_elements[i][2]);
            }
        }
    }

    display_color(chosen){
        this.display_raw(false);
        document.getElementById(`answear_${this.right_answer+1}`).style.backgroundColor = "chartreuse";
        if(chosen != this.right_answer) document.getElementById(`answear_${chosen+1}`).style.backgroundColor = "red";
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

            list.push(...await gattherData(`${txt[0]}/data/${txt[1][0]}.json`, (data) => {
                    data = new Cauhoi(data.cau_hoi, data.cau_dung, data.cau_sai);
                    data.shuffle();
                    return data;
            }))

        return shuffle_question(list);
    };
    return shuffle_question(await gattherData(`${txt[0]}/data/${txt[1]}.json`, (data) => {
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

let id = 0;
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
document.getElementById("sfx_toggle").addEventListener("click", sfx_toggle);
document.getElementById("back").addEventListener("click", () => { if (SFX) sfx[2].play()});