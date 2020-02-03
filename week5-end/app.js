Vue.component('book', {
  props: ['book'],
  methods: {
    toggleRead: function (id) {
      const index = this.$root.catalog.findIndex(book => id === book.id)
      this.$root.catalog[index].read = !this.$root.catalog[index].read
    },
    selectBook: function () {
      this.$root.selectedBook = this.book
    }
  },
  template: `
    <div class="book" @click="selectBook">
      <div title="Read" class="book-read" :class="{read: book.read}" @click.stop="toggleRead(book.id)"><i class="fas fa-2x fa-check"></i></div>
      <img class="book-image" :src="'../assets/images/covers/'+ book.image" :title="book.title">
    </div>`
})

Vue.component('shelf', {
  props: ['books', 'property', 'value'],
  computed: {
    filteredBooks: function () {
      return this.books.filter(book => book[this.property] === this.value)
    }
  },
  template: `
  <div class="shelf" v-if="filteredBooks.length">
    <h2 class="shelf-title">{{ value }}</h2>
    <div class="books">
      <book v-for="(book, index) in books" v-if="book[property] === value" :key="book.id" :book="book" :index="index"></book>
    </div>
  </div>
  `
})

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
    },
    selectedBook: false
  },
  mounted: function () {
    if (localStorage.catalog) {
      this.catalog = JSON.parse(localStorage.catalog)
    }
  },
  watch: {
    catalog: {
      handler: function () {
        localStorage.catalog = JSON.stringify(this.catalog)
      },
      deep: true
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
