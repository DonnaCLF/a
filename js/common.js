export let SFX = true;

export function sfx_toggle(){
    if (SFX) {
        SFX = false;
    }
    else {
        document.getElementById("regular").play();
        SFX = true;
    }
}

export async function gattherData(path, func){
    const list = await (await fetch(path)).json();

    for (let i = 0; i < list.length; i++) {
        list[i] = func(list[i]);
    }

    return list;
}