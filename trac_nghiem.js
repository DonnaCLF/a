import { SFX } from "/common.js"

export function nextQuestion(question, answering_list, id){
    id++;
    if (id in answering_list) { question.display_color(answering_list[id]); }
    else { question.display_raw(true); }
    return id;
}
export function prevQuestion(question, answering_list, id){
    id--;
    if (id in answering_list) { question.display_color(answering_list[id]);}
    else { question.display_raw(true); }
    return id;
}

export function answer(id, chosen, question, answering_list, sfx) {
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

export class Cauhoi {
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
            answer_elements[i][0].removeEventListener("mouseenter", answer_elements[i][1]);
            answer_elements[i][0].removeEventListener("mouseleave", answer_elements[i][2]);
        }
        return chosen == this.right_answer;
    }
}

export async function gatherring(path){
    if (Array.isArray(path)) {
        const list = [];
        for (let i = 0; i < path.length; i++) {
            list.push(...await trueGatthering(path[i]));
        }
        return shuffle_question(list);
    };
    return shuffle_question(await trueGatthering(path));
}

function shuffle_question(list) {
    for (let i = list.length-1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
}

async function trueGatthering(path){
    const res = await fetch(path);
    const list = await res.json();

    for (let i = 0; i < list.length; i++) {
        list[i] = new Cauhoi(list[i].cau_hoi, list[i].cau_dung, list[i].cau_sai);
        list[i].shuffle();
    }

    return list;

}