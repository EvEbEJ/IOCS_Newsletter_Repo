const nltrBody = document.querySelector("#newsletter-content");
const rowType = document.querySelector("#row-type");
const addRow = document.querySelector("#add-row");
const textType = document.querySelector("#text-type");
const addText = document.querySelector("#add-text");
const modalBG = document.querySelector("#modal-background");
// code btn
const getCode = document.querySelector("#code");
// import btn
const getImport = document.querySelector("#import");
// modal classes
const closeModal = document.querySelectorAll(".close-modal");
const codeModal = document.querySelector("#code-modal");
const importModal = document.querySelector("#import-modal");
const modalCode = document.querySelector("#code-copy");
const importBtn = importModal.querySelector("button");
const alignTextBtns = document.querySelectorAll(".align-btn");
const srcInfo = document.querySelector("#link-box");
const altInput = document.querySelector("#lb-alt");
const srcInput = document.querySelector("#lb-src");
const hrefInput = document.querySelector("#lb-href");
const titleInput = document.querySelector("#lb-title");
const widthInput = document.querySelector("#lb-w");
const heightInput = document.querySelector("#lb-h");
const subSrc = document.querySelector("#sub-lb");
const closeInfo = document.querySelector("#close-box");

var focusEle;
var linked_Img;
var focusTr;

const textFonts = {
    "Anchor": "<a style=\"color:dodgerblue\" href=\"#\">LINK HERE</a>",
    "Heading 1": "<h1 style=\"line-height: 1.3;font-size:50px;font-weight:bold;\">HEADING 1</h1>",
    "Heading 2": "<h2 style=\"line-height: 1.3;font-size:40px;font-weight:bold;\">HEADING 2</h2>",
    "Paragraph": "<p style=\"line-height: 1.25;font-size:16px;\">TEXT TEXT TEXT</p>",
    "Banner": "<p style=\"border-left:5px solid #6eb56e;border-right:5px solid #6eb56e;background-color:#abe0ab; padding:10px; font-family:Arial,Helvetica,sans-serif;font-size:16px; line-height: 1.5; font-weight:bold; text-align:center; color:#387538\"> \
        <a style=\"color:#103610; text-decoration:none;\" href=\"https://iocsmin.wixsite.com/iocs/creature-comics\">BANNER TEXT</a> \
    </p>",
    "Image": "<div style=\"width:700px; max-height:1200px; overflow:hidden; margin-left:auto; margin-right:auto;\"> \
        <h1 style=\"text-align:center\"> \
        <a style=\"color:dodgerblue\" href=\"#\"><img src=\"https://evebej.github.io/IOCS_Newsletter_Repo/images/2023/2021-04-15.jpg\" alt=\"Mushrooms on Tree\" class=\"top-pic\" style=\"width:500px; max-height: 100%;\"></a> \
        </h1> \
    </div>",
}

/* 
TODO: 
    - Add redo/undo functionality
    - Move tr's with mousedrag

    [[- import code]]
    [[- Delete banners]]
    [[- Ability to change img dimensions]]
    [[- Insert heading/text/banner at cursor]]
    [[- Add support for editing anchors]]
    [[- Insert table row via buttons between tr]]
*/ 

// taken from stack overflow, check if url exists

const insertBtn = document.querySelector("#insert-row");

function showInfo(obj, e) {
    let img;
    focusEle = obj;
    srcInfo.style.display = "block";
    srcInfo.focus()
    if (linked_Img)
    {
        obj_img = obj.querySelector("img");
    }
    // check if a has a image
    if (focusEle.tagName.toLowerCase() == 'a' && focusEle.querySelector("img"))
    {
        linked_Img = true;
        img = focusEle.querySelector("img");
    }
    else {
        linked_Img = false;
    }
    // check if src exists
    if (obj.src || linked_Img)
    {
        // linked image?
        if (linked_Img)
        {
            srcInfo.querySelector(".alt").textContent = "Alt Text: " + img.alt;
        }
        else {
            srcInfo.querySelector(".src").textContent = "Source: " + obj.src;
        }
        srcInput.style.display = "";
    }
    else {
        srcInput.style.display = "none";
        srcInfo.querySelector(".src").textContent = "";
    }
    // check if alt exists
    if (obj.alt || linked_Img)
    {
        // linked image?
        if (linked_Img)
        {
            srcInfo.querySelector(".alt").textContent = "Alt Text: " + img.alt;
        }
        else {
            srcInfo.querySelector(".alt").textContent = "Alt Text: " + obj.alt;
        }
        altInput.style.display = "";
    }
    else {
        altInput.style.display = "none";
        srcInfo.querySelector(".alt").textContent = "";
    }
    // check if href exists
    if (obj.href || linked_Img)
    {
        srcInfo.querySelector(".href").textContent = "HRef: " + obj.href;
        hrefInput.style.display = "";
    }
    else {
        hrefInput.style.display = "none";
        srcInfo.querySelector(".href").textContent = "";
    }
    // show title/width/height if img
    if (obj.tagName.toLowerCase() == "img" || linked_Img)
    {
        var obj2 = obj;
        if (linked_Img)
        {
            obj2 = obj.querySelector("img")
        }
        srcInfo.querySelector(".title").textContent = "Title: " + obj2.title;
        titleInput.style.display = "";
        srcInfo.querySelector(".width").textContent = "Width: " + obj2.style.width;
        widthInput.style.display = "";
        srcInfo.querySelector(".height").textContent = "Height: " + obj2.style.height;
        heightInput.style.display = "";
    }
    else {
        srcInfo.querySelector(".title").textContent = "";
        titleInput.style.display = "none";
        srcInfo.querySelector(".width").textContent = "";
        widthInput.style.display = "none";
        srcInfo.querySelector(".height").textContent = "";
        heightInput.style.display = "none";
    }
    // set all input to ""
    srcInfo.querySelectorAll("input").forEach(input => {
        input.value = "";
    })
    // move box to cursor click
    srcInfo.style.left = `${(e.clientX / window.innerWidth) * 100}%`;
    srcInfo.style.top = `${window.scrollY + e.clientY - 20}px`;
}

function createRow(html=rowTypes[rowType.value]) {
    // create temp node
    var tab = document.createElement("tbody");
    tab.innerHTML = html;
    // get node first child
    var tr = tab.firstElementChild;
    // create close btn
    var span = document.createElement('span');
    span.classList.add("del-row");
    span.innerHTML = "&times;";
    span.contentEditable = "false";
    tr.appendChild(span);
    // listen for click
    span.addEventListener("click", () => {
        // remove tr
        tr.remove();
        // if no tr's in body, make insert btn invisible
        if (nltrBody.children.length == 0)
        {
            insertBtn.style.display = "";
        }
    })
    // tr.setAttribute("set", "true")
    // td is editable
    tr.querySelectorAll("td").forEach(td => {
        td.contentEditable = "true";
    })
    tr.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", e => {
            e.preventDefault();
            showInfo(a, e);
        })
    })
    // add img listeners
    tr.querySelectorAll("img").forEach(img => {
        img.contentEditable = "false";
        img.style.cursor = "pointer";
        img.addEventListener("click", e => {
            showInfo(img, e);
        })
    })
    tr.addEventListener("mouseover", () => {
        insertBtn.style.display = "block";
        insertBtn.style.top = `${tr.offsetTop + insertBtn.clientHeight / 2 + 20}px`;
        focusTr = tr;
    })
    tr.addEventListener("mouseout", () => {
        insertBtn.style.display = "";
    })
    return tr;
}

function noDisplay(ele) {
    ele.style.display = "none";
    ele.style.position = "";
}

// check for valid image file
function fileExists(file_url){
    var reg = /\.(?:png|jpg|jpeg)$/i;
    if (reg.test(file_url))
    {
        var request = new XMLHttpRequest();
        request.open("HEAD", file_url, true);
        request.send();
        return request.status != 404;
    }
    alert("Invalid Image URL");
    return false;
}

function selInEle (sel, ele) {
    var range = sel.getRangeAt(0);
    var ele2 = range.commonAncestorContainer.parentElement;
    while (ele2)
    {
        if (ele2.id == ele.id)
        {
            return true;
        }
        ele2 = ele2.parentElement;
    }
    return false;
}

// change attr of anchors/images
subSrc.addEventListener("click", () => {
    console.log(focusEle.tagName);
    if (focusEle)
    {
        if (hrefInput.value && hrefInput.value.trim() != "")
        {
            focusEle.href = hrefInput.value;
        }
        if (srcInput.value && srcInput.value.trim() != "" && fileExists(srcInput.value) == true)
        {
            if (linked_Img)
            {
                focusEle.querySelector("img").src = srcInput.value;
            }
            else {
                focusEle.src = srcInput.value;
            }
        }
        if (altInput.value && altInput.value.trim() != "")
        {
            if (linked_Img)
            {
                focusEle.querySelector("img").alt = altInput.value;
            }
            else {
                focusEle.alt = altInput.value;
            }
        }
        if (titleInput.value && titleInput.value.trim() != "")
        {
            if (linked_Img)
            {
                focusEle.querySelector("img").title = titleInput.value;
            }
            else {
                focusEle.title = titleInput.value;
            }
        }
        if (widthInput.value && widthInput.value.trim() != "")
        {
            if (widthInput.value == "clear")
            {
                widthInput.value = "";
            }
            if (linked_Img)
            {
                focusEle.querySelector("img").style.width = widthInput.value;
            }
            else {
                focusEle.style.width = widthInput.value;
            }
        }
        if (heightInput.value && heightInput.value.trim() != "")
        {
            if (heightInput.value == "clear")
            {
                heightInput.value = "";
            }
            if (linked_Img)
            {
                focusEle.querySelector("img").style.height = heightInput.value;
            }
            else {
                focusEle.style.height = heightInput.value;
            }
        }
        noDisplay(srcInfo);
    }
})

// insert tr 
// nltrBody.insertAdjacentElement("beforeend", createRow(rowTypes["Article"]));  

// add rows
addRow.addEventListener("click", () => {
    var tr = createRow();
    // insert tr 
    nltrBody.insertAdjacentElement("beforeend", tr);   
    noDisplay(srcInfo);
})

// listen for insert btn click
insertBtn.addEventListener("click", () => {
    var tr = createRow();
    // insert tr 
    focusTr.insertAdjacentElement("beforebegin", tr);   
    noDisplay(srcInfo);
})

// listen for close info click
closeInfo.addEventListener("click", () => {
    noDisplay(srcInfo);
})

// open code modal
getCode.addEventListener("click", () => {
    // show modal
    modalBG.style.display = "block";
    codeModal.style.display = "block";
    // clear prev code
    modalCode.innerHTML = "";
    // insert text
    var p = document.createElement("p");
    p.insertAdjacentText('afterbegin', nltrBody.innerHTML.replaceAll("<span class=\"del-row\" contenteditable=\"false\">×</span>", ""));
    modalCode.insertAdjacentElement('afterbegin', p);
})

// open import modal
getImport.addEventListener("click", () => {
    // show modal
    modalBG.style.display = "block";
    importModal.style.display = "block";
    // clear prev code
    importModal.querySelector("textarea").value = "";
})

// import code
importBtn.addEventListener("click", () => {
    // close modal
    importBtn.closest(".modal").style.display = "";
    modalBG.style.display = "";
    // add rows to table
    // make temp ele
    var ele = document.createElement("tbody");
    ele.innerHTML = importModal.querySelector("textarea").value;
    while (ele.firstElementChild)
    {
        console.log("!");
        let child = ele.removeChild(ele.firstElementChild);
        if (child.tagName.toLowerCase() == "tr")
        {
            var ele2 = document.createElement("tbody");
            ele2.insertAdjacentElement("beforeend", child);
            var tr2 = createRow(html=ele2.innerHTML);
            // insert tr 
            nltrBody.insertAdjacentElement("beforeend", tr2);
        }
    }
    
})

// close modal
closeModal.forEach(btn => {
    btn.addEventListener("click", () => {
        btn.closest(".modal").style.display = "";
        modalBG.style.display = "";
    })
})

// add text
addText.addEventListener("click", () => {
    // get selection
    var sel = window.getSelection();
    if (sel.rangeCount && selInEle(sel, nltrBody))
    {
        var range = sel.getRangeAt(0);
        // insert text
        let ele = document.createElement('div');
        ele.innerHTML = textFonts[textType.value];
        console.log(ele.innerHTML);
        // format selected text
        if (!range.collapsed)
        {
            let ele2 = ele;
            console.log(ele2);
            while (ele2.firstElementChild) 
            {
                ele2 = ele2.firstElementChild;
            }
            // if not img, set innerhtml to selected text
            if (ele2.tagName.toLowerCase() != "img")
            {
                ele2.innerHTML = sel.toString();
            }
            // else set img alt to text
            else {
                ele2.alt = sel.toString();
                ele2.title = sel.toString();
            }
        }
        ele.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', e => {
                e.preventDefault();
                showInfo(a, e);
            })
        })
        // replace text with element
        range.deleteContents();
        range.insertNode(ele.firstChild);
        addText.blur();
    }
})

// align text
alignTextBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        // get selection
        var sel = window.getSelection();
        if (sel.rangeCount && selInEle(sel, nltrBody))
        {    
            var range = sel.getRangeAt(0);
            // align text
            var ele = range.commonAncestorContainer.parentElement;
            let ele2 = ele;
            let searchIn = false;
            while (ele2.tagName.toLowerCase() != "p" && ele2.tagName.toLowerCase() != "h1" && ele2.tagName.toLowerCase() != "h2" && ele2)
            {
                ele2 = ele2.parentElement;
                console.log(ele2, ele2.tagName.toLowerCase());
                if (ele2.tagName.toLowerCase() == "body" || ele2.tagName.toLowerCase() == "table" || ele2.tagName.toLowerCase() == "table")
                {
                    searchIn = true;
                    break;
                }
            }
            if (searchIn)
            {
                console.log("in")
                for (var i = 0; i < ele2.children.length; i++)
                {
                    if(ele2.children[i].tagName.toLowerCase() != "p" && ele2.children[i].tagName.toLowerCase() != "h1" && ele2.children[i].tagName.toLowerCase() != "h2" && ele2)
                    {
                        ele2.children[i].style.textAlign = btn.dataset.align;
                    }
                }
            }
            else {
                console.log("out")
                ele2.style.textAlign = btn.dataset.align;
            }
        }
    })
})