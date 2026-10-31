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