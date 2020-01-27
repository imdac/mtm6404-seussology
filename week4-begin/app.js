const app = new Vue({
  el: '#app',
  data: {
    title: 'Seussology',
    catalog: books.slice(0),
    category: '',
    query: '',
    property: 'category',
    shelves: {
      category: ['Favorites', 'Beginner Books', 'Big Books'],
      grade: ['Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'],
      decade: ['1930s', '1940s', '1950s', '1960s', '1970s', '1980s', '1990s']
    }
  },
  computed: {
    books: function () {
      if (this.query) {
        return this.catalog.filter((book) =>
          book.title.toLowerCase().includes(this.query.toLowerCase())
        )
      }

      return this.catalog
    }
  }
})
