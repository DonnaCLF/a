import * as common from './common.js'

let e = [[document.querySelector("#dia_ly .active"), document.querySelector("#dia_ly .inactive")],
        [document.querySelector("#lich_su .active"), document.querySelector("#lich_su .inactive")],
        [document.querySelector("#information .active"), document.querySelector("#information .inactive")],
        [document.querySelector("#dark_mode img"), document.querySelector("#sfx_toggle img")],
        document.getElementById("tittle"),
        document.getElementById("regular"),
        document.getElementById("content")
]

function tab1() {
    if (common.SFX) e[5].play();

    e[0][0].style.display = "inline-block";
    e[0][1].style.display = "none";
    e[1][0].style.display = "none";
    e[1][1].style.display = "inline-block";
    e[2][0].style.display = "none";
    e[2][1].style.display = "inline-block";
    e[4].textContent = "Địa lý";

    e[6].replaceChildren();
    data[0].forEach(item => e[6].appendChild(item.element));
    e[6].style.width = "85%";
}

function tab2() {
    if (common.SFX) e[5].play();

    e[0][0].style.display = "none";
    e[0][1].style.display = "inline-block";
    e[1][0].style.display = "inline-block";
    e[1][1].style.display = "none";
    e[2][0].style.display = "none";
    e[2][1].style.display = "inline-block";

    e[4].textContent = "Lịch sử";

    e[6].replaceChildren();
    data[1].forEach(item => e[6].appendChild(item.element));
    e[6].style.width = "85%";
}

function tab3() {
    if (common.SFX) e[5].play();

    e[0][0].style.display = "none";
    e[0][1].style.display = "inline-block";
    e[1][0].style.display = "none";
    e[1][1].style.display = "inline-block";
    e[2][0].style.display = "inline-block";
    e[2][1].style.display = "none";

    e[4].textContent = "Thông tin";

    e[6].replaceChildren();
    e[6].style.width = "90%";
    e[6].innerHTML = `
        <p>Xin chào, chào mừng bạn đã đến với phần thông tin của cái web này. Tôi không biết tại sao bạn lại ấn vào đây, có thể là vì tò mò hoặc cũng có thể là vì nhấn nhầm. Dù thế nào thì cũng chào mừng.</p>

        <p>Tôi là người lên ý tưởng và thiết kế cái web này (không phải người code), có thể các bạn biết tôi là ai hoặc có thể không. Tôi không biết cái web này sẽ bay được đi xa đến đâu vì tôi biết kiểu gì các bạn cũng sẽ truyền cho nhau ôn tập mà, cứ thoải mái đi không sao đâu. Cho những người biết tôi là ai, làm ơn đừng nói tên tôi ra, biết thì biết thôi. Cho những người không biết tôi là ai, làm ơn đừng cố gắng tìm hiểu.</p>

        <p>Tại sao lại có trang web này? Chỉ là sắp thi địa rồi và tôi không biết ôn gì cả vì tôi không thể tự ngồi đọc sách giáo khoa vậy nên tôi đã sử dụng tài liệu ôn thi THPTQG của thầy địa để ôn thi học kì với hy vọng là nó sẽ đủ. Các web tạo câu hỏi đại trà khác như Kahoot hay Wordwall hay Quizziz,... đều có chung một vấn đề là tới cái chức năng tôi cần thì lại phải “nạp tiền”. Tôi đã dùng hết free trial của bọn nó từ năm lớp 10 rồi vì vậy tôi và người nhà đã quyết định tự làm một cái để tự dùng. Làm ơn đừng thần thánh hoá cái trang web này, tôi còn không biết rằng với cái đống này thì đã đi thi nổi hay chưa. Thứ này được tạo ra để dành cho tôi, đúng vậy là dành cho tôi, không phải cho các bạn nhưng cứ dùng thoải mái đi, dù gì cũng là chỗ để ôn tập thôi mà.</p>

        <p>Về tài liệu trong này. Đối với mục “Địa Lý” như tôi đã đề cập ở trên, nó được lấy trong tài liệu ôn thi THPTQG của thầy địa vì vậy tôi không chắc đống này có thể giúp tôi đi thi, tôi chỉ hy vọng thôi vì tôi không thể ngồi nhìn cái sách giáo khoa được. Nếu bạn chỉ có ý định học trong này và không học từ sách giáo khoa và đi thi các bạn được điểm thấp, đó không phải lỗi của tôi. Tôi đã bảo, thứ này được tạo ra dành cho tôi. Về mục “Lịch Sử”, tôi khá là không thích việc học thuộc không nên tôi đã feed đề cương sử cho AI để nó giúp tôi generate câu hỏi trắc nghiệm để tôi học cái đề cương gián tiếp. Tôi không chắc việc ôn từ nó và nó đã cho tôi đủ hành trang và nội dung trong đề cương chưa. Vậy nên một lần nữa nhắc lại: LÀM ƠN ĐỪNG THẦN THÁNH HOÁ THỨ NÀY.</p>

        <p>Về phần thiết kế, cả tôi và người code đều không biết thiết kế nhưng tôi vẫn cố gắng vẽ cho nó một giao diện dễ cho các bạn sử dụng nhất, nhìn cũng khá ổn áp và đẹp. Đơn giản với chúng ta thôi, code thì không 💀. Bọn tôi lên ý tưởng từ chiều thứ 6 và tối thứ 6 mới bắt đầu làm và cố gắng hoàn thành nhanh nhất có thể trong chưa đầy một ngày, respect code.</p>

        <p>Nếu có gì thắc mắc, xin hãy nhắn tin liên hệ tôi. Vì là hàng nhà làm vậy nên nó không dễ để sử dụng đâu (đối với việc tạo bài học/câu hỏi), vậy nên nếu các bạn muốn tôi thêm bài học gì để các bạn ôn tập, xin hãy liên hệ tôi. Nếu các bạn không biết tôi là ai, hãy nhờ người biết tôi là ai liên hệ với tôi. Như tôi đã bảo, làm ơn đừng cố tìm ra tôi là ai. If you know, you know.</p>

        <p>Cảm ơn bạn đã đọc hết cái mục này, không ngờ là các bạn đọc hết. Chắc là do giọng văn tôi cũng cuốn, lol. Hoặc chỉ đơn giản là các bạn tò mò tôi viết thứ gì. Chúc các bạn làm bài vui vẻ và thi tốt, mong là đống này giúp ích được gì cho chúng ta.</p>

        <p id="closing">LÀM ƠN ĐỪNG THẦN THÁNH HOÁ CÁI THỨ NÀY</p>
    `
}

function dark_mode() {
    common.dark_mode_toggle();
    if (common.darkMode) {
        e[3][0].src = "./images/moon.png";
        e[3][1].src = `./images/loa${common.SFX ? "" : " mute"} dark.png`;
    } else {
        e[3][0].src = "./images/sun.png";
        e[3][1].src = `./images/loa${common.SFX ? "" : " mute"}.png`;
    }
    data[0].forEach(data => data.toggle_dark_mode());
    data[1].forEach(data => data.toggle_dark_mode());
}

class BaiTap {
    constructor(title, description, subject, data) {

        this.title = title;
        this.description = description === undefined ? '' : description;

        this.data = (Array.isArray(data)) ? `${common.localStore ? "" : `%u${common.darkMode ? "t" : "f"}${common.SFX ? "t" : "f"}`}${subject.toLowerCase()}%^%[${data.toString().replaceAll(",","%&")}%]`: subject.toLowerCase() + "%^" + data;

        this.element = document.createElement('div');
        this.element.innerHTML = `
                                <div class="description">
                                    <img src="./images/hình trang trí${common.darkMode ? " dark" : ""}.png">
                                    <div>
                                        <span>${this.title}</span><br>
                                        <span class="details">${this.description}</span>
                                    </div>
                                </div>
                                <a href="./trac nghiem.html?${this.data}"><img src="./images/play button${common.darkMode ? " dark" : ""}.png" alt="${this.title}"></a>
                                `
        this.element.classList.add('box');
    }

    toggle_dark_mode(){
        this.element.querySelector(".description img").src = `./images/hình trang trí${common.darkMode ? " dark" : ""}.png`;
        this.element.querySelector("a img").src = `./images/play button${common.darkMode ? " dark" : ""}.png`;
    }
}

e[0][1].addEventListener("click", tab1);
e[1][1].addEventListener("click", tab2);
e[2][1].addEventListener("click", tab3);
document.getElementById("dark_mode").addEventListener("click", dark_mode);
document.getElementById("sfx_toggle").addEventListener("click", () => {
                                                                    common.sfx_toggle();
                                                                    e[3][1].src = `./images/loa${common.SFX ? "" : " mute"}${common.darkMode ? " dark" : ""}.png`;
                                                                });

const data = [,,];
data[0] = await common.gattherData("./địa/danh_sach.json", data => new BaiTap(data.tieu_de, data.chu_thich, "địa", data.noi_dung));
data[1] = await common.gattherData("./sử/danh_sach.json", data => new BaiTap(data.tieu_de, data.chu_thich, "sử", data.noi_dung));

tab1();
dark_mode();
dark_mode();