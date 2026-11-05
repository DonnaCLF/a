export let darkMode;

export const localStore = typeof(Storage) !== "undefined";

if (localStore)
    if (localStorage.getItem("dark mode") === null) darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    else darkMode = localStorage.getItem("dark mode") === "true";
else darkMode = false;

export const mobileUI = window.matchMedia('(max-aspect-ratio: 1/1)').matches;
export let SFX;
if (localStore) 
    SFX = localStorage.getItem("sfx") === "true";
else SFX = true;

export function sfx_toggle(){
    if (SFX) {
        SFX = false;
        localStorage.setItem("sfx", SFX);
    }
    else {
        document.getElementById("regular").play();
        SFX = true;
        localStorage.setItem("sfx", SFX);
    }
}

export function dark_mode_toggle() {
    darkMode = !darkMode;
    localStorage.setItem("dark mode", darkMode);
    document.documentElement.dataset.dark_mode = darkMode;
    if (SFX) document.getElementById("regular").play();
}

export async function gattherData(path, func){
    const list = await (await fetch(path)).json();

    for (let i = 0; i < list.length; i++) {
        list[i] = func(list[i]);
    }

    return list;
}

document.documentElement.dataset.dark_mode = darkMode;