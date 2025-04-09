/* eslint-env browser, jquery */
/* global config, app */

'use strict';

$(document).on('click', '.endorse-btn', async function (e) {
	e.preventDefault(); // Prevent default link behavior
	const pid = $(this).data('pid'); // Get post ID
	const $postMenu = $(this).closest('.dropdown-menu'); // Find the closest dropdown menu

	try {
		const response = await fetch(`/api/v3/posts/${pid}/vote`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-csrf-token': config.csrf_token,
			},
			body: JSON.stringify({ delta: 1 }), // Use upvote API as a proxy for endorsement
		});

		if (response.ok) {
			app.alertSuccess('Post endorsed successfully!');
			$postMenu.append('<div class="endorsement-message">This post has been endorsed</div>'); // Add endorsement message
		} else {
			app.alertError('Failed to endorse post.');
		}
	} catch (err) {
		console.error(err);
		app.alertError('An error occurred while endorsing the post.');
	}
});

$(document).ready(async () => {
	$('.endorse-btn').each(async function () {
		const pid = $(this).data('pid');

		try {
			const response = await fetch(`/api/v3/posts/${pid}`);
			if (response.ok) {
				const data = await response.json();
				if (data.post && data.post.votes > 0) { // Check if post has votes
					$(this).closest('.dropdown-menu').append('<div class="endorsement-message">This post has been endorsed</div>');
				}
			}
		} catch (err) {
			console.error(err);
		}
	});
});
