/**
 * Script by Traversy Media.
 */

//  Listen for form submit.
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
  //  Get form values.
  const siteName = document.getElementById('siteName').value;
  const siteUrl = document.getElementById('siteUrl').value;

  if (!validateForm(siteName, siteUrl)) {
    return false;
  }

  const bookmark = {
    name: siteName,
    url: siteUrl,
  };

  //  Test if bookmarks is null.
  if (localStorage.getItem('bookmarks') === null) {
    //  Init array.
    let bookmarks = [];
    //  Add to array.
    bookmarks.push(bookmark);
    //  Set to localStorage.
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    //  Get bookmarks from localStorage.
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //  Add bookmark to array.
    bookmarks.push(bookmark);
    //  Re-set back to localStorage.
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  //  Clear the form.
  document.getElementById('myForm').reset();

  //  Refetch bookmarks.
  fetchBookmarks();

  //  Prevent form from submitting.
  e.preventDefault();
}

function fetchBookmarks() {
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  const bookmarksResults = document.getElementById('bookmarksResults');

  //  Build Output
  bookmarksResults.innerHTML = '';
  for (let i = 0; i < bookmarks.length; i++) {
    const name = bookmarks[i].name;
    const url = bookmarks[i].url;

    bookmarksResults.innerHTML += "<div class='well'>"+
      `<h3>${name} <a href='${url}' class='btn btn-default' target='_blank'>Visit</a>`+
      ` <a onclick="deleteBookmark('${url}')" class='btn btn-danger'>Delete</a></h3>`+
      "</div>";
  }
}

//  Delete bookmark.
function deleteBookmark(url) {
  //  Get bookmarks from localStorage.
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  //  Loop through bookmarks.
  for (let i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      //  Remove from array.
      bookmarks.splice(i, 1);
    }
  }

  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  //  Refetch bookmarks.
  fetchBookmarks();
}

//  Validate form.
function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert('Please fill in the form!');
    return false;
  }

  let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  let regexURL = new RegExp(expression);

  //  Check valid URL.
  if (!siteUrl.match(regexURL)) {
    alert('Please use a valid URL');
    return false;
  }

  return true;
}