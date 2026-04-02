let postForm = document.getElementById("postForm")
let title = document.getElementById("title")
let titleError = document.getElementById("titleError")
let comment = document.getElementById("comment-box")
let commentError = document.getElementById("commentError")
let submitBtn = document.getElementById("submitBtn")

let postList = document.getElementById("postList")

let posts = []
let id = 0
let date = new Date()
let currentEditingId = null

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

// const getSavedUsername = () => {
//     if (typeof window !== "undefined") {
//         const savedUsername = localStorage.getItem(USERNAME_KEY)
//         return savedUsername || ""
//     }
//     return ""
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

    let counter = posts.length

    let postData = {
        id: counter,
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

    posts = getPostFromStorage()

    if (posts && posts.length) {

        for (const post of posts) {

            const postItem = document.createElement("li")
            postItem.innerText = `Title: ${post.title} \n Comment: ${post.comment} \n Time: ${post.timeStamp}`
            postItem.style.listStyleType = "none"

            let editPostBtn = document.createElement("button")
            editPostBtn.textContent = "Edit"
            editPostBtn.style.marginRight = "20px"
            editPostBtn.style.marginLeft = "20px"
            editPostBtn.addEventListener("click", () => editPost(post.id))
            postItem.appendChild(editPostBtn)

            let deletePostBtn = document.createElement("button")
            deletePostBtn.textContent = "Delete"
            deletePostBtn.addEventListener("click", () => deletePost(postItem, post.id))
            postItem.appendChild(deletePostBtn)

            let postItemSeparator = document.createElement("span")
            postItemSeparator.innerText = "\n---------------------------------------------------------------"
            postItem.appendChild(postItemSeparator)

            postList.appendChild(postItem)
        }
    }

}

function editPost(id) {
    currentEditingId = id
    const postToEdit = posts.find(post => post.id === id)

    console.log(postToEdit)
    document.getElementById("editTitle").value = postToEdit.title
    document.getElementById("editComment").value = postToEdit.comment

    document.getElementById("updateModal").showModal()

}

document.getElementById("saveChangesBtn").addEventListener("click", () => {
    const editTitle = document.getElementById("editTitle").value
    const editComment = document.getElementById("editComment").value

    const index = posts.findIndex(post => post.id === currentEditingId)
    if (index !== -1) {
        posts[index].title = editTitle
        posts[index].comment = editComment
    }

    localStorage.setItem("posts", JSON.stringify(posts))
    renderPosts()
    closeModal()
    postForm.reset()
    console.log("Updated posts: " + posts)
})
const dialog = document.getElementById("updateModal")
dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
        dialog.close()
    }
})

document.getElementById("closeBtn").addEventListener("click", (event) => {
    closeModal()
})

function closeModal() {
    document.getElementById("updateModal").close()
}

function deletePost(li, id) {
    li.remove()
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

function getPostFromStorage() {
    let storagePosts = []
    try {
        let postStr = localStorage.getItem("posts")
        storagePosts = JSON.parse(postStr)
    } catch (error) {
        console.log(error.validationMessage)
    }
    return storagePosts
}

document.addEventListener("DOMContentLoaded", () => {
    renderPosts()
})