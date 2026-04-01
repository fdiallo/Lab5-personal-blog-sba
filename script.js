let postForm = document.getElementById("postForm")
let title = document.getElementById("title")
let titleError = document.getElementById("titleError")
let comment = document.getElementById("comment-box")
let commentError = document.getElementById("commentError")

let postList = document.getElementById("postList")

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


const getSavedUsername = () => {
    if (typeof window !== "undefined") {
        const savedUsername = localStorage.getItem(USERNAME_KEY)
        return savedUsername || ""
    }
    return ""
}

// const setUsername = (newUsername) => {
//     localStorage.setItem(USERNAME_KEY, newUsername)
//     title.value = newUsername
// }

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
        timeStamp: new Date().toLocaleString('en-US')
    }

    posts.push(postData)
    localStorage.setItem("posts", JSON.stringify(posts))

    alert("Form Successfully Submitted!")

    postForm.reset()

    renderPosts()

})

function renderPosts() {
    postList.innerHTML = ""
    posts = []

    try {
        let postStr = localStorage.getItem("posts")
        posts = JSON.parse(postStr)
        //console.log("Local storage: ", postArr)

    } catch (error) {
        console.log(error.validationMessage)
    }

    if (posts !== null) {

        for (const post of posts) {

            const postItem = document.createElement("li")
            postItem.innerText = `Title: ${post.title} \n Comment: ${post.comment} \n Time: ${post.timeStamp}`
            postItem.style.listStyleType = "none"
            //postList.appendChild(postItem)

            // let postItemComment = document.createElement("li")
            // postItemComment.innerText = `Comment: ${post.comment}`
            // postItemComment.style.listStyleType = "none";
            // postList.appendChild(postItemComment)

            // let postItemTimeStamp = document.createElement("li")
            // postItemTimeStamp.innerText = `Time: ${post.timeStamp}`
            // postItemTimeStamp.toLocaleString('en-US')
            // postItemTimeStamp.style.listStyleType = "none"
            // postList.appendChild(postItemTimeStamp)

            let editPostBtn = document.createElement("button")
            editPostBtn.textContent = "Edit"
            editPostBtn.style.marginRight = "20px"
            editPostBtn.style.marginLeft = "20px"
            editPostBtn.addEventListener("click", () => editPost(postItem))
            //postList.appendChild(editPostBtn)
            postItem.appendChild(editPostBtn)

            let deletePostBtn = document.createElement("button")
            deletePostBtn.textContent = "Delete"
            deletePostBtn.addEventListener("click", () => deletePost(postItem, post.id))
            //postList.appendChild(deletePostBtn)
            postItem.appendChild(deletePostBtn)

            let postItemSeparator = document.createElement("span")
            postItemSeparator.innerText = "\n-------------------------------------------"
            //postList.appendChild(postItemSeparator)
            postItem.appendChild(postItemSeparator)

            postList.appendChild(postItem)

        }
    }

}

function deletePost(li, id) {
    li.remove()
    console.log(li)
    const newPostList = posts.filter(post => post.id !== id)
    posts = newPostList

    try {
        const storedPostStr = localStorage.getItem("posts")
        const storedPost = JSON.parse(storedPostStr)
        console.log("Local storage: ", storedPostStr)

        if (storedPost !== null) {
            const updatedPostList = storedPost.filter(post => post.id !== id)
            localStorage.setItem("posts", JSON.stringify(updatedPostList))
        }

    } catch (error) {
        console.log(error.validationMessage)
    }




}

document.addEventListener("DOMContentLoaded", () => {

    renderPosts()

})