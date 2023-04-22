console.log('home script');
{
    // method to submit the form data for new post using AJAX
    let createPost = function () {
        let newPostForm = $('#new-post-form');

        $(newPostForm).on('submit', function (e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/post/create',
                data: newPostForm.serialize(),
                success: function (data) {


                    let newPost = newPostDom(data.data.post, data.data);
                    $('#posts-list-container>ul').prepend(newPost);
                    console.log($(' .delete-post-button', newPost).html());
                    deletePost($(' .delete-post-button', newPost));
                    createComment();
                    notifySuccess(data);

                }, error: function (error) {
                    console.log(error.responseText);
                    notifyError(error)
                }
            });
        });
    }

    // method to create a post in DOM
    let newPostDom = function (post, user) {
        return $(`<li id="post-${post._id}">
                    <p>
                        
                        <small>
                            <a class="delete-post-button" id="delete-post-${post._id}" href="/post/destroy/${post._id}">X</a>
                        </small>
                       
                        ${post.content}
                        <br>
                        <small>
                        ${user.name}
                        </small>
                    </p>
                    <div class="post-comments">
                        
                            <form action="/comments/create" id="new-comment-form" method="POST">
                                <input type="text" name="content" placeholder="Type Here to add comment..." required>
                                <input type="hidden" name="post" value="${post._id}" >
                                <input type="submit" value="Add Comment">
                            </form>
               
                
                            <div class="post-comments-list">
                            <ul id="post-comments-${post._id}">
                                
                            </ul>
                        </div>
                    </div>
                    
                </li>`)
    }

    // method to delete a post 
    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (e) {
            console.log('acha')
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    console.log(data);
                    $(`#post-${data.data.post_id}`).remove();
                    notifySuccess(data)
                },
                error: function (error) {
                    console.log(error.responseText);
                }
            })
        })
    }

    let createComment = function () {
        let createCommentForm = $('#new-comment-form');

        $(createCommentForm).on('submit', function (e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: createCommentForm.serialize(),
                success: function (data) {

                    let commentDom = newContentDom(data.data);
                    $(`#post-comments-${data.data.post}`).prepend(commentDom);
                    console.log('aaaa',$(' .delete-comment-button', commentDom).html());

                    console.log('o my goodness');
                    notifySuccess(data);
                },
                error: function (error) {
                    // console.log(error.responseText)
                }
            })
        })
    }

    let newContentDom = function (data) {
        return $(`
                  <li id='comment-${data.comment._id}'>
                    
                        <a class="delete-comment-button id='comment-${data.comment._id}' href="/comments/destroy/${data.comment._id}">X</a>
        
                    <p>
                     ${ data.comment.content}
                        <br>
                        <small>
                        ${data.username}
                        </small>
                    </p>
                  </li>
                `)
    }

    createPost();
}

// {
//     let deletePost = function () {
//         let deletePostButton = $('#delete-post');

//         $(deletePostButton).on('click', function (e) {
//             e.preventDefault();

//             $.ajax({
//                 type: 'get',
//                 url: $(deletePostButton).prop('href'),
//                 success: function (data) {
//                     console.log('i did it')
//                     $(`#post-${data.data.post_id}`).remove();
//                     notifySuccess(data);
//                 },
//                 error: function (error) {
//                     console.log(error.responseText);
//                 }
//             })
//         })
//     }

//     deletePost();
// }


{
    let createComment = function () {
        let createCommentForm = $('#new-comment-form');

        $(createCommentForm).on('submit', function (e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: createCommentForm.serialize(),
                success: function (data) {

                    let commentDom = newContentDom(data.data);
                    $(`#post-comments-${data.data.post}`).prepend(commentDom)
                    console.log('o my goodness');
                    notifySuccess(data);
                },
                error: function (error) {
                    // console.log(error.responseText)
                }
            })
        })
    }

    let newContentDom = function (data) {
        return $(`
                  <li>
                    
                        <a class="delete-comment-button" href="/comments/destroy/${data.comment._id}">X</a>
        
                    <p>
                     ${ data.comment.content}
                        <br>
                        <small>
                        ${data.username}
                        </small>
                    </p>
                  </li>
                `)
    }

    let deleteComment = function(deleteLink){

    }

    createComment();
}


let notifySuccess = function (data) {
    new Noty({
        theme: 'relax',
        text: data.message,
        type: "success",
        layout: 'topRight',
        timeout: 1500
    }).show();
}

let notifyError = function (data) {
    new Noty({
        theme: 'relax',
        text: "<%= flash.error%>",
        type: "error",
        layout: 'topRight',
        timeout: 1500
    }).show();
}