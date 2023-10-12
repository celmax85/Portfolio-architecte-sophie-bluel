const token = localStorage.getItem('token');
const admin = document.getElementById("admin");
const adminmodif = document.getElementsByClassName("admin-modification");

if (token == null) {
    admin.style.display = "none";
    for(const modif of adminmodif){
        modif.style.display = "none";
    }
} else {
    admin.style.display = "flex";
    for(const modif of adminmodif){
        modif.style.display = "block";
    }
}

function clearGallery() {
    const gallery = document.getElementById("modal-gallery");
    gallery.innerHTML = "";
}

function closemodal() {
    const modal = document.getElementById("modal");
    const imginput = document.getElementById("form-img-input");
    const upload = document.getElementById("file-input");
    const title = document.getElementById("title");
    const category = document.getElementById("category");
    modal.style.display = "none";
    imginput.style.display = "flex";
    upload.value = "";
    title.value = "";
    category.value = "";
    clearGallery();
}

function fetchWorks(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const gallery = document.getElementById("modal-gallery");
            for (works in data) {
                console.log(data[works]);
                gallery.innerHTML += `<figure class="modal${data[works].id}" id="${data[works].id}">
            <img src="${data[works].imageUrl}" alt="${data[works].title}">
            <button class="modal-trash" onclick="deleteworks(event, ${data[works].id})"><i class="fa-solid fa-trash"></i></button>
            <figcaption><button class="works-edit">Editer</button></figcaption>
        </figure>`
            }
        })
}

function projectmodif() {
    const modal = document.getElementById("modal");
    const contentparam = document.getElementById("modal-content-param");
    const contentadd = document.getElementById("modal-content-add");
    let span = document.getElementsByClassName("close")[0];

    contentparam.style.display = "flex";
    contentadd.style.display = "none";
    modal.style.display = "block";
    fetchWorks("https://sophiebluel.onrender.com/api/works");
    span.onclick = closemodal;

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            clearGallery();
        }
    })
}

function modaladdworks() {
    const modal = document.getElementById("modal");
    const contentparam = document.getElementById("modal-content-param");
    const contentadd = document.getElementById("modal-content-add");
    const span = document.getElementsByClassName("close")[1];
    const arrow = document.getElementById("arrow");
    const upload = document.getElementById("file-input");
    const preview = document.getElementById("preview");
    const container = document.getElementById("img-container");
    const imginput = document.getElementById("form-img-input");
    const category = document.getElementById("category");
    const title = document.getElementById("title");

    contentparam.style.display = "none";
    contentadd.style.display = "flex";
    container.style.display = "none";

    span.onclick = () => {
        closemodal();
        imginput.style.display = "flex";
        upload.value = "";
        title.value = "";
        category.value = "";
    };

    arrow.onclick = () => {
        closemodal();
        imginput.style.display = "flex";
        upload.value = "";
        title.value = "";
        category.value = "";
        projectmodif();
    };

    window.addEventListener("click", event => {
        if (event.target === modal) {
            closemodal();
            imginput.style.display = "flex";
            upload.value = "";
            title.value = "";
            category.value = "";
        }
    });

    upload.onchange = () => {
        const reader = new FileReader();
        reader.readAsDataURL(upload.files[0]);
        console.log(upload.files[0]);
        reader.onload = () => {
            preview.setAttribute("src", reader.result);
            container.style.display = "block";
            imginput.style.display = "none";
        }
    };

    fetch("https://sophiebluel.onrender.com/api/categories")
        .then(res => res.json())
        .then(function (data) {
            for (categories in data) {
                console.log(data[categories]);
                category.innerHTML += `<option value="${data[categories].id}">${data[categories].name}</option>`
            }
        });
    const deletebutton = document.getElementById("deletebutton");
    if(deletebutton){
    deletebutton.addEventListener("click", function (event) {
        deleteworks(event, id);
    });
}


}


function deleteworks(event, id) {
    event.preventDefault();
    fetch(`https://sophiebluel.onrender.com/api/works/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(function (res) {
            if (res.ok) {
                console.log("works deleted");
                const modal = document.getElementsByClassName(`modal${id}`)[0];
                modal.remove();
                const gallery = document.getElementsByClassName(`gallery${id}`)[0];
                gallery.remove();
            } else {
                console.log("error");
            }
        })
        .catch(function (err) {
            console.log(err);
        })
}


function addworks(event) {
    event.preventDefault();
    const img = document.getElementById("file-input").files[0];
    const title = document.getElementById("title").value;
    const category = document.querySelector("select[name='category']").value;

    const formData = new FormData();

    formData.append("image", img);
    formData.append("title", title);
    formData.append("category", category);


    fetch("https://sophiebluel.onrender.com/api/works", {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        method: "POST",
        body: formData
    })
        .then(function (res) {
            if (res.ok) {
                return res.json();
            } else {
                console.log("error");
            }
        })
        .then(function (data) {

            const newElement = document.createElement("figure");
            const modal = document.createElement("figure");
            newElement.className = `gallery${data.id}`;
            modal.className = `modal${data.id}`;
            newElement.id = data.categoryId;
            modal.id = data.id;

            newElement.innerHTML = `
                <img src="${data.imageUrl}" alt="${data.title}">
				<figcaption>${data.title}</figcaption>
            `;

            modal.innerHTML = `<img src="${data.imageUrl}" alt="${data.title}">
            <button class="modal-trash" onclick="deleteworks(event, ${data.id})"><i class="fa-solid fa-trash"></i></button>
            <figcaption><button class="works-edit">Editer</button></figcaption>`



            const container = document.getElementById("gallery");
            const modalcontainer = document.getElementById("modal-gallery");
            container.appendChild(newElement);
            modalcontainer.appendChild(modal);
            console.log("works added");
            const btn = document.getElementById("addshotfinal");
            btn.classList.remove("completed");
            btn.disabled = true;
            closemodal();
        }
        )
        .catch(function (err) {
            console.log(err);
        }
        )
}


function inputcomplete(){
    const titleinput = document.getElementById("title");
    const categoryinput = document.getElementById("category");
    const fileinput = document.getElementById("file-input");

    return titleinput.value && categoryinput.value && fileinput.value;
}

function updatebtn(){
    const btn = document.getElementById("addshotfinal");

    if(inputcomplete()){
        btn.classList.add("completed");
        btn.disabled = false;
    } else {
        btn.classList.remove("completed");
        btn.disabled = true;
    }
}

document.getElementById("title").addEventListener("input", updatebtn);
document.getElementById("category").addEventListener("change", updatebtn);
document.getElementById("file-input").addEventListener("input", updatebtn);