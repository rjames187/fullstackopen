const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (prev, cur) => prev + cur
  const mapper = (blog) => blog.likes ? blog.likes : 0
  return blogs.map(mapper).reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (prev, cur) => cur.likes > prev.likes ? cur : prev
  return blogs.reduce(reducer, blogs[0] ? blogs[0] : null)
}

const mostBlogs = (blogs) => {
  const map = { }
  blogs.forEach(blog => {
    const author = blog.author
    if (!author) {
      return
    }
    if (!map[author]) {
      map[author] = 1
    } else {
      map[author] += 1
    }
  })
  let max = { author: null, blogs: 0 }
  for (const authorName in map) {
    if (map[authorName] > max.blogs) {
      max = { author: authorName, blogs: map[authorName] }
    }
  }
  return max
}

const mostLikes = (blogs) => {
  const map = { }
  blogs.forEach(blog => {
    const author = blog.author
    if (!author) {
      return
    }
    if (!map[author]) {
      map[author] = blog.likes
    } else {
      map[author] += blog.likes
    }
  })
  let max = { author: null, likes: 0 }
  for (const authorName in map) {
    if (map[authorName] > max.likes) {
      max = { author: authorName, likes: map[authorName] }
    }
  }
  return max
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
