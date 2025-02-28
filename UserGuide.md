# User Guide

### Authors: 
Brady Nolin, Panpan Tochirakul, Patrice Bortey, Riya Kinny

### Description:
User guide documentation for NodeBB Team Green features

---


## Overview of New Features Added

### Endorsing Posts
This new feature creates the functionality to endorse a post, giving the ability to a user to highlight a post for correctness. To use this feature, the user must navigate to a topic and find a post they would like to endorse. The endorse button will be found when the user clicks on the ellipses next to a post, which are located near the upvote/downvote buttons.

### Private posting
This feature allows users such as students to make posts private to only them and the instructor. The student will be able to toggle this feature on/off using the checkbox added to the new topic and replies pages. The post should then only be visible to instructors or admins of the forum and the original poster. The automated tests for this feature can be found in test/posts.js. These tests validate that the isPrivate flag is set to false by default when a post is created. This feature is currently not working for reasons mentioned below:

The implementation of the backend involved adding a field to store the isPrivate field which is a boolean flag to indicate whether a post is private to just the student and instructors. However, this backend implementation fell through and was not completed despite best efforts to do so. When trying to run NodeBB, there were many problems and troubleshooting the setup proved to be more challenging than expected. The main issue was getting NodeBB to run locally, as there were repeated difficulties with configuring the database and test_database properly. Additionally, the backend implementation turned out to be more complex than initially estimated because the private post feature is deeply interconnected with multiple parts of the codebase. Making changes to one file often introduced errors in other dependent files, leading to numerous failed test cases. These cascading issues made debugging and implementing the feature far more time-consuming than anticipated, ultimately causing the backend implementation to stall.

## Testing

### Endorsing Posts
Tests for this feature can be found in `test/posts.js`. To test the frontend, verify that a button is rendered. The endorse button will be found when the user clicks on the ellipses next to a post, which are located near the upvote/downvote buttons. When the endorse button is clicked, a message will pop up on the post, stating "This post has been endorsed." To user test this feature, a user should find an unendorsed post, locate the dropdown menu, and click the endorse button to verify the message pops up. They can then refresh the page to ensure the endorsement message stays on the post. To test the edge cases, the user can try to endorse a post they already endorsed and ensure the proper feedback is provided. The automated test cases for this feature can be found in test/posts.js. These tests validate that the button is correctly rendered in the post dropdown menu, that clicking the button successfully endorses a post via the backend API, and that the UI updates to display an endorsement message. These tests also ensure that endorsements persist across page reloads and handle edge cases, such as preventing duplicate endorsements or unauthorized users from endorsing posts. I believe the tests are sufficient because they cover all critical aspects of the feature, as UI rendering, backend integration, and UI updates are covered by the tests.

### Private Posting (intended testing method for when implementation is completed)
Tests for this feature can be found `test/posts.js`. To test the frontend, check that a checkbox has been rendered allowing the user to toggle the post to be private. To test the backend, run the test suite in `test/posts.js`. To user test this feature, the user can make a post in a forum and set it as private. Then, using an admin account, verify that the post is visible to them. Then, using a non-admin account which is not the same as the accounts used before, verify that this post is not visible to them. These tests should be sufficient since they cover the feature and implementations in the frontend and the backend.
