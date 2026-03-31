let postForm = document.getElementById("postForm")
let title = document.getElementById("title")
let titleError = document.getElementById("titleError")
let comment = document.getElementById("comment-box")
let commentError = document.getElementById("commentError")

let posts = []
let id = 0
let date = new Date()

title.addEventListener("blur", (event) => {
    if (title.value == "") {
        title.setCustomValidity("Username is required!")
    } else {
        title.setCustomValidity("")
    }
    titleError.innerText = title.validationMessage
})

comment.addEventListener("blur", () => {
    if (comment.value.length === 0) {
        comment.setCustomValidity("Email is required")
    } else {
        comment.setCustomValidity("")
    }
    commentError.innerText = comment.validationMessage
})


postForm.addEventListener("submit", (event) => {

    event.preventDefault()

    if (!title.validity.valid) {
        alert("Please enter title")
        title.focus()
        return
    }
    if (!comment.validity.valid) {
        alert("Please enter comment")
        comment.focus()
        return
    }

    const formData = new FormData(postForm)
    const titleValue = formData.get("title")

    const commentValue = formData.get("comment-box")

    let postData = {
        id: ++id,
        title: titleValue,
        comment: commentValue,
        timeStamp: new Date()
    }
   
    localStorage.setItem("post", JSON.stringify(postData))

    posts.push(postData)

    alert("Form Successfully Submitted!")

    postForm.reset()

    try {
        let postStr = localStorage.getItem("post")
        let postObj = JSON.parse(postStr)
        console.log("Local storage: ", postObj)
    } catch (error) {
        console.log(error.validationMessage)
    }
    

})
