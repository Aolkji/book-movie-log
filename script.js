let books = []; // ARRAY TO HOLD BOOK OBJECTS
let nextId = 1;
let currentFilter ='all'
let currentSearch = ''

//IF BOOK EXISTS 
function exist(title,type){
  return books.some(b=> b.title === title && b.type ===type);

}
//BOOK OBJECT CREATION
function addBook() {
  const title = document.getElementById('inputTitle').value.trim();
  const genre = document.getElementById('inputGenre').value;
  const rating = document.getElementById('inputRating').value;
  const type = document.getElementById('inputType').value;


  if(!type){
    alert('Please enter a type')
    return;
  }
  if(!title){
    alert('Please enter a title')
    return;
  }
  if(!genre){
    alert('Please enter a genre')
    return;
  }

  if(exist(title,type)){
    alert('Already in List')
    return;
  }
  

  const newBook = {
    id: nextId,
    title: title,
    genre: genre,
    status: 'To Consume',
    rating: rating,
    type: type
  };

  books.push(newBook);
  nextId++;
  renderBooks();
 }


function deleteBook(id) {
  books = books.filter(b => b.id !== id);
  renderBooks();
}
function filterItems(type) {
  currentFilter = type;
  currentSearch = ''
  document.getElementById('searchInput').value = '';
  renderBooks();
}
function searchItems(){
  currentSearch = document.getElementById('searchInput').value.trim().toLowerCase();
  renderBooks();


}
// BOOK CARDS
function renderBooks() {
  const list = document.getElementById('bookList');
  renderStats();

  let filtered = books;

  if(currentFilter !== 'all'){
    filtered = books.filter(b=> b.type === currentFilter);
  }
  if(currentSearch){
    filtered= filtered.filter(b=>b.title.toLowerCase().includes(currentSearch));
  }

  if (filtered.length === 0) {
    list.innerHTML = '<p>Nothing in list. Add one above!</p>';
    return;
  }

  list.innerHTML = filtered.map(b => `
    <div class="book-card d-flex flex-row align-items-center gap-3 p-2 mb-3 w-100">
      <p>${b.title}</p>
      <p><span class="book-info">${b.type}</span></p>
      <p><span class="book-info">${b.genre}</span></p>

      <select class= "book-info" onchange="updateRating(${b.id},this.value)">
        <option value "" ${b.rating === 'Rate Now' ? 'selected' : ''}>Rate Now</option>
        <option ${b.rating === '⭐️' ? 'selected' : ''}>⭐️</option>
        <option ${b.rating === '⭐️⭐️' ? 'selected' : ''}>⭐️⭐️</option>
        <option ${b.rating === '⭐️⭐️⭐️' ? 'selected' : ''}>⭐️⭐️⭐️</option>
        <option ${b.rating === '⭐️⭐️⭐️⭐️' ? 'selected' : ''}>⭐️⭐️⭐️⭐️</option>
        <option ${b.rating === '⭐️⭐️⭐️⭐️⭐️' ? 'selected' : ''}>⭐️⭐️⭐️⭐️⭐️</option>
      </select>

      <select class= "book-select" onchange="updateStatus(${b.id},this.value)">
        <option value="to-consume" ${b.status === 'to-consume' ? 'selected' : ''}>🤔 To Consume </option>
        <option value="viewing"${b.status === 'viewing' ? 'selected' : ''}> 👀 Viewing </option>
        <option value="completed" ${b.status === 'completed' ? 'selected' : ''}>✅ Completed </option>
      </select>
        <button class = "delete"onclick="deleteBook(${b.id})">❌</button>
      
    </div>
  `).join('');
}

renderBooks();
// TOTAL/VIEWING/COMPLETED/TO-CONSUME
function renderStats(){
  const total = books.length;
  const viewing = books.filter(b=> b.status === 'viewing').length;
  const completed = books.filter(b=> b.status === 'completed').length;
  const toConsume = books.filter(b=> b.status === 'to-consume').length;

  document.getElementById('readBar').innerHTML =`
  <div class="read-pill"> Total <span>${total}</span></div>
  <div class="read-pill"> 👀 Viewing <span>${viewing}</span></div>
  <div class="read-pill"> ✅ Completed <span>${completed}</span></div>
  <div class="read-pill"> 🤔 To Consume <span>${toConsume}</span></div>
  `;

}
//UPDATE RATING 
function updateRating(id,newRating){
  const book = books.find(b => b.id == id);
  if(book){
    book.rating = newRating;
  }
  renderStats()

}
//UPDATE STATUS VIEWING/COMPLETED/TO-CONSUME
function updateStatus(id,newStatus){
  const book = books.find(b => b.id == id);
  if(book){
    book.status = newStatus;
  }
  renderBooks()

}
