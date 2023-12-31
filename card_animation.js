const observer = new IntersectionObserver( (entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting){
            entry.target.classList.add('show');

        }else{
            entry.target.classList.remove('show'); 
        }
    })
})
const hiddenElements = document.querySelectorAll('.hidden1');
hiddenElements.forEach((el) => observer.observe(el));

const hiddenElements2 = document.querySelectorAll('.hidden2');
hiddenElements2.forEach((el) => observer.observe(el));