const urlWorks = "https://sophiebluel.onrender.com/api/works/";
const gallery = document.getElementById("gallery");

const getWorks = () => {
    fetch(urlWorks)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            for (works in data) {
                console.log(data[works]);
                gallery.innerHTML += `<figure class="gallery${data[works].id}" id="${data[works].categoryId}">
				<img src="${data[works].imageUrl}" alt="${data[works].title}">
				<figcaption>${data[works].title}</figcaption>
			</figure>`
            }
        })

}
function filterFigures(filterId, btn) {
    let gallery = document.getElementById("gallery");
    let figures = gallery.querySelectorAll("figure");

    for (let i = 0; i < figures.length; i++) {
        if (figures[i].id == filterId) {
            figures[i].style.display = "block";
        } else {
            figures[i].style.display = "none";
        }
    }

    let btnActive = document.querySelector(".active");
    if (btnActive) {
        btnActive.classList.remove("active");
    }

    btn.classList.add("active");
}

function filterAll(btn) {
    let all = document.querySelectorAll("figure");
    for (let i = 0; i < all.length; i++) {
        all[i].style.display = "block";
    }

    let btnActive = document.querySelector(".active");
    if (btnActive) {
        btnActive.classList.remove("active");
    }

    btn.classList.add("active");

}

function filterObject(btn) {
    filterFigures("1", btn);
}
function filterAppart(btn) {
    filterFigures("2", btn);
}
function filterHotel(btn) {
    filterFigures("3", btn);
}