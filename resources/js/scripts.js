// Global Vars
const popup = document.querySelector(".popup-container");
const popupImg = document.querySelector(".popup-row").childNodes[0];
const popupBox = document.querySelector(".popup-row");
const popupTitle = document.querySelector(".popup-title");
const popupBody = document.querySelector(".popup-body");
const skills = document.querySelectorAll(".skill");
const images = document.querySelectorAll(".skill-img");
const skillNames = document.querySelectorAll(".skill-name");
const navbar = document.querySelector("nav");
var currentSkill = "";

const email = document.querySelectorAll("#about-links")[0].childNodes[1];
const github = document.querySelectorAll("#about-links")[0].childNodes[3];
const linkedin = document.querySelectorAll("#about-links")[0].childNodes[5];
const resume = document.querySelectorAll("#about-links")[0].childNodes[7];
const proj1link = document.querySelectorAll(".project-links")[0].childNodes[3]
const proj1repo = document.querySelectorAll(".project-links")[0].childNodes[1];

const about_section = document.querySelectorAll(".sub-nav-item")[0];
const skills_section = document.querySelectorAll(".sub-nav-item")[1];
const projects_section = document.querySelectorAll(".sub-nav-item")[2];

const location_projects = document.querySelector("#projects").offsetTop;
const location_skills = document.querySelector("#skills").offsetTop;
const location_about = 0;

projects_section.addEventListener("click", () => {
	scroll({ top: location_projects, behaviour: "smooth" });
});

skills_section.addEventListener("click", () => {
	scroll({ top: location_skills, behaviour: "smooth" });
});

about_section.addEventListener("click", () => {
	scroll({ top: location_about, behaviour: "smooth" });
});

proj1repo.addEventListener("click", () => {
    window.open("https://github.com/Crosser1919/School_Lab", "_blank");
});

proj1link.addEventListener("click", () => {
    window.open("https://crosser1919.github.io/School_Lab/", "_blank");
});

linkedin.addEventListener("click", () => {
    window.open("https://www.linkedin.com/in/drew-cross-dev/", "_blank");
});

github.addEventListener("click", () => {
    window.open("https://github.com/Crosser1919?tab=repositories", "_blank");
});

email.addEventListener("click", () => {
    window.open("mailto:drew.cross19@gmail.com", "_blank");
});

resume.addEventListener("click", () => {
    window.open("./resources/files/resume.pdf", "_blank");
});



const skill_clicked = (event) => {
    skills.forEach((skill) => {
        skill.removeEventListener("click", skill_clicked);
    });
    var details = getSkillDetails(event);

    popupImg.src = details["image"];
    popupImg.alt = details["alt"];
    popupTitle.innerHTML = details["title"];
    if (details["body"] == "") {
        details["body"] = "skill details comming soon!";
    }
    popupBody.innerHTML = details["body"];
    popup.style.display = "block";
    setTimeout(startAnimation, 1);
};

const changeSkillDetails = (newInfo) => {
    classes = popup.className.split(" ");
    classes.forEach((Class) => {
        if (Class == "animate") {
            var evt = new Event("click");
            newInfo.dispatchEvent(evt);
        }
    });
};

const getSkillDetails = (event) => {
    let skillDetails = {
        image: "",
        alt: "",
        title: "",
        body: "",
    };
    if (event.target.nodeName == "IMG") {
        skillDetails["image"] = event.target.src;
        skillDetails["alt"] = event.target.alt;
        skillDetails["title"] =
            event.target.parentNode.childNodes[1].innerHTML;
    } else if (event.target.nodeName == "DIV") {
        skillDetails["image"] = event.target.childNodes[0].src;
        skillDetails["alt"] = event.target.childNodes[0].alt;
        skillDetails["title"] = event.target.childNodes[1].innerHTML;
    }

    currentSkill = skillDetails["title"];
    var request = new XMLHttpRequest();
    request.open("GET", "./resources/js/content.json", false);
    request.send(null);


    let jsonData = JSON.parse(request.responseText)["skills"];
    skillDetails["body"] = jsonData[skillDetails["title"]];
    return skillDetails;
};

function getSkillsBody(json)
{
    var skillsData = json["skills"];
    console.log(skillsData[selectedSkillTitle]);
    skillDetails["body"] = skillsData[selectedSkillTitle];

}

const startAnimation = ()=>{
    navbar.classList.add("animate");
    popup.style.display = "block";
    popup.classList.add("animate");
    popupBox.classList.add("animate");
};

const removeDisplay = ()=>{
    popup.style.display = "none";
    skills.forEach((skill)=>{
        skill.addEventListener("click", skill_clicked);
    });
    navbar.classList.remove("animate");
};

skills.forEach((skill)=>{
    skill.addEventListener("click", skill_clicked);
});

const close_popup = () => {
    popup.classList.remove("animate");
    popupBox.classList.remove("animate");
    setTimeout(removeDisplay, 1400);
};

document.addEventListener("keydown", (e) => {
    // esc key
    if (e.which == 27) {
        e.preventDefault();
        close_popup();
    }
});

popup.onclick = (event) => {
    if (event.path[0].className.includes("popup-container")) {
        close_popup();
    }
};

