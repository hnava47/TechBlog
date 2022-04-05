$(document).ready(function() {
    const $logoutBtn = $('#logoutBtn');
    const $blogModal = $('#blogModal');
    const $newsFeedEl = $('#newsFeed');
    const $blogTitle = $('#blogTitle');
    const $blogContent = $('#blogContent');
    const $blogBtn = $('#blogBtn');
    const $updateModal = $('#updateModal');
    const $updateBlogContent = $('#updateContent');
    const $updateBlogBtn = $('#updateBtn');
    const $successAlert = $('#successAlert');
    const $updateAlert = $('#updateAlert');
    const $deleteAlert = $('#deleteAlert');
    const $closeSuccessBtn = $('#closeSuccess');
    const $closeUpdateBtn = $('#closeUpdate');
    const $closeDeleteBtn = $('#closeDelete');
    const $editBlog = $('.editBlog');
    const $deleteBlog = $('.deleteBlog');
    const $blogCommentBtn = $('.blogCommentBtn');
    const $deleteComment = $('.deleteComment');
    const spaceEl = '&nbsp;';
    const dblSpaceEl = '&nbsp;&nbsp;';

    // Function variables
    const hideAlerts = () => {
        $successAlert.hide();
        $updateAlert.hide();
        $deleteAlert.hide();
    };

    const deleteBlogFn = async (event) => {
        const $blogId = $(event.target).parent().data('id');
        await $.ajax({
            url: `/api/blogs/${$blogId}`,
            method: 'DELETE'
        });

        $(`#${$blogId}`).remove();

        $deleteAlert.fadeIn();

        setTimeout(function() {
            $deleteAlert.fadeOut();
        }, 4000);
    };

    const updateBlogFn = async (event) => {
        const $updateId = $(event.target).parent().data('id');
        const $currentBlogTitle = $(`#title-${$updateId}`)
        const $currentBlogContent = $(`#content-${$updateId}`);

        $updateBlogContent.val($currentBlogContent.text().trim());

        $updateBlogBtn.on('click', async () => {
            const updatedBlog = await $.ajax({
                url: `/api/blogs/${$updateId}`,
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                data: JSON.stringify({
                    title: $currentBlogTitle.val().trim(),
                    content: $updateBlogContent.val().trim()
                })
            });
            $updateModal.modal('toggle');

            $currentBlogContent.text(updatedBlog.content);

            $updateBlogContent.val('');

            hideAlerts();

            $updateAlert.fadeIn();

            setTimeout(function() {
                $updateAlert.fadeOut();
            }, 4000);
        });
    }

    const deleteCommentFn = async (event) => {
        const $commentId = $(event.target).parent().data('commentid');

        await $.ajax({
            url: `/api/comments/${$commentId}`,
            method: 'DELETE'
        });

        $(`#${$commentId}`).remove();

        hideAlerts();

        $deleteAlert.fadeIn();

        setTimeout(function() {
            $deleteAlert.fadeOut();
        }, 4000);
    };

    // Logout functions
    $logoutBtn.on('click', async () => {
        await $.ajax({
            url: '/api/users/logout',
            method: 'POST',
        });
        window.location.href = '/login';
    });

    // Blog functions
    $blogBtn.on('click', async () => {
        const $blogAnchor = $('<a>');
        const $blogDiv = $('<div>');
        const $blogNameEl = $('<strong>');
        const $blogDropdown = $('<div>');
        const $blogDropdownIcon = $('<i>');
        const $blogDropdownUl = $('<ul>');
        const $blogEditLi = $('<li>');
        const $blogDeleteLi = $('<li>');
        const $dateEl = $('<small>');
        const $blogContentEl = $('<div>');
        const $blogIconEl = $('<small>');
        const $blogCommentEl = $('<i>');
        const $blogCommentSpan = $('<span>');
        const $collapseDiv = $('<div>');
        const $inputGroupDiv = $('<div>');
        const $personIcon = $('<i>');
        const $commentInput = $('<input>');
        const $commentBtnDiv = $('<div>');
        const $commentBtn = $('<button>');

        const blog = await $.ajax({
            url: '/api/blogs',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({
                title: $blogTitle.val().trim(),
                content: $blogContent.val().trim()
            })
        });
        $blogModal.modal('toggle');

        $blogTitle.val('');
        $blogContent.val('');

        // Adding all HTML components for a blog to news feed
        $commentBtn.addClass('btn btn-primary blogCommentBtn')
            .attr({
                'type': 'button',
                'data-id': blog.id
            })
            .text('Post');

        $commentBtnDiv.addClass('d-grid gap-2 d-md-flex justify-content-md-end')
            .append($commentBtn);

        $commentInput.addClass('form-control rounded-pill')
            .attr({
                'id': `input-${blog.id}`,
                'type': 'text',
                'aria-label': 'Sizing example input',
                'aria-describedby': 'inputGroup-sizing-default',
                'placeholder': 'Add a comment...'
            });

        $personIcon.addClass('bi bi-person-circle')
            .attr({
                'style': 'font-size: 2em;',
            });

        $inputGroupDiv.addClass('input-group mt-3 mb-2')
            .append($personIcon, dblSpaceEl, $commentInput);

        $collapseDiv.addClass('collapse mt-2 mb-2 mx-2')
            .attr('id', `collapse-${blog.id}`)
            .append($inputGroupDiv, $commentBtnDiv);

        $blogCommentSpan.text('0');

        $blogCommentEl.addClass('bi bi-chat')
            .attr({
                'data-bs-toggle': 'collapse',
                'href': `#collapse-${blog.id}`,
                'role': 'button',
                'aria-expanded': 'false',
                'aria-controls': 'collapseExample'
            });

        $blogIconEl.append($blogCommentEl, spaceEl, $blogCommentSpan);

        $blogContentEl.addClass('col-10 mt-3 mb-1')
            attr('id', `content-${blog.id}`)
            .text(blog.content);

        $dateEl.addClass('text-muted')
            .text(`Posted by ${blog.user.firstName} ${blog.user.lastName} at ${moment(blog.updatedAt).format('MMMM DD')} ${moment(blog.updatedAt).format('hh:mm A')}`);

        $blogDeleteLi.addClass('dropdown-item deletePost')
            .text('Delete');

        $blogEditLi.addClass('dropdown-item editPost')
            .attr({
                'data-bs-toggle': 'modal',
                'data-bs-target': '#updateModal'
            })
            .text('Edit');

        $blogDropdownUl.addClass('dropdown-menu text-small shadow')
            .attr({
                'aria-labelledby': 'dropdownUser2',
                'data-id': blog.id
            })
            .append($blogEditLi, $blogDeleteLi);

        $blogDropdownIcon.addClass('bi bi-three-dots')
            .attr('data-bs-toggle', 'dropdown');

        $blogDropdown.addClass('flex-shrink-0 dropdown')
            .append($blogDropdownIcon, $blogDropdownUl);

        $blogNameEl.addClass('mb-1')
            .attr('id', `title-${blog.id}`)
            .text(blog.title);

        $blogDiv.addClass('d-flex w-100 align-items-center justify-content-between')
            .append($blogNameEl, $blogDropdown);

        $blogAnchor.attr('id', blog.id)
            .addClass('list-group-item list-group-item-action py-3 lh-tight')
            .append($blogDiv, $dateEl, $blogContentEl, $blogIconEl, $collapseDiv);

        $newsFeedEl.prepend($blogAnchor);

        $successAlert.fadeIn();

        setTimeout(function() {
            $successAlert.fadeOut();
        }, 4000);

        $('.deleteBlog').on('click', deleteBlogFn);

        $('.editBlog').on('click', updateBlogFn);
    });

    $editBlog.on('click', updateBlogFn);

    $deleteBlog.on('click', deleteBlogFn);

    // Comment functions
    $blogCommentBtn.on('click', async (event) => {
        const $blogCommentId = $(event.target).data('id')
        const $commentMessage = $(`#input-${$blogCommentId}`);
        const $commentParent = $(`#collapse-${$blogCommentId}`);
        const $cardDiv = $('<div>');
        const $commentDiv = $('<div>');
        const $commentNameEl = $('<strong>');
        const $dropdownDiv = $('<div>');
        const $dotIcon = $('<i>');
        const $dropdownUl = $('<ul>');
        const $editLi = $('<li>');
        const $deleteLi = $('<li>');
        const $commentDateEl = $('<small>');
        const $messageDiv = $('<div>');

        const comment = await $.ajax({
            url: '/api/comments',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({
                comment: $commentMessage.val().trim(),
                blogId: $blogCommentId
            })
        });

        $commentMessage.val('');

        $deleteLi.addClass('dropdown-item deleteComment')
            .text('Delete');

        $editLi.addClass('dropdown-item editComment')
            .text('Edit')
            .attr({
                'data-bs-toggle': 'modal',
                'data-bs-target': '#updateCommentModal'
            });

        $dropdownUl.addClass('dropdown-menu text-small shadow')
            .attr({
                'aria-labelledby': 'dropdownUser2',
                'data-commentId': comment.id
            })
            .append($editLi, $deleteLi);

        $dotIcon.addClass('bi bi-three-dots')
            .attr('data-bs-toggle', 'dropdown');

        $dropdownDiv.addClass('flex-shrink-0 dropdown')
            .append($dotIcon, $dropdownUl);

        $commentNameEl.addClass('comment-sm')
            .text(`${comment.user.firstName} ${comment.user.lastName}`);

        $commentDiv.addClass('d-flex w-100 align-items-center justify-content-between')
            .append($commentNameEl, $dropdownDiv);

        $commentDateEl.addClass('text-muted comment-xsm')
            .text(`${moment(comment.updatedAt).format('MMMM DD')} at ${moment(comment.updatedAt).format('hh:mm A')}`);

        $messageDiv.addClass('mt-2 comment-sm')
            .text(comment.comment);

        $cardDiv.attr('id', comment.id)
            .addClass('card card-body')
            .append($commentDiv, $commentDateEl, $messageDiv);

        $commentParent.prepend($cardDiv);

        hideAlerts();

        $successAlert.fadeIn();

        setTimeout(function() {
            $successAlert.fadeOut();
        }, 4000);

        $('.deleteComment').on('click', deleteCommentFn);
    });

    $deleteComment.on('click', deleteCommentFn);

    $closeSuccessBtn.on('click', () => {
        $successAlert.hide();
    });

    $closeUpdateBtn.on('click', () => {
        $updateAlert.hide();
    });

    $closeDeleteBtn.on('click', () => {
        $deleteAlert.hide();
    });
});
